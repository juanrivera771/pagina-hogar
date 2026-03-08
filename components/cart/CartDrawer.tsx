'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    isCartOpen,
    closeCart,
    totalPrice,
  } = useCart()

  const [loading, setLoading] = useState(false)

  /* ================================
  MENSAJE WHATSAPP
  ================================= */

  const whatsappMessage = encodeURIComponent(
    `Hola JXF Colombia 👋 quiero hacer este pedido:\n\n${cart
      .map(
        (item) =>
          `• ${item.name}\n` +
          `  Cantidad: ${item.quantity}\n` +
          `  Subtotal: $${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n\n')}\n\n` +
      `TOTAL DEL PEDIDO: $${totalPrice.toLocaleString()}\n\n` +
      `Datos para el envío:\n` +
      `Nombre:\n` +
      `Ciudad:\n` +
      `Dirección:\n` +
      `Teléfono:`
  )

  /* ================================
  DESCONTAR STOCK
  ================================= */

  async function descontarStock(id: string, quantity: number) {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Error al actualizar stock')
        return false
      }

      return true
    } catch (error) {
      console.error(error)
      alert('Error de conexión con el servidor')
      return false
    }
  }

  /* ================================
  CHECKOUT
  ================================= */

  async function handleCheckout() {
    if (cart.length === 0) return

    if (loading) return

    setLoading(true)

    for (const item of cart) {
      const ok = await descontarStock(String(item.id), item.quantity)

      if (!ok) {
        setLoading(false)
        return
      }
    }

    window.open(
      `https://wa.me/573165119987?text=${whatsappMessage}`,
      '_blank'
    )

    clearCart()
    closeCart()
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-[9997]"
          />

          {/* DRAWER */}
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[9998] flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Tu carrito</h2>

              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* PRODUCTOS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 && (
                <p className="text-slate-500 text-sm">
                  Tu carrito está vacío.
                </p>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-4 border-b pb-4"
                >
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>

                    <p className="text-slate-500 text-xs mt-1">
                      ${item.price.toLocaleString()}
                    </p>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>

                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 mt-2 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="block w-full text-center bg-black text-white py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Pedir por WhatsApp'}
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}