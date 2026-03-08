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
  id: string
  name: string
  price: number
  image: string
  quantity: number
  stock?: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clearCart: () => void
  totalPrice: number
  totalItems: number

  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

/* ================================
CONTEXT
================================ */

const CartContext = createContext<CartContextType | undefined>(undefined)

/* ================================
PROVIDER
================================ */

export function CartProvider({ children }: { children: ReactNode }) {

  /* ================================
  STATE
  ================================= */

  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  /* ================================
  LOAD CART FROM LOCALSTORAGE
  ================================= */

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        setCart(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading cart', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  /* ================================
  SAVE CART
  ================================= */

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart, isLoaded])

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

      const stock = product.stock ?? Infinity

      if (existing) {
        if (existing.quantity >= stock) {
          alert('No hay más stock disponible')
          return prev
        }

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      if (stock <= 0) {
        alert('Producto sin stock')
        return prev
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const increaseQty = (id: string) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item

        const stock = item.stock ?? Infinity

        if (item.quantity >= stock) {
          alert('Stock máximo alcanzado')
          return item
        }

        return { ...item, quantity: item.quantity + 1 }
      })
    )
  }

  const decreaseQty = (id: string) => {
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

  const clearCart = () => {
    setCart([])
  }

  /* ================================
  DERIVED VALUES
  ================================= */

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
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