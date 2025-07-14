import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence} from "framer-motion";
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
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        setJustUpdated(true);
        await fetchSessionDetailsById();
        setTimeout(() => setJustUpdated(false), 2000);

        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
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
      <div className="pt-4">
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
      </div>

      <div className="w-full pt-6 pb-10 px-4 md:px-8 lg:px-16 bg-yellow-90 min-h-[400px]">
      <h2 className="text-xl font-bold mb-4 text-black">Interview Q &amp; A</h2>


        <div className="flex flex-col lg:flex-row gap-6 relative transition-all">
          <div className={`transition-all duration-300 ${openLearnMoreDrawer ? "lg:w-[60%]" : "w-full"}`}>
            {!sessionData ? (
              <SpinnerLoader />
            ) : (
              <div className="space-y-6">
                {justUpdated && (
                  <div className="text-green-600 font-medium text-sm mb-2 animate-pulse">
                    ✅ Questions updated successfully!
                  </div>
                )}

                <AnimatePresence>
                  {sessionData.questions?.map((q, idx) => (
                    <motion.div
                      key={q?._id || idx}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: idx * 0.05,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${q?._id || idx}`}
                    >
                      <QuestionCard
                        question={q?.question}
                        answer={q?.answer}
                        onLearnMore={() => generateConceptExplanation(q.question)}
                        isPinned={q?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(q._id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!isLoading && sessionData.questions?.length > 0 && (
                  <div className="flex items-center justify-center mt-5">
                    <button
                      className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                      disabled={isLoading || isUpdateLoader}
                      onClick={uploadMoreQuestions}
                    >
                      {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-lg" />}
                      Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:absolute lg:right-0 lg:top-0">
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {errorMsg && (
                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                  <LuCircleAlert className="mt-1" />
                  {errorMsg}
                </p>
              )}

              {isLoading && <SkeletonLoader />}

              {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation} />
              )}
            </Drawer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
