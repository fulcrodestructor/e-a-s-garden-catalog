import crownOfThorns from "@/assets/crown-of-thorns.jpg";
import cactus from "@/assets/cactus.jpg";
import succulent from "@/assets/succulent.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export const categories = ["Plantas", "Árboles"];

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Corona de Cristo",
    price: 150,
    stock: 12,
    image: crownOfThorns,
    category: "Plantas",
  },
  {
    id: "2",
    name: "Cactus",
    price: 80,
    stock: 25,
    image: cactus,
    category: "Plantas",
  },
  {
    id: "3",
    name: "Suculenta",
    price: 60,
    stock: 30,
    image: succulent,
    category: "Plantas",
  },
];
