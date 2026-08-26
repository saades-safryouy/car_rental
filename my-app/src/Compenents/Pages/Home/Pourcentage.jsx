import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Gift, Calendar, ArrowRight, Copy, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import image from '../../../Image/offre.jpeg'
import { Link } from "react-router-dom"

// Sample promotional offers
const promotions = [
  {
    id: "weekend-luxury",
    title: "Week-end de Luxe",
    description: "Profitez d'une réduction de 25% sur toutes les locations de voitures de luxe pour le week-end",
    discount: "25%",
    code: "WEEKEND25",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    image: image,
    tag: "Populaire",
    category: "weekend",
    featured: true,
  },
  {
    id: "premium-upgrade",
    title: "Surclassement Premium",
    description: "Réservez une voiture standard et bénéficiez d'un surclassement gratuit vers un modèle premium",
    discount: "Gratuit",
    code: "UPGRADE23",
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    image: "/placeholder.svg?height=300&width=500",
    tag: "Exclusif",
    category: "upgrade",
    featured: true,
  },
  {
    id: "long-term",
    title: "Location Longue Durée",
    description: "Économisez jusqu'à 35% sur les locations de 7 jours ou plus avec notre tarif spécial",
    discount: "35%",
    code: "LONG35",
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    image: "/placeholder.svg?height=300&width=500",
    tag: "Économie",
    category: "long-term",
    featured: false,
  },
  {
    id: "first-booking",
    title: "Première Réservation",
    description: "Nouveau client ? Profitez de 15% de réduction sur votre première location",
    discount: "15%",
    code: "FIRST15",
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    image: "/placeholder.svg?height=300&width=500",
    tag: "Nouveaux Clients",
    category: "first-time",
    featured: false,
  },
  {
    id: "business-class",
    title: "Offre Business Class",
    description: "Forfait spécial pour les professionnels avec chauffeur et services VIP inclus",
    discount: "20%",
    code: "BIZ20",
    validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    image: "/placeholder.svg?height=300&width=500",
    tag: "Business",
    category: "business",
    featured: true,
  },
]

