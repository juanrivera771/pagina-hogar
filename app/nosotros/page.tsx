'use client';

import { motion } from 'framer-motion';

export default function NosotrosPage() {
  return (
    <main className="relative overflow-hidden bg-[#0B1220] text-white">

      {/* EFECTOS DE FONDO */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-lime-400/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          No vendemos productos.  
          <br />
          <span className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
            Diseñamos experiencias para el hogar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-lg text-slate-300 max-w-3xl mx-auto"
        >
          En JXF Colombia combinamos tecnología, funcionalidad y diseño para
          transformar lo cotidiano en algo extraordinario. No seguimos tendencias,
          las reinterpretamos.
        </motion.p>
      </section>

      {/* CARDS FLOTANTES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-3 gap-8">

        {[
          {
            title: 'Innovación real',
            text: 'Seleccionamos productos que realmente optimizan tiempo, espacio y comodidad.',
          },
          {
            title: 'Tecnología accesible',
            text: 'Creemos que la innovación no debe ser exclusiva. La llevamos a cada hogar.',
          },
          {
            title: 'Experiencia premium',
            text: 'Desde la compra hasta la entrega, todo está diseñado para ser simple y eficiente.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="
              backdrop-blur-xl bg-white/5 border border-white/10
              rounded-3xl p-8
              hover:scale-105 hover:bg-white/10
              transition-all duration-500
              shadow-2xl
            "
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
              {item.title}
            </h3>
            <p className="text-slate-300">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* BLOQUE VISIÓN FUTURISTA */}
      <section className="relative z-10 py-28 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Reinventando el concepto de tienda online
          </motion.h2>

          <p className="mt-8 text-lg text-slate-300 leading-relaxed">
            No somos un catálogo infinito sin criterio. Cada producto que ves en JXF
            pasa por un filtro estratégico: utilidad real, impacto visual,
            eficiencia y tendencia tecnológica. Nuestro enfoque no es vender más,
            es vender mejor.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-lime-400/20 to-transparent rounded-3xl p-8 border border-lime-400/30">
              <h4 className="text-2xl font-bold mb-4">Nuestra misión</h4>
              <p className="text-slate-300">
                Llevar innovación práctica a los hogares colombianos,
                elevando el estándar de lo que significa comprar online.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl p-8 border border-blue-400/30">
              <h4 className="text-2xl font-bold mb-4">Nuestra visión</h4>
              <p className="text-slate-300">
                Convertirnos en la marca referente de tecnología accesible
                para el hogar en Latinoamérica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          El futuro del hogar comienza aquí.
        </h2>

        <p className="text-slate-400 mb-10">
          Descubre por qué nuestros clientes sienten que compran algo más que un producto.
        </p>

        <a
          href="/catalogo"
          className="
            inline-block px-8 py-4 rounded-full
            bg-gradient-to-r from-lime-400 to-green-500
            text-black font-bold
            shadow-xl hover:scale-105
            transition-all duration-300
          "
        >
          Explorar catálogo
        </a>
      </section>
    </main>
  );
}