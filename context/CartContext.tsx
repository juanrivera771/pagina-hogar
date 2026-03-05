'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react'

/* ================================
   TYPES
================================ */

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  clearCart: () => void
  totalPrice: number
  totalItems: number

  // Drawer control
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

/* ================================
   CONTEXT
================================ */

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  /* ================================
     LOAD FROM LOCALSTORAGE
  ================================= */

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedCart = localStorage.getItem('cart')

    if (storedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(storedCart)
        setCart(parsed)
      } catch {
        localStorage.removeItem('cart')
      }
    }
  }, [])

  /* ================================
     SAVE TO LOCALSTORAGE
  ================================= */

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  /* ================================
     DRAWER CONTROL
  ================================= */

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  /* ================================
     CART LOGIC
  ================================= */

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  /* ================================
     DERIVED VALUES (OPTIMIZED)
  ================================= */

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }, [cart])

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  /* ================================
     PROVIDER
  ================================= */

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        totalItems,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ================================
   HOOK
================================ */

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}