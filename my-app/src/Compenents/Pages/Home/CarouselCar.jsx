import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import image1 from '../../../Image/mercedes.jpeg'
import image2 from '../../../Image/bmw.jpeg'
import image3 from '../../../Image/audi.jpeg'
import image4 from '../../../Image/ceat.jpeg'

const carSlides = [
  {
    id: 1,
    image: image1,
    carModel: "Mercedes EQS",
    description: "Expérience électrique de luxe, autonomie de 650 km",
    category: "ÉLECTRIQUE",
    price: "129€/jour",
  },
  {
    id: 2,
    image: image2,
    carModel: "BMW X5",
    description: "Élégance et performance pour tous vos trajets",
    category: "SUV PREMIUM",
    price: "165€/jour",
  },
  {
    id: 3,
    image: image3,
    carModel: "Audi A8",
    description: "Le summum du confort et de la technologie allemande",
    category: "BERLINE LUXE",
    price: "190€/jour",
  },
  {
    id: 4,
    image: image4,
    carModel: "Volkswagen Golf R",
    description: "Sensation de conduite sportive incomparable",
    category: "SPORT",
    price: "220€/jour",
  },
]

export default function CarRentalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef(null)
  const autoplayRef = useRef(null)
  const progressRef = useRef(null)

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carSlides.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Autoplay management
  useEffect(() => {
    if (isAutoplay && !isHovering) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000) // Reduced to 5s for smoother flow
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isAutoplay, currentSlide, isHovering])

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = "0%"
      if (isAutoplay && !isHovering) {
        const animation = progressRef.current.animate(
          [{ width: "0%" }, { width: "100%" }],
          { duration: 5000, fill: "forwards", easing: "linear" }
        )
        return () => animation.cancel()
      }
    }
  }, [currentSlide, isAutoplay, isHovering])

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeIn" },
      },
    }),
  }

  const [[page, direction], setPage] = useState([0, 0])
  const updateSlide = (newDirection) => {
    if (newDirection > 0) {
      setPage([page + 1, newDirection])
      nextSlide()
    } else {
      setPage([page - 1, newDirection])
      prevSlide()
    }
  }

  return (
    <div
      ref={carouselRef}
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] max-h-[800px] w-full overflow-hidden bg-gradient-aurora dark:bg-obsidian transition-colors duration-700 rounded-xl shadow-glass"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Car Slides Container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={carSlides[currentSlide].image}
              alt={carSlides[currentSlide].carModel}
              className="w-full h-full object-cover object-center opacity-70 dark:opacity-85"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent dark:from-obsidian dark:via-transparent dark:to-transparent opacity-90 backdrop-blur-subtle"></div>
          </div>

          {/* Geometric Pattern */}
          <div className="absolute inset-0 bg-pattern-grid opacity-10 dark:opacity-15"></div>

          {/* Car Information */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="container mx-auto max-w-7xl"
            >
              {/* Category and Price Badges */}
              <div className="flex gap-4 mb-6">
                <motion.span
                  className="px-5 py-2 bg-primary text-primary-foreground font-bold text-sm rounded-md shadow-button hover:neon-glow hover:sparkle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {carSlides[currentSlide].category}
                </motion.span>
                <motion.span
                  className="px-5 py-2 bg-accent text-accent-foreground font-bold text-sm rounded-md shadow-button hover:neon-glow hover:sparkle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {carSlides[currentSlide].price}
                </motion.span>
              </div>

              {/* Car Model Name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 text-primary dark:text-light bg-gradient-text bg-clip-text text-transparent animate-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {carSlides[currentSlide].carModel}
              </motion.h1>

              {/* Car Description */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-light/80 mb-10 max-w-4xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {carSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
          
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl">
        {/* Indicators */}
        <div className="flex items-center gap-3">
          {carSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-400 ${
                index === currentSlide
                  ? "bg-accent w-10 h-4"
                  : "bg-muted dark:bg-muted-dark bg-opacity-50 dark:bg-opacity-50 hover:bg-opacity-75 dark:hover:bg-opacity-75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Aller au modèle ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows and Autoplay Toggle */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => updateSlide(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-card-glass dark:bg-card-glass backdrop-blur-glass text-primary dark:text-light border border-primary dark:border-light shadow-tilt hover:neon-glow"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Modèle précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => updateSlide(1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-card-glass dark:bg-card-glass backdrop-blur-glass text-primary dark:text-light border border-primary dark:border-light shadow-tilt hover:neon-glow"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Modèle suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              isAutoplay ? "bg-accent text-accent-foreground" : "bg-muted dark:bg-muted-dark"
            } shadow-tilt hover:neon-glow`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAutoplay ? "Désactiver le défilement automatique" : "Activer le défilement automatique"}
          >
            {isAutoplay ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted dark:bg-muted-dark">
        <div ref={progressRef} className="h-full bg-gradient-aurora"></div>
      </div>

      {/* Special Effects Styles */}
      <style jsx>{`
        .bg-pattern-grid {
          background-image: radial-gradient(circle, rgba(10, 47, 92, 0.15) 1px, transparent 1px);
          background-size: 25px 25px;
        }
        @media (prefers-color-scheme: dark) {
          .bg-pattern-grid {
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .hover\:neon-glow, .hover\:gradient-border, .hover\:sparkle {
            animation: none !important;
            transform: none !important;
            box-shadow: none !important;
            border-image: none !important;
          }
          .bg-gradient-text {
            background: none !important;
            color: #2D3748 !important;
            -webkit-background-clip: none !important;
            background-clip: none !important;
          }
        }
        @media (max-width: 640px) {
          .text-4xl { font-size: 2rem; }
          .text-xl { font-size: 1rem; }
          .px-6 { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>
    </div>
  )
}