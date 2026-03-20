import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddProductDialog from "@/components/AddProductDialog";
import ProductCard from "@/components/ProductCard";
import { initialProducts, type Product } from "@/data/products";
import { useAdmin } from "@/contexts/AdminContext";

const Vivero = () => {
  const { isAdmin } = useAdmin();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product: Product) => setProducts((prev) => [...prev, product]);
  const handleDelete = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const handleUpdate = (updated: Product) => setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  return (
    <div className="min-h-screen bg-[#2e8b57]">
      <header className="container mx-auto px-4 pt-6 pb-4">
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a3a1a" }}
        >
          Vivero Parque Eca do Queiros
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>{isAdmin && <AddProductDialog onAdd={handleAdd} />}</div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
            <Input
              placeholder="Buscar producto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-base font-medium placeholder:text-base placeholder:font-medium placeholder:text-foreground text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9"
            />
          </div>
        </div>
      </header>

      <div className="border-b border-border" />

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

export default Vivero;
