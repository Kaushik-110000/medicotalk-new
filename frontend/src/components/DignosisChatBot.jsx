import React, { useState } from "react";
import { motion } from "framer-motion";
import doctorService from "../Backend/doctor.config.js";
import errorTeller from "../Backend/errorTeller.js";
import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

function DiagnosisChatBot() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    "Diagnosis ChatBot: You may ask about the medical details of the patient.",
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setError("");
    setLoading(true);

    const newHistory = [...chatHistory, `You: ${input}`];

    try {
      const response = await doctorService.getDiagnosisStatement({ prompt: input });
      newHistory.push(`Diagnosis ChatBot: ${response.data.data.output}`);
    } catch (error) {
      newHistory.push(`Error: ${errorTeller(error)}`);
    }

    setChatHistory(newHistory);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-slate-800/50 border mt-6 border-cyan-400/30 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center"
      >
        <FiMessageSquare className="text-cyan-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-cyan-400">Medical Diagnosis Assistant</h1>
      </motion.div>

      {/* Chat Section */}
      <div className="flex-1 mt-6 overflow-y-auto p-4 bg-slate-800/50 border border-slate-700/50 backdrop-blur-md rounded-xl shadow-lg space-y-4">
        {chatHistory.map((msg, index) => {
          const isUser = msg.startsWith("You:");
          const messageContent = msg.replace(/^(You|Diagnosis ChatBot): /, "");

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                  isUser
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                <div className="flex items-center mb-1">
                  <span className="inline-block mr-2">{isUser ? <FiUser /> : <FiMessageSquare />}</span>
                  <span className="font-medium text-sm">{isUser ? "You" : "Medical Assistant"}</span>
                </div>
                <p className="whitespace-pre-wrap">{messageContent}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-6 bg-slate-800/50 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe symptoms or ask about your report..."
          className="flex-1 bg-transparent text-white px-4 py-3 border-b border-cyan-400/40 focus:border-cyan-400 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`ml-4 p-3 rounded-full transition-all ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <FiSend className="text-white text-xl" />
          )}
        </button>
      </motion.div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default DiagnosisChatBot;
