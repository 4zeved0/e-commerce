import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '@/types/ProductType';

type CartState = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  isOpen: boolean;
  toggleCart: () => void
  onCheckout: string;
  setCheckout: (checkout: string) => void
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addProduct: (newItem) => set((state) => {
        const product = state.cart.find((item) => item.id === newItem.id)
        if (product) {
          const updatedCart = state.cart.map((p) => {
            if (p.id === newItem.id) {
              return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 }
            }
            return p
          })
          return { cart: updatedCart }
        }
        else {
          return { cart: [...state.cart, { ...newItem, quantity: 1 }] }
        }
      }),
      removeProduct: (newItem) => set((state) => {
        const existProduct = state.cart.find((item) => item.id === newItem.id)
        if (existProduct && existProduct.quantity! > 1) {
          const updatedCart = state.cart.map((p) => {
            if (p.id === newItem.id) {
              return { ...p, quantity: p.quantity! - 1 }
            }
            return p
          })
          return { cart: updatedCart }
        } else {
          const filteredCart = state.cart.filter((p) => p.id !== newItem.id)
          return { cart: filteredCart }
        }
      }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: 'cart',
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntent: '',
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent: paymentIntent })),
    }), { name: 'cart-storage' })
)


