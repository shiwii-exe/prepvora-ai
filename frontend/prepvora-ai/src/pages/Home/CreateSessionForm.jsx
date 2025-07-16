import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const { data: generatedQuestions } = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      if (!Array.isArray(generatedQuestions)) {
        throw new Error("Invalid response from AI service.");
      }

      const { data: sessionData } = await axiosInstance.post(
        API_PATHS.SESSIONS.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );

      const sessionId = sessionData?.session?._id;
      if (sessionId) {
        navigate(`/interview-prep/${sessionId}`);
      } else {
        throw new Error("Session creation failed.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[95vw] md:max-w-[34vw] p-5 sm:p-6 bg-slate-900 border border-slate-700 rounded-xl shadow-lg text-slate-200 overflow-y-auto max-h-[80vh]">
      <h3 className="text-lg font-semibold text-white">Start a New Interview Journey</h3>
      <p className="text-xs text-slate-400 mt-1 mb-4">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer"
          type="text"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g., 1 year, 3 years, 5+ years"
          type="number"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="e.g., React, Node.js, MongoDB"
          type="text"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description (Optional)"
          placeholder="Any specific goals or notes for this session"
          type="text"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        {error && <p className="text-red-500 text-xs -mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 px-5 py-2.5 rounded-full transition-all shadow-md disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          {isLoading ? "Creating..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
