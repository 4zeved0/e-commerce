'use client'
import { useEffect } from "react"
import { useCartStore } from "../store"

export default function Checkout() {
  const CartStore = useCartStore()

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: CartStore.cart,
        payment_intent_id: CartStore.paymentIntent
      }),
    }).then(res => { return res.json() }).then(data => {
      console.log(data.paymentIntent);
    })
  }, [CartStore.cart, CartStore.paymentIntent])

  return (
    <div>Checkout</div>
  )
}