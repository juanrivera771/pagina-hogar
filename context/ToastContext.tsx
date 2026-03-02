'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import Toast from '@/components/ui/Toast'

interface ProductToast {
  name: string
  price: number
  image: string
}

interface ToastContextType {
  showToast: (product: ProductToast) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [product, setProduct] = useState<ProductToast | undefined>(undefined)

  const showToast = useCallback((productData: ProductToast) => {
    setProduct(productData)
    setIsVisible(true)

    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  const closeToast = () => {
    setIsVisible(false)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        isVisible={isVisible}
        onClose={closeToast}
        product={product}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}