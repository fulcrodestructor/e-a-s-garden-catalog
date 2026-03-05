import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Upload, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories, type Product } from "@/data/products";

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
  const [category, setCategory] = useState(product.category);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Solo se permiten archivos de imagen.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;
    onUpdate?.({
      ...product,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image: imagePreview || product.image,
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
          <p className="text-muted-foreground text-lg">
            Disponibles: {product.stock} unidades
          </p>
          {isAdmin && (
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                setName(product.name);
                setPrice(product.price.toString());
                setStock(product.stock.toString());
                setCategory(product.category);
                setImagePreview(null);
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
            <DialogTitle className="font-display text-black">Editar Producto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor={`edit-name-${product.id}`} className="text-black">Nombre</Label>
              <Input id={`edit-name-${product.id}`} value={name} onChange={(e) => setName(e.target.value)} className="bg-white text-black placeholder:text-black/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`edit-price-${product.id}`} className="text-black">Precio ($)</Label>
                <Input id={`edit-price-${product.id}`} type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-white text-black placeholder:text-black/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edit-stock-${product.id}`} className="text-black">Disponibles</Label>
                <Input id={`edit-stock-${product.id}`} type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="bg-white text-black placeholder:text-black/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-black">Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-black">Imagen</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors bg-white ${dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md mx-auto" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground py-2">
                    <img src={product.image} alt="Actual" className="h-24 w-24 object-cover rounded-md" />
                    <div className="flex items-center gap-1 text-sm">
                      <Upload className="h-4 w-4" />
                      <span>Cambiar imagen</span>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white">Guardar cambios</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
