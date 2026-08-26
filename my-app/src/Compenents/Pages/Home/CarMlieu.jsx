import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Car, Calendar, CreditCard, MapPin, Shield, Clock } from 'lucide-react';
import image from '../../../Image/logo/cc.png'; // Replace with your actual luxury car image path

const CarRentalServices = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const services = [
    {
      title: 'Flotte Variée',
      description: 'Une sélection de véhicules allant des compactes aux SUV de luxe pour tous les besoins.',
      icon: <Car className="w-6 h-6" />,
    },
    {
      title: 'Réservations Flexibles',
      description: 'Modifiez ou annulez vos réservations facilement, sans complications.',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'Tarifs Transparents',
      description: 'Des prix clairs et sans frais cachés pour une expérience sans surprises.',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: 'Plusieurs Agences',
      description: 'Récupérez votre véhicule dans nos agences en ville ou à l’aéroport.',
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: 'Assurance Complète',
      description: 'Options d’assurance robustes pour une conduite en toute sérénité.',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Support 24/7',
      description: 'Une assistance disponible à tout moment pour répondre à vos questions.',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const leftServices = services.slice(0, 3);
  const rightServices = services.slice(3, 6);

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 },
    },
  };

  const buttonAnimation = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Nos <span className="text-amber-600">Services</span> Premium
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-900 to-amber-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
            Découvrez une expérience de location de voitures alliant luxe, fiabilité et simplicité.
          </p>
        </motion.div>

        {/* Services Grid with Central Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Services */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerAnimation}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {leftServices.map((service, index) => (
              <motion.div
                key={`left-${index}`}
                variants={itemAnimation}
                className="relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-indigo-900/30 dark:group-hover:border-amber-600/30"></div>
                <div className="relative flex items-start space-x-3">
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-900/10 dark:bg-amber-600/20 flex items-center justify-center text-indigo-900 dark:text-amber-600"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{service.description}</p>
                  </div>
                </div>
                <motion.a
                  href="#"
                  className="mt-3 inline-flex items-center text-indigo-900 dark:text-amber-600 hover:text-indigo-700 dark:hover:text-amber-500 text-sm font-medium"
                  variants={buttonAnimation}
                  whileHover="hover"
                  whileTap="tap"
                >
                  En savoir plus
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* Central Image */}
          <motion.div
            className="flex items-center justify-center"
            variants={imageAnimation}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="relative w-64 lg:w-80">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-amber-600/20 rounded-xl blur-md"></div>
              <motion.div
                className="relative rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt="Voiture de luxe"
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-indigo-900/50 dark:group-hover:border-amber-600/50 transition-colors duration-300"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Services */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerAnimation}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {rightServices.map((service, index) => (
              <motion.div
                key={`right-${index}`}
                variants={itemAnimation}
                className="relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-indigo-900/30 dark:group-hover:border-amber-600/30"></div>
                <div className="relative flex items-start space-x-3">
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-900/10 dark:bg-amber-600/20 flex items-center justify-center text-indigo-900 dark:text-amber-600"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{service.description}</p>
                  </div>
                </div>
                <motion.a
                  href="#"
                  className="mt-3 inline-flex items-center text-indigo-900 dark:text-amber-600 hover:text-indigo-700 dark:hover:text-amber-500 text-sm font-medium"
                  variants={buttonAnimation}
                  whileHover="hover"
                  whileTap="tap"
                >
                  En savoir plus
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-10 bg-gradient-to-r from-indigo-900 to-amber-600 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">Prêt à louer votre voiture de rêve ?</h3>
          <p className="text-white/90 text-sm mb-4">
            Réservez dès maintenant pour une expérience de conduite inégalée.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center bg-white text-indigo-900 font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md"
            variants={buttonAnimation}
            whileHover="hover"
            whileTap="tap"
          >
            Réserver Maintenant
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CarRentalServices;