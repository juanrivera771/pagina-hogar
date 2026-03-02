'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCallback } from 'react';

const categorias = [
  { nombre: 'Organización', slug: 'organizacion' },
  { nombre: 'Cocina', slug: 'cocina' },
  { nombre: 'Limpieza', slug: 'limpieza' },
  { nombre: 'Baño', slug: 'bano' },
  { nombre: 'Iluminación', slug: 'iluminacion' },
  { nombre: 'Otros', slug: 'otros' },
] as const;

const animaciones = [
  'float-1',
  'float-2',
  'float-3',
  'float-2',
  'float-1',
  'float-3',
] as const;

export default function CategoriasHome() {
  const router = useRouter();

  const handleNavigate = useCallback(
    (slug: string) => {
      router.push(`/catalogo?categoria=${slug}`);
    },
    [router]
  );

  return (
    <section
      id="categorias"
      className="mx-auto max-w-7xl px-4 py-16 sm:py-24 md:py-28 scroll-mt-24"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 md:mb-16 text-slate-800 tracking-tight">
        Explora por categorías
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
        {categorias.map((cat, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={`${animaciones[index]} will-change-transform`}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigate(cat.slug)}
            >
              <div
                className="
                  group cursor-pointer
                  rounded-2xl
                  bg-white/80 backdrop-blur-sm
                  shadow-xl
                  p-5 sm:p-6 md:p-8
                  text-center
                  transition-all duration-500
                  hover:scale-105
                  hover:shadow-2xl
                  hover:bg-white
                  relative overflow-hidden
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-green-400/0 via-green-400/0 to-green-400/10" />

                <h3 className="relative font-semibold text-slate-700 text-base sm:text-lg group-hover:text-green-600 transition">
                  {cat.nombre}
                </h3>

                <div className="relative opacity-0 group-hover:opacity-100 transition duration-300 text-xs sm:text-sm mt-3 sm:mt-4 text-green-600 font-medium">
                  Ver productos →
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}