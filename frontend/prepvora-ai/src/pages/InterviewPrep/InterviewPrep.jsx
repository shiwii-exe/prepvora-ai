import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import { API_PATHS } from "../../Utils/apiPaths";
import axiosInstance from "../../Utils/axiosInstance";
import QuestionCard from "../../components/cards/QuestionCard";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./components/AIResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  const fetchSessionDetailsById = useCallback(async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSIONS.GET_ONE(sessionId));
      if (res.data?.session) setSessionData(res.data.session);
    } catch (err) {
      console.error(err);
    }
  }, [sessionId]);

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);
      const res = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (res.data) setExplanation(res.data);
    } catch (err) {
      console.error(err);
      setExplanation(null);
      setErrorMsg("Something went wrong while generating explanation.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      fetchSessionDetailsById();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadMoreQuestions = async () => {
    setIsUpdateLoader(true);
    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        setJustUpdated(true);
        await fetchSessionDetailsById();
        setTimeout(() => setJustUpdated(false), 2000);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId, fetchSessionDetailsById]);

  return (
    <DashboardLayout>
      <div className="pt-6 px-4 md:px-8 lg:px-16 text-white">
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
        />

        <div className={`mt-6 relative flex flex-col lg:flex-row transition-all duration-300 ${openLearnMoreDrawer ? "lg:gap-3" : "lg:gap-6"}`}>
          {/* Question List */}
          <div className={`transition-all duration-300 ${openLearnMoreDrawer ? "lg:w-[60%]" : "w-full"}`}>
            {!sessionData ? (
              <SpinnerLoader />
            ) : (
              <div className="space-y-4">
                {justUpdated && (
                  <div className="text-green-500 font-medium text-sm mb-2 animate-pulse">
                    ✅ New questions added!
                  </div>
                )}

                {sessionData.questions?.map((q, idx) => (
                  <QuestionCard
                    key={q?._id || idx}
                    question={q?.question}
                    answer={q?.answer}
                    onLearnMore={() => generateConceptExplanation(q.question)}
                    isPinned={q?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(q._id)}
                  />
                ))}

                {!isLoading && sessionData.questions?.length > 0 && (
                  <div className="flex justify-center mt-10 mb-10">
                    <button
                      className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 px-6 py-2.5 rounded-full shadow hover:shadow-md transition"
                      onClick={uploadMoreQuestions}
                      disabled={isUpdateLoader}
                    >
                      {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-xl" />} Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer */}
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-500 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && <AIResponsePreview content={explanation?.explanation} />}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
