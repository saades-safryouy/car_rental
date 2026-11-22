"use client"

import { useLocation, Link, useNavigate } from "react-router-dom"
import {
  CarFront,
  Calendar,
  Settings,
  Fuel,
  MapPin,
  Star,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Sparkles,
  Clock,
  Heart,
  Share2,
  Zap,
  Gauge,
  Award,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"

const CarDetail = () => {
  const { state } = useLocation()
  const car = state?.car
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [isAnimated, setIsAnimated] = useState(false)
  const [showMagicEffect, setShowMagicEffect] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [openReservation, setOpenReservation] = useState(false)
  const [formData, setFormData] = useState({
    date_debut: "",
    date_fin: "",
  })
  const [montantTotal, setMontantTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const imageRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app/api"

  // Animation trigger on page load
  useEffect(() => {
    setIsAnimated(true)
    const timer = setTimeout(() => {
      setShowMagicEffect(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Sparkles effect for favorite button
  useEffect(() => {
    if (isFavorite) {
      setShowSparkles(true)
      const timer = setTimeout(() => {
        setShowSparkles(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isFavorite])

  // Calculate montant_total when dates change
  useEffect(() => {
    if (formData.date_debut && formData.date_fin && car?.prix_journalier) {
      const start = new Date(formData.date_debut)
      const end = new Date(formData.date_fin)
      if (end >= start) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
        setMontantTotal(days * car.prix_journalier)
      } else {
        setMontantTotal(0)
      }
    }
  }, [formData.date_debut, formData.date_fin, car])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/1200x675?text=No+Image"
    const cleanPath = imagePath.replace(/^\/storage\//, "")
    return `${import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app"}/storage/${cleanPath}`
  }

  const carImages = car ? [car.imageFront, car.imageRight, car.imageLeft, car.imageBack].filter(Boolean) : []

  // Handle 3D tilt effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    const tiltX = (y - 0.5) * 10
    const tiltY = (x - 0.5) * -10
    imageRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle reservation submission
  const handleReservation = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")

    // if (!user || !user.id_client) {
    //   toast.error("Please log in to make a reservation.")
    //   navigate("/login")
    //   return
    // }

    if (!formData.date_debut || !formData.date_fin) {
      toast.error("Please select both start and end dates.")
      return
    }

    const start = new Date(formData.date_debut)
    const end = new Date(formData.date_fin)
    if (end < start) {
      toast.error("End date must be after start date.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API_URL}/locations`,
        {
          id_voiture: car.id_voiture,
          id_client: user.id,
          date_debut: formData.date_debut,
          date_fin: formData.date_fin,
          date_retour: null,
          montant_total: montantTotal,
          statut: "En cours",
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success("Reservation created successfully!")
      setOpenReservation(false)
      navigate("/client-dashboard") // Redirect to dashboard or reservations page
    } catch (err) {
      console.error("Reservation error:", err.response)
      const errorMessage =
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(" ")
          : "Failed to create reservation. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!car || !car.id_voiture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-100 dark:from-slate-900 dark:to-teal-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="backdrop-blur-lg bg-white/90 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-teal-100/50 dark:bg-teal-900/30 flex items-center justify-center"
              >
                <CarFront className="h-16 w-16 text-teal-500 dark:text-teal-400" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-rose-600 dark:text-rose-400 mb-8 text-2xl font-medium tracking-tight"
              >
                Aucun véhicule trouvé. Veuillez sélectionner un véhicule depuis la liste.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link to="/">
                  <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 dark:from-teal-600 dark:to-emerald-600 text-white shadow-lg shadow-teal-500/30 dark:shadow-teal-700/30 font-semibold px-10 py-7 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    <ArrowLeft className="mr-3 h-5 w-5" /> Retour à la liste
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-100 dark:from-slate-900 dark:to-teal-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-teal-300/20 via-emerald-300/10 to-cyan-300/20 dark:from-teal-900/20 dark:via-emerald-900/10 dark:to-cyan-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-300/20 via-teal-300/10 to-emerald-300/20 dark:from-cyan-900/20 dark:via-teal-900/10 dark:to-emerald-900/20 rounded-full blur-3xl opacity-60"></div>
        <AnimatePresence>
          {showMagicEffect && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [null, Math.random() * window.innerHeight - 200],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 5 + 3,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-300"
                  style={{ filter: "blur(1px)" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header: Back Link and Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-between items-center"
        >
          <Link
            to="/"
            className="group inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors duration-300"
          >
            <div className="mr-3 w-10 h-10 rounded-full bg-teal-100/50 dark:bg-teal-900/30 flex items-center justify-center transform transition-transform group-hover:-translate-x-2">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Retour à la liste des véhicules</span>
          </Link>
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="relative w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "text-rose-500 fill-rose-500" : "text-slate-400 dark:text-slate-300"}`}
              />
              <AnimatePresence>
                {showSparkles && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 30],
                          y: [0, (Math.random() - 0.5) * 30],
                        }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-rose-400"
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Share2 className="h-5 w-5 text-slate-400 dark:text-slate-300" />
            </motion.button>
            <Badge
              variant={car.disponible ? "success" : "destructive"}
              className={`py-2 px-5 text-base font-semibold rounded-full shadow-md ${
                car.disponible
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  : "bg-gradient-to-r from-rose-500 to-red-500 text-white"
              } transition-all duration-300 hover:shadow-lg`}
            >
              {car.disponible ? (
                <span className="flex items-center">
                  <Check className="h-5 w-5 mr-2" /> Disponible
                </span>
              ) : (
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" /> Indisponible
                </span>
              )}
            </Badge>
          </div>
        </motion.div>

        {/* Main Content: Gallery + Details */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="xl:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="aspect-[16/9] relative transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-emerald-500/20 dark:from-teal-400/10 dark:to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  src={getImageUrl(carImages[activeImage])}
                  alt={`${car.marque.nom_marque} ${car.modele}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://placehold.co/1200x675?text=No+Image"
                  }}
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 p-8 z-20"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                      <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-4xl xl:text-5xl font-bold text-white drop-shadow-xl tracking-tight"
                      >
                        {car.marque.nom_marque} {car.modele}
                      </motion.h1>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex items-center mt-3 gap-4"
                      >
                        <p className="text-xl text-white/90 font-medium">{car.categorie.nom_categorie}</p>
                        <span className="text-white/70">•</span>
                        <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-inner">
                          <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-2" />
                          <span className="font-semibold text-white text-lg">{car.rating}/5</span>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                      className="mt-4 md:mt-0"
                    >
                      <div className="flex items-center bg-white/20 backdrop-blur-md px-5 py-3 rounded-full shadow-inner">
                        <Gauge className="h-5 w-5 text-teal-400 mr-2" />
                        <span className="font-semibold text-white text-lg">Performance exceptionnelle</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {carImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex space-x-4 overflow-x-auto pb-4"
              >
                {carImages.map((image, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 h-28 w-36 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === index
                        ? "border-teal-500 scale-105 shadow-xl shadow-teal-500/30 dark:shadow-teal-700/30"
                        : "border-slate-200/50 dark:border-slate-700/50 opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={getImageUrl(image) || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {activeImage === index && (
                      <div className="absolute inset-0 bg-teal-500/20 border-2 border-teal-500 rounded-2xl"></div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Car features section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Card className="backdrop-blur-lg bg-white/90 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Caractéristiques principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 rounded-xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30">
                      <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center mr-4">
                        <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Puissance</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">280 CV</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 rounded-xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30">
                      <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center mr-4">
                        <Gauge className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">0-100 km/h</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">6.2 sec</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 rounded-xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30">
                      <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/50 flex items-center justify-center mr-4">
                        <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Classe</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">Premium</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Car Details */}
          <div className="xl:col-span-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="backdrop-blur-lg bg-white/95 dark:bg-slate-900/85 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="p-6 bg-gradient-to-br from-teal-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500 -mx-8 -mt-8 mb-8 relative rounded-b-3xl shadow-inner">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="flex justify-between items-center mb-6"
                    >
                      <div>
                        <p className="text-white/80 font-medium text-lg">Prix journalier</p>
                        <div className="flex items-end">
                          <p className="text-5xl font-bold text-white tracking-tight">{car.prix_journalier}€</p>
                          <span className="text-white/80 ml-2 mb-2 text-lg">/jour</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <Sparkles className="h-12 w-12 text-amber-300 opacity-90" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Dialog.Root open={openReservation} onOpenChange={setOpenReservation}>
                        <Dialog.Trigger asChild>
                          <Button
                            className={`w-full py-7 text-xl font-semibold tracking-tight ${
                              car.disponible
                                ? "bg-white hover:bg-white/90 text-teal-600 shadow-lg shadow-teal-500/30"
                                : "bg-white/30 text-teal-900/40 cursor-not-allowed"
                            } rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
                            disabled={!car.disponible}
                          >
                            {car.disponible ? "Réserver maintenant" : "Non disponible"}
                            {car.disponible && <ChevronRight className="ml-3 h-6 w-6" />}
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl z-50 max-w-md w-full">
                            <Dialog.Title className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                              Réserver {car.marque.nom_marque} {car.modele}
                            </Dialog.Title>
                            <div className="space-y-6">
                              <div>
                                <Label htmlFor="date_debut" className="text-slate-900 dark:text-white">
                                  Date de début
                                </Label>
                                <Input
                                  id="date_debut"
                                  name="date_debut"
                                  type="date"
                                  value={formData.date_debut}
                                  onChange={handleChange}
                                  min={new Date().toISOString().split("T")[0]}
                                  className="mt-2"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="date_fin" className="text-slate-900 dark:text-white">
                                  Date de fin
                                </Label>
                                <Input
                                  id="date_fin"
                                  name="date_fin"
                                  type="date"
                                  value={formData.date_fin}
                                  onChange={handleChange}
                                  min={formData.date_debut || new Date().toISOString().split("T")[0]}
                                  className="mt-2"
                                  required
                                />
                              </div>
                              <div>
                                <Label className="text-slate-900 dark:text-white">Montant total</Label>
                                <p className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mt-2">
                                  {montantTotal}€ {montantTotal > 0 && <span className="text-sm">TTC</span>}
                                </p>
                              </div>
                              <div className="flex justify-end space-x-4">
                                <Dialog.Close asChild>
                                  <Button variant="outline" className="px-6 py-2">
                                    Annuler
                                  </Button>
                                </Dialog.Close>
                                <Button
                                  onClick={handleReservation}
                                  disabled={isLoading || montantTotal <= 0}
                                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2"
                                >
                                  {isLoading ? "Réservation..." : "Confirmer"}
                                </Button>
                              </div>
                            </div>
                            <Dialog.Close className="absolute top-4 right-4">
                              <svg
                                className="h-6 w-6 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </Dialog.Close>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="grid grid-cols-2 gap-6 mb-8"
                  >
                    <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 duration-300">
                      <Calendar className="h-8 w-8 mb-3 text-teal-600 dark:text-teal-400" />
                      <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Année</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{car.annee}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 duration-300">
                      <Settings className="h-8 w-8 mb-3 text-teal-600 dark:text-teal-400" />
                      <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Transmission</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{car.transmission}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 duration-300">
                      <Fuel className="h-8 w-8 mb-3 text-teal-600 dark:text-teal-400" />
                      <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Carburant</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{car.fuel}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 duration-300">
                      <MapPin className="h-8 w-8 mb-3 text-teal-600 dark:text-teal-400" />
                      <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Places</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{car.seats}</p>
                    </div>
                  </motion.div>

                  <Separator className="my-8 bg-slate-200/50 dark:bg-slate-700/50" />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="space-y-5"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      À propos de ce véhicule
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                      {car.description ||
                        "Ce véhicule d'exception allie performance, confort et élégance. Profitez d'une expérience de conduite unique avec ce modèle qui ne manquera pas de vous impressionner par sa tenue de route et son design raffiné."}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-100/50 dark:border-emerald-800/30 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="mr-4 w-14 h-14 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-800 dark:text-emerald-400 text-lg">
                          Garantie Premium incluse
                        </p>
                        <p className="text-emerald-700/80 dark:text-emerald-400/80 text-base">
                          Assistance routière 24/7 et assurance complète avec zéro franchise
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Payment options */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="mt-8"
                  >
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Options de paiement</h4>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <Banknote className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" fill="#1A1F71" rx="4" />
                          <path d="M9.5 15h5L16 9H11L9.5 15z" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" fill="#000000" rx="4" />
                          <circle cx="9" cy="12" r="4" fill="#EB001B" />
                          <circle cx="15" cy="12" r="4" fill="#F79E1B" />
                          <path d="M12 15.5a4 4 0 000-7 4 4 0 000 7z" fill="#FF5F00" />
                        </svg>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" fill="#006FCF" rx="4" />
                          <path d="M12 7.5v9M8.5 12h7" stroke="white" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Technical Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12"
        >
          <Card className="backdrop-blur-lg bg-white/95 dark:bg-slate-900/85 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                Informations techniques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50/50 to-teal-50/50 dark:from-slate-800/30 dark:to-teal-900/30 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-2 text-base">Immatriculation</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{car.immatriculation}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50/50 to-teal-50/50 dark:from-slate-800/30 dark:to-teal-900/30 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-2 text-base">Quantité disponible</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{car.quantity}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-50/50 to-teal-50/50 dark:from-slate-800/30 dark:to-teal-900/30 border border-teal-100/50 dark:border-teal-800/30 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-2 text-base">ID véhicule</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{car.id_voiture}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default CarDetail