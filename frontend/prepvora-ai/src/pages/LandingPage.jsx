import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/hero-img1.jpg";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { APP_FEATURES } from "../Utils/data";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-slate-900 text-white relative overflow-hidden">
        {/* Glowing blob */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-500/30 blur-[100px] rounded-full z-0 animate-blob1" />

        <div className="relative z-10 container mx-auto px-5 py-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <h1 className="text-3xl font-extrabold text-violet-400 tracking-tight">
              Prepvora<span className="text-white"> AI</span>
            </h1>

            {user ? (
              <ProfileInfoCard />
            ) : (
               <button
                onClick={() => setOpenAuthModal(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col items-center gap-10">
            <div className="text-center max-w-3xl">
              {/* AI Powered Badge */}
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-1.5 rounded-full border border-violet-500 bg-gradient-to-r from-[#2d0c47] to-[#1b1236] shadow-md animate-pulse mb-4">
                <LuSparkles className="text-violet-300 animate-bounce" />
                AI Powered Interview Prep
              </div>

              <h2 className="text-5xl font-bold leading-tight mb-4">
                Crack Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400 animate-text-shine">
                  Confidence & Precision
                </span>
              </h2>

              <p className="text-lg text-slate-300 mt-2">
                Role-specific questions. Smart answer suggestions.
                It’s prep that thinks with you.
              </p>

              <button
                className="mt-6 px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white text-sm font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-6xl mt-12">
  <img
    src={HERO_IMG}
    alt="Interview AI Hero"
    className="w-full rounded-3xl shadow-[0_0_70px_rgba(124,58,237,0.25)] border border-slate-700 scale-[1.03] transition-transform duration-300"
  />
</div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-3xl font-bold text-white mb-16">
            Features That Set You Apart
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-slate-700 hover:border-violet-500 shadow-md hover:shadow-violet-700/30 transition-transform hover:-translate-y-1"
              >
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-slate-700 hover:border-indigo-500 shadow-md hover:shadow-indigo-500/30 transition-transform hover:-translate-y-1"
              >
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-center py-6 text-slate-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-violet-300 font-semibold">Prepvora AI</span> ·
        Built to help you succeed. 🌟
      </footer>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
