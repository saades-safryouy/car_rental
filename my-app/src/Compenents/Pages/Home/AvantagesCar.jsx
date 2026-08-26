import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import image1 from '../../../Image/logo/car1.jpg'
import image2 from '../../../Image/logo/car2.jpg'
import image3 from '../../../Image/logo/car3.jpg'
import image4 from '../../../Image/logo/car4.jpg'
import image5 from '../../../Image/logo/car5.png'
import image6 from '../../../Image/logo/car6.png'

export default function LogoCarousel() {
  const scrollerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const { ref: containerRef, inView } = useInView({ threshold: 0.1 })

  const logos = [
    { url: image1, alt: "Logo partenaire 1" },
    { url: image2, alt: "Logo partenaire 2" },
    { url: image3, alt: "Logo partenaire 3" },
    { url: image4, alt: "Logo partenaire 4" },
    { url: image5, alt: "Logo partenaire 5" },
    { url: image6, alt: "Logo partenaire 6" },
  ]

  // Calcul de la durée d'animation basée sur le contenu
  const getScrollDuration = () => {
    if (!scrollerRef.current) return 25
    return Math.max(scrollerRef.current.scrollWidth / 50, 25)
  }

  const handleMouseMove = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const xPercent = (x / rect.width - 0.5) * 25;
    const yPercent = (y / rect.height - 0.5) * 25;
    
    element.style.transform = `
      perspective(1000px)
      rotateX(${-yPercent}deg)
      rotateY(${xPercent}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = (element) => {
    element.style.transform = `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <div className="py-12 bg-background/95 dark:bg-obsidian rounded-xl shadow-sm">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-bold text-primary dark:text-light">
            Nos <span className="text-accent">Partenaires</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Découvrez les entreprises qui nous font confiance
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
         
          {/* Carousel content */}
          <div
            ref={scrollerRef}
            className="flex gap-8 py-4"
            style={{
              animation: `scroll ${getScrollDuration()}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-48 h-24 bg-white dark:bg-obsidian-light/20 rounded-lg p-4 
                           flex items-center justify-center transform-gpu transition-all duration-300 ease-out
                           hover:shadow-xl dark:hover:shadow-accent/20"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="max-h-16 object-contain filter dark:brightness-110 transition-transform duration-300"
                  style={{
                    transform: 'translateZ(20px)'
                  }}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }

        .transform-gpu {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .transform-gpu {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}