export interface Product {
  id: string
  name: string
  price: number
  img: string
  category: string
  tag?: string
}

export const products = Object.freeze<Product[]>([
  { id: 'organizador-despensa', name: 'Organizador de despensa extensible', price: 48900, img: '/Productos/organizador-despensa.png', category: 'Organización', tag: 'Top ventas' },
  { id: 'separadores-cajon', name: 'Separadores de cajón ajustables (x4)', price: 39900, img: '/Productos/separadores-cajon.png', category: 'Organización', tag: 'Nuevo' },
  { id: 'ganchos-adhesivos', name: 'Ganchos adhesivos multiuso (x6)', price: 19900, img: '/Productos/ganchos-adhesivos.png', category: 'Organización' },
  { id: 'caja-plegable', name: 'Cajas plegables apilables', price: 45900, img: '/Productos/caja-plegable.png', category: 'Organización' },

  { id: 'dispensador-jabon', name: 'Dispensador de jabón con esponja', price: 35900, img: '/Productos/dispensador-jabon.png', category: 'Cocina', tag: 'Recomendado' },
  { id: 'escurridor-plegable', name: 'Escurridor plegable para lavaplatos', price: 52900, img: '/Productos/escurridor-plegable.png', category: 'Cocina' },
  { id: 'organizador-tapas', name: 'Organizador de tapas y sartenes', price: 42900, img: '/Productos/organizador-tapas.png', category: 'Cocina' },
  { id: 'cuchillos-ceramica', name: 'Set cuchillos de cerámica (3 pzas)', price: 69900, img: '/Productos/cuchillos-ceramica.png', category: 'Cocina', tag: 'Oferta' },

  { id: 'trapero-microfibra', name: 'Trapero 360° de microfibra', price: 79900, img: '/Productos/trapero-microfibra.png', category: 'Limpieza', tag: 'Bestseller' },
  { id: 'cepillo-electrico', name: 'Cepillo eléctrico de limpieza', price: 84900, img: '/Productos/cepillo-electrico.png', category: 'Limpieza' },
  { id: 'toallas-microfibra', name: 'Toallas de microfibra ultraabsorbentes', price: 29900, img: '/Productos/toallas-microfibra.png', category: 'Limpieza' },

  { id: 'portacepillos', name: 'Portacepillos adhesivo sin taladro', price: 24900, img: '/Productos/portacepillos.png', category: 'Baño' },
  { id: 'porta-papel', name: 'Porta papel higiénico adhesivo', price: 21900, img: '/Productos/porta-papel.png', category: 'Baño', tag: 'Nuevo' },
  { id: 'cabezal-ducha', name: 'Cabezal de ducha de presión', price: 55900, img: '/Productos/cabezal-ducha.png', category: 'Baño' },

  { id: 'luz-armario', name: 'Luz para armario con sensor', price: 41900, img: '/Productos/luz-armario.png', category: 'Iluminación', tag: 'Top' },
  { id: 'tira-led', name: 'Tira LED adhesiva (5 m)', price: 48900, img: '/Productos/tira-led.png', category: 'Iluminación' },

  { id: 'tapete-antiderrame', name: 'Tapete antiderrame para cocina', price: 32900, img: '/Productos/tapete-antiderrame.png', category: 'Otros' },
  { id: 'organizador-zapatos', name: 'Organizador para zapatos (x6)', price: 49900, img: '/Productos/organizador-zapatos.png', category: 'Organización' },
])