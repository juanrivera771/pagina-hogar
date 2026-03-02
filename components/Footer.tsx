'use client';

import Image from 'next/image';
import Link from 'next/link';

const BRAND_GREEN = '#66D11F';
const BRAND_DARK = '#0F2A43';

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-white">

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-4">

          {/* MARCA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/jxf-logo.png"
                alt="JXF Colombia"
                width={36}
                height={36}
              />
              <span
                className="font-extrabold text-lg sm:text-xl"
                style={{ color: BRAND_DARK }}
              >
                JXF Colombia
              </span>
            </div>

            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Hogar útil, viral y económico.
              Envíos nacionales y pago contraentrega.
            </p>
          </div>

          {/* EXPLORA */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-slate-800">
              Explora
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link href="/#masvendidos" className="hover:text-slate-900 transition">Más vendidos</Link></li>
              <li><Link href="/#categorias" className="hover:text-slate-900 transition">Categorías</Link></li>
              <li><Link href="/#testimonios" className="hover:text-slate-900 transition">Reseñas</Link></li>
              <li><Link href="/#faq" className="hover:text-slate-900 transition">FAQ</Link></li>
              <li><Link href="/catalogo" className="hover:text-slate-900 transition">Catálogo</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-slate-800">
              Atención
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="https://wa.me/573208709850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 border border-lime-300 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#E9FBD5', color: BRAND_DARK }}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hola@jxf.co" className="hover:text-slate-900 transition">
                  hola@jxf.co
                </a>
              </li>
              <li className="text-slate-900">
                Todos los días · 9:00 — 20:00
              </li>
            </ul>
          </div>

          {/* CONFIANZA */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-slate-800">
              Confianza
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>✔ Pago contraentrega</li>
              <li>✔ Envío a todo el país</li>
              <li>✔ Cambios y devoluciones</li>
            </ul>
          </div>
        </div>

        {/* LINEA */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <Image
              src="/jxf-logo.png"
              alt="JXF Colombia"
              width={22}
              height={22}
            />
            <span>
              © {new Date().getFullYear()} JXF Colombia · Hogar
            </span>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Link href="/#top" className="hover:text-slate-900 transition">
              Volver arriba
            </Link>
            <Link href="/catalogo" className="hover:text-slate-900 transition">
              Catálogo
            </Link>
            <a
              href="mailto:hola@jxf.co"
              className="hover:text-slate-900 transition"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>

      {/* FONDO DECORATIVO INFERIOR */}
      <Image
        src="/fondo-footer.png"
        alt="Decoración Footer"
        width={1920}
        height={300}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none opacity-70"
        priority
      />

    </footer>
  );
}