export default function SpecialOffersSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [copiedCode, setCopiedCode] = useState("")
  const [timeLeft, setTimeLeft] = useState({})

  // Calculate time remaining for each promotion
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const newTimeLeft = {}

      promotions.forEach((promo) => {
        const difference = promo.validUntil - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
          const minutes = Math.floor((difference / 1000 / 60) % 60)

          newTimeLeft[promo.id] = { days, hours, minutes }
        } else {
          newTimeLeft[promo.id] = { days: 0, hours: 0, minutes: 0 }
        }
      })

      setTimeLeft(newTimeLeft)
    }, 60000) // Update every minute

    // Initial calculation
    const now = new Date()
    const initialTimeLeft = {}

    promotions.forEach((promo) => {
      const difference = promo.validUntil - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)

        initialTimeLeft[promo.id] = { days, hours, minutes }
      } else {
        initialTimeLeft[promo.id] = { days: 0, hours: 0, minutes: 0 }
      }
    })

    setTimeLeft(initialTimeLeft)

    return () => clearInterval(timer)
  }, [])

  // Copy promo code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  // Filter promotions based on active tab
  const filteredPromotions =
    activeTab === "all" ? promotions : promotions.filter((promo) => promo.category === activeTab)

  // Featured promotions
  const featuredPromotions = promotions.filter((promo) => promo.featured)

  return (
    <section className="relative py-20 bg-gradient-to-br from-light via-background to-background dark:from-obsidian dark:via-obsidian-dark/90 dark:to-obsidian-dark min-h-screen overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 background-pattern opacity-5 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-professional mix-blend-overlay opacity-30 dark:opacity-20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-accent/10 dark:to-custom-blue/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-72 h-72 bg-gradient-to-tr from-secondary/10 to-custom-blue/10 dark:from-primary/10 dark:to-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-custom-blue/30 rounded-full blur-3xl" />

        {/* Section Header */}
        <div className="text-center mb-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 px-3 py-1 bg-gradient-aurora text-primary-foreground border-0">
              <Sparkles className="w-4 h-4 mr-1" />
              Offres Limitées
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-aurora">
                Offres Spéciales & Promotions
              </span>
            </h2>
            <p className="text-text-muted dark:text-text-light max-w-2xl mx-auto">
              Découvrez nos offres exclusives et profitez de réductions exceptionnelles sur notre flotte de véhicules de luxe.
            </p>
          </motion.div>
        </div>

        {/* Featured Promotions Carousel */}
        {featuredPromotions.length > 0 && (
          <div className="mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-tilt"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <Badge className="self-start mb-4 bg-card-glass text-text-light border-0">Offre Vedette</Badge>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">{featuredPromotions[0].title}</h3>
                  <p className="text-primary-foreground/80 mb-6">{featuredPromotions[0].description}</p>

                  <div className="bg-card-glass rounded-lg p-4 mb-6 backdrop-blur-glass">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-foreground/80 text-sm">Code Promo:</span>
                      <button
                        onClick={() => copyToClipboard(featuredPromotions[0].code)}
                        className="flex items-center text-primary-foreground hover:text-accent transition-colors"
                      >
                        {copiedCode === featuredPromotions[0].code ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" /> Copié
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" /> Copier
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-primary-foreground/20 rounded text-center py-2 font-mono text-primary-foreground text-lg">
                      {featuredPromotions[0].code}
                    </div>
                  </div>

                  {timeLeft[featuredPromotions[0].id] && (
                    <div className="mb-6">
                      <div className="text-primary-foreground/80 text-sm mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> Expire dans:
                      </div>
                      <div className="flex space-x-3">
                        <div className="bg-card-glass rounded px-3 py-2 text-center backdrop-blur-glass">
                          <div className="text-primary-foreground text-xl font-bold">{timeLeft[featuredPromotions[0].id].days}</div>
                          <div className="text-primary-foreground/70 text-xs">Jours</div>
                        </div>
                        <div className="bg-card-glass rounded px-3 py-2 text-center backdrop-blur-glass">
                          <div className="text-primary-foreground text-xl font-bold">{timeLeft[featuredPromotions[0].id].hours}</div>
                          <div className="text-primary-foreground/70 text-xs">Heures</div>
                        </div>
                        <div className="bg-card-glass Rounded px-3 py-2 text-center backdrop-blur-glass">
                          <div className="text-primary-foreground text-xl font-bold">
                            {timeLeft[featuredPromotions[0].id].minutes}
                          </div>
                          <div className="text-primary-foreground/70 text-xs">Minutes</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button className="bg-accent text-accent-foreground hover:bg-accent-light hover:text-accent-foreground transition-colors self-start shadow-button">
                    Réserver Maintenant <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10" />
                  <img
                    src={featuredPromotions[0].image || "/placeholder.svg"}
                    alt={featuredPromotions[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Promotion Tabs */}
        <div className="relative z-10">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted dark:bg-metal-dark p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full px-4 py-2 text-text dark:text-text-light data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Toutes les offres
                </TabsTrigger>
                <TabsTrigger value="weekend" className="rounded-full px-4 py-2 text-text dark:text-text-light data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Week-end
                </TabsTrigger>
                <TabsTrigger value="upgrade" className="rounded-full px-4 py-2 text-text dark:text-text-light data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Surclassement
                </TabsTrigger>
                <TabsTrigger value="business" className="rounded-full px-4 py-2 text-text dark:text-text-light data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Business
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromotions.map((promo) => (
                  <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full border-metal/30 dark:border-metal-dark bg-card dark:bg-card-glass backdrop-blur-glass transition-all duration-300 hover:shadow-neon group-hover:neon-glow">
                      <CardContent className="p-6">
                        <h3 className="font-display font-bold text-xl mb-2 text-primary dark:text-text-light">
                          {promo.title}
                        </h3>
                        <p className="text-text-muted dark:text-text-light mb-4 text-sm">
                          {promo.description}
                        </p>

                        <div className="flex items-center text-sm text-text-muted dark:text-text-light mb-4">
                          <Calendar className="w-4 h-4 mr-1 text-secondary dark:text-accent" />
                          <span>
                            Valable jusqu'au{" "}
                            {promo.validUntil.toLocaleDateString("fr-FR", { 
                              day: "numeric", 
                              month: "long" 
                            })}
                          </span>
                        </div>

                        {timeLeft[promo.id] && (
                          <div className="flex items-center justify-between text-xs text-text-muted dark:text-text-light">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-secondary dark:text-accent" /> 
                              Expire dans:
                            </div>
                            <div>
                              {timeLeft[promo.id].days} jours {timeLeft[promo.id].hours} heures
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 text-center relative z-10"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-aurora mb-6">
            <div className="bg-card dark:bg-card-glass rounded-full px-4 py-1 text-sm font-medium text-text dark:text-text-light backdrop-blur-glass">
              <Gift className="w-4 h-4 inline-block mr-1 text-accent" />
              Offres exclusives pour les membres
            </div>
          </div>
          <h3 className="text-2xl font-display font-bold mb-4 text-text dark:text-text-light">Rejoignez notre programme de fidélité</h3>
          <p className="text-text-muted dark:text-text-light max-w-2xl mx-auto mb-6">
            Inscrivez-vous à notre programme de fidélité et bénéficiez d'avantages exclusifs, de réductions
            supplémentaires et d'un accès prioritaire à nos nouvelles offres.
          </p>
          <Link to='/login'>
            <Button className="bg-gradient-aurora hover:bg-gradient-to-r hover:from-secondary hover:to-accent text-primary-foreground px-8 py-6 rounded-full text-lg shadow-button animate-pulse-scale">
              Devenir Membre Premium
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Add this style block at the end of your component */}
      <style jsx>{`
        .background-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
        }

        @media (prefers-color-scheme: dark) {
          .background-pattern {
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          }
        }

        .bg-gradient-professional {
          background: radial-gradient(
            circle at center,
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
  )
}