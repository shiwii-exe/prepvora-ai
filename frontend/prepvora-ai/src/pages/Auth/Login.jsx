import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <h3 className="text-xl font-semibold text-white">Welcome Back</h3>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          inputClass="bg-slate-800 text-white border border-violet-500 placeholder-slate-400"
          labelClass="text-slate-300"
        />

        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 px-5 py-2.5 rounded-full transition-all shadow-md"
        >
          LOGIN
        </button>

        <p className="text-sm text-slate-400 mt-3 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="font-semibold text-violet-400 hover:text-violet-300 underline"
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
