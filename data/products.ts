export interface Product {
  id: string
  name: string
  price: number
  img: string
  category: string
  tag?: string
  description: string
}

export const products: Product[] = [
  // ORGANIZACIÓN
  {
    id: 'organizador-despensa',
    name: 'Organizador de despensa extensible',
    price: 48900,
    img: '/Productos/organizador-despensa.png',
    category: 'Organización',
    tag: 'Top ventas',
    description: 'Organizador ajustable ideal para maximizar el espacio en tu despensa.'
  },
  {
    id: 'separadores-cajon',
    name: 'Separadores de cajón ajustables (x4)',
    price: 39900,
    img: '/Productos/separadores-cajon.png',
    category: 'Organización',
    tag: 'Nuevo',
    description: 'Set de 4 separadores ajustables perfectos para organizar ropa y accesorios.'
  },
  {
    id: 'ganchos-adhesivos',
    name: 'Ganchos adhesivos multiuso (x6)',
    price: 19900,
    img: '/Productos/ganchos-adhesivos.png',
    category: 'Organización',
    description: 'Ganchos resistentes sin necesidad de taladro.'
  },
  {
    id: 'caja-plegable',
    name: 'Cajas plegables apilables',
    price: 45900,
    img: '/Productos/caja-plegable.png',
    category: 'Organización',
    description: 'Cajas prácticas y resistentes que ahorran espacio.'
  },
  {
    id: 'organizador-zapatos',
    name: 'Organizador para zapatos (x6)',
    price: 49900,
    img: '/Productos/organizador-zapatos.png',
    category: 'Organización',
    description: 'Optimiza el espacio de tu clóset con este organizador compacto.'
  },

  // COCINA
  {
    id: 'dispensador-jabon',
    name: 'Dispensador de jabón con esponja',
    price: 35900,
    img: '/Productos/dispensador-jabon.png',
    category: 'Cocina',
    tag: 'Recomendado',
    description: 'Dispensador 2 en 1 que facilita el lavado.'
  },
  {
    id: 'escurridor-plegable',
    name: 'Escurridor plegable para lavaplatos',
    price: 52900,
    img: '/Productos/escurridor-plegable.png',
    category: 'Cocina',
    description: 'Escurridor flexible y resistente.'
  },
  {
    id: 'organizador-tapas',
    name: 'Organizador de tapas y sartenes',
    price: 42900,
    img: '/Productos/organizador-tapas.png',
    category: 'Cocina',
    description: 'Mantén tus tapas organizadas.'
  },
  {
    id: 'cuchillos-ceramica',
    name: 'Set cuchillos de cerámica (3 pzas)',
    price: 69900,
    img: '/Productos/cuchillos-ceramica.png',
    category: 'Cocina',
    tag: 'Oferta',
    description: 'Cuchillos ultra afilados y livianos.'
  },

  // LIMPIEZA
  {
    id: 'trapero-microfibra',
    name: 'Trapero 360° de microfibra',
    price: 79900,
    img: '/Productos/trapero-microfibra.png',
    category: 'Limpieza',
    description: 'Trapero giratorio para limpieza profunda.'
  },
  {
    id: 'cepillo-electrico',
    name: 'Cepillo eléctrico de limpieza',
    price: 84900,
    img: '/Productos/cepillo-electrico.png',
    category: 'Limpieza',
    description: 'Cepillo recargable ideal para baños y cocina.'
  },
  {
    id: 'toallas-microfibra',
    name: 'Toallas de microfibra ultraabsorbentes',
    price: 29900,
    img: '/Productos/toallas-microfibra.png',
    category: 'Limpieza',
    description: 'Pack de toallas de alta absorción.'
  },

  // BAÑO
  {
    id: 'portacepillos',
    name: 'Portacepillos adhesivo sin taladro',
    price: 24900,
    img: '/Productos/portacepillos.png',
    category: 'Baño',
    description: 'Instalación fácil sin perforaciones.'
  },
  {
    id: 'porta-papel',
    name: 'Porta papel higiénico adhesivo',
    price: 21900,
    img: '/Productos/porta-papel.png',
    category: 'Baño',
    description: 'Diseño moderno y resistente.'
  },
  {
    id: 'cabezal-ducha',
    name: 'Cabezal de ducha de presión',
    price: 55900,
    img: '/Productos/cabezal-ducha.png',
    category: 'Baño',
    description: 'Mayor presión y ahorro de agua.'
  },

  // ILUMINACIÓN
  {
    id: 'luz-armario',
    name: 'Luz para armario con sensor',
    price: 41900,
    img: '/Productos/luz-armario.png',
    category: 'Iluminación',
    description: 'Encendido automático por movimiento.'
  },
  {
    id: 'tira-led',
    name: 'Tira LED adhesiva (5 m)',
    price: 48900,
    img: '/Productos/tira-led.png',
    category: 'Iluminación',
    description: 'Ilumina cualquier espacio fácilmente.'
  },

  // OTROS
  {
    id: 'tapete-antiderrame',
    name: 'Tapete antiderrame para cocina',
    price: 32900,
    img: '/Productos/tapete-antiderrame.png',
    category: 'Otros',
    description: 'Protege el suelo de líquidos y suciedad.'
  }
]

export const categories = [
  "Organización",
  "Cocina",
  "Limpieza",
  "Baño",
  "Iluminación",
  "Otros"
]