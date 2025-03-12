import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6">
      {/* Patient ID Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-slate-800/50 border border-cyan-400/30 backdrop-blur-md shadow-lg px-8 py-4 rounded-xl text-center font-semibold tracking-wide mb-8"
      >
        Current Patient: <span className="text-cyan-400 text-lg">{userData.patientID}</span>
      </motion.div>

      {/* Logo & Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-12"
      >
        MedicoTalk Presents
      </motion.h1>

      {/* Feature Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Diagnosis Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-700/50 backdrop-blur-md text-center"
        >
          <img
            src="/checklist-9030329_1280.png"
            alt="Diagnosis"
            className="w-40 h-40 mb-4 mx-auto rounded-md"
          />
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Get Diagnosed</h2>
          <p className="text-gray-400 text-base mb-4">
            Upload your medical reports and get an AI-powered diagnosis.
          </p>
          <motion.button
            onClick={() => navigate("/dignosis")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold px-6 py-3 rounded-lg shadow-md transition-all text-lg"
          >
            Get Diagnosed
          </motion.button>
        </motion.div>

        {/* Chatbot Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-700/50 backdrop-blur-md text-center"
        >
          <img
            src="/fingers-5946228_1280.jpg"
            alt="Chatbot"
            className="w-40 h-40 mb-4 mx-auto rounded-md"
          />
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">AI Chatbot</h2>
          <p className="text-gray-400 text-base mb-4">
            Talk to our AI chatbot for instant medical assistance.
          </p>
          <motion.button
            onClick={() => navigate("/chatbot")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold px-6 py-3 rounded-lg shadow-md transition-all text-lg"
          >
            Chat with Bot
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
