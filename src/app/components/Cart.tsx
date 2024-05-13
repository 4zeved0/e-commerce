'use client'
import { useCartStore } from "../store";
import { CartDrawer } from "./CartDrawer";

export default function Cart() {
  const useStore = useCartStore();
  return (
    <div className="flex items-center cursor-pointer relative" onClick={() => useStore.toggleCart()}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16.5" cy="18.5" r="1.5" fill="#ffffff" />
        <circle cx="9.5" cy="18.5" r="1.5" fill="#ffffff" />
        <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" fill="#ffffff" />
      </svg>
      <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
        {useStore.cart?.length}
      </span>
      {useStore.isOpen && (
        <CartDrawer />
      )}
    </div>
  )
}
