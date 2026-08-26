import { useEffect, useRef, useState } from "react";
import { CheckCircle, Briefcase, Users, Coffee, Award, Shield, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Car, Star, Sun, Moon } from "lucide-react";
import Chouaib from '../../../Image/equipe/chouaib.jpg'
import Othmane from '../../../Image/equipe/othmane.jpg'
import Saad from '../../../Image/equipe/saad.jpg'
import Hajji from '../../../Image/equipe/barae.jpg'


const AboutProfessional = () => {
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Create observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [id]: true }));
          setActiveSection(parseInt(id.split("-")[1]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Reset refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  // Scroll to section
  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // New animation variants
  const fadeInScale = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Effet de parallaxe et particules */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-primary to-accent"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, Math.random() * 400 - 200, 0],
                y: [0, Math.random() * 400 - 200, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Hero avec effet 3D */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary dark:text-accent text-sm font-medium mb-6"
            >
              Notre Histoire
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Une Vision{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Innovante
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10"
            >
              Projet innovant développé par des étudiants de l'OFPPT, combinant expertise technique et créativité pour réinventer la location de voitures au Maroc.
            </motion.p>
            
            {/* Cartes de statistiques avec effet 3D */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 perspective-1000">
              {[                { 
                  title: "Formation", 
                  value: "2", 
                  suffix: "ans",
                  desc: "de développement à l'OFPPT" 
                },
                { 
                  title: "Technologies", 
                  value: "10+", 
                  suffix: "",
                  desc: "maîtrisées (React, Laravel, etc.)" 
                },
                { 
                  title: "Projets", 
                  value: "5+", 
                  suffix: "",
                  desc: "réalisés en équipe" 
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-lg transform-gpu transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-4xl font-bold text-primary dark:text-accent mb-2">
                    {stat.value}
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">
                      {stat.suffix}
                    </span>
                  </h3>
                  <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                    {stat.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reste du composant... */}
      <div className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col space-y-4">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? "bg-accent w-4 h-4" 
                : "bg-primary/30 dark:bg-light/30"
            } hover:scale-125`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section id="section-0" ref={addToRefs} className="min-h-[80vh] flex items-center py-12">
          <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
              {/* Left Column */}
              <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full 
                               bg-accent/10 dark:bg-accent/20 border border-accent/30">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium text-accent">About Us</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-display font-bold 
                               tracking-tight text-primary dark:text-light leading-tight">
                  Driving Innovation <br />
                  <span className="bg-clip-text text-transparent 
                                 bg-gradient-to-r from-accent via-accent to-accent-light">
                    With Excellence
                  </span>
                </h1>

                <p className="text-base sm:text-lg xl:text-xl text-muted-foreground dark:text-metal-light 
                              max-w-xl leading-relaxed">
                  Over 15 years of industry experience, delivering exceptional solutions 
                  through cutting-edge technology and deep expertise.
                </p>
              </motion.div>

              {/* Right Column - Stats Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { number: "15+", label: "Years Experience" },
                  { number: "200+", label: "Projects Completed" },
                  { number: "50+", label: "Team Members" },
                  { number: "99%", label: "Client Satisfaction" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-4 sm:p-6 lg:p-8 bg-card/80 dark:bg-obsidian/80 backdrop-blur-sm 
                             rounded-2xl border border-primary/10 dark:border-metal-light/10
                             hover:border-accent/30 dark:hover:border-accent/30
                             shadow-lg shadow-primary/5 dark:shadow-accent/5
                             transition-all duration-300 bg-gradient-professional dark:bg-gradient-aurora"
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br 
                                 from-primary to-accent bg-clip-text text-transparent">
                      {stat.number}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground 
                               dark:text-metal-light mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <motion.div
            className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: <Car className="h-6 sm:h-8 w-6 sm:w-8" />, label: "Vehicles", value: "500+" },
                { icon: <Star className="h-6 sm:h-8 w-6 sm:w-8" />, label: "Rating", value: "4.9/5" },
                { icon: <Users className="h-6 sm:h-8 w-6 sm:w-8" />, label: "Clients", value: "10K+" },
                { icon: <Award className="h-6 sm:h-8 w-6 sm:w-8" />, label: "Awards", value: "25+" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="group relative p-6 sm:p-8 lg:p-10 bg-card/90 dark:bg-obsidian/90 
                             rounded-2xl backdrop-blur-md border border-primary/20 
                             dark:border-obsidian/20 transition-all duration-500
                             hover:bg-gradient-to-br hover:from-accent/10 hover:to-primary/10
                             dark:hover:from-accent/20 dark:hover:to-primary/20"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-accent dark:text-accent-light mb-6 
                                 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary 
                               dark:text-light mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm sm:text-base text-metal dark:text-metal-light">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <section id="section-1" ref={addToRefs} className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
              {isVisible["section-1"] && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="text-center mb-12 sm:mb-16"
                >
                  <motion.span variants={itemVariants} className="text-sm font-medium text-primary dark:text-light tracking-wider uppercase mb-2 inline-block">
                    Our Purpose
                  </motion.span>
                  <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary dark:text-light mb-6">
                    Our Mission & Values
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted-foreground dark:text-metal-light max-w-3xl mx-auto">
                    We're driven by a commitment to excellence and innovation. Our core values shape everything we do and guide us toward creating meaningful impact.
                  </motion.p>
                  
                  <motion.div 
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16"
                  >
                    {[
                      {
                        title: "Our Mission",
                        desc: "To provide innovative solutions that empower our clients to achieve their goals with confidence and efficiency.",
                        icon: <Award className="h-8 sm:h-10 w-8 sm:w-10" />,
                        color: "bg-primary/10 dark:bg-primary/20",
                        textColor: "text-primary dark:text-light"
                      },
                      {
                        title: "Our Vision",
                        desc: "To be the leading provider of comprehensive professional services, recognized for excellence, integrity, and client satisfaction.",
                        icon: <Shield className="h-8 sm:h-10 w-8 sm:w-10" />,
                        color: "bg-secondary/10 dark:bg-secondary/20",
                        textColor: "text-secondary dark:text-secondary-light"
                      },
                      {
                        title: "Our Commitment",
                        desc: "To continuously improve our solutions and processes, ensuring we deliver maximum value and exceed expectations on every project.",
                        icon: <Clock className="h-8 sm:h-10 w-8 sm:w-10" />,
                        color: "bg-accent/10 dark:bg-accent/20",
                        textColor: "text-accent dark:text-accent"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center p-4 sm:p-6 bg-card dark:bg-obsidian rounded-xl shadow-card dark:shadow-none border border-primary/10 dark:border-metal-light/10 hover:shadow-tilt transition-all duration-300"
                      >
                        <div className={`mb-4 sm:mb-5 p-3 sm:p-4 rounded-full ${item.color}`}>
                          <div className={`${item.textColor}`}>{item.icon}</div>
                        </div>
                        <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${item.textColor}`}>{item.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground dark:text-metal-light">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    variants={containerVariants}
                    className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-6 sm:gap-8"
                  >
                    <motion.div 
                      variants={itemVariants}
                      className="bg-card dark:bg-obsidian p-6 sm:p-8 rounded-xl shadow-card dark:shadow-none border border-primary/10 dark:border-metal-light/10"
                    >
                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary dark:text-light mb-4">Our Values</h3>
                      <div className="space-y-4">
                        {[
                          { value: "Excellence", desc: "We strive for excellence in everything we do" },
                          { value: "Integrity", desc: "We conduct business with the highest ethical standards" },
                          { value: "Innovation", desc: "We embrace change and continuously improve" },
                          { value: "Collaboration", desc: "We work together to achieve common goals" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-accent dark:text-accent mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="text-base sm:text-lg font-medium text-primary dark:text-light">{item.value}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground dark:text-metal-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-gradient-professional dark:bg-gradient-aurora p-6 sm:p-8 rounded-xl shadow-card dark:shadow-none border border-primary/10 dark:border-metal-light/10 text-left relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-pattern-dots bg-[length:20px_20px] opacity-5"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary dark:text-light mb-4">Our Approach</h3>
                        <p className="text-sm sm:text-base text-muted-foreground dark:text-metal-light mb-6">
                          We believe in a client-centered approach that combines industry expertise with innovative solutions to meet your unique needs.
                        </p>
                        <div className="space-y-6">
                          <div className="relative">
                            <div className="h-2 bg-muted dark:bg-obsidian/50 rounded-full">
                              <div className="h-2 bg-primary dark:bg-light rounded-full w-11/12"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs sm:text-sm">
                              <span className="text-primary dark:text-light font-medium">Client Satisfaction</span>
                              <span className="text-muted-foreground dark:text-metal-light">95%</span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-2 bg-muted dark:bg-obsidian/50 rounded-full">
                              <div className="h-2 bg-accent dark:bg-accent rounded-full w-10/12"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs sm:text-sm">
                              <span className="text-accent dark:text-accent font-medium">Project Completion</span>
                              <span className="text-muted-foreground dark:text-metal-light">90%</span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-2 bg-muted dark:bg-obsidian/50 rounded-full">
                              <div className="h-2 bg-secondary dark:bg-secondary-light rounded-full w-full"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs sm:text-sm">
                              <span className="text-secondary dark:text-secondary-light font-medium">Customer Retention</span>
                              <span className="text-muted-foreground dark:text-metal-light">100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Team Section */}
        <section id="section-2" ref={addToRefs} className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
              {isVisible["section-2"] && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
                    <span className="text-sm font-medium text-accent dark:text-accent tracking-wider uppercase mb-2 inline-block">
                      Our People
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary dark:text-light mb-6">
                      Meet Our Expert Team
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground dark:text-metal-light max-w-3xl mx-auto">
                      Our diverse team of professionals brings together decades of combined experience across multiple disciplines to deliver exceptional results.
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-6 sm:gap-8"
                  >
                    {[
                      {
                        name: "Chouaib Elhaddad",
                        position: "Développeur Full Stack",
                        bio: "Étudiant passionné à l'OFPPT, spécialisé en développement web et architecture logicielle.",
                        image: Chouaib
                      },
                      {
                        name: "Safroui Saad",
                        position: "Développeur Full Stack",
                        bio: "Expert en technologies front-end et back-end, étudiant à l'OFPPT avec une passion pour l'innovation.",
                        image: Saad
                      },
                      {
                        name: "Othmane Rmaili",
                        position: "Développeur Full Stack",
                        bio: "Spécialiste en développement d'applications web modernes, formé à l'OFPPT.",
                        image: Othmane
                      },
                      {
                        name: "Barae Hajji",
                        position: "Développeur Full Stack",
                        bio: "Passionné par les nouvelles technologies et le développement web, étudiant à l'OFPPT.",
                        image: Hajji
                      }
                    ].map((person, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="bg-card dark:bg-obsidian rounded-xl shadow-card dark:shadow-none border border-primary/10 dark:border-metal-light/10 overflow-hidden group transition-all duration-300"
                      >
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                          <img 
                            src={person.image} 
                            alt={person.name} 
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-professional dark:bg-gradient-aurora opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-primary dark:text-light">{person.name}</h3>
                          <p className="text-sm sm:text-base text-accent dark:text-accent font-medium mb-3">{person.position}</p>
                          <p className="text-sm sm:text-base text-muted-foreground dark:text-metal-light">{person.bio}</p>
                          <div className="flex justify-end mt-4">
                            <button className="text-xs sm:text-sm font-medium text-primary dark:text-light hover:text-accent dark:hover:text-accent transition-colors">
                              View Profile →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="mt-12 sm:mt-16 bg-muted dark:bg-obsidian/50 p-6 sm:p-8 rounded-xl border border-primary/10 dark:border-metal-light/10"
                  >
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary dark:text-light mb-6 text-center">
                      Our Expertise Areas
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                      {[
                        { area: "Strategic Consulting", desc: "Helping businesses align their operations with long-term objectives" },
                        { area: "Digital Transformation", desc: "Guiding companies through technological evolution" },
                        { area: "Process Optimization", desc: "Streamlining workflows for maximum efficiency" },
                        { area: "Financial Advisory", desc: "Expert financial guidance to improve stability and growth" },
                        { area: "Market Analysis", desc: "Data-driven insights into market trends and opportunities" },
                        { area: "Training & Development", desc: "Building capacity and enhancing team capabilities" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-accent dark:text-accent mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-base sm:text-lg font-medium text-primary dark:text-light mb-1">{item.area}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground dark:text-metal-light">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="mt-12 text-center"
                  >
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-primary dark:text-light mb-4">
                      Ready to Work Together?
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground dark:text-metal-light max-w-2xl mx-auto mb-6">
                      Let's discuss how our expertise can help you achieve your business goals.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-accent 
                                 hover:bg-accent-light text-accent-foreground rounded-lg 
                                 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Section Équipe */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary dark:text-accent text-sm font-medium mb-4">
                Notre Équipe
              </span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Des Experts Passionnés
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                Une équipe talentueuse qui repousse les limites de l'innovation pour créer des expériences exceptionnelles.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Chouaib Elhaddad",
                  role: "Développeur Full Stack",
                  image: Chouaib,
                  description: "Étudiant à l'OFPPT en développement digital, passionné par la création d'applications web innovantes."
                },
                {
                  name: "Safroui Saad",
                  role: "Développeur Full Stack",
                  image: Saad,
                  description: "Spécialisé dans le développement web moderne à l'OFPPT, expert en React et Laravel."
                },
                {
                  name: "Othmane Rmaili",
                  role: "Développeur Full Stack",
                  image: Othmane,
                  description: "En formation à l'OFPPT, passionné par les technologies web et l'expérience utilisateur."
                },
                {
                  name: "Barae Hajji",
                  role: "Développeur Full Stack",
                  image: Hajji,
                  description: "Étudiant en développement d'applications à l'OFPPT, focus sur les solutions web innovantes."
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden transform-gpu transition-all duration-500 group-hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-accent font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {member.description}
                      </p>
                      
                      <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                          </svg>
                        </button>
                        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Global Styles to Prevent Scroll Issues */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          overflow-x: hidden;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default AboutProfessional;