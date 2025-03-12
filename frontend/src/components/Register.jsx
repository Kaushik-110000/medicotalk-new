import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import authService from "../Backend/patient.config.js";
import errorTeller from "../Backend/errorTeller.js";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.RegisterPatient(formData).then((res) => {
        alert(`New Patient ID = ${res.data?.message?.patientID}`);
        navigate("/login");
      });
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
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
        />
        <div className="absolute inset-0 bg-blue-900/50 flex items-center p-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2 className="text-4xl font-bold mb-4">Begin Your Health Journey</h2>
            <p className="text-xl">AI-powered healthcare monitoring</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Registration Form */}
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
            <p className="text-gray-400">New Patient Registration</p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-slate-800/50 p-8 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                required
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                  required
                >
                  <option className="bg-slate-900" value="" disabled>Select</option>
                  <option className="bg-slate-900" value="Male">Male</option>
                  <option className="bg-slate-900" value="Female">Female</option>
                  <option className="bg-slate-900" value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Weight & Height */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-4">
              <label className="block text-gray-300 text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-3 px-4 text-white border-b-2 border-cyan-400/30 focus:border-cyan-400 bg-transparent focus:outline-none"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}

            {/* Register Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold py-3 px-4 rounded-lg transition-all duration-300 mt-6"
            >
              Register
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
