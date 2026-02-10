'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Product } from '@/payload-types'

export interface CartItem {
    productId: string
    quantity: number
    product?: Product
}

interface CartContextType {
    items: CartItem[]
    addItem: (productId: string, product?: Product) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    isOpen: boolean
    toggleCart: () => void
    closeCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'montblanc-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
            try {
                setItems(JSON.parse(stored))
            } catch (e) {
                console.error('Failed to parse cart:', e)
            }
        }
        setIsHydrated(true)
    }, [])

    // Save cart to localStorage when items change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
        }
    }, [items, isHydrated])

    const addItem = useCallback((productId: string, product?: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.productId === productId)
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { productId, quantity: 1, product }]
        })
        setIsOpen(true)
    }, [])

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId))
    }, [])

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        )
    }, [removeItem])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const toggleCart = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const closeCart = useCallback(() => {
        setIsOpen(false)
    }, [])

    const total = items.reduce((sum, item) => {
        const price = item.product?.price || 0
        return sum + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isOpen,
                toggleCart,
                closeCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
