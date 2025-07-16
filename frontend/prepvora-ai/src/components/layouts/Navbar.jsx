import React from 'react';
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 px-4 md:px-0">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-bold text-violet-400 hover:text-violet-300 transition">
            Prepvora <span className="text-white">AI</span>
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
