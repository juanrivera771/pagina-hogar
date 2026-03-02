'use client';

import Image from 'next/image';

const BRAND_GREEN = '#66D11F';
const BRAND_DARK = '#0F2A43';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">

      {/* TEXTO */}
      <div className="text-center lg:text-left">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          style={{ color: BRAND_DARK }}
        >
          Lo más útil, viral y económico{' '}
          <span style={{ color: BRAND_GREEN }}>
            para tu hogar
          </span>
        </h1>

        <p className="mt-5 text-slate-700 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
          Productos inteligentes que simplifican la vida en casa.
          Entra, elige y recibe rápido.
        </p>

        {/* BOTONES */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

          <a
            href="https://wa.me/573208709850"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
            style={{
              background: BRAND_GREEN,
              color: BRAND_DARK,
            }}
          >
            Comprar fácil por WhatsApp
          </a>

          <a
            href="#masvendidos"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-100 transition"
          >
            Ver más vendidos
          </a>

        </div>
      </div>

      {/* IMAGEN / TARJETA */}
      <div className="flex justify-center">
        <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-8 sm:p-10 text-center w-full max-w-sm">

          <Image
            src="/jxf-logo.png"
            alt="JXF Colombia"
            width={160}
            height={160}
            priority
            className="mx-auto"
          />

          <p className="mt-6 text-slate-600 text-sm sm:text-base">
            Inspiramos hogares prácticos. Calidad que se nota desde el primer uso.
          </p>

        </div>
      </div>

    </section>
  );
}