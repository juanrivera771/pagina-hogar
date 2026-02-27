'use client';

import Image from 'next/image';
import Link from 'next/link';

const BRAND_GREEN = '#66D11F';
const BRAND_DARK = '#0F2A43';

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-white">

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* MARCA */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image src="/jxf-logo.png" alt="JXF Colombia" width={36} height={36} />
              <span
                className="font-extrabold text-lg"
                style={{ color: BRAND_DARK }}
              >
                JXF Colombia
              </span>
            </div>

            <p className="text-sm text-slate-600 max-w-xs">
              Hogar útil, viral y económico.
              Envíos nacionales y pago contraentrega.
            </p>
          </div>

          {/* EXPLORA */}
          <div>
            <h4 className="text-sm font-semibold">Explora</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/#masvendidos">Más vendidos</Link></li>
              <li><Link href="/#categorias">Categorías</Link></li>
              <li><Link href="/#testimonios">Reseñas</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/catalogo">Catálogo</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="text-sm font-semibold">Atención</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/573208709850"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-lime-300"
                  style={{ backgroundColor: '#E9FBD5', color: BRAND_DARK }}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hola@jxf.co">hola@jxf.co</a>
              </li>
              <li className="text-slate-500">
                Todos los días · 9:00 — 20:00
              </li>
            </ul>
          </div>

          {/* CONFIANZA */}
          <div>
            <h4 className="text-sm font-semibold">Confianza</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✔ Pago contraentrega</li>
              <li>✔ Envío a todo el país</li>
              <li>✔ Cambios y devoluciones</li>
            </ul>
          </div>
        </div>

        {/* LINEA */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <Image src="/jxf-logo.png" alt="JXF Colombia" width={22} height={22} />
            <span>
              © {new Date().getFullYear()} JXF Colombia · Hogar
            </span>
          </div>

          <div className="flex gap-4 text-slate-600">
            <Link href="/#top">Volver arriba</Link>
            <Link href="/catalogo">Catálogo</Link>
            <a href="mailto:hola@jxf.co">Contacto</a>
          </div>
        </div>
      </div>

      {/* FONDO DECORATIVO INFERIOR */}
      <Image
        src="/fondo-footer.png"
        alt="Decoración Footer"
        width={1920}
        height={300}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
        priority
      />

    </footer>
  );
}