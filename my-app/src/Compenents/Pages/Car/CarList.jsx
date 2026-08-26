"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import {
  Search,
  CarFront,
  Calendar,
  XCircle,
  MapPin,
  Fuel,
  Settings,
  Star,
  ArrowRight,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CarList = () => {
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState("grid")
  const [visibleCount, setVisibleCount] = useState(9)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || "http://localhost:8000"

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from:", API_URL)

        const [carsResponse, brandsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_URL}/voitures`),
          axios.get(`${API_URL}/marques`),
          axios.get(`${API_URL}/categories`),
        ])

        // Process cars data
        let carsData = carsResponse.data
        if (typeof carsData === "string") {
          if (carsData.startsWith("a[")) {
            try {
              carsData = JSON.parse(carsData.substring(1))
            } catch (e) {
              console.error("Failed to parse cars data even after removing prefix:", e)
              carsData = []
            }
          } else {
            try {
              carsData = JSON.parse(carsData)
            } catch (e) {
              console.error("Failed to parse cars data:", e)
              carsData = []
            }
          }
        }

        if (carsData?.data && Array.isArray(carsData.data)) {
          carsData = carsData.data
        } else if (!Array.isArray(carsData)) {
          carsData = Array.isArray(carsData) ? carsData : [carsData].filter(Boolean)
        }

        // Process brands data
        let brandsData = brandsResponse.data
        if (typeof brandsData === "string") {
          if (brandsData.startsWith("a[")) {
            try {
              brandsData = JSON.parse(brandsData.substring(1))
            } catch (e) {
              console.error("Failed to parse brands data even after removing prefix:", e)
              brandsData = []
            }
          } else {
            try {
              brandsData = JSON.parse(brandsData)
            } catch (e) {
              console.error("Failed to parse brands data:", e)
              brandsData = []
            }
          }
        }

        if (brandsData?.data && Array.isArray(brandsData.data)) {
          brandsData = brandsData.data
        } else if (!Array.isArray(brandsData)) {
          brandsData = Array.isArray(brandsData) ? brandsData : [brandsData].filter(Boolean)
        }

        // Process categories data
        let categoriesData = categoriesResponse.data
        if (typeof categoriesData === "string") {
          if (categoriesData.startsWith("a[")) {
            try {
              categoriesData = JSON.parse(categoriesData.substring(1))
            } catch (e) {
              console.error("Failed to parse categories data even after removing prefix:", e)
              categoriesData = []
            }
          } else {
            try {
              categoriesData = JSON.parse(categoriesData)
            } catch (e) {
              console.error("Failed to parse categories data:", e)
              categoriesData = []
            }
          }
        }

        if (categoriesData?.data && Array.isArray(categoriesData.data)) {
          categoriesData = categoriesData.data
        } else if (!Array.isArray(categoriesData)) {
          categoriesData = Array.isArray(categoriesData) ? categoriesData : [categoriesData].filter(Boolean)
        }

        // Normalize car data
        const normalizedCars = carsData.map((car, index) => ({
          id_voiture: car.id_voiture || index,
          id_marque: car.id_marque,
          id_categorie: car.id_categorie,
          modele: car.modele || "",
          annee: car.annee || new Date().getFullYear(),
          immatriculation: car.immatriculation || "",
          description: car.description || "",
          quantity: car.quantity || 1,
          disponible: car.disponible !== undefined ? car.disponible : true,
          prix_journalier: car.prix_journalier || "0",
          imageFront: car.imageFront || "",
          imageRight: car.imageRight || "",
          imageLeft: car.imageLeft || "",
          imageBack: car.imageBack || "",
          marque: {
            id_marque: car.id_marque,
            nom_marque: car.marque || "Inconnu",
          },
          categorie: {
            id_categorie: car.id_categorie,
            nom_categorie: car.categorie || "Autre",
          },
          // Add some sample data for enhanced UI
          transmission: ["Automatique", "Manuelle"][Math.floor(Math.random() * 2)],
          fuel: ["Essence", "Diesel", "Électrique", "Hybride"][Math.floor(Math.random() * 4)],
          seats: Math.floor(Math.random() * 3) + 2,
          rating: (Math.random() * 2 + 3).toFixed(1),
        }))

        setCars(normalizedCars)
        setBrands(brandsData)
        setCategories(categoriesData)
        setIsLoading(false)
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Impossible de charger les données. Veuillez réessayer.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [API_URL])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/600x400?text=No+Image"

    const cleanPath = imagePath.replace(/^\/storage\//, "")
    return `${import.meta.env.VITE_APP_URL || "http://localhost:8000"}/storage/${cleanPath}`
  }

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch =
        !searchTerm || `${car.marque.nom_marque} ${car.modele}`.toLowerCase().includes(searchTerm.toLowerCase())

      const matchBrand = selectedBrand === "all" || car.id_marque === Number.parseInt(selectedBrand, 10)
      const matchCategory = selectedCategory === "all" || car.id_categorie === Number.parseInt(selectedCategory, 10)

      return matchSearch && matchBrand && matchCategory
    })
  }, [cars, searchTerm, selectedBrand, selectedCategory])

  const visibleCars = filteredCars.slice(0, visibleCount)

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
  <div className="min-h-screen bg-gradient-professional dark:bg-gradient-aurora py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          brands={brands}
          categories={categories}
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {filteredCars.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                <span className="text-teal-600 dark:text-teal-400">{filteredCars.length}</span> véhicules disponibles
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">Affichage:</span>
                <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
                  <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <TabsTrigger
                      value="grid"
                      className="data-[state=active]:bg-teal-50 dark:data-[state=active]:bg-teal-900/20"
                    >
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-3 h-3 bg-current rounded-sm"></div>
                        <div className="w-3 h-3 bg-current rounded-sm"></div>
                        <div className="w-3 h-3 bg-current rounded-sm"></div>
                        <div className="w-3 h-3 bg-current rounded-sm"></div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="list"
                      className="data-[state=active]:bg-teal-50 dark:data-[state=active]:bg-teal-900/20"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-6 h-2 bg-current rounded-sm"></div>
                        <div className="w-6 h-2 bg-current rounded-sm"></div>
                        <div className="w-6 h-2 bg-current rounded-sm"></div>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="grid" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {visibleCars.map((car) => (
                        <CarCard key={car.id_voiture} car={car} getImageUrl={getImageUrl} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="list" className="mt-0">
                    <div className="space-y-4">
                      {visibleCars.map((car) => (
                        <CarListItem key={car.id_voiture} car={car} getImageUrl={getImageUrl} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            {visibleCount < filteredCars.length && (
              <div className="flex justify-center mt-6">
                <Button onClick={() => setVisibleCount((c) => c + 9)} variant="outline">
                  Voir plus
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Header = () => (
  <div className="relative mb-16 mt-8">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial rounded-full blur-3xl opacity-50"></div>
    </div>
    <div className="relative z-10 text-center">
      <div className="inline-block p-2 px-4 bg-accent/10 dark:bg-accent/20 rounded-full text-accent dark:text-accent-light text-sm font-medium mb-4 animate-pulse-scale">
        <Sparkles className="inline-block w-4 h-4 mr-2" />
        <span>Découvrez notre nouvelle collection de véhicules</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-light mb-6 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-aurora animate-gradient-text">
          Expérience de Conduite Premium
        </span>
      </h1>
      <p className="text-xl text-metal dark:text-metal-light max-w-2xl mx-auto leading-relaxed">
        Notre flotte exclusive de véhicules d'exception vous attend pour une expérience de conduite inoubliable.
        Élégance, confort et performance garantis.
      </p>
    </div>
  </div>
)

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  brands,
  categories,
  activeView,
  setActiveView,
}) => (
  <div className="mb-12">
    <Card className="bg-card dark:bg-obsidian backdrop-blur-glass shadow-card border-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-professional dark:bg-gradient-aurora opacity-50"></div>
      <CardContent className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <label htmlFor="search" className="text-sm font-medium text-primary dark:text-light mb-2 block">
              Rechercher
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-metal dark:text-metal-light" />
              <Input
                id="search"
                type="text"
                placeholder="Marque, modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card dark:bg-obsidian-dark border-border dark:border-metal focus:border-secondary dark:focus:border-secondary-light focus:ring-1 focus:ring-secondary dark:focus:ring-secondary-light transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="brand" className="text-sm font-medium text-primary dark:text-light mb-2 block">
              Marque
            </label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand} defaultValue="all">
              <SelectTrigger
                id="brand"
                className="bg-card dark:bg-obsidian-dark border-border dark:border-metal focus:ring-1 focus:ring-secondary dark:focus:ring-secondary-light transition-all"
              >
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent className="bg-card dark:bg-obsidian border dark:border-metal">
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id_marque} value={brand.id_marque.toString()}>
                    {brand.nom_marque}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="category" className="text-sm font-medium text-primary dark:text-light mb-2 block">
              Catégorie
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} defaultValue="all">
              <SelectTrigger
                id="category"
                className="bg-card dark:bg-obsidian-dark border-border dark:border-metal focus:ring-1 focus:ring-secondary dark:focus:ring-secondary-light transition-all"
              >
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent className="bg-card dark:bg-obsidian border dark:border-metal">
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id_categorie} value={category.id_categorie.toString()}>
                    {category.nom_categorie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1 flex items-end">
            <Button
              variant="outline"
              className="w-full h-10 bg-card dark:bg-obsidian-dark border-border dark:border-metal hover:bg-muted dark:hover:bg-obsidian text-primary dark:text-light"
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtres avancés</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const CarCard = ({ car, getImageUrl }) => (
  <Card className="group overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative transform hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-white/5 dark:from-white/5 dark:to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
      <img
        src={getImageUrl(car.imageFront) || "/placeholder.svg"}
        alt={`${car.marque.nom_marque} ${car.modele}`}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = "https://placehold.co/600x400?text=No+Image"
        }}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
        <Badge
          variant={car.disponible ? "success" : "destructive"}
          className={`shadow-lg backdrop-blur-md ${
            car.disponible
              ? "bg-emerald-500/90 hover:bg-emerald-600/90"
              : "bg-rose-500/90 hover:bg-rose-600/90"
          } text-white border-0 px-3 py-1.5 text-sm font-medium tracking-wide`}
        >
          {car.disponible ? "Disponible" : "Indisponible"}
        </Badge>

        <div className="flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">{car.rating}/5</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {car.marque.nom_marque} {car.modele}
            </h3>
            <p className="text-sm text-white/90 font-medium tracking-wide">{car.categorie.nom_categorie}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{car.prix_journalier}€</p>
            <p className="text-sm text-white/90 font-medium">par jour</p>
          </div>
        </div>
      </div>
    </div>

    <CardContent className="p-6 relative z-10">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
            <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-medium">{car.annee}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium">{car.transmission}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
            <Fuel className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="font-medium">{car.fuel}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
            <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="font-medium">{car.seats} places</span>
        </div>
      </div>
    </CardContent>

    <CardFooter className="p-6 pt-0 relative z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={`/car/${car.id_voiture}`} state={{ car }} className="w-full">
              <Button
                className={`w-full group relative overflow-hidden ${
                  car.disponible
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                } shadow-lg h-12 text-sm font-medium tracking-wide`}
                disabled={!car.disponible}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {car.disponible ? "Découvrir ce véhicule" : "Non disponible"}
                  {car.disponible && (
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </span>
                {car.disponible && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <p className="text-sm font-medium">
              {car.disponible
                ? "Cliquez pour découvrir tous les détails de ce véhicule"
                : "Ce véhicule n'est pas disponible actuellement"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardFooter>
  </Card>
)

const CarListItem = ({ car, getImageUrl }) => (
  <Card className="group overflow-hidden bg-white dark:bg-gray-800/90 border-0 shadow-md hover:shadow-xl transition-all duration-300 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-cyan-50/30 dark:from-teal-900/10 dark:to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <CardContent className="p-0 relative z-10">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 md:hidden"></div>
          <img
            src={getImageUrl(car.imageFront) || "/placeholder.svg"}
            alt={`${car.marque.nom_marque} ${car.modele}`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://placehold.co/600x400?text=No+Image"
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20">
            <Badge
              variant={car.disponible ? "success" : "destructive"}
              className={`shadow-md ${car.disponible ? "bg-teal-500 hover:bg-teal-600" : "bg-rose-500 hover:bg-rose-600"} text-white border-0 px-2.5 py-1`}
            >
              {car.disponible ? "Disponible" : "Indisponible"}
            </Badge>

            <div className="flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 mr-1" />
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{car.rating}/5</span>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {car.marque.nom_marque} {car.modele}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{car.categorie.nom_categorie}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{car.prix_journalier}€</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">par jour</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4 mr-2 text-teal-500 dark:text-teal-400" />
              <span>{car.annee}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Settings className="h-4 w-4 mr-2 text-teal-500 dark:text-teal-400" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Fuel className="h-4 w-4 mr-2 text-teal-500 dark:text-teal-400" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4 mr-2 text-teal-500 dark:text-teal-400" />
              <span>{car.seats} places</span>
            </div>
          </div>

          <div className="mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/car/${car.id_voiture}`} state={{ car }}>
                    <Button
                      className={`${
                        car.disponible
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                      disabled={!car.disponible}
                    >
                      <span className="mr-2">{car.disponible ? "Voir les détails" : "Non disponible"}</span>
                      {car.disponible && (
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {car.disponible
                    ? "Cliquez pour réserver ce véhicule"
                    : "Ce véhicule n'est pas disponible actuellement"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Skeleton className="h-8 w-48 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-12 w-96 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-6 w-2/3 mx-auto bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="mb-12">
        <Skeleton className="h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill()
          .map((_, i) => (
            <Card key={i} className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-md">
              <Skeleton className="h-56 w-full bg-gray-200 dark:bg-gray-700" />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div>
                    <Skeleton className="h-6 w-16 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Array(4)
                    .fill()
                    .map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  </div>
)

const ErrorState = ({ error }) => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
    <Card className="max-w-md w-full bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 opacity-50"></div>
      <CardHeader className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full">
            <XCircle className="h-12 w-12 text-rose-500 dark:text-rose-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Une erreur est survenue</h2>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0"
        >
          Réessayer
        </Button>
      </CardContent>
    </Card>
  </div>
)

const EmptyState = () => (
  <Card className="bg-white dark:bg-gray-800/90 border-0 shadow-md overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 opacity-50"></div>
    <CardContent className="flex flex-col items-center justify-center py-16 relative z-10">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
        <CarFront className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Aucun véhicule trouvé</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-8">
        Aucun véhicule ne correspond à vos critères de recherche. Essayez de modifier vos filtres pour trouver le
        véhicule parfait pour vous.
      </p>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        Réinitialiser les filtres
      </Button>
    </CardContent>
  </Card>
)

export default CarList
