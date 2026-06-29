// Español. Typed as `Dict` so it must match en.ts key-for-key (compile-time).
import type { Dict } from "./en";

export const es: Dict = {
  nav: {
    showcase: "Vitrina",
    connect: "Conectar",
    watch: "Ver",
    listen: "Escuchar",
    news: "Noticias",
    weather: "Clima",
    account: "Cuenta",
  },
  common: {
    searchPlaceholder: "Buscar películas, música, destinos…",
    language: "Idioma",
  },
  categories: {
    watch: "Ver",
    listen: "Escuchar",
    play: "Jugar",
    destination: "Destino",
    travel: "Viaje",
    shop: "Tienda",
    read: "Leer",
    connect: "Conectar",
  },
  showcase: {
    hero: {
      title: "Wi-Fi de alta velocidad para todo el vuelo",
      cta: "Ver planes",
    },
    tiles: {
      "young-sheldon": "Young Sheldon",
      billie: "Billie Eilish",
      squid: "Squid Game",
      "red-moon": "Red Moon In Venus",
      games: "Clásicos arcade",
      dining: "Top 10 Restaurantes",
      epcot: "Lo mejor de Orlando: Epcot",
      england: "Explora Inglaterra",
      "duty-free": "Selección sin tasas",
      "fall-guy": "The Fall Guy",
      ebooks: "Ebooks más vendidos",
    },
    weather: {
      date: "Mar, 4 jul",
      city: "Orlando",
      condition: "Parcialmente soleado",
      linkLabel: "Pronóstico de 5 días",
    },
  },
  connect: {
    crumbShowcase: "Vitrina",
    crumbConnect: "Conectar",
    header: {
      title: "El Wi-Fi más rápido del cielo",
      text:
        "Elija uno de los planes de Wi-Fi a continuación. Recomendamos " +
        "especialmente el plan Streaming de alta velocidad, que ofrece " +
        "velocidades de Internet de hasta 300 Mbps.",
      emphasize: "Streaming de alta velocidad",
    },
    plans: {
      messaging: "Mensajería",
      browsing: "Navegación",
      streaming: "Streaming de alta velocidad",
    },
    features: {
      messaging: "Mensajería",
      email: "Correo electrónico",
      browsing: "Navegación básica",
      streaming: "Streaming",
    },
    badge: "¡Mejor valor!",
    buyNow: "Comprar",
    connectedTitle: "Estás conectado — {plan}",
    connectedBody: "Tu pase {plan} está activo durante el resto de este vuelo, incluso tras reconexiones.",
    modalTitle: "Confirmar compra",
    cancel: "Cancelar",
    payNow: "Pagar",
    modalBody: "Estás comprando el pase {plan} ({price}) para este vuelo.",
    modalFine: "Se cobra una sola vez a la tarjeta terminada en 4242. El acceso permanece activo hasta el aterrizaje, incluso tras reconexiones.",
    toastTitle: "Pago confirmado",
    toastBody: "Tu pase {plan} está activo. Disfruta del vuelo.",
  },
  footer: {
    terms: "Términos de servicio",
    privacy: "Privacidad",
    legal: "Aviso legal",
    contact: "Contacto",
    copyright: "© {year} Thales Group. Todos los derechos reservados.",
  },
};
