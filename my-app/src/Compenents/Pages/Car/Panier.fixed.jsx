import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, XCircle, CheckCircle, Trash2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

  const fetchLocations = useCallback(async () => {
    if (!user?.id) {
      setError("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

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
  }, [user?.id, API_URL]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleConfirmAll = useCallback(async () => {
    if (!confirm("Confirmer toutes les réservations en attente ?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const pendingLocations = locations.filter(loc => loc.statut === "en attente");

      for (const loc of pendingLocations) {
        try {
          await axios.put(
            `${API_URL}/locations/confirm/${loc.id_location}`,
            {
              statut: "confirmée",
              status: "Accepted"
            },
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );

          toast.success(
            `🎉 Félicitations ${user?.name || ""}!\nVotre réservation de la ${loc.voiture?.modele} est confirmée.\nBonne route! 🚗`,
            { duration: 5000 }
          );
        } catch (locError) {
          console.error(`Error confirming location ${loc.id_location}:`, locError);
          toast.error(`Erreur lors de la confirmation pour ${loc.voiture?.modele}`);
        }
      }

      await fetchLocations();
    } catch (e) {
      setError("Erreur lors de la confirmation des réservations.");
      console.error("Confirm error:", e);
      toast.error("Erreur lors de la confirmation.");
    } finally {
      setLoading(false);
    }
  }, [locations, API_URL, user?.name, fetchLocations]);

  // ... Rest of your component code ...

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Votre Panier</CardTitle>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            <>
              {locations.map((loc) => (
                <div key={loc.id_location} className="mb-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3>{loc.voiture?.modele}</h3>
                      <p>Statut: {loc.statut}</p>
                      <p>Prix: {loc.montant_total}€</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleConfirmAll}
                  disabled={loading || !locations.some(loc => loc.statut === "en attente")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmer tout
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
