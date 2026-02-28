'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const BRAND_DARK = '#0F2A43';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll al top (logo)
  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Scroll inteligente por sección
  const handleSectionScroll = useCallback(
    (id: string) => {
      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [pathname, router]
  );

  // Detectar scroll para efecto premium
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-500
        ${
          scrolled
            ? 'backdrop-blur-xl bg-white/80 shadow-lg border-b border-slate-200'
            : 'bg-white/70'
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <button
          onClick={scrollTop}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/jxf-logo.png"
            alt="JXF Colombia"
            width={38}
            height={38}
            priority
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <span
            className="text-lg font-extrabold tracking-tight transition-colors duration-300"
            style={{ color: BRAND_DARK }}
          >
            JXF Colombia
          </span>
        </button>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">

          <NavItem onClick={() => handleSectionScroll('masvendidos')}>
            Más vendidos
          </NavItem>

          <NavItem onClick={() => handleSectionScroll('categorias')}>
            Categorías
          </NavItem>

          {/* 🔥 CAMBIO AQUÍ */}
          <Link
            href="/nosotros"
            className="
              px-4 py-2 rounded-full
              text-slate-700
              hover:text-slate-900
              hover:bg-slate-100
              transition-all duration-300
            "
          >
            Nosotros
          </Link>

          <NavItem onClick={() => handleSectionScroll('faq')}>
            FAQ
          </NavItem>

          <Link
            href="/catalogo"
            className="
              ml-4 px-5 py-2.5 rounded-full
              bg-gradient-to-r from-lime-400 to-lime-500
              hover:from-lime-500 hover:to-lime-600
              text-slate-900 font-semibold
              shadow-md hover:shadow-lg
              transition-all duration-300
            "
          >
            Ver catálogo
          </Link>

        </nav>
      </div>
    </header>
  );
}

/* ---------- ITEM REUTILIZABLE ---------- */

function NavItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 rounded-full
        text-slate-700
        hover:text-slate-900
        hover:bg-slate-100
        transition-all duration-300
      "
    >
      {children}
    </button>
  );
}