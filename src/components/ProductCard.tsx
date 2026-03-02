import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (product: Product) => void;
}

const ProductCard = ({ product, isAdmin, onDelete, onUpdate }: ProductCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;
    onUpdate?.({
      ...product,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
    });
    setEditOpen(false);
    toast({ title: "Producto actualizado", description: `${name} fue actualizado.` });
  };

  const outOfStock = product.stock === 0;

  return (
    <>
      <div className="group rounded-lg overflow-hidden bg-card border border-border transition-all hover:border-primary/40">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${outOfStock ? 'opacity-50 grayscale' : ''}`}
          />
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <span className="text-foreground font-display font-semibold text-sm text-center px-3">
                No disponible por el momento
              </span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-1">
          <h3 className="font-display text-2xl text-foreground">{product.name}</h3>
          <p className="text-primary font-semibold text-xl">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-muted-foreground text-base">
            Disponibles: {product.stock} unidades
          </p>
          {isAdmin && (
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                setName(product.name);
                setPrice(product.price.toString());
                setStock(product.stock.toString());
                setEditOpen(true);
              }}>
                <Pencil className="h-3 w-3" /> Editar
              </Button>
              {onDelete && (
                <Button variant="destructive" size="sm" className="gap-1" onClick={() => onDelete(product.id)}>
                  <Trash2 className="h-3 w-3" /> Eliminar
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Editar Producto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor={`edit-name-${product.id}`}>Nombre</Label>
              <Input id={`edit-name-${product.id}`} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`edit-price-${product.id}`}>Precio ($)</Label>
                <Input id={`edit-price-${product.id}`} type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edit-stock-${product.id}`}>Disponibles</Label>
                <Input id={`edit-stock-${product.id}`} type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full">Guardar cambios</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
