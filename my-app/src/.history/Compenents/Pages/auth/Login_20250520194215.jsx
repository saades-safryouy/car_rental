import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from '../../../Image/flayer.png';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../../../Compenents/global/Header.jsx/mode-toogle";

export default function Login({ onLogin }) {
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const buttonRefs = useRef([]);
  const welcomeRef = useRef(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError("");
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { user, token, user_type } = response.data;
      // Combine prenom and nom for name
      const fullName = `${user.prenom} ${user.nom}`.trim();
      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({
        id: user.id_client, // Use id_client instead of id
        name: fullName, // Store combined name for Header.jsx
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        user_type: user_type,
      }));
      localStorage.setItem("isLoggedIn", "true");
      setLoginSuccess(true);
      if (onLogin) onLogin(user);
      if (user_type === 'admin') {
        window.location.href = 'http://127.0.0.1:8000/admin/dashboard';
      } else {
        window.location.href = '/client-dashboard';
      }
    } catch (err) {
      console.error("Login error:", err.response);
      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data.errors || {};
          setError(Object.values(errors).flat().join(" ") || "Invalid email or password.");
        } else if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("Unable to connect to the server. Please check your network.");
      }
    } finally {
      if (!loginSuccess) setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    }
  };

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(imageRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
    );
    buttonRefs.current.forEach((btn, index) => {
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.5 + index * 0.1 }
        );
      }
    });
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden mt-10">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-custom-blue via-accent to-primary dark:from-obsidian dark:via-custom-blue dark:to-accent animate-gradient-shift"></div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full bg-custom-blue/10 blur-3xl"></div>
          <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] rounded-full bg-secondary/10 blur-3xl"></div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #6E7E91 1px, transparent 1px),
              linear-gradient(to bottom, #6E7E91 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent transform -rotate-[15deg]"></div>
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-custom-blue/20 to-transparent transform rotate-[10deg]"></div>
          <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent transform -rotate-[5deg]"></div>
          <div className="absolute top-[80%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-custom-blue/20 to-transparent transform rotate-[20deg]"></div>
        </div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-light/40 dark:to-obsidian/40"></div>
      </div>
      <ModeToggle />

      {/* Content */}
      <TooltipProvider>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-5xl rounded-2xl shadow-card overflow-hidden backdrop-blur-md">
            <div className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-light/95 dark:bg-obsidian/95">
              {/* Image Section */}
              <div
                ref={imageRef}
                className="hidden md:block w-full md:w-5/12 bg-primary relative overflow-hidden min-h-[400px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/80 z-10" />
                <img
                  src={image}
                  alt="Luxury car visual"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div ref={welcomeRef} className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12">
                  <div className="text-white text-center">
                    <h2 className="text-4xl font-sans font-bold mb-4">Welcome Back</h2>
                    <p className="text-xl opacity-90 max-w-md">
                      Sign in to access your Diamond Luxury Rentals account and explore our elite fleet.
                    </p>
                    <div className="mt-12 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90">Secure Login</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90">Instant Access</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90">VIP Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div ref={formRef} className="w-full md:w-7/12 bg-light/95 dark:bg-obsidian/95">
                <Card className="border-0 shadow-none h-full bg-transparent">
                  <CardHeader className="space-y-1 pt-8">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl font-sans font-bold text-primary dark:text-accent">
                        Sign In
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            ref={(el) => (buttonRefs.current[0] = el)}
                            className="text-metal dark:text-text-light hover:text-accent dark:hover:text-accent hover:animate-pulse-scale"
                          >
                            ← Back
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Return to previous page</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CardDescription className="text-center text-metal dark:text-text-light">
                      Enter your credentials to access your account.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-8">
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {loginSuccess ? (
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
                        <h3 className="text-2xl font-sans font-semibold mb-2 text-primary dark:text-white">
                          Login Successful!
                        </h3>
                        <p className="text-metal dark:text-text-light text-center">
                          Redirecting to dashboard...
                        </p>
                        <div className="mt-6 w-full max-w-xs bg-metal/20 dark:bg-metal/20 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-accent to-primary h-1.5 rounded-full transition-all duration-1500 ease-in-out"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-primary dark:text-text-light">
                            Email Address
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-text-light">
                              <Mail className="h-5 w-5" />
                            </div>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="pl-10 bg-light dark:bg-obsidian text-text dark:text-text-light border-muted focus:ring-accent rounded-md"
                              required
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-primary dark:text-text-light">
                            Password
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-metal dark:text-text-light">
                              <Lock className="h-5 w-5" />
                            </div>
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={handleChange}
                              className="pl-10 pr-10 bg-light dark:bg-obsidian text-text dark:text-text-light border-muted focus:ring-accent rounded-md"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-metal dark:text-text-light hover:text-accent dark:hover:text-accent"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                          <a
                            href="/forgot-password"
                            className="text-sm text-primary dark:text-accent hover:text-secondary dark:hover:text-secondary hover:underline hover:animate-pulse-scale"
                          >
                            Forgot Password?
                          </a>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-medium shadow-button rounded-md hover:animate-pulse-scale"
                          ref={(el) => (buttonRefs.current[1] = el)}
                        >
                          {isLoading ? (
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : null}
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    )}
                  </CardContent>

                  <CardFooter className="pb-8">
                    <p className="w-full text-center text-sm text-metal dark:text-text-light">
                      Don’t have an account?{" "}
                      <a
                        href="/signup"
                        className="font-medium text-primary dark:text-accent hover:text-secondary dark:hover:text-secondary hover:underline hover:animate-pulse-scale"
                      >
                        Sign Up
                      </a>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}