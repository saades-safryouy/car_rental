import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Added for Sign Up/Log In buttons
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause } from 'lucide-react';
import video from '../../../Image/logo/videp1.mp4'; // Ensure correct video path

const VideoComponent = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Video looping and error handling
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', () => {
        videoElement.play().catch((error) => {
          console.error('Erreur lors de la relecture de la vidéo:', error);
        });
      });
      videoElement.addEventListener('error', () => {
        videoElement.load();
        videoElement.play().catch((error) => {
          console.error('Erreur lors de la récupération de la vidéo:', error);
        });
      });
    }
  }, []);

  // Play/pause toggle
  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play().catch((error) => {
        console.error('Erreur lors de la lecture de la vidéo:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Typewriter effect for heading
  const headingText = 'Vivez l’expérience de conduite ultime';
  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: 'auto',
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  // Animation variants
  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const videoAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const buttonAnimation = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="relative w-screen h-screen bg-light dark:bg-obsidian overflow-hidden"
      ref={ref}
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        variants={videoAnimation}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={video}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-primary/50 dark:bg-obsidian/60" />
        {/* Parallax Geometric Lines */}
        <div className="absolute inset-0 opacity-15 dark:opacity-20 bg-pattern-grid">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <g stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1">
              <motion.line
                x1="0"
                y1="10%"
                x2="100%"
                y2="90%"
                animate={{ x2: ['100%', '110%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.line
                x1="0"
                y1="90%"
                x2="100%"
                y2="10%"
                animate={{ x1: ['0%', '-10%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Typewriter Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-4 overflow-hidden whitespace-nowrap"
            variants={typewriterVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {headingText}
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-text-light dark:text-text-light opacity-90 max-w-3xl mx-auto mb-8"
            variants={textAnimation}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Découvrez notre flotte exclusive de voitures de luxe et réservez une expérience inoubliable.
          </motion.p>
          {/* Action Buttons */}
         
        </div>
      </div>

      {/* Play/Pause Toggle */}
      <motion.button
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-light/20 dark:bg-obsidian/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-light/30 dark:hover:bg-obsidian/30 transition-colors"
        onClick={togglePlayPause}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>

      {/* Special Effects Styles */}
      <style jsx>{`
        .car-title-effect {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        @media (prefers-color-scheme: dark) {
          .car-title-effect {
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            background: linear-gradient(90deg, #ffffff, #F59E0B, #ffffff);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: carTitleShine 6s linear infinite;
          }
        }
        @keyframes carTitleShine {
          to {
            background-position: 200% center;
          }
        }
        .bg-pattern-grid {
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @media (prefers-color-scheme: dark) {
          .bg-pattern-grid {
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          }
        }
      `}</style>
    </section>
  );
};

export default VideoComponent;