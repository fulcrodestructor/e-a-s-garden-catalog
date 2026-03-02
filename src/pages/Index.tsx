import { useState } from "react";
import { Search, MapPin, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoginDialog from "@/components/LoginDialog";
import AddProductDialog from "@/components/AddProductDialog";
import ProductCard from "@/components/ProductCard";
import { initialProducts, type Product } from "@/data/products";

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
      <header className="container mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Vivero Parque Eca do Queiros
          </h1>
          <LoginDialog
            isAdmin={isAdmin}
            onLogin={() => setIsAdmin(true)}
            onLogout={() => setIsAdmin(false)}
          />
        </div>
        <div className="flex items-center gap-4 mt-1">
          <a
            href="https://maps.app.goo.gl/nnGeqrLx9f8CwiS48"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">Ubicación</span>
          </a>
          <a
            href="https://www.instagram.com/eca_do_queiros/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-4 w-4 text-primary" />
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      </header>

      <div className="border-b border-border" />

      {/* Search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {isAdmin && <AddProductDialog onAdd={handleAdd} />}
          <div className={`relative w-full ${isAdmin ? 'sm:w-72' : 'sm:w-96'}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar planta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 text-lg font-bold placeholder:text-lg placeholder:font-bold"
            />
          </div>
        </div>
      </div>

      {/* Catalog */}
      <main className="container mx-auto px-4 py-6">
        {["Plantas", "Árboles"].map((category) => {
          const categoryProducts = filtered.filter((p) => p.category === category);
          if (categoryProducts.length === 0 && search) return null;
          return (
            <section key={category} className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{category}</h2>
              {categoryProducts.length === 0 ? (
                <p className="text-muted-foreground">No hay productos en esta categoría.</p>
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
