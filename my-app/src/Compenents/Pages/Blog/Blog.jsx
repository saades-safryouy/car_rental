"use client"; // Ensure client-side rendering for Next.js

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, User, MessageCircle, ChevronRight, Heart, BookOpen, Filter } from 'lucide-react';
import Image from '../../../Image/blog/1.jpeg'
import Image2 from '../../../Image/blog/2.jpeg'
import Image3 from '../../../Image/blog/3.jpeg'
import Image4 from '../../../Image/blog/4.jpeg'
import Image5 from '../../../Image/blog/5.jpeg'
import Image6 from '../../../Image/blog/6.jpeg'
import ImageSUV from '../../../Image/blog/7.jpeg'
const BlogPost = React.memo(({ post, variants }) => {
  // Log image URL and DOM element for debugging
  useEffect(() => {
    const img = document.querySelector(`[data-testid="post-image-${post.id}"]`);
    console.log(`Image element for post ${post.id}:`, img);
  }, [post.id]);

  return (
    <motion.article
      variants={variants}
      className="bg-card dark:bg-obsidian rounded-xl overflow-hidden shadow-card hover:shadow-tilt transition-all duration-300"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          data-testid={`post-image-${post.id}`}
          key={post.image}
          src={post.image}
          alt={post.title}
          width="400"
          height="300"
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            console.error(`Image failed to load for post ${post.id}:`, e.target.src);
            e.target.src = 'https://via.placeholder.com/400x300?text=Fallback+Image';
          }}
          onLoad={() => console.log(`Image loaded for post ${post.id}: ${post.image}`)}
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-metal-light mb-3">
          <div className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageCircle size={14} />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={14} />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
        <h3 id={`post-title-${post.id}`} className="text-xl font-bold mb-3 text-primary dark:text-light line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground dark:text-metal-light mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-muted dark:bg-obsidian flex items-center justify-center">
              <User size={14} className="text-muted-foreground dark:text-metal-light" />
            </div>
            <span className="text-sm text-muted-foreground dark:text-metal-light">{post.author}</span>
          </div>
          <a
            href={`/blog/${post.id}`}
            className="text-accent dark:text-accent-light font-medium text-sm flex items-center hover:underline"
            aria-label={`Lire plus sur ${post.title}`}
          >
            Lire
            <ChevronRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
});

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Simulate API data fetching with Pixabay CDN images
  useEffect(() => {
    setIsLoading(true);
    const dummyCategories = ['All', 'Luxury Cars', 'SUVs', 'Electric', 'Tips', 'Destinations'];
    const dummyPosts = [
      {
        id: 1,
        title: 'Top 5 Luxury Cars à Surveiller en 2025',
        excerpt: 'Découvrez notre sélection des véhicules les plus prestigieux et performants pour 2025.',
        image: Image,
        date: '3 Mai 2025',
        author: 'Alexandre Dupont',
        category: 'Luxury Cars',
        comments: 24,
        likes: 87,
      },
      {
        id: 2,
        title: 'Guide Ultime : Choisir la Voiture Parfaite pour les Vacances',
        excerpt: 'Planifiez une escapade ? Suivez nos conseils d’experts pour choisir le véhicule idéal.',
        image: Image2,
        date: '28 Avril 2025',
        author: 'Sophie Martin',
        category: 'Tips',
        comments: 15,
        likes: 42,
      },
      {
        id: 3,
        title: 'Top 10 des Routes Panoramiques en France',
        excerpt: 'Des Alpes à la Riviera, découvrez des itinéraires époustouflants pour votre location premium.',
        image: Image3,
        date: '21 Avril 2025',
        author: 'Thomas Bernard',
        category: 'Destinations',
        comments: 31,
        likes: 96,
      },
      {
        id: 4,
        title: 'SUV Électriques : Puissance et Durabilité',
        excerpt: 'Nous avons testé les meilleurs SUV électriques de 2025 pour leurs performances et leur éco-responsabilité.',
        image: Image5,
        date: '15 Avril 2025',
        author: 'Marie Dubois',
        category: 'Electric',
        comments: 18,
        likes: 53,
      },
      {
        id: 5,
        title: 'Entretien des Voitures de Luxe : Erreurs à Éviter',
        excerpt: 'Maintenez votre véhicule de prestige en parfait état avec ces conseils essentiels.',
        image: Image4,
        date: '7 Avril 2025',
        author: 'Julien Lambert',
        category: 'Tips',
        comments: 22,
        likes: 47,
      },
      {
        id: 6,
        title: 'Cabriolets Exceptionnels pour un Été Mémorable',
        excerpt: 'Découvrez les meilleurs cabriolets pour une expérience de conduite inoubliable cet été.',
        image: Image6,
        date: '29 Mars 2025',
        author: 'Claire Fontaine',
        category: 'Luxury Cars',
        comments: 11,
        likes: 39,
      },
      {
        id: 7,
        title: 'Range Rover Sport 2025 : Le SUV de Luxe Réinventé',
        excerpt: 'Découvrez le nouveau Range Rover Sport, alliance parfaite entre luxe, performance et technologie de pointe.',
        image: ImageSUV,
        date: '20 Mars 2025',
        author: 'Michel Laurent',
        category: 'SUVs',
        comments: 28,
        likes: 76,
      },
    ];

    setTimeout(() => {
      setCategories(dummyCategories);
      setPosts(dummyPosts);
      setIsLoading(false);
      console.log('Posts loaded:', dummyPosts);
    }, 500);
  }, []);

  // Memoized filtered posts
  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const searchMatch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    console.log('Filtered posts:', filtered);
    return filtered;
  }, [posts, selectedCategory, searchTerm]);

  const handleLoadMore = useCallback(() => {
    setVisiblePosts((prev) => prev + 6);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-obsidian-dark py-12 mt-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-light">
            Insights Automobiles
          </h1>
          <p className="mt-4 text-lg text-muted-foreground dark:text-metal-light max-w-2xl mx-auto">
            Restez à jour avec les dernières tendances, conseils d'experts et informations exclusives sur les voitures de luxe et les locations premium.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.div>
            <p className="mt-4 text-muted-foreground dark:text-metal-light">Chargement des articles...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar (Filters) */}
            <motion.aside
              className="lg:w-1/4 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                className="lg:hidden flex items-center space-x-2 text-accent mb-4"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
                aria-controls="filter-panel"
              >
                <Filter size={20} />
                <span>Filtres</span>
              </button>
              <AnimatePresence>
                {(isFilterOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                  <motion.div
                    id="filter-panel"
                    className="bg-card dark:bg-obsidian p-6 rounded-xl shadow-card border border-primary/10 dark:border-metal-light/10"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <label htmlFor="search" className="block text-sm font-medium text-primary dark:text-light mb-2">
                        Rechercher
                      </label>
                      <div className="relative">
                        <input
                          id="search"
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Rechercher des articles..."
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary/20 dark:border-metal-light/20 bg-card dark:bg-obsidian text-primary dark:text-light focus:ring-2 focus:ring-accent"
                          aria-label="Rechercher des articles"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-metal-light" size={18} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary dark:text-light mb-2">Catégories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                              selectedCategory === category
                                ? 'bg-accent text-accent-foreground'
                                : 'text-primary dark:text-light hover:bg-accent/10 dark:hover:bg-accent/20'
                            }`}
                            aria-current={selectedCategory === category ? 'true' : 'false'}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.aside>

            {/* Blog Posts */}
            <div className="lg:w-3/4">
              <motion.div
                ref={ref}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.slice(0, visiblePosts).map((post) => (
                    <BlogPost key={post.id} post={post} variants={itemVariants} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <BookOpen size={48} className="mx-auto text-muted-foreground dark:text-metal-light mb-4" />
                    <h3 className="text-xl font-medium text-primary dark:text-light mb-2">Aucun article trouvé</h3>
                    <p className="text-muted-foreground dark:text-metal-light">
                      Essayez d'ajuster votre recherche ou de sélectionner une autre catégorie.
                    </p>
                    <button
                      className="mt-6 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent-light"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                      }}
                    >
                      Voir tous les articles
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Load More Button */}
              {filteredPosts.length > visiblePosts && (
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <button
                    className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent-light transition-colors"
                    onClick={handleLoadMore}
                  >
                    Charger plus
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <motion.div
          className="mt-16 bg-gradient-professional dark:bg-gradient-aurora rounded-2xl p-8 border border-primary/10 dark:border-metal-light/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-2xl font-display font-bold text-primary dark:text-light mb-2">Abonnez-vous à notre newsletter</h3>
              <p className="text-muted-foreground dark:text-metal-light">
                Recevez les derniers articles, conseils exclusifs et offres spéciales directement dans votre boîte de réception.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg border border-primary/20 dark:border-metal-light/20 bg-card dark:bg-obsidian focus:ring-2 focus:ring-accent text-primary dark:text-light"
                  required
                  aria-label="Email pour la newsletter"
                />
                <button
                  type="submit"
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
                >
                  S'abonner
                </button>
              </form>
              <p className="text-xs text-muted-foreground dark:text-metal-light mt-2">
                En vous abonnant, vous acceptez notre politique de confidentialité.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Blog;