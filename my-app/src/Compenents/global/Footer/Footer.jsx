import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import walkapper from '../../../Image/walkaper.jpg'
import Logo from '../../../../resources/js/components/ui/ApplicationLogo.jsx'

const ProfessionalFooter = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [email, setEmail] = useState('')

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Merci de vous être abonné(e) avec : ${email}`)
      setEmail('')
    }
  }

  return (
    <footer
      className="relative bg-white dark:bg-obsidian text-foreground text-text dark:text-light py-32 overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: undefined, // Laisse Tailwind gérer le fond selon le mode
      }}
      ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* About Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}>
            <Logo className="w-40 h-auto mb-6 drop-shadow-lg" loading="lazy" />
            <p className="text-text-muted dark:text-light/80 mb-6 font-sans text-lg max-w-xs">
              Découvrez la liberté de la route avec notre flotte de prestige.
              Service d'exception, qualité garantie
            </p>
            <div className="flex gap-6">
              {[
                { href: "https://facebook.com", icon: Facebook },
                { href: "https://twitter.com", icon: Twitter },
                { href: "https://instagram.com", icon: Instagram },
                { href: "https://linkedin.com", icon: Linkedin },
              ].map(({ href, icon: Icon }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent dark:text-accent hover:text-accent-dark dark:hover:text-accent-dark transition-colors duration-300"
                  whileHover={{ scale: 1.3, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}>
            <h3 className="text-3xl font-display font-semibold text-primary dark:text-light mb-6 animate-float">
              Navigation
            </h3>
            <ul className="space-y-4 font-sans text-lg">
              {[
                { label: "À propos", href: "#about" },
                { label: "Nos véhicules", href: "#our-vehicles" },
                { label: "Tarifs", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-text-muted dark:text-light/80 hover:text-accent dark:hover:text-accent transition-colors duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}>
            <h3 className="text-3xl font-display font-semibold text-primary dark:text-light mb-6 animate-float">
              Contact
            </h3>
            <ul className="space-y-4 text-text-muted dark:text-light/80 font-sans text-lg">
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-accent" />
                <a
                  href="mailto:contact@diamond-car.ma"
                  className="hover:text-accent-dark dark:hover:text-accent-dark transition-colors duration-300">
                  contact@diamond-car.ma
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-accent" />
                <a
                  href="tel:+212522234567"
                  className="hover:text-accent-dark dark:hover:text-accent-dark transition-colors duration-300">
                  +212 5 22 23 45 67
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-accent" />
                <span>123 Boulevard Hassan II, Casablanca, Maroc</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}>
            <h3 className="text-3xl font-display font-semibold text-primary dark:text-light mb-6 animate-float">
              Restez Informé
            </h3>
            <p className="text-text-muted dark:text-light/80 mb-6 font-sans text-lg max-w-xs">
              Abonnez-vous pour recevoir nos offres exclusives et nouveautés !
            </p>
            <form
              onSubmit={handleSubscribe}
              className="space-y-4 bg-card-glass dark:bg-card-glass p-6 rounded-xl shadow-tilt backdrop-blur-glass">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card dark:bg-obsidian/80 text-primary dark:text-light border border-primary/30 dark:border-accent/30 rounded-xl focus:ring-accent"
              />
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground font-semibold rounded-xl shadow-tilt hover:bg-accent-dark hover:neon-glow hover:gradient-border transition-all duration-300 animate-pulse-scale">
                S'abonner
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="border-t border-primary/20 dark:border-accent/20 my-12" />

        {/* Footer Bottom */}
        <div className="text-center text-text-muted dark:text-light/80 font-sans text-base">
          <p>
            © {new Date().getFullYear()} Diamond Car. Tous droits
            réservés.{" "}
            <a
              href="#privacy"
              className="hover:text-accent dark:hover:text-accent-dark transition-colors duration-300">
              Politique de confidentialité
            </a>{" "}
            |{" "}
            <a
              href="#terms"
              className="hover:text-accent dark:hover:text-accent-dark transition-colors duration-300">
              Conditions d'utilisation
            </a>
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <motion.div
        className="absolute top-10 left-10 w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-primary/10 dark:from-accent/30 dark:to-primary/20 backdrop-blur-glass"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 dark:from-primary/30 dark:to-accent/20 backdrop-blur-glass"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 dark:from-accent/20 dark:to-primary/10 backdrop-blur-glass"
        animate={{ x: [0, 15, 0], y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Custom Styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse-scale,
          .hover\:neon-glow,
          .hover\:gradient-border {
            animation: none !important;
            transform: none !important;
            box-shadow: none !important;
            border-image: none !important;
          }
        }
        @media (max-width: 768px) {
          .text-3xl {
            font-size: 1.75rem;
          }
          .text-lg {
            font-size: 1rem;
          }
          .px-6 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}

export default ProfessionalFooter