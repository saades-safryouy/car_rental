import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

// Données des témoignages marocains
const testimonials = [
  {
    id: 1,
    name: 'Karim Benali',
    role: 'Homme d’affaires - Casablanca',
    rating: 5,
    comment:
      "'Le service est extraordinaire! J'ai loué une Mercedes pour accueillir mes partenaires commerciaux. La voiture était impeccable et le service de livraison à l'hôtel était ponctuel. Choukran bezaf!'",
    city: 'Casablanca',
  },
  {
    id: 2,
    name: 'Leila Zidane',
    role: 'Guide touristique - Marrakech',
    rating: 5,
    comment:
      "'Pour mes clients qui visitent le Maroc, j'ai besoin d'un service fiable. Les 4x4 sont parfaits pour nos excursions dans l'Atlas et le désert. L'équipe parle darija et français, ce qui facilite tout.'",
    city: 'Marrakech',
  },
  {
    id: 3,
    name: 'Mehdi Alaoui',
    role: 'Cinéaste - Rabat',
    rating: 4,
    comment:
      "'Pour mes tournages à travers le Royaume, j'ai besoin de véhicules fiables. Le choix de modèles est excellent, même si parfois il faut réserver bien à l'avance pendant la haute saison.'",
    city: 'Rabat',
  },
  {
    id: 4,
    name: 'Nadia Tazi',
    role: 'Médecin - Tanger',
    rating: 5,
    comment:
      "'Je fais régulièrement des déplacements entre Tanger et Tétouan. La Tesla que j'ai louée était parfaite - économique et confortable. Le personnel est très attentionné, vraiment au niveau !'",
    city: 'Tanger',
  },
];

const ClientTestimonialsCarousel = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef(Autoplay({ delay: 6000 }));
  const progressRef = useRef(null);

  // Animation des cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Animation de la barre de progression
  useEffect(() => {
    if (progressRef.current && isAutoplay) {
      progressRef.current.style.width = '0%';
      const animation = progressRef.current.animate(
        [{ width: '0%' }, { width: '100%' }],
        { duration: 6000, fill: 'forwards', easing: 'linear' }
      );
      return () => animation.cancel();
    }
  }, [currentSlide, isAutoplay]);

  // Fonction pour rendre les étoiles de notation
  const renderStars = (rating) => {
    return (
      <div className="flex mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < rating
                ? 'text-accent dark:text-accent fill-accent dark:fill-accent animate-sparkle'
                : 'text-muted dark:text-metal'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative py-16 bg-gradient-to-br from-background via-background/95 to-background dark:from-obsidian dark:via-obsidian/95 dark:to-obsidian-dark min-h-screen overflow-hidden"
      ref={ref}
    >
      {/* Professional geometric background pattern */}
      <div className="absolute inset-0 background-pattern opacity-5 dark:opacity-10" />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-professional opacity-10" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-professional opacity-10 transform rotate-180" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-96 h-96 bg-primary/5 dark:bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-96 h-96 bg-secondary/5 dark:bg-custom-blue/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-aurora">
              Nos clients témoignent
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-text-light max-w-3xl mx-auto">
            Découvrez l'expérience authentique de nos clients marocains qui nous font confiance pour leurs déplacements à travers le Royaume.
          </p>
        </motion.div>

        <Carousel
          opts={{ loop: true, align: 'center' }}
          plugins={[autoplayRef.current]}
          className="w-full max-w-7xl mx-auto"
          setApi={(api) => {
            api?.on('select', () => setCurrentSlide(api.selectedScrollSnap()));
            api?.on('pointerDown', () => autoplayRef.current.stop());
            api?.on('pointerUp', () => isAutoplay && autoplayRef.current.play());
          }}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  transition={{ delay: testimonial.id * 0.1 }}
                >
                  <Card className="bg-light/90 dark:bg-obsidian/80 backdrop-blur-glass border border-primary/30 dark:border-accent/30 shadow-tilt hover:shadow-neon animate-gradient-border transition-shadow duration-300 h-[560px] flex flex-col">
                    <CardContent className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center mb-8">
                        <div className="flex-grow">
                          <h3 className="text-2xl font-display font-semibold text-text dark:text-text-light mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-base text-text-muted dark:text-text-light">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      {renderStars(testimonial.rating)}
                      <div className="mb-8 flex-grow">
                        <div className="relative">
                          <Quote className="w-10 h-10 text-accent absolute -left-4 -top-4 opacity-50" />
                          <p className="text-lg text-text dark:text-text-light italic pl-8 line-clamp-6">
                            {testimonial.comment}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-secondary mr-3"></div>
                          <span className="text-sm text-text-muted dark:text-text-light font-medium">
                            Vérifié
                          </span>
                        </div>
                        <div className="flex items-center bg-accent/30 dark:bg-accent/40 px-3 py-2 rounded-full">
                          <span className="text-sm font-medium text-accent dark:text-accent">
                            {testimonial.city}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious
              className="relative w-12 h-12 bg-light/90 dark:bg-obsidian/80 border border-muted/50 dark:border-metal/50 text-text dark:text-text-light shadow-button hover:bg-light dark:hover:bg-obsidian rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </CarouselPrevious>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-light/90 dark:bg-obsidian/80 border border-muted/50 dark:border-metal/50 text-text dark:text-text-light shadow-button hover:bg-light dark:hover:bg-obsidian rounded-full"
              onClick={() => {
                setIsAutoplay(!isAutoplay);
                isAutoplay ? autoplayRef.current.stop() : autoplayRef.current.play();
              }}
            >
              {isAutoplay ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <CarouselNext
              className="relative w-12 h-12 bg-light/90 dark:bg-obsidian/80 border border-muted/50 dark:border-metal/50 text-text dark:text-text-light shadow-button hover:bg-light dark:hover:bg-obsidian rounded-full"
            >
              <ArrowRight className="w-6 h-6" />
            </CarouselNext>
          </div>
        </Carousel>

        {/* Points de navigation */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-3 h-3 p-0 rounded-full ${
                index === currentSlide
                  ? 'bg-primary dark:bg-accent w-8'
                  : 'bg-muted dark:bg-metal hover:bg-primary/50 dark:hover:bg-accent/50'
              } transition-all duration-300`}
              onClick={() => {
                const api = autoplayRef.current.carouselApi();
                api?.scrollTo(index);
              }}
            />
          ))}
        </div>

        {/* Barre de progression */}
        <div className="relative h-1.5 bg-muted/30 dark:bg-metal/30 mt-6 max-w-md mx-auto rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-aurora"
          />
        </div>     
        {/* Badge de confiance */}
        <div className="flex justify-center mt-10">
          <div className="bg-light/90 dark:bg-obsidian/80 border border-muted/50 dark:border-metal/50 rounded-full px-8 py-3 shadow-button flex items-center gap-3 backdrop-blur-glass animate-pulse-scale">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-text dark:text-text-light font-medium text-base">
              4.9/5 - Plus de 2 400 avis vérifiés
            </span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .background-pattern {
          background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }

        @media (prefers-color-scheme: dark) {
          .background-pattern {
            background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          }
        }

        .bg-gradient-professional {
          background: linear-gradient(
            135deg,
            var(--primary) 0%,
            var(--secondary) 50%,
            var(--accent) 100%
          );
        }

        @media (max-width: 768px) {
          .background-pattern {
            background-size: 20px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientTestimonialsCarousel;