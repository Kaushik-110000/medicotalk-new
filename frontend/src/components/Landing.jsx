import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlassButton = ({ children, onClick, className }) => (
  <motion.button
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-6 rounded-2xl bg-glass border border-white/10 backdrop-blur-lg shadow-2xl ${className}`}
  >
    {children}
  </motion.button>
);

function Landing() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute top-96 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 w-full">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              MedicoChat<br/> 
              <span className="text-white">Welcomes You</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-300 max-w-2xl"
            >
              Revolutionizing healthcare through AI-powered diagnosis and patient care solutions.
            </motion.p>

            <div className="flex gap-6 mt-12">
              <GlassButton 
                onClick={() => navigate('/register')}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
              >
                Register Yourself
              </GlassButton>
              <GlassButton 
                onClick={() => navigate('/login')}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
              >
                Diagnose Yourself
              </GlassButton>
            </div>
          </div>

          {/* Right 3D Card */}
          <motion.div 
            initial={{ rotate: 15, scale: 0.8 }}
            animate={{ rotate: -5, scale: 1 }}
            transition={{ type: 'spring', stiffness: 40 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50">
              <img 
                src="/robot.jpg" 
                alt="AI Revolution" 
                className="rounded-2xl transform perspective-1000 hover:rotate-x-6 hover:rotate-y-6 transition-all duration-500"
              />
              <div className="absolute -bottom-8 right-8 bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="h-3 w-3 bg-cyan-400 rounded-full pulse" />
                  <span className="font-mono text-cyan-400">New Revolution in AI Phase</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 px-6 md:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-20 text-center"
          >
            Our <span className="text-cyan-400">Specialities</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Smart Report Analysis', 
                text: 'Our advanced ML models analyze medical reports with 98% accuracy, providing instant insights and potential diagnoses.',
                color: 'cyan'
              },
              { 
                title: 'Prescription Verification', 
                text: 'Automated analysis of doctor prescriptions to ensure accuracy and compatibility with patient history.',
                color: 'emerald'
              },
              { 
                title: 'AI Symptom Checker', 
                text: '24/7 available chatbot that helps diagnose conditions based on symptoms, providing preliminary advice and recommendations.',
                color: 'purple'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-${feature.color}-400/30 transition-all group`}
              >
                <div className={`h-1 w-12 bg-${feature.color}-400 mb-6 rounded-full`} />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400">{feature.text}</p>
                <div className={`h-px mt-8 bg-gradient-to-r from-${feature.color}-400/20 to-transparent`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Sections */}
      <section className="py-40 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-40">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="relative h-96 bg-slate-800 rounded-3xl p-8">
              <img 
                src="/reports.jpg" 
                alt="Report Analysis" 
                className="rounded-2xl h-full w-full object-cover transform hover:scale-105 transition-all"
              />
            </div>
            <div className="text-cyan-400 space-y-6">
              <h3 className="text-4xl font-bold text-white">Advanced Analytics</h3>
              <p className="text-xl text-slate-300">
                Combining medical expertise with cutting-edge technology for comprehensive patient insights.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="text-emerald-400 space-y-6 order-last">
              <h3 className="text-4xl font-bold text-white">Real-time Monitoring</h3>
              <p className="text-xl text-slate-300">
                Continuous evaluation of patient data for proactive healthcare solutions.
              </p>
            </div>
            <div className="relative h-96 bg-slate-800 rounded-3xl p-8">
              <img 
                src="/chatbot.jpg" 
                alt="AI Chatbot" 
                className="rounded-2xl h-full w-full object-cover transform hover:scale-105 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;