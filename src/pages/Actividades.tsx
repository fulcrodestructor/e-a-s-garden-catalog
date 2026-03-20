import { Badge } from "@/components/ui/badge";

const activities = [
  {
    title: "Caminatas Guiadas",
    description: "Recorre los senderos del parque acompañado de un guía que te enseñará sobre la flora y fauna local.",
    frequency: "Fines de semana",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
  },
  {
    title: "Talleres de Jardinería",
    description: "Aprende técnicas de siembra, poda y cuidado de plantas ornamentales y frutales.",
    frequency: "Sábados",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
  },
  {
    title: "Yoga al Aire Libre",
    description: "Sesiones de yoga rodeado de naturaleza para relajar cuerpo y mente.",
    frequency: "Domingos 8:00 AM",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
  {
    title: "Eventos Culturales",
    description: "Música en vivo, exposiciones de arte y actividades para toda la familia.",
    frequency: "Próximamente",
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
  },
  {
    title: "Huerto Comunitario",
    description: "Participa en el cultivo colectivo de hortalizas y hierbas aromáticas del parque.",
    frequency: "Miércoles y viernes",
    img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop",
  },
  {
    title: "Picnic Familiar",
    description: "Reserva un espacio entre jardines para disfrutar un día de picnic con tu familia.",
    frequency: "Todos los días",
    img: "https://images.unsplash.com/photo-1526491109649-aa97172bf76c?w=600&h=400&fit=crop",
  },
];

const Actividades = () => {
  return (
    <div className="min-h-screen bg-[#f0f7f2]">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-[#1b4332] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Actividades
        </h1>
        <p className="text-center text-[#5a7a5f] mb-12 max-w-lg mx-auto">
          Descubre todo lo que puedes hacer en el Parque Eca do Queiros
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <article
              key={a.title}
              className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border border-[#d4e8d9] active:scale-[0.97]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-[#2d6a4f] hover:bg-[#2d6a4f] text-white text-xs font-medium shadow-md">
                    {a.frequency}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#1b4332] mb-1.5">{a.title}</h3>
                <p className="text-sm text-[#5a5a4f] leading-relaxed">{a.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actividades;
