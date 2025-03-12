import React, { useState } from 'react';
import { motion } from 'framer-motion';
import doctorService from '../Backend/doctor.config.js';
import errorTeller from '../Backend/errorTeller.js';
import { useNavigate } from 'react-router-dom';

const diagnosisOptions = [
  {
    id: 'tumor',
    title: 'Tumor Detection',
    image: '/brain.jpg',
    desc: 'Analyze MRI/CT scans for brain tumor detection',
  },
  {
    id: 'pneumonia',
    title: 'Pneumonia Check',
    image: '/chest.jpg',
    desc: 'Chest X-ray analysis for pneumonia detection',
  },
  {
    id: 'covid',
    title: 'COVID-19 Test',
    image: '/covid.jpg',
    desc: 'CT scan analysis for COVID-19 diagnosis',
  },
  {
    id: 'blood',
    title: 'Blood Report',
    image: '/reports.jpg',
    desc: 'Complete blood count (CBC) analysis',
  },
  {
    id: 'prescription',
    title: 'Prescription',
    image: '/prescription.jpg',
    desc: 'Digital prescription analysis & recommendations',
  },
];

function Diagnosis() {
  const [file, setFile] = useState(null);
  const [diagnosisType, setDiagnosisType] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleDiagnosis = async () => {
    if (!file || !diagnosisType) {
      setError('Please select a file and diagnosis type.');
      return;
    }
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('report', file);

    try {
      let response;
      switch (diagnosisType) {
        case 'tumor':
          response = await doctorService.tumorCheck(formData);
          break;
        case 'pneumonia':
          response = await doctorService.pneumoniaCheck(formData);
          break;
        case 'covid':
          response = await doctorService.covidCheck(formData);
          break;
        case 'blood':
          response = await doctorService.bloodReportCheck(formData);
          break;
        case 'prescription':
          response = await doctorService.doctorPrescriptionCheck(formData);
          break;
        default:
          throw new Error('Invalid diagnosis type');
      }
      setResult(response.data.data.result);
    } catch (error) {
      setError(errorTeller(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 text-white px-6 py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center mb-12"
      >
        Medical Diagnosis Model
      </motion.h1>

      {/* Diagnosis Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {diagnosisOptions.map(option => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 120 }}
            onClick={() => setDiagnosisType(option.id)}
            className={`cursor-pointer group relative rounded-xl overflow-hidden shadow-lg border border-slate-700/50 backdrop-blur-md transition-all duration-300 ${
              diagnosisType === option.id
                ? 'ring-4 ring-cyan-400 scale-105'
                : 'hover:scale-105'
            }`}
          >
            <img
              src={option.image}
              alt={option.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <div className="text-white">
                <h3 className="font-bold text-lg">{option.title}</h3>
                <p className="text-sm opacity-90">{option.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Section */}
      {diagnosisType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center text-cyan-400 mb-6">
            Upload your{' '}
            {diagnosisOptions.find(o => o.id === diagnosisType).title}
          </h2>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-cyan-400 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-gray-400">
              {file ? file.name : 'Click to upload file'}
            </p>
          </label>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <motion.button
            onClick={handleDiagnosis}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold py-3 rounded-lg mt-6 transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Report'}
          </motion.button>
        </motion.div>
      )}

      {/* Result Display */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all text-2xl"
              onClick={() => setResult('')}
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-cyan-400 border-b border-cyan-400 pb-4 mb-6 text-center">
              Diagnosis Report
            </h2>

            {/* Result Content */}
            <div className="max-h-[65vh] overflow-y-auto p-2 space-y-4 text-gray-300">
              {result.split('\n\n').map((section, index) => {
                const isList = section.startsWith('* ');
                const isHeading = section.startsWith('**');

                return (
                  <div key={index} className="mb-4">
                    {isHeading ? (
                      <h3 className="text-xl font-semibold text-cyan-300 mb-3">
                        {section.replace(/\*\*/g, '')}
                      </h3>
                    ) : isList ? (
                      <ul className="list-disc pl-6 space-y-2 text-gray-400">
                        {section.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('* ', '').trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-relaxed">{section}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chatbot Button */}
            <div className="mt-6 flex justify-center">
              <motion.button
                onClick={() => navigate('/chatbot')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-2/3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold py-3 rounded-lg transition-all"
              >
                Ask from Chatbot
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Diagnosis;
