import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, XCircle, CheckCircle, Trash2, ArrowLeft, MessageSquare, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ModeToggle from "../../../Compenents/global/Header.jsx/mode-toogle";


export default function Panier() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
  });
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState({});
  const [loadingMessages, setLoadingMessages] = useState({});
  const [openCollapsibles, setOpenCollapsibles] = useState({}); // New state for collapsible open/close

  const API_URL = import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app/api";

  const fetchLocations = useCallback(
    async () => {
      if (!user?.id) {
        setError("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/locations/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setError("Erreur lors du chargement des réservations.");
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, API_URL]
  );

  const fetchMessages = useCallback(
    async (id_location) => {
      try {
        setLoadingMessages((prev) => ({ ...prev, [id_location]: true }));
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/messages/${id_location}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages((prev) => ({
          ...prev,
          [id_location]: Array.isArray(res.data) ? res.data : [],
        }));
      } catch (e) {
        console.error("Fetch messages error:", e);
        toast.error("Erreur lors du chargement des messages.");
      } finally {
        setLoadingMessages((prev) => ({ ...prev, [id_location]: false }));
      }
    },
    [API_URL]
  );

  const sendMessage = useCallback(
    async (id_location) => {
      const message = messageInput[id_location]?.trim();
      if (!message) {
        toast.error("Le message ne peut pas être vide.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${API_URL}/messages`,
          {
            id_location,
            content: message,
            sender: "user",
          },
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        );
        setMessageInput((prev) => ({ ...prev, [id_location]: "" }));
        await fetchMessages(id_location);
        toast.success("Message envoyé avec succès.");
      } catch (e) {
        console.error("Send message error:", e);
        toast.error("Erreur lors de l'envoi du message.");
      }
    },
    [messageInput, API_URL, fetchMessages]
  );

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const checkAvailability = useCallback(
    async (id_voiture, date_debut, date_fin) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/locations/check-availability/${id_voiture}?start=${date_debut}&end=${date_fin}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res.data.available;
      } catch (e) {
        console.error("Availability check error:", e);
        return false;
      }
    },
    [API_URL]
  );

  const handleCancel = useCallback(
    async (id_location) => {
      if (!confirm("Voulez-vous vraiment annuler cette réservation ?")) return;

      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/locations/${id_location}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations((prev) => prev.filter((loc) => loc.id_location !== id_location));
        toast.success("Réservation annulée avec succès.");
      } catch (e) {
        setError("Erreur lors de l'annulation de la réservation.");
        console.error("Cancel error:", e);
        toast.error("Erreur lors de l'annulation.");
      }
    },
    [API_URL]
  );

  const handleConfirmAll = useCallback(
    async () => {
      if (!confirm("Confirmer toutes les réservations en attente ?")) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const pendingLocations = locations.filter(
          (loc) => loc.statut === "en attente" || loc.statut === "En cours"
        );

        for (const loc of pendingLocations) {
          try {
            const isAvailable = await checkAvailability(loc.id_voiture, loc.date_debut, loc.date_fin);
            if (!isAvailable) {
              toast.error(`Véhicule ${loc.voiture?.modele} indisponible pour les dates sélectionnées.`);
              continue;
            }

            await axios.put(
              `${API_URL}/locations/confirm/${loc.id_location}`,
              {
                statut: "confirmée",
                status: "Accepted",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const successMessage = (
              <div className="space-y-2">
                <div className="font-bold text-lg">🎉 Félicitations {user.name} !</div>
                <div>
                  Votre réservation de la {loc.voiture?.marque?.nom_marque} {loc.voiture?.modele} est confirmée !
                </div>
                <div className="text-sm text-teal-600">
                  Nous vous souhaitons une excellente expérience de conduite avec votre nouvelle voiture de luxe.
                </div>
              </div>
            );
            toast.success(successMessage, { duration: 6000 });
          } catch (locError) {
            console.error(`Error confirming location ${loc.id_location}:`, locError);
            toast.error(`Erreur lors de la confirmation pour ${loc.voiture?.modele}`);
          }
        }

        await fetchLocations();
        if (pendingLocations.length > 0) {
          toast.success("Toutes les réservations ont été traitées avec succès ! 🚗", { duration: 4000 });
        }
      } catch (e) {
        setError("Erreur lors de la confirmation des réservations.");
        console.error("Confirm error:", e);
        toast.error("Erreur lors de la confirmation.");
      } finally {
        setLoading(false);
      }
    },
    [locations, checkAvailability, fetchLocations, API_URL, user?.name]
  );

  const handleClearCart = useCallback(
    async () => {
      if (!confirm("Voulez-vous supprimer toutes les réservations en attente ?")) return;

      try {
        const token = localStorage.getItem("token");
        const pendingLocations = locations.filter((loc) => loc.statut === "en attente");

        for (const loc of pendingLocations) {
          await axios.delete(`${API_URL}/locations/${loc.id_location}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        await fetchLocations();
        toast.success("Panier vidé avec succès.");
      } catch (e) {
        setError("Erreur lors du vidage du panier.");
        console.error("Clear cart error:", e);
        toast.error("Erreur lors du vidage du panier.");
      }
    },
    [locations, fetchLocations, API_URL]
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    try {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(dateString));
    } catch (e) {
      return "Date invalide";
    }
  };

  const totalAmount = locations
    .reduce((sum, loc) => {
      const montant = parseFloat(loc.montant_total) || 0;
      return sum + montant;
    }, 0)
    .toFixed(2);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-8 text-center"
      >
        <Card className="bg-white/90 dark:bg-obsidian/90 shadow-2xl rounded-3xl backdrop-blur-lg">
          <CardContent className="p-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-slate-900 dark:text-white font-semibold">
              Veuillez vous connecter pour voir votre panier.
            </p>
            <Button
              asChild
              className="mt-6 bg-teal-500 text-white hover:bg-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/login">Se connecter</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto p-8 text-center"
      >
        <Card className="bg-white/90 dark:bg-obsidian/90 shadow-2xl rounded-3xl backdrop-blur-lg">
          <CardContent className="p-8 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
            <p className="mt-4 text-slate-900 dark:text-white font-medium">Chargement des réservations...</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-8 text-center"
      >
        <Card className="bg-white/90 dark:bg-obsidian/90 shadow-2xl rounded-3xl backdrop-blur-lg">
          <CardContent className="p-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-red-500 font-semibold">{error}</p>
            <Button
              onClick={fetchLocations}
              className="mt-6 bg-teal-500 text-white hover:bg-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-teal-100 dark:from-slate-900 dark:to-teal-950 shadow-2xl"
    >
      <ModeToggle/>
      <Card className="bg-bl dark:bg-obsidian/95 shadow-2xl max-w-4xl mx-auto rounded-3xl backdrop-blur-lg overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/vehicles">
                <Button
                  variant="ghost"
                  className="text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-full"
                  aria-label="Retour aux véhicules"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
              </Link>
              <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">
                Votre Panier
                {locations.length > 0 && (
                  <Badge className="ml-3 bg-teal-500 text-white">{locations.length}</Badge>
                )}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {locations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-6">
                Votre panier est vide.
              </p>
              <Button
                asChild
                className="bg-teal-500 text-white hover:bg-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/vehicles">Découvrir nos véhicules</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {locations.map((loc) => (
                  <motion.div
                    key={loc.id_location}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          {loc.voiture?.imageFront ? (
                            <img
                              src={
                                loc.voiture.imageFront.startsWith("http")
                                  ? loc.voiture.imageFront
                                  : `${API_URL.replace("/api", "")}/storage/${loc.voiture.imageFront.replace(
                                      /^\/storage\//,
                                      ""
                                    )}`
                              }
                              alt={loc.voiture?.modele || "Véhicule"}
                              className="w-32 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                              onError={(e) => (e.target.src = "https://placehold.co/128x80?text=No+Image")}
                            />
                          ) : (
                            <img
                              src="https://placehold.co/128x80?text=No+Image"
                              alt="No Image"
                              className="w-32 h-20 rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {loc.voiture?.modele || "Modèle inconnu"}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Du {formatDate(loc.date_debut)} au {formatDate(loc.date_fin)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={`${
                                  loc.statut === "confirmée"
                                    ? "bg-green-500"
                                    : loc.statut === "en attente"
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                                } text-white`}
                              >
                                {loc.statut || "Inconnu"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-lg font-bold text-teal-500 dark:text-teal-400">
                              {loc.montant_total ? `${loc.montant_total} €` : "Prix indisponible"}
                            </p>
                            {loc.statut === "en attente" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancel(loc.id_location)}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                                aria-label="Annuler la réservation"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Annuler
                              </Button>
                            )}
                          </div>
                        </div>
                        <Collapsible
                          open={openCollapsibles[loc.id_location] || false}
                          onOpenChange={(open) =>
                            setOpenCollapsibles((prev) => ({ ...prev, [loc.id_location]: open }))
                          }
                          className="mt-4"
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                if (!messages[loc.id_location]) {
                                  fetchMessages(loc.id_location);
                                }
                              }}
                              className="w-full justify-between text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50"
                            >
                              <span className="flex items-center">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Messages
                                {messages[loc.id_location]?.length > 0 && (
                                  <Badge className="ml-2 bg-blue-500 text-white">
                                    {messages[loc.id_location].length}
                                  </Badge>
                                )}
                              </span>
                              <span>{openCollapsibles[loc.id_location] ? "Masquer" : "Afficher"}</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-4">
                            {loadingMessages[loc.id_location] ? (
                              <div className="text-center">
                                <Loader2 className="w-6 h-6 text-teal-500 animate-spin mx-auto" />
                                <p>Chargement des messages...</p>
                              </div>
                            ) : messages[loc.id_location]?.length > 0 ? (
                              <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-100 dark:bg-gray-700">
                                {messages[loc.id_location].map((msg) => (
                                  <div
                                    key={msg.id}
                                    className={`p-2 rounded-md ${
                                      msg.sender === "user"
                                        ? "bg-teal-100 dark:bg-teal-600/50 text-right"
                                        : "bg-gray-200 dark:bg-gray-600 text-left"
                                    }`}
                                  >
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{msg.content}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDate(msg.created_at)} - {msg.sender === "user" ? "Vous" : "Support"}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Aucun message pour cette réservation.
                              </p>
                            )}                            <div className="flex items-center space-x-2">
                              <Input
                                value={messageInput[loc.id_location] || ""}
                                onChange={(e) =>
                                  setMessageInput((prev) => ({
                                    ...prev,
                                    [loc.id_location]: e.target.value,
                                  })
                                )}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && messageInput[loc.id_location]?.trim()) {
                                    sendMessage(loc.id_location);
                                  }
                                }}
                                placeholder="Écrire un message..."
                                className="flex-grow rounded-lg"
                              />
                              <Button
                                onClick={() => sendMessage(loc.id_location)}
                                disabled={!messageInput[loc.id_location]?.trim()}
                                className={`ml-2 rounded-lg shadow-sm ${
                                  messageInput[loc.id_location]?.trim()
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                                }`}
                                aria-label="Envoyer le message"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Résumé du Panier</h3>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    Total ({locations.length} {locations.length === 1 ? "réservation" : "réservations"})
                  </p>
                  <p className="text-2xl font-bold text-teal-500 dark:text-teal-400">
                    {Number(totalAmount).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={handleConfirmAll}
                    disabled={loading || !locations.some((loc) => loc.statut === "en attente")}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                    aria-label="Confirmer toutes les réservations"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmer tout
                  </Button>
                  <Button
                    onClick={handleClearCart}
                    disabled={loading || !locations.some((loc) => loc.statut === "en attente")}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-600 hover:border-red-600 rounded-xl shadow-lg flex-1"
                    aria-label="Vider le panier"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vider le panier
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}