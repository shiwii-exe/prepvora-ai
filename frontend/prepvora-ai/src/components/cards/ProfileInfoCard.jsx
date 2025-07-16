import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt="User"
          className="w-11 h-11 rounded-full border-2 border-violet-100 mr-3 object-cover shadow-sm"
        />
        <div>
          <div className="text-sm font-semibold text-white leading-tight">
            {user.name || " "}
          </div>
          <button
            className="text-violet-400 text-xs font-medium hover:underline transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
