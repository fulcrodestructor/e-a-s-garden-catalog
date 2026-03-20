import { Link } from "react-router-dom";
import { TreePine, Coffee, Sun, ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: 1,
    title: "Nuevas suculentas disponibles",
    description: "Acabamos de recibir una colección especial de suculentas raras. ¡Ven a conocerlas!",
    date: "15 Mar 2026",
  },
  {
    id: 2,
    title: "Taller de jardinería este sábado",
    description: "Aprende técnicas de poda y cuidado de plantas frutales con nuestros expertos.",
    date: "20 Mar 2026",
  },
  {
    id: 3,
    title: "Menú de temporada en la cafetería",
    description: "Nuevos jugos naturales y postres artesanales preparados con ingredientes del parque.",
    date: "10 Mar 2026",
  },
];

const services = [
  {
    icon: TreePine,
    title: "Vivero",
    description: "Explora nuestra colección de plantas, árboles frutales y ornamentales para tu hogar y jardín.",
    to: "/vivero",
  },
  {
    icon: Coffee,
    title: "Cafetería",
    description: "Disfruta de café artesanal, jugos naturales y snacks en un ambiente rodeado de naturaleza.",
    to: "/cafeteria",
  },
  {
    icon: Sun,
    title: "Actividades",
    description: "Participa en talleres, caminatas y eventos culturales al aire libre para toda la familia.",
    to: "/actividades",
  },
];

const Conocenos = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Vivero Parque
            <br />
            Eca do Queiros
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Un espacio verde donde convergen vivero, cafetería y actividades al aire libre para disfrutar en familia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#1b4332] hover:bg-white/90 font-semibold text-base px-8 h-12 rounded-lg shadow-lg active:scale-[0.97] transition-transform">
              <Link to="/vivero">
                Explorar el vivero
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 h-12 rounded-lg active:scale-[0.97] transition-transform">
              <Link to="/actividades">
                Ver actividades
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="bg-[#fefcf3] py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Novedades del Parque
          </h2>
          <div className="space-y-5">
            {announcements.map((a) => (
              <article
                key={a.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e8e4da]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#1b4332] mb-1">{a.title}</h3>
                    <p className="text-[#5a5a4f] leading-relaxed">{a.description}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-[#7a7a6a] whitespace-nowrap mt-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {a.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f0f7f2] py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-[#d4e8d9] hover:border-[#2d6a4f]/30 active:scale-[0.97]"
              >
                <div className="w-12 h-12 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center mb-5 group-hover:bg-[#2d6a4f]/20 transition-colors">
                  <s.icon className="h-6 w-6 text-[#2d6a4f]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1b4332] mb-2">{s.title}</h3>
                <p className="text-[#5a5a4f] leading-relaxed text-sm">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conocenos;
