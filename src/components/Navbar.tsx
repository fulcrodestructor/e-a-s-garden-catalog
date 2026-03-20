import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, LogIn, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
    <defs>
      <linearGradient id="nav-ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75"/>
        <stop offset="25%" stopColor="#fa7e1e"/>
        <stop offset="50%" stopColor="#d62976"/>
        <stop offset="75%" stopColor="#962fbf"/>
        <stop offset="100%" stopColor="#4f5bd5"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="url(#nav-ig)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" fill="none" stroke="url(#nav-ig)" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#nav-ig)"/>
  </svg>
);

const navLinks = [
  { to: "/", label: "Conócenos" },
  { to: "/vivero", label: "Vivero" },
  { to: "/cafeteria", label: "Cafetería" },
  { to: "/actividades", label: "Actividades" },
];

const Navbar = () => {
  const { isAdmin, login, logout } = useAdmin();
  const { toast } = useToast();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(user, password)) {
      setLoginOpen(false);
      setUser("");
      setPassword("");
      toast({ title: "Sesión iniciada", description: "Bienvenido, administrador." });
    } else {
      toast({ title: "Error", description: "Usuario o contraseña incorrectos.", variant: "destructive" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2d6a4f] shadow-lg">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: external links */}
          <div className="flex items-center gap-2">
            <a
              href="https://maps.app.goo.gl/nnGeqrLx9f8CwiS48"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              aria-label="Ubicación"
            >
              <MapPin className="h-5 w-5 text-red-400" />
            </a>
            <a
              href="https://www.instagram.com/eca_do_queiros/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Center: nav links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: admin + mobile menu */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="gap-1.5 text-white/90 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLoginOpen(true)}
                className="gap-1.5 text-white/90 hover:text-white hover:bg-white/10"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
            <button
              className="md:hidden text-white/90 hover:text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#2d6a4f] pb-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14" />

      {/* Login dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Iniciar sesión</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="nav-user" className="text-black">Usuario</Label>
              <Input id="nav-user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" className="bg-white text-black placeholder:text-black/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nav-password" className="text-black">Contraseña</Label>
              <Input id="nav-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="bg-white text-black placeholder:text-black/50" />
            </div>
            <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white">Entrar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
