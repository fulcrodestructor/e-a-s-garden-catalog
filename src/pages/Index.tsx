import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoginDialog from "@/components/LoginDialog";
import AddProductDialog from "@/components/AddProductDialog";
import ProductCard from "@/components/ProductCard";
import { initialProducts, type Product } from "@/data/products";

const GoogleMapsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.3 132.3" className="h-6 w-6 flex-shrink-0">
    <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"/>
    <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.8L10.8 16.5z"/>
    <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-34.3-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"/>
    <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.8c4.3 10 10.6 18.2 17.1 27.1l24.5-31.9z"/>
    <path fill="#34a853" d="M46.2 132.3c5.6-9.7 25.8-30.2 33.5-48 3.4-7.8 5.4-16.1 5.4-24.3h0c0-5.3-1-10.3-2.8-14.9L46.2 132.3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 flex-shrink-0">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75"/>
        <stop offset="25%" stopColor="#fa7e1e"/>
        <stop offset="50%" stopColor="#d62976"/>
        <stop offset="75%" stopColor="#962fbf"/>
        <stop offset="100%" stopColor="#4f5bd5"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="url(#ig-grad)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" fill="none" stroke="url(#ig-grad)" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/>
  </svg>
);

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 pt-6 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1" />
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground text-center flex-shrink-0"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Vivero Parque Eca do Queiros
          </h1>
          <div className="flex-1 flex justify-end">
            <LoginDialog
              isAdmin={isAdmin}
              onLogin={() => setIsAdmin(true)}
              onLogout={() => setIsAdmin(false)}
            />
          </div>
        </div>

        {/* Second row: Location + Instagram left, Search right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-6">
            <a
              href="https://maps.app.goo.gl/nnGeqrLx9f8CwiS48"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity bg-white rounded-lg px-4 py-2"
              style={{ color: "#4285f4" }}
            >
              <GoogleMapsIcon />
              <span>Ubicación</span>
            </a>
            <a
              href="https://www.instagram.com/eca_do_queiros/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity bg-white rounded-lg px-4 py-2"
              style={{
                background: "white",
              }}
            >
              <InstagramIcon />
              <span style={{
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Instagram</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && <AddProductDialog onAdd={handleAdd} />}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 text-lg font-bold placeholder:text-lg placeholder:font-bold text-black border-2 border-foreground/40"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border" />

      {/* Catalog */}
      <main className="container mx-auto px-4 py-6">
        {["Plantas", "Árboles"].map((category) => {
          const categoryProducts = filtered.filter((p) => p.category === category);
          if (categoryProducts.length === 0 && search) return null;
          return (
            <section key={category} className="mb-10">
              <h2 className="font-display text-4xl font-semibold text-foreground mb-4 text-center">{category}</h2>
              {categoryProducts.length === 0 ? (
                <p className="text-muted-foreground text-center">No hay productos en esta categoría.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isAdmin={isAdmin}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Index;
