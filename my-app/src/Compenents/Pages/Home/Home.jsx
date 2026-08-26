import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "../../../hooks/media-query"

// Import des images (utiliser vos propres images dans l'implémentation réelle)
import carImage1 from "../../../Image/car1.jpg"
import carImage2 from "../../../Image/car2.jpg"
import carImage3 from "../../../Image/car3.jpg"
import carImage4 from "../../../Image/car4.jpg"

// Configuration des images vidéo
const videoImages = [
  { src: carImage1, alt: "Vue de face", caption: "Design aérodynamique" },
  { src: carImage2, alt: "Profil latéral", caption: "Silhouette dynamique" },
  { src: carImage3, alt: "Vue arrière", caption: "Présence puissante" },
  { src: carImage4, alt: "Intérieur", caption: "Confort luxueux" },
]

const HomeHeroSection = () => {
  // État pour le contrôle de la vidéo
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const videoContainerRef = useRef(null)

  // État pour les fonctionnalités innovantes
  const [showAR, setShowAR] = useState(false)
  const [showSpecs, setShowSpecs] = useState(false)
  const [volume, setVolume] = useState(80)

  // État pour l'animation de bordure
  const [borderHighlight, setBorderHighlight] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Media queries pour la responsivité
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  // Fonction pour passer à l'image suivante
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === videoImages.length - 1 ? 0 : prev + 1))
  }

  // Fonction pour passer à l'image précédente
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? videoImages.length - 1 : prev - 1))
  }

  // Contrôle de lecture/pause
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  // Gestion de la progression et de la lecture automatique
  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      const duration = 5000 // 5 secondes par image
      const updateFrequency = 50 // Mise à jour toutes les 50ms
      let elapsed = 0

      intervalRef.current = setInterval(() => {
        elapsed += updateFrequency
        setProgress((elapsed / duration) * 100)

        if (elapsed >= duration) {
          nextImage()
          elapsed = 0
          setProgress(0)
        }
      }, updateFrequency)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentImageIndex])

  // Animation de la bordure
  useEffect(() => {
    const borderAnimationInterval = setInterval(() => {
      setBorderHighlight((prev) => (prev + 1) % 400)
    }, 20)

    return () => clearInterval(borderAnimationInterval)
  }, [])

  // Toggle pour la visualisation AR
  const toggleAR = () => {
    setShowAR((prev) => !prev)
  }

  // Toggle pour les spécifications techniques
  const toggleSpecs = () => {
    setShowSpecs((prev) => !prev)
  }

  return (
    <section className="bg-gradient-to-r from-custom-blue via-accent to-primary dark:from-obsidian-dark dark:via-custom-blue dark:to-accent min-h-screen relative overflow-hidden animate-gradient-shift">
      <div className="absolute inset-0 bg-pattern opacity-5">
        <div className="absolute inset-0 bg-grid-pattern animate-pulse-slow"></div>
      </div>

      {/* Particules flottantes pour effet innovant */}
      <div className="particles-container absolute inset-0 pointer-events-none z-0">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-light bg-opacity-20"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Contenu gauche (Texte) */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 order-2 lg:order-1">
            <motion.div
              className="bg-white/95 dark:bg-obsidian-dark/95 p-5 md:p-7 lg:p-8 rounded-xl shadow-md backdrop-blur-md border border-gray-100 dark:border-gray-800 mt-4 md:mt-6 lg:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-6 leading-tight">
                Vivez la Légende
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-custom-gold to-primary/80">
                  avec Cardiamond
                </span>
              </h1>

              <div className="space-y-5 md:space-y-6">
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                  Découvrez l'expérience du prestige et de la performance. Cardiamond vous propose une flotte premium de véhicules d'exception, prêts à sublimer vos déplacements — pour affaires, loisirs ou moments inoubliables.
                </p>

                {/* Key Features Box */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 md:p-5 rounded-lg border-l-4 border-primary dark:border-custom-gold shadow-sm">
                  <h3 className="text-lg md:text-xl font-semibold text-primary dark:text-custom-gold mb-2 md:mb-3">
                    Le Luxe Réinventé
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    Des berlines élégantes aux SUV puissants, chaque location promet confort, style et performance de pointe — avec des formules flexibles adaptées à vos besoins.
                  </p>
                </div>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-2 md:gap-3 my-3 md:my-4">
                  <div className="bg-primary dark:bg-primary/90 text-white text-xs font-medium px-3 md:px-4 py-1.5 rounded-full flex items-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Flotte Premium
                  </div>
                  <div className="bg-custom-blue dark:bg-custom-blue/90 text-white text-xs font-medium px-3 md:px-4 py-1.5 rounded-full flex items-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Service VIP
                  </div>
                  <div className="bg-custom-gold dark:bg-custom-gold/90 text-gray-900 text-xs font-medium px-3 md:px-4 py-1.5 rounded-full flex items-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Locations personnalisées
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-wrap gap-3 md:gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                  >
                    Voir la flotte
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contenu droit - Présentation vidéo professionnelle avec bordure animée */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div
              className="video-border-container relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Bordure animée professionnelle */}
              <div className="absolute -inset-1 rounded-xl overflow-hidden">
                <div className="border-animation-gradient"></div>
              </div>

              {/* Coins décoratifs - masqués sur mobile */}
              <div className="absolute -top-2 -left-2 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-primary rounded-br-lg"></div>

              {/* Effet de lumière qui se déplace le long de la bordure */}
              <div
                className="absolute h-2 w-20 bg-gradient-to-r from-transparent via-custom-blue to-transparent blur-sm"
                style={{
                  top: "-1px",
                  left: `${borderHighlight}px`,
                  transform: borderHighlight > 200 ? "translateX(-100%)" : "translateX(0)",
                  opacity: isHovered ? 1 : 0.6,
                }}
              ></div>
              <div
                className="absolute h-20 w-2 bg-gradient-to-b from-transparent via-custom-blue to-transparent blur-sm"
                style={{
                  right: "-1px",
                  top: `${borderHighlight}px`,
                  transform: borderHighlight > 200 ? "translateY(-100%)" : "translateY(0)",
                  opacity: isHovered ? 1 : 0.6,
                }}
              ></div>
              <div
                className="absolute h-2 w-20 bg-gradient-to-r from-transparent via-custom-blue to-transparent blur-sm"
                style={{
                  bottom: "-1px",
                  right: `${borderHighlight}px`,
                  transform: borderHighlight > 200 ? "translateX(100%)" : "translateX(0)",
                  opacity: isHovered ? 1 : 0.6,
                }}
              ></div>
              <div
                className="absolute h-20 w-2 bg-gradient-to-b from-transparent via-custom-blue to-transparent blur-sm"
                style={{
                  left: "-1px",
                  bottom: `${borderHighlight}px`,
                  transform: borderHighlight > 200 ? "translateY(100%)" : "translateY(0)",
                  opacity: isHovered ? 1 : 0.6,
                }}
              ></div>

              <motion.div
                className="relative rounded-xl overflow-hidden shadow-2xl z-10 bg-obsidian-dark"
                ref={videoContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Conteneur vidéo avec aspect ratio 16:9 */}
                <div className="relative aspect-video bg-obsidian-dark">
                  {/* Images avec animation de transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={videoImages[currentImageIndex].src || "/placeholder.svg"}
                        alt={videoImages[currentImageIndex].alt}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay pour améliorer la lisibilité du texte */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark/60 via-obsidian-dark/20 to-transparent"></div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Indicateurs de style vidéo professionnelle */}
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-obsidian-dark/70 text-light px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm flex items-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-custom-blue mr-1 md:mr-2 animate-pulse"></div>
                    ENREG.
                  </div>

                  {/* Informations sur l'image actuelle */}
                  <div className="absolute bottom-12 md:bottom-16 left-3 md:left-6 text-light z-10">
                    <h3 className="text-xl md:text-2xl font-bold">{videoImages[currentImageIndex].alt}</h3>
                    <p className="text-base md:text-lg opacity-90">{videoImages[currentImageIndex].caption}</p>
                  </div>

                  {/* Bouton de lecture/pause au centre */}
                  <button
                    onClick={togglePlayPause}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light/30 hover:bg-custom-blue/50 rounded-full p-3 md:p-4 backdrop-blur-sm transition-all"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-8 md:w-8 text-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-8 md:w-8 text-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Contrôles vidéo */}
                  <div className="absolute bottom-0 left-0 right-0 bg-obsidian-dark/70 backdrop-blur-sm p-2 md:p-3 flex items-center">
                    {/* Barre de progression */}
                    <div className="relative w-full h-1 bg-metal rounded-full mx-1 md:mx-2">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-custom-blue rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex items-center ml-2 md:ml-4 space-x-2 md:space-x-4">
                      <button
                        onClick={prevImage}
                        className="text-light hover:text-custom-blue transition-colors"
                        aria-label="Image précédente"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:h-5 md:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={togglePlayPause}
                        className="text-light hover:text-custom-blue transition-colors"
                        aria-label={isPlaying ? "Pause" : "Lecture"}
                      >
                        {isPlaying ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 md:h-5 md:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 md:h-5 md:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={nextImage}
                        className="text-light hover:text-custom-blue transition-colors"
                        aria-label="Image suivante"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:h-5 md:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Indicateur d'image actuelle */}
                    <div className="ml-2 md:ml-4 text-light text-xs md:text-sm">
                      {currentImageIndex + 1}/{videoImages.length}
                    </div>
                  </div>

                  {/* Indicateurs de miniatures - masqués sur mobile */}
                  <div className="hidden sm:flex absolute bottom-12 md:bottom-16 right-3 md:right-6 flex-col space-y-1 md:space-y-2">
                    {videoImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-gradient-to-r from-primary to-accent scale-150"
                            : "bg-metal/50"
                        }`}
                        aria-label={`Voir image ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS pour les animations et effets */}
      <style jsx>{`
  /* Background pattern with updated opacity and color */
  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23F8FAFC' fillOpacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
  /* Video container with refined gradient */
  .video-border-container {
    padding: 3px;
    border-radius: 0.75rem;
    background: linear-gradient(90deg, 
      rgba(10, 47, 92, 0.15) 0%, 
      rgba(2, 94, 115, 0.15) 50%, 
      rgba(26, 44, 66, 0.15) 100%
    );
    box-shadow: 0 4px 12px rgba(10, 47, 92, 0.2);
    transition: all 0.4s ease;
  }
  
  .video-border-container:hover {
    background: linear-gradient(90deg, 
      rgba(10, 47, 92, 0.25) 0%, 
      rgba(2, 94, 115, 0.25) 50%, 
      rgba(26, 44, 66, 0.25) 100%
    );
    box-shadow: 0 8px 20px rgba(10, 47, 92, 0.3);
    transform: translateY(-2px);
  }
  
  /* Refined border animation */
  .border-animation-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(10, 47, 92, 0.6), 
      rgba(2, 94, 115, 0.6), 
      rgba(242, 167, 27, 0.6), 
      transparent
    );
    background-size: 400% 100%;
    animation: borderAnimation 12s linear infinite;
    filter: blur(10px);
    opacity: 0.4;
    border-radius: 0.75rem;
    z-index: -1;
  }
  
  @keyframes borderAnimation {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 400% 0%;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .border-animation-gradient {
      filter: blur(6px);
      opacity: 0.35;
    }
    
    .video-border-container {
      padding: 2px;
    }
  }
  
  @media (max-width: 640px) {
    .border-animation-gradient {
      filter: blur(4px);
      opacity: 0.3;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  }
`}</style>
    </section>
  )
}

export default HomeHeroSection
