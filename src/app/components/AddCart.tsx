'use client'

import { useCartStore } from "../store"
import { ProductType } from '@/types/ProductType'


export default function Product({ product }: { product: ProductType }) {
  const { addProduct } = useCartStore()

  return (
    <div
      onClick={() => addProduct(product)}
      className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-center cursor-pointer"
    >
      Adicionar ao Carrinho
    </div>
  )
}