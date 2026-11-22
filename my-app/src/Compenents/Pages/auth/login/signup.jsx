
import { useState, useEffect, useRef } from "react";
import { FaGoogle, FaApple, FaLinkedin } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowLeft, Loader2 } from "lucide-react";
import image from "../../../../Image/flayer.png";
import { gsap } from "gsap";
import ModeToggle from "../../../global/Header.jsx/mode-toogle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupFullScreen() {
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const buttonRefs = useRef([]);
  const welcomeRef = useRef(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    adresse: "",
    permis_conduire: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const API_URL = import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app/api";

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError("");
  };

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidPermisConduire = (permis) => {
    return permis.length >= 6;
  };

  // Auto-login after signup
  const autoLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { user, token, user_type } = response.data;

      // Handle both Client and Admin user types
      const userId = user.id_client || user.id;
      if (!userId) {
        throw new Error("User ID not found in response");
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          name: `${user.prenom || ''} ${user.nom || ''}`.trim(),
          prenom: user.prenom || '',
          nom: user.nom || '',
          email: user.email,
          user_type: user_type || 'client',
        })
      );
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      console.error("Auto-login failed:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message === 'Invalid credentials'
          ? "Échec de la connexion automatique : identifiants invalides."
          : "Connexion automatique échouée. Veuillez vous connecter manuellement."
      );
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!formData.nom) {
      setError("Le nom est requis.");
      return;
    }
    if (!formData.prenom) {
      setError("Le prénom est requis.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!isValidPassword(formData.password)) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!isValidPermisConduire(formData.permis_conduire)) {
      setError("Le permis de conduire doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        telephone: formData.telephone,
        adresse: formData.adresse,
        permis_conduire: formData.permis_conduire,
      });

      setSignupSuccess(true);
      toast.success("Inscription réussie !");

      // Auto-login to set user and token
      const loginSuccess = await autoLogin(formData.email, formData.password);
      setTimeout(() => {
        navigate(loginSuccess ? "/client-dashboard" : "/login");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(" ") || "Erreur de validation des données.");
      } else if (err.response?.status === 405) {
        setError("Méthode non autorisée. Veuillez vérifier la configuration du serveur.");
      } else if (err.response?.status === 500) {
        setError("Erreur serveur. Veuillez réessayer plus tard.");
      } else {
        setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
      }
      toast.error("Échec de l'inscription. Veuillez vérifier les erreurs.");
    } finally {
      if (!signupSuccess) setIsLoading(false);
    }
  };

  // Handle social login (placeholder)
  const handleSocialLogin = (provider) => {
    setError(`Connexion avec ${provider} non implémentée.`);
    toast.error(`Connexion avec ${provider} non disponible.`);
  };

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: "back.out(1.2)" }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: "back.out(1)", delay: 0.2 }
    );
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );
    buttonRefs.current.forEach((btn, index) => {
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0.9, opacity: 0, y: 10 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
            delay: 0.4 + index * 0.1,
          }
        );
      }
    });
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{ height: `${windowSize.height}px` }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-custom-blue via-primary-light to-accent dark:from-obsidian-dark dark:via-custom-blue dark:to-accent-light animate-gradient-shift"></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
          <div className="absolute top-3/4 -left-20 w-64 h-64 rounded-full bg-custom-blue/20 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/10 w-40 h-40 rounded-full bg-custom-olive/20 blur-3xl"></div>
        </div>
        <div
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A2F5C 1px, transparent 1px),
              linear-gradient(to bottom, #0A2F5C 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Content */}
      <TooltipProvider>
        <div className="relative z-10 w-full max-w-5xl mx-4 flex items-center justify-center">
          <ModeToggle />
          <div className="w-full rounded-2xl shadow-lg overflow-hidden backdrop-blur-md">
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-light/90 dark:bg-obsidian/90 border border-white/20 dark:border-obsidian-light/20">
              {/* Image Section */}
              <div
                ref={imageRef}
                className="hidden md:block w-full md:w-5/12 bg-gradient-to-br from-custom-blue to-accent relative overflow-hidden"
                style={{ maxHeight: `${windowSize.height - 40}px` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-custom-blue/40 to-accent/70 z-10" />
                <img
                  src={image}
                  alt="Signup visual"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
                <div
                  ref={welcomeRef}
                  className="absolute inset-0 flex flex-col justify-center items-center z-20 p-8"
                >
                  <div className="text-light text-center">
                    <h2 className="text-3xl font-bold mb-4 font-display">Bienvenue</h2>
                    <p className="text-lg opacity-90 max-w-xs mb-6">
                      Créez votre compte pour commencer votre expérience avec nous.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-light/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <svg
                            className="w-5 h-5 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-light/90 text-base">Inscription sécurisée</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-light/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <svg
                            className="w-5 h-5 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-light/90 text-base">Expérience personnalisée</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-light/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <svg
                            className="w-5 h-5 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-light/90 text-base">Fonctionnalités premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div
                ref={formRef}
                className="w-full md:w-7/12 bg-light/95 dark:bg-obsidian/95"
                style={{ maxHeight: `${windowSize.height - 40}px`, overflowY: "auto" }}
              >
                <Card className="border-0 shadow-none h-full bg-transparent">
                  <CardHeader className="space-y-1 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-custom-blue bg-clip-text text-transparent dark:from-accent dark:to-custom-blue font-display">
                        Inscription
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            ref={(el) => (buttonRefs.current[0] = el)}
                            className="text-metal dark:text-metal-light hover:text-primary dark:hover:text-accent"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Retour
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Revenir à la page précédente</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CardDescription className="text-sm text-metal dark:text-metal-light">
                      Créez votre compte pour accéder à nos services.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6">
                    {error && (
                      <Alert
                        variant="destructive"
                        className="mb-4 border-l-4 border-l-destructive"
                      >
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {signupSuccess ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-custom-blue/40 rounded-full flex items-center justify-center mb-4 dark:from-accent/50 dark:to-custom-blue/70 animate-pulse">
                          <svg
                            className="w-8 h-8 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-primary dark:text-light font-display">
                          Inscription réussie !
                        </h3>
                        <p className="text-metal dark:text-metal-light text-center">
                          Redirection vers {localStorage.getItem("token") ? "votre tableau de bord..." : "la page de connexion..."}
                        </p>
                        <div className="mt-4 w-full max-w-xs bg-metal/20 dark:bg-metal-light/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-accent to-custom-blue h-2 rounded-full transition-all duration-1500 ease-in-out animate-pulse"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Nom Field */}
                          <div className="space-y-1">
                            <Label
                              htmlFor="nom"
                              className="text-primary dark:text-light text-sm font-medium"
                            >
                              Nom
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                                <User className="h-4 w-4" />
                              </div>
                              <Input
                                id="nom"
                                name="nom"
                                type="text"
                                placeholder="Votre nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                                required
                              />
                            </div>
                          </div>

                          {/* Prenom Field */}
                          <div className="space-y-1">
                            <Label
                              htmlFor="prenom"
                              className="text-primary dark:text-light text-sm font-medium"
                            >
                              Prénom
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                                <User className="h-4 w-4" />
                              </div>
                              <Input
                                id="prenom"
                                name="prenom"
                                type="text"
                                placeholder="Votre prénom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="email"
                            className="text-primary dark:text-light text-sm font-medium"
                          >
                            Adresse email
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                              <Mail className="h-4 w-4" />
                            </div>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                              required
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="password"
                            className="text-primary dark:text-light text-sm font-medium"
                          >
                            Mot de passe
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                              <Lock className="h-4 w-4" />
                            </div>
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={handleChange}
                              className="pl-10 pr-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-metal dark:text-metal-light hover:text-primary dark:hover:text-accent"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-primary dark:text-light text-sm font-medium"
                          >
                            Confirmer le mot de passe
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                              <Lock className="h-4 w-4" />
                            </div>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="pl-10 pr-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-metal dark:text-metal-light hover:text-primary dark:hover:text-accent"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Telephone Field */}
                          <div className="space-y-1">
                            <Label
                              htmlFor="telephone"
                              className="text-primary dark:text-light text-sm font-medium"
                            >
                              Téléphone
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                                <Phone className="h-4 w-4" />
                              </div>
                              <Input
                                id="telephone"
                                name="telephone"
                                type="tel"
                                placeholder="Votre téléphone"
                                value={formData.telephone}
                                onChange={handleChange}
                                className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Permis Conduire Field */}
                          <div className="space-y-1">
                            <Label
                              htmlFor="permis_conduire"
                              className="text-primary dark:text-light text-sm font-medium"
                            >
                              Permis de conduire
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                                <User className="h-4 w-4" />
                              </div>
                              <Input
                                id="permis_conduire"
                                name="permis_conduire"
                                type="text"
                                placeholder="Numéro de permis"
                                value={formData.permis_conduire}
                                onChange={handleChange}
                                className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Adresse Field */}
                        <div className="space-y-1">
                          <Label
                            htmlFor="adresse"
                            className="text-primary dark:text-light text-sm font-medium"
                          >
                            Adresse
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-metal-light">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <Input
                              id="adresse"
                              name="adresse"
                              type="text"
                              placeholder="Votre adresse"
                              value={formData.adresse}
                              onChange={handleChange}
                              className="pl-10 h-10 bg-white dark:bg-obsidian-light text-primary dark:text-light border-primary/30 dark:border-accent/30 focus:border-primary focus:dark:border-accent rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-primary to-custom-blue hover:from-custom-blue hover:to-primary text-light py-2 h-10 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:translate-y-px disabled:opacity-70 group"
                          ref={(el) => (buttonRefs.current[1] = el)}
                        >
                          {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          ) : (
                            <span className="relative z-10">S'inscrire</span>
                          )}
                          <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                        </Button>

                        {/* Social Login */}
                        <div className="relative mt-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-metal/30 dark:border-metal-light/30"></div>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-light dark:bg-obsidian text-metal dark:text-metal-light">
                              Ou continuer avec
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full flex items-center justify-center h-10 bg-white dark:bg-obsidian-light border-primary/30 dark:border-accent/30 text-primary dark:text-accent hover:bg-custom-blue/5 dark:hover:bg-accent/10 rounded-lg"
                                onClick={() => handleSocialLogin("Google")}
                                ref={(el) => (buttonRefs.current[2] = el)}
                                disabled
                              >
                                <FaGoogle className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Se connecter avec Google</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full flex items-center justify-center h-10 bg-white dark:bg-obsidian-light border-primary/30 dark:border-accent/30 text-primary dark:text-accent hover:bg-custom-blue/5 dark:hover:bg-accent/10 rounded-lg"
                                onClick={() => handleSocialLogin("Apple")}
                                ref={(el) => (buttonRefs.current[3] = el)}
                                disabled
                              >
                                <FaApple className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Se connecter avec Apple</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full flex items-center justify-center h-10 bg-white dark:bg-obsidian-light border-primary/30 dark:border-accent/30 text-primary dark:text-accent hover:bg-custom-blue/5 dark:hover:bg-accent/10 rounded-lg"
                                onClick={() => handleSocialLogin("LinkedIn")}
                                ref={(el) => (buttonRefs.current[4] = el)}
                                disabled
                              >
                                <FaLinkedin className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Se connecter avec LinkedIn</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </form>
                    )}
                  </CardContent>

                  <CardFooter className="pb-6 pt-2">
                    <p className="w-full text-center text-xs text-metal dark:text-metal-light">
                      Déjà un compte ?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary dark:text-accent hover:text-custom-blue dark:hover:text-custom-blue hover:underline"
                      >
                        Se connecter
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>

      {/* Custom CSS */}
      <style jsx global>{`
        .bg-gradient-radial {
          background: radial-gradient(
            circle at center,
            var(--tw-gradient-from) 0%,
            var(--tw-gradient-to) 100%
          );
        }

        .animate-gradient-shift {
          background-size: 200% 100%;
          animation: gradientShift 15s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.2);
          border-radius: 20px;
        }

        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.2) transparent;
        }
      `}</style>
    </div>
  );
}
