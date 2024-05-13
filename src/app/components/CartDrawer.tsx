'use client'
import { useStore } from "zustand";
import { useCartStore } from "../store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";

export function CartDrawer() {
  const useStore = useCartStore();
  return (
    <div
      className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll">

        <button
          onClick={() => useStore.toggleCart()}
          className="font-bold text-sm text-teal-600">
          Voltar para loja
        </button>

        <div className="border-t border-gray-400 my-4"></div>
        {useStore.onCheckout === 'cart' && (
          <>
            {
              useStore.cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={100}
                    className="object-cover w-24"
                  />
                  <div>
                    <h2 className="w-42 truncate">{item.name}</h2>
                    <h2>Quantidade: {item.quantity}</h2>
                    <p className="text-teal-600 text-sm font-bold">{formatPrice(item.price)}</p>
                    <button
                      className="bg-teal-600 text-white px-3 py-2 text-center cursor-pointer rounded-sm text-sm mr-5 mt-3"
                      onClick={() => useStore.addProduct(item)}
                    >Adicionar</button>
                    <button
                      className="bg-red-600 text-white px-3 py-2 text-center cursor-pointer rounded-sm text-sm mt-3"
                      onClick={() => useStore.removeProduct(item)}
                    >Remover</button>
                  </div>
                </div>
              ))
            }
          </>
        )}
        {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && (
          <CheckoutButton />
        )}
        {useStore.onCheckout === 'checkout' && (
          <Checkout />
        )}
      </div>
    </div>
  )
}