import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (user: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false, login: () => false, logout: () => {} });

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("vivero_admin") === "true");

  useEffect(() => {
    localStorage.setItem("vivero_admin", isAdmin ? "true" : "false");
  }, [isAdmin]);

  const login = (user: string, password: string) => {
    if (user === "admin" && password === "Vivero26") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
