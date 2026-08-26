import { useState, useEffect, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeToogle from '../../global/Header.jsx/mode-toogle'
import { gsap } from "gsap";

export default function ContactSection() {
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  // Coordinates for Casablanca
  const location = {
    lat: 33.5731,
    lng: -7.5898,
    address: "123 Boulevard Mohammed V, Casablanca 20250, Maroc"
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (basic)
  const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Veuillez entrer votre nom.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Veuillez entrer un message.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSuccess(true);
      toast.success("Message envoyé avec succès ! Nous vous contacterons bientôt.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      toast.error("Échec de l'envoi du message. Veuillez réessayer.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP animations
  useEffect(() => {
    if (formRef.current && mapRef.current && infoRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-light dark:bg-obsidian flex items-center justify-center">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-custom-blue/80 via-accent/50 to-primary/80 dark:from-obsidian dark:via-custom-blue/30 dark:to-accent/50"></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[linear-gradient(to_right,#6E7E91_1px,transparent_1px),linear-gradient(to_bottom,#6E7E91_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Content - Optimized */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary dark:text-accent mb-8 mt-12">
          Contactez-nous
          <ModeToogle className="ml-4" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)] max-h-[800px]">
          {/* Contact Form - Height adjusted */}
          <div ref={formRef} className="h-full overflow-y-auto">
            <Card className="bg-light/95 dark:bg-obsidian/95 border-0 shadow-lg h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-primary dark:text-accent">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-4 dark:bg-accent/50">
                      <svg
                        className="w-10 h-10 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-primary dark:text-light">
                      Message envoyé !
                    </h3>
                    <p className="text-metal dark:text-metal-light text-center">
                      Nous vous contacterons bientôt.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-primary dark:text-light">
                        Nom
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary dark:border-accent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary dark:text-light">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary dark:border-accent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary dark:text-light">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+212 5 XX XX XX XX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary dark:border-accent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-primary dark:text-light">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Votre message..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary dark:border-accent min-h-[150px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-primary to-custom-blue hover:from-custom-blue hover:to-primary text-light"
                    >
                      {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map and Info - Height adjusted */}
          <div ref={mapRef} className="h-full">
            <Card className="bg-light/95 dark:bg-obsidian/95 border-0 shadow-lg h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="h-1/2">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01}%2C${location.lat - 0.01}%2C${location.lng + 0.01}%2C${location.lat + 0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                    className="filter grayscale contrast-[90%] hue-rotate-180"
                  />
                </div>
                <div ref={infoRef} className="p-4 flex-1 overflow-y-auto">
                  <h3 className="text-lg font-bold text-primary dark:text-accent mb-3">
                    Nos coordonnées
                  </h3>
                  <div className="space-y-3 text-sm">
                    {/* Contact Info - Compact */}
                    <div className="flex items-center space-x-2">                      <FaPhone className="text-accent w-4 h-4" />
                      <p className="text-metal dark:text-metal-light">+212 5 22 12 34 56</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-accent w-4 h-4" />
                      <p className="text-metal dark:text-metal-light">contact@luxurycarrentals.ma</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-accent w-4 h-4" />
                      <p className="text-metal dark:text-metal-light">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  {/* Social Links - Compact */}
                  <div className="mt-4">
                    <h4 className="text-base font-semibold text-primary dark:text-accent mb-2">
                      Suivez-nous
                    </h4>
                    <div className="flex space-x-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-custom-blue"
                      >
                        <FaFacebook className="w-6 h-6" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-custom-blue"
                      >
                        <FaTwitter className="w-6 h-6" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-custom-blue"
                      >
                        <FaInstagram className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=17/${location.lat}/${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline inline-flex items-center"
                    >
                      <FaMapMarkerAlt className="mr-1" /> Voir en grand
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}