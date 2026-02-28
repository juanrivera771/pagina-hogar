'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function NosotrosPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#070D18] text-white overflow-hidden">

      {/* GRID FUTURISTA DE FONDO */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* GLOW DINÁMICO */}
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500/20 rounded-full blur-[180px]"
      />

      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight"
        >
          No somos una tienda.
          <br />
          <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            Somos una evolución.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 text-xl text-slate-400 max-w-3xl"
        >
          JXF Colombia redefine lo que significa comprar para el hogar.
          Tecnología, diseño y criterio estratégico en cada decisión.
        </motion.p>
      </section>

      {/* SECCIÓN STICKY PREMIUM */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl w-full px-10 py-16 rounded-[40px]
              backdrop-blur-3xl bg-white/5 border border-white/10
              shadow-[0_0_80px_rgba(0,255,150,0.15)]"
          >
            <h2 className="text-4xl font-bold mb-8">
              Cada producto es una declaración.
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              No acumulamos catálogo. Curamos experiencias.
              Evaluamos impacto visual, funcionalidad real y coherencia tecnológica.
              Si no mejora el estilo de vida, no entra.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section className="relative z-10 py-40 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-12"
        >
          Reinventamos lo cotidiano.
        </motion.h2>

        <p className="max-w-4xl mx-auto text-xl text-slate-400 leading-relaxed">
          El futuro del hogar no es una promesa. Es una decisión.
          Creemos que la tecnología no debe impresionar,
          debe simplificar, elevar y transformar.
        </p>
      </section>

      {/* CTA ULTRA PREMIUM */}
      <section className="relative z-10 py-32 flex justify-center">
        <motion.a
          href="/catalogo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-14 py-6 rounded-full
            bg-gradient-to-r from-lime-400 to-emerald-500
            text-black font-bold text-lg
            shadow-[0_0_60px_rgba(0,255,150,0.4)]
            transition-all duration-300"
        >
          Descubrir la colección
        </motion.a>
      </section>

    </main>
  );
}

/* ---------- DATA ---------- */

const features = [
  {
    title: 'Curaduría estratégica',
    text: 'Cada producto responde a una lógica de innovación y utilidad real.',
  },
  {
    title: 'Diseño inteligente',
    text: 'Estética y funcionalidad trabajando juntas, no por separado.',
  },
  {
    title: 'Experiencia elevada',
    text: 'Desde el clic hasta la entrega, todo comunica evolución.',
  },
];