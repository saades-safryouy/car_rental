
import { motion } from "framer-motion"
import { useState } from "react"

const offerItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    title: "Location de Voitures Exotiques",
    description:
      "Vivez l'excitation de conduire une supercar avec notre flotte exclusive de véhicules exotiques, de Lamborghini à Ferrari.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Expériences en Voitures Vintage",
    description:
      "Remontez le temps avec notre collection de voitures classiques restaurées, idéales pour des occasions spéciales ou des balades nostalgiques.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
        />
      </svg>
    ),
    title: "Service Conciergerie de Luxe",
    description:
      "Profitez d'une expérience de location fluide avec livraison personnalisée, récupération et itinéraires sur mesure.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: "Forfaits de Location Flexibles",
    description:
      "Optez pour des plans de location journaliers, hebdomadaires ou personnalisés, adaptés à votre emploi du temps et vos envies.",
  },
];

const WhatWeOfferSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeCard, setActiveCard] = useState(null)

  // Animation variants for card content
  const cardContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  // Function to handle card click
  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
  Ce que nous <span className="text-blue-600 dark:text-yellow-400">proposons</span>
</h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mb-6 animate-pulse-border"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
  Découvrez notre large gamme de services de location de voitures, conçus pour améliorer votre expérience de conduite et vous garantir des véhicules toujours au meilleur de leurs performances.
</p>

          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerItems.map((item, index) => (
            <motion.div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card transition-all duration-500 relative cursor-pointer
                ${hoveredCard === index ? "z-10 scale-105 shadow-xl" : "z-0"} 
                ${activeCard === index ? "ring-2 ring-yellow-400 ring-opacity-70" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(index)}
              whileHover={{ translateY: -8 }}
            >
              {/* Animated Gradient Background in Dark Mode */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-blue-600 to-gray-900 opacity-0 dark:opacity-20 rounded-xl animate-card-gradient"
                style={{
                  animation: hoveredCard === index ? "cardGradient 6s ease-in-out infinite" : "none",
                }}
              ></div>

              {/* Professional Border Animation */}
              <div
                className="absolute inset-0 border rounded-xl opacity-0 transition-opacity duration-300"
                style={{
                  opacity: hoveredCard === index ? 1 : 0,
                  borderColor: "rgba(252, 211, 77, 0.3)", // accent in rgba
                  animation: hoveredCard === index ? "pulseBorder 2s ease-in-out infinite" : "none",
                }}
              ></div>

              {/* Focus Border Animation */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: hoveredCard === index ? "0 0 0 4px rgba(252, 211, 77, 0.2)" : "none",
                  animation: hoveredCard === index ? "focusBorder 2s ease-in-out infinite" : "none",
                }}
              ></div>

              <div className="p-6 relative z-10">
                {/* Card Header with Icon */}
                <div className="mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-blue-600/10 dark:bg-yellow-400/20 flex items-center justify-center text-blue-600 dark:text-yellow-400 mb-4 border border-transparent"
                    animate={{
                      borderColor: hoveredCard === index ? "rgba(252, 211, 77, 0.6)" : "transparent",
                      scale: hoveredCard === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        rotate: hoveredCard === index ? 360 : 0,
                        scale: hoveredCard === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                </div>

                {/* Card Content */}
                <motion.p
                  className="text-gray-600 dark:text-gray-400"
                  variants={cardContentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {item.description}
                </motion.p>

                {/* Card Footer */}
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 dark:text-yellow-400 hover:text-yellow-400 dark:hover:text-blue-600 font-medium group"
                  >
                    <span className="relative">
                      Learn more
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-yellow-400 transition-all duration-300"
                        style={{
                          width: hoveredCard === index ? "100%" : "0%",
                          transformOrigin: "left",
                        }}
                      ></span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 transition-transform duration-300"
                      style={{
                        transform: hoveredCard === index ? "translateX(4px)" : "translateX(0)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Decorative Bottom Border with Animation */}
              <motion.div
                className="h-1 bg-gradient-to-r from-yellow-400 to-blue-600"
                initial={{ width: "30%" }}
                animate={{ width: hoveredCard === index ? "100%" : "30%" }}
                transition={{ duration: 0.4 }}
                style={{
                  animation: hoveredCard === index ? "gradientBorder 3s ease infinite" : "none",
                }}
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Highlight with Enhanced Animations */}
        <motion.div
          className="mt-16 rounded-xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-600 animate-gradient-border"></div>

          {/* Moving light effect */}
          <motion.div
  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/25 to-transparent"
  initial={{ x: "-100%" }}
  animate={{ x: "100%" }}
  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
></motion.div>


          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-xl border border-yellow-400/30 animate-pulse-border"></div>

          <div className="p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2 text-black dark:text-clip">Ready to elevate your driving experience?</h3>
                <p className="text-white/80">Schedule a consultation with our automotive experts today.</p>
              </div>
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-blue-600 hover:from-blue-600 hover:to-yellow-400 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-button relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started</span>
                {/* Animated hover effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-white to-yellow-400/10 transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        /* Animated gradient for card background in dark mode */
        .animate-card-gradient {
          background-size: 200% 100%;
          animation: cardGradient 6s ease-in-out infinite;
        }

        @keyframes cardGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Pulse border animation */
        @keyframes pulseBorder {
          0% {
            border-color: rgba(252, 211, 77, 0.3);
          }
          50% {
            border-color: rgba(252, 211, 77, 0.6);
          }
          100% {
            border-color: rgba(252, 211, 77, 0.3);
          }
        }

        /* Focus border animation */
        @keyframes focusBorder {
          0% {
            box-shadow: 0 0 0 4px rgba(252, 211, 77, 0.2);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(252, 211, 77, 0.3);
          }
          100% {
            box-shadow: 0 0 0 4px rgba(252, 211, 77, 0.2);
          }
        }

        /* Gradient border animation */
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}

export default WhatWeOfferSection