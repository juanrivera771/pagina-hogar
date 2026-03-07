import "./globals.css"
import { ReactNode } from "react"
import type { Metadata, Viewport } from "next"

import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/context/ToastContext"

import Navbar from "@/components/Navbar"
import CartDrawer from "@/components/cart/CartDrawer"

/* 🔎 SEO GLOBAL */

export const metadata: Metadata = {
  metadataBase: new URL("https://jxf.co"),

  title: {
    default: "JXF Colombia · Hogar inteligente, útil y económico",
    template: "%s | JXF Colombia",
  },

  description:
    "Compra fácil por WhatsApp. Envío nacional y pago contraentrega. Productos útiles, virales y económicos para tu hogar.",

  keywords: [
    "JXF Colombia",
    "hogar inteligente",
    "productos virales",
    "gadgets hogar",
    "tienda online Colombia",
    "comprar por WhatsApp",
  ],

  authors: [{ name: "JXF Colombia" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "JXF Colombia · Hogar inteligente",
    description:
      "Útil, viral y económico. Envío nacional y pago contraentrega.",
    url: "https://jxf.co",
    siteName: "JXF Colombia",

    images: [
      {
        url: "/jxf-logo.png",
        width: 1200,
        height: 630,
        alt: "JXF Colombia Hogar Inteligente",
      },
    ],

    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JXF Colombia · Hogar inteligente",
    description:
      "Útil, viral y económico. Compra fácil por WhatsApp.",
    images: ["/jxf-logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
}

/* 📱 VIEWPORT MODERNO */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
}

/* 🌐 ROOT LAYOUT */

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased selection:bg-lime-400 selection:text-black">

        <CartProvider>
          <ToastProvider>

            {/* 🔝 Navbar Global */}
            <Navbar />

            {/* 📦 Contenido dinámico */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* 🛒 Cart Drawer Global */}
            <CartDrawer />

            {/* 💬 Botón flotante WhatsApp */}
            <a
              href="https://wa.me/573208709850?text=Hola%20JXF%20Colombia%2C%20quiero%20comprar%20para%20mi%20hogar"
              aria-label="Chatea por WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-4 right-4 z-[60] group"
            >
              {/* Tooltip desktop */}
              <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                Escríbenos
              </span>

              <div
                className="h-14 w-14 rounded-full shadow-lg ring-1 ring-black/5 grid place-items-center transition-all duration-300 group-hover:scale-110 active:scale-95"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.47-.148-.67.15-.197.297-.768.966-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.123-.272-.198-.57-.347" />
                </svg>
              </div>
            </a>

          </ToastProvider>
        </CartProvider>

      </body>
    </html>
  )
}