'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const BRAND_DARK = '#0F2A43';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { cart, openCart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogoClick = useCallback(() => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
    setMobileOpen(false);
  }, [pathname, router]);

  const handleSectionScroll = useCallback(
    (id: string) => {
      setMobileOpen(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 Bloquear scroll cuando menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <button
          onClick={handleLogoClick}
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

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">

          <NavItem onClick={() => handleSectionScroll('masvendidos')}>
            Más vendidos
          </NavItem>

          <NavItem onClick={() => handleSectionScroll('categorias')}>
            Categorías
          </NavItem>

          <Link
            href="/nosotros"
            className="px-4 py-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
          >
            Nosotros
          </Link>

          <NavItem onClick={() => handleSectionScroll('faq')}>
            FAQ
          </NavItem>

          <Link
            href="/catalogo"
            className="ml-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-slate-900 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ver catálogo
          </Link>

          <CartButton totalItems={totalItems} openCart={openCart} />
        </nav>

        {/* MOBILE RIGHT SIDE */}
        <div className="flex items-center gap-3 md:hidden">
          <CartButton totalItems={totalItems} openCart={openCart} />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            className="p-2 rounded-md hover:bg-slate-100 transition"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 text-sm font-medium bg-white border-t border-slate-200">

          <button onClick={() => handleSectionScroll('masvendidos')}>
            Más vendidos
          </button>

          <button onClick={() => handleSectionScroll('categorias')}>
            Categorías
          </button>

          <Link href="/nosotros" onClick={() => setMobileOpen(false)}>
            Nosotros
          </Link>

          <button onClick={() => handleSectionScroll('faq')}>
            FAQ
          </button>

          <Link
            href="/catalogo"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-2 rounded-lg bg-lime-400 text-slate-900 font-semibold text-center"
          >
            Ver catálogo
          </Link>

        </div>
      </div>
    </header>
  );
}

/* ---------- COMPONENTES ---------- */

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
      className="px-4 py-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
    >
      {children}
    </button>
  );
}

function CartButton({
  totalItems,
  openCart,
}: {
  totalItems: number;
  openCart: () => void;
}) {
  return (
    <button
      onClick={openCart}
      className="relative p-2 rounded-full hover:bg-slate-100 transition-all duration-300"
    >
      <svg
        className="w-6 h-6 text-slate-800"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 5h12M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>

      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
          {totalItems}
        </span>
      )}
    </button>
  );
}