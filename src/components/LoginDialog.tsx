import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginDialogProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const LoginDialog = ({ isAdmin, onLogin, onLogout }: LoginDialogProps) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  if (isAdmin) {
    return (
      <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </Button>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && password === "Vivero26") {
      onLogin();
      setOpen(false);
      setUser("");
      setPassword("");
      toast({ title: "Sesión iniciada", description: "Bienvenido, administrador." });
    } else {
      toast({ title: "Error", description: "Usuario o contraseña incorrectos.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LogIn className="h-4 w-4" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Iniciar sesión</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="user" className="text-black">Usuario</Label>
            <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" className="bg-white text-black placeholder:text-black/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="bg-white text-black placeholder:text-black/50" />
          </div>
          <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white">Entrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
