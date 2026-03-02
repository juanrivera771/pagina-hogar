'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface ToastProps {
  isVisible: boolean
  onClose: () => void
  product?: {
    name: string
    price: number
    image: string
  }
}

export default function Toast({
  isVisible,
  onClose,
  product
}: ToastProps) {

  const { openCart } = useCart() // ✅ IMPORTANTE

  if (!product) return null

  const handleViewCart = () => {
    openCart()     // abre el drawer
    onClose()      // cierra el toast
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-[9999] w-[360px] max-w-[90%]"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#E8F5E9] shadow-xl border border-green-200 p-4">

            <div className="relative flex gap-4">

              {/* Imagen */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Producto agregado
                </p>

                <p className="text-sm text-gray-700 line-clamp-1">
                  {product.name}
                </p>

                <p className="text-sm font-bold text-green-700 mt-1">
                  ${product.price.toLocaleString('es-CO')}
                </p>

                <button
                  onClick={handleViewCart}  // ✅ AQUÍ ESTÁ LA CLAVE
                  className="mt-2 text-xs font-semibold text-white bg-black px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  Ver carrito
                </button>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition"
              >
                <X size={16} />
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}