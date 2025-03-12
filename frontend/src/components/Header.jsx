/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../Backend/patient.config';
import {
  login as storeLogin,
  logOut as storeLogout,
} from '../store/authSlice.js';

function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    authService.LogoutPatient().then(() => {
      dispatch(storeLogout());
      navigate('/');
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50  border-white/10 px-6 md:px-16 py-4 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? 'backdrop-blur-lg shadow-lg bg-white/10 translate-y-2 rounded-2xl scale-95' : ''
      }`}
    >
      {/* Logo & Branding */}
      <Link to="/home" className="flex items-center gap-3">
        <motion.img
          src="/logo2.svg"
          alt="Logo"
          className="h-12 drop-shadow-lg"
          whileHover={{ scale: 1.1 }}
        />
        <motion.span
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          MedicoTalk
        </motion.span>
      </Link>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-6">
        {authStatus ? (
          <motion.button
            onClick={handleLogout}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-white bg-transparent border border-white/30 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all"
          >
            Logout
          </motion.button>
        ) : (
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-cyan-400 bg-cyan-500/20 border border-cyan-400/40 rounded-xl backdrop-blur-md hover:bg-cyan-500/30 transition-all"
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-emerald-400 bg-emerald-500/20 border border-emerald-400/40 rounded-xl backdrop-blur-md hover:bg-emerald-500/30 transition-all"
              onClick={() => navigate('/register')}
            >
              Register
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;