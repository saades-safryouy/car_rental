
===== my-app/src/Compenents/global/Header.jsx/Header.jsx =====
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ApplicationLogo from "@/components/ui/ApplicationLogo";
import { ModeToggle } from "./mode-toogle";
import { Home, Search, Info, Mail, ChevronDown, Menu, X, User, Newspaper, Globe, ShoppingCart, Heart } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);
  const [panierCount, setPanierCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { nom, user_type } = JSON.parse(storedUser);
      setUserName(nom);
      setUserType(user_type);
    }
  }, []);
  console.log("User type:", userType);

  // Example usage: show a badge if admin
  useEffect(() => {
    const fetchPanierCount = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { id } = JSON.parse(storedUser);
        // Admins have no client id (their key is id_admin), so `id` is
        // undefined for them — never call /locations/undefined.
        if (!id) {
          setPanierCount(0);
          return;
        }
        try {
          const res = await axios.get(`${API_URL}/locations/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setPanierCount(Array.isArray(res.data) ? res.data.length : 0);
        } catch {
          setPanierCount(0);
        }
      } else {
        setPanierCount(0);
      }
    };
    fetchPanierCount();
  }, [userName]);
  const handleLogout = () => {
    // Effectuer le nettoyage local immédiatement
    localStorage.clear();
    setUserName(null);
    setPanierCount(0);
    navigate("/", { replace: true });
    
    // Faire la requête de déconnexion en arrière-plan
    const token = localStorage.getItem("token");
    if (token) {
      axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(err => {
        console.error("Logout error:", err);
      });
    }
  };

  const navItems = [
    { label: "Cars", path: "/car", sectionId: "cars", icon: Home },
    { label: "About", path: "/about", sectionId: "about", icon: Info },
    { label: "Blog", path: "/blog", sectionId: "blog", icon: Newspaper },
    { label: "Contact", path: "/contact", sectionId: "contact", icon: Mail },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Correction de la logique d'observation des sections
    const observerOptions = {
      rootMargin: "-10% 0px -90% 0px",
      threshold: 0.0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = navItems.map((item) => document.getElementById(item.sectionId)).filter(Boolean);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [navItems]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);


  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-12">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive: routerActive }) => `
            flex items-center gap-2 
            text-gray-800 dark:text-light 
            hover:text-blue-600 dark:hover:text-accent 
            hover:animate-pulse-scale 
            font-sans font-medium transition-all duration-300 ease-in-out py-2 
            ${(routerActive || activeSection === item.sectionId) ? "text-blue-700 dark:text-accent" : ""}
          `}
        >
          <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <nav
      className={`md:hidden absolute w-full left-0 top-full bg-white/95 dark:bg-obsidian-dark/95 border-t border-muted/50 dark:border-metal/50 p-4 transition-all duration-300 z-50 backdrop-blur-glass shadow-card ${
        isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive: routerActive }) => `
              flex items-center gap-2 p-2 
              text-gray-800 dark:text-light 
              hover:bg-blue-100 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300 mb-2
              ${(routerActive || activeSection === item.sectionId) ? "text-blue-700 dark:text-accent" : ""}
            `}
            onClick={toggleMobileMenu}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            {item.label}
          </NavLink>
        ))}
        {userName ? (
          <div className="mt-4 space-y-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 p-2 text-text dark:text-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              <User className="w-5 h-5 transition-transform group-hover:scale-110" />
              Profile
            </Link>
            <Link
              to="/panier"
              className="flex items-center gap-2 p-2 text-text dark:text-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
              Panier
              {panierCount > 0 && (
                <Badge variant="success" className="ml-1">{panierCount}</Badge>
              )}
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 p-2 text-text dark:text-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              Saved Cars
            </Link>
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="w-full flex items-center gap-2 p-2 text-destructive dark:text-destructive-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
            >
              <User className="w-5 h-5 transition-transform group-hover:scale-110" />
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <Link
              to="/login"
              className="flex items-center gap-2 p-2 text-text dark:text-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              <User className="w-5 h-5 transition-transform group-hover:scale-110" />
              Log In
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 p-2 text-text dark:text-light hover:bg-muted/50 hover:animate-pulse-scale dark:hover:bg-metal/50 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              <User className="w-5 h-5 transition-transform group-hover:scale-110" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );

  const UserMenu = () => (

    <div className="relative group">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-text dark:text-light hover:text-primary hover:animate-pulse-scale dark:hover:text-accent font-sans font-medium transition-all duration-300 ease-in-out"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-medium shadow-button ring-1 ring-primary/20 dark:ring-accent/20 transition-transform group-hover:scale-105">
          {userName?.charAt(0) || "?"}
        </div>
        <span className="hidden md:block font-display">{userName?.split(" ")[0]}</span>
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-300" />
      </Button>
      <div className="absolute right-0 mt-2 w-48 bg-light/95 dark:bg-obsidian-dark/95 text-text dark:text-light shadow-card rounded-xl border border-muted/50 dark:border-metal/50 backdrop-blur-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
        <div className="py-1">
          <div className="px-4 py-2 border-b border-muted/50 dark:border-metal/50">
            <p className="text-sm font-medium text-text dark:text-light font-display">{userName}</p>
            <p className="text-xs text-text-muted dark:text-text-light">Premium Member</p>
          </div>
          {userType === 'admin' ? (
            <a
              href="https://carrental-production-6b89444d.up.railway.app/admin/dashboard"
              className="block px-4 py-2 text-text dark:text-light hover:bg-muted/50 hover:animate-sparkle dark:hover:bg-metal/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Admin Dashboard</span>
              </div>
            </a>
          ) : (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-text dark:text-light hover:bg-muted/50 hover:animate-sparkle dark:hover:bg-metal/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Profile</span>
                </div>
              </Link>
              <Link
                to="/panier"
                className="block px-4 py-2 text-text dark:text-light hover:bg-muted/50 hover:animate-sparkle dark:hover:bg-metal/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Panier</span>
                  {panierCount > 0 && (
                    <Badge variant="success" className="ml-1">{panierCount}</Badge>
                  )}
                </div>
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-destructive dark:text-destructive-light hover:bg-muted/50 hover:animate-sparkle dark:hover:bg-metal/50 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const LanguageSelector = () => {
    const languages = [
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "ar", name: "العربية", flag: "🇲🇦" },
    ];

    return (
      <Select defaultValue="en">
        <SelectTrigger className="w-[140px] bg-transparent border-muted/50 dark:border-metal/50 hover:bg-muted/5 dark:hover:bg-metal/5">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary dark:text-accent" />
            <SelectValue placeholder="Select Language" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-light/95 dark:bg-obsidian-dark/95 border-muted/50 dark:border-metal/50 backdrop-blur-glass">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="hover:bg-muted/50 dark:hover:bg-metal/50"
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full min-h-16">
      <div className="absolute inset-0 bg-white/95 dark:bg-obsidian-dark/95 bg-gradient-to-b from-white/95 to-blue-50/80 dark:from-obsidian-dark/95 dark:to-obsidian-dark/80 backdrop-blur-glass shadow-soft border-b border-muted/50 dark:border-metal/50"></div>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-aurora"></div>
      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ApplicationLogo className="h-14 w-auto" />
            <div className="ml-12">
              <DesktopNav />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ModeToggle />
            {userName ? (
              <div className="flex items-center space-x-3">
                <UserMenu />
                {/* Removed client/admin badge */}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-dark border border-primary shadow-md">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent-dark border border-accent shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-800 dark:text-light hover:text-blue-600 hover:animate-pulse-scale dark:hover:text-accent transition-all duration-300 ease-in-out"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      <MobileNav />
    </header>
  );
};

export default Header;

