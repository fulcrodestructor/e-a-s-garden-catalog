import { useState } from "react";

const menuItems = [
  { name: "Café Americano", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop" },
  { name: "Cappuccino", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
  { name: "Jugo Natural", img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop" },
  { name: "Galletas Artesanales", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop" },
  { name: "Sándwich Club", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop" },
  { name: "Pizza Margherita", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop" },
  { name: "Latte Art", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop" },
  { name: "Brownie", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
  { name: "Smoothie Verde", img: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=400&fit=crop" },
];

const Cafeteria = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1
          className="text-4xl md:text-5xl text-center mb-2 text-[#3d3d3d]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          Cafetería
        </h1>
        <p className="text-center text-[#8a8a7a] mb-10 text-sm tracking-widest uppercase">
          Sabores del parque
        </p>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="relative aspect-square cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ filter: "saturate(0.85) contrast(1.05)" }}
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredIdx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-white text-sm md:text-base font-medium text-center px-3">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cafeteria;
