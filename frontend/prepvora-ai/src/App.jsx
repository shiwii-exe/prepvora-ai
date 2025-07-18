import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider from './context/userContext';

const App = () => {
  return (
  <UserProvider>
     <div>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </Router>
      <Toaster 
      toastOptions={{
        classname:"",
        style: {
          fontsize: "13px",
        },
      }}
      
      />
    </div>
  </UserProvider>
   
  );
};

export default App;
