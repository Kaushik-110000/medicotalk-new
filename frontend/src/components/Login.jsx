import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../Backend/patient.config.js';
import errorTeller from '../Backend/errorTeller.js';
import { login as storeLogin } from '../store/authSlice.js';

function Login() {
  const [patientNumber, setPatientNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const patientID = `PAT-${patientNumber}`;

    try {
      await authService.LoginPatient({ patientID, password }).then(res => {
        console.log(res.data.data);
        dispatch(storeLogin({ userData: res.data.data }));
      });
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      setError(errorTeller(error));
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Left Side - AI Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:block w-1/2 relative overflow-hidden"
      >
        <img
          src="/robonurse.jpg"
          alt="AI Medical Assistant"
          className="w-full h-full object-cover transform scale-110"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
        />
        <div className="absolute inset-0 bg-blue-900/50 flex items-center p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl">AI-powered healthcare at your fingertips</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-900">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold text-cyan-400 mb-2"
            >
              MedicoChat
            </motion.h1>
            <p className="text-gray-400">Secure Patient Login</p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-slate-800/50 p-8 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Patient ID Input */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Patient ID
              </label>
              <input
                type="text"
                value={patientNumber}
                onChange={e => setPatientNumber(e.target.value)}
                placeholder="Enter your patient ID"
                className="w-full py-3 px-2 text-white border-b-2 border-cyan-400/30 bg-transparent focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold py-3 px-4 rounded-lg transition-all duration-300"
            >
              Diagnose
            </motion.button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Patient not registered?{' '}
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
