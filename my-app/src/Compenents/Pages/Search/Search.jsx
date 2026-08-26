import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search as SearchIcon, Loader2, Car, BookOpen, Tag, Filter, Calendar, MapPin, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchService } from "../../../services/SearchService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

// Catégories de recherche
const categories = [
  { name: 'Voitures', icon: Car },
  { name: 'Articles', icon: BookOpen },
  { name: 'Marques', icon: Tag },
];

// Articles de blog en local (à remplacer par une API si besoin)
// Importer les icônes nécessaires
import { Users, Snowflake } from "lucide-react";

// Configuration du composant
const searchConfig = {
  priceRanges: [
    { label: "Tous les prix", value: "all" },
    { label: "0-300 DH", value: "0-300" },
    { label: "300-500 DH", value: "300-500" },
    { label: "500-1000 DH", value: "500-1000" },
    { label: "1000+ DH", value: "1000+" }
  ],
  transmissions: [
    { label: "Toutes", value: "all" },
    { label: "Automatique", value: "automatique" },
    { label: "Manuelle", value: "manuelle" }
  ],
  seatsCount: [
    { label: "Toutes", value: "all" },
    { label: "2 places", value: "2" },
    { label: "4 places", value: "4" },
    { label: "5 places", value: "5" },
    { label: "7 places", value: "7" }
  ],
  sortOptions: [
    { label: "Prix croissant", value: "price-asc" },
    { label: "Prix décroissant", value: "price-desc" },
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" }
  ]
};

export default function SearchProfessional() {
  // États
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [transmission, setTransmission] = useState('all');
  const [seatsCount, setSeatsCount] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allData, setAllData] = useState({ voitures: [], marques: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  // Référence pour l'infinite scroll
  const observer = useRef();
  const lastCarElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await SearchService.getAllData();
        setAllData(data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrage et tri optimisés avec useMemo
  const filteredAndSortedResults = useMemo(() => {
    const filtered = allData.voitures.filter(car => {
      const matchesQuery = car.modele?.toLowerCase().includes(query.toLowerCase()) ||
                        car.marque?.nom_marque?.toLowerCase().includes(query.toLowerCase()) ||
                        car.categorie?.nom_categorie?.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                          car.categorie?.id_categorie?.toString() === selectedCategory;
      
      const matchesBrand = selectedBrand === 'all' || 
                          car.marque?.id_marque?.toString() === selectedBrand;
      
      const matchesPrice = car.prix_journalier >= priceRange[0] && 
                          car.prix_journalier <= priceRange[1];
      
      const matchesTransmission = transmission === 'all' || 
                                 car.transmission === transmission;
      
      const matchesSeats = seatsCount === 'all' || 
                          car.seats?.toString() === seatsCount;

      return matchesQuery && matchesCategory && matchesBrand && 
             matchesPrice && matchesTransmission && matchesSeats;
    });

    // Tri des résultats
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.prix_journalier - b.prix_journalier;
        case 'price-desc':
          return b.prix_journalier - a.prix_journalier;
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        default:
          return 0;
      }
    });

    // Pagination
    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    setHasMore(endIndex < sorted.length);
    
    return sorted.slice(startIndex, endIndex);
  }, [allData, query, selectedCategory, selectedBrand, priceRange, transmission, seatsCount, sortBy, page]);

  // Gestionnaire de réinitialisation des filtres
  const handleResetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 5000]);
    setTransmission('all');
    setSeatsCount('all');
    setQuery('');
    setSortBy('price-asc');
    setPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-professional dark:bg-gradient-aurora py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-light mb-4">
            Recherche Avancée
          </h1>
          <p className="text-metal dark:text-metal-light max-w-2xl mx-auto">
            Trouvez la voiture parfaite pour vos besoins avec notre système de recherche intelligent
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <Card className="bg-card/80 dark:bg-obsidian/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Recherche */}
              <div className="md:col-span-4">
                <label className="text-sm font-medium text-primary dark:text-light mb-2 block">
                  Recherche
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-metal" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Marque, modèle, catégorie..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Marque */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-primary dark:text-light mb-2 block">
                  Marque
                </label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {allData.marques.map((marque) => (
                      <SelectItem key={marque.id_marque} value={marque.id_marque.toString()}>
                        {marque.nom_marque}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Catégorie */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-primary dark:text-light mb-2 block">
                  Catégorie
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {allData.categories.map((category) => (
                      <SelectItem key={category.id_categorie} value={category.id_categorie.toString()}>
                        {category.nom_categorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-primary dark:text-light mb-2 block">
                  Transmission
                </label>
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="Automatique">Automatique</SelectItem>
                    <SelectItem value="Manuelle">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tri */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-primary dark:text-light mb-2 block">
                  Trier par
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchConfig.sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleResetFilters}
                  className="flex-1"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="space-y-6">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-6 text-destructive">
                  <p className="text-lg font-semibold">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Réessayer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-metal dark:text-metal-light">
                  {filteredAndSortedResults.length} résultat{filteredAndSortedResults.length !== 1 ? 's' : ''} trouvé{filteredAndSortedResults.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedResults.map((car, index) => (
                    <motion.div
                      key={car.id_voiture}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      ref={index === filteredAndSortedResults.length - 1 ? lastCarElementRef : null}
                    >
                      <Link to={`/car/${car.id_voiture}`} state={{ car }}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-muted">
                              <img
                                src={car.imageFront || '/Image/car1.jpg'}
                                alt={car.modele}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                                loading={index > 6 ? "lazy" : "eager"}
                              />
                              <div className="absolute top-2 right-2">
                                <Badge 
                                  variant={car.disponible ? "success" : "destructive"}
                                  className="shadow-lg"
                                >
                                  {car.disponible ? "Disponible" : "Indisponible"}
                                </Badge>
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold text-primary dark:text-light mb-2 line-clamp-1">
                              {car.marque?.nom_marque} {car.modele}
                            </h3>

                            <div className="space-y-2">
                              <p className="text-accent text-lg font-bold">
                                {car.prix_journalier.toLocaleString('fr-FR')} DH/jour
                              </p>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  <Settings className="w-3 h-3 mr-1" />
                                  {car.transmission}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Users className="w-3 h-3 mr-1" />
                                  {car.seats} places
                                </Badge>
                                {car.climatisation && (
                                  <Badge variant="outline" className="text-xs">
                                    <Snowflake className="w-3 h-3 mr-1" />
                                    Climatisation
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {loading && (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
              )}

              {!loading && filteredAndSortedResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Card className="bg-muted/50">
                    <CardContent className="p-6">
                      <p className="text-lg font-semibold text-muted-foreground">
                        Aucun résultat trouvé
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Essayez de modifier vos filtres de recherche
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
