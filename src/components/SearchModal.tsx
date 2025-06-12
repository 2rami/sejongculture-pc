import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchModal.css';
import logoSvg from '../로고.svg';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="search-modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="search-modal" 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
          >

            {/* Search Content */}
            <motion.div 
              className="search-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.5,
                type: "spring",
                damping: 20
              }}
            >
              <div className="search-input-container">
                <motion.input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0,0,0,0.1)"
                  }}
                />
                <motion.div 
                  className="search-icon-large"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 1.0, 
                    duration: 0.5,
                    type: "spring",
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 10,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 57 54" fill="none">
                    <circle cx="22.551" cy="22.551" r="19.4898" stroke="black" strokeWidth="6.12245"/>
                    <line x1="38.5934" x2="54.2057" y1="35.9987" y2="51.6109" stroke="black" strokeWidth="6.12245"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Close button */}
            <motion.button 
              className="search-close-btn" 
              onClick={onClose}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                backgroundColor: "rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}