import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories, type Product } from "@/data/products";

interface AddProductDialogProps {
  onAdd: (product: Product) => void;
}

const AddProductDialog = ({ onAdd }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[0]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) {
      toast({ title: "Error", description: "Completa todos los campos.", variant: "destructive" });
      return;
    }
    const product: Product = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: imagePreview || "/placeholder.svg",
      category,
    };
    onAdd(product);
    setOpen(false);
    setName("");
    setPrice("");
    setStock("");
    setCategory(categories[0]);
    setImagePreview(null);
    toast({ title: "Producto agregado", description: `${name} fue agregado al catálogo.` });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Nuevo Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la planta" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Disponibles</Label>
              <Input id="stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
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
            <Label>Imagen</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
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
                <div className="flex flex-col items-center gap-2 text-muted-foreground py-4">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm">Arrastra una imagen o haz clic para seleccionar</p>
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
          <Button type="submit" className="w-full">Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
