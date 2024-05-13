import { formatPrice } from "@/lib/utils";
import { useStore } from "zustand";
import { useCartStore } from "../store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const { user } = useUser();
  const cartStore = useCartStore();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      cartStore.toggleCart();
      router.push('/sign-in?redirect=/');
      return;
    }

    cartStore.setCheckout('checkout')
  }

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    if (item.price !== null && item.quantity !== undefined) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  console.log(totalPrice);

  return (
    <div>
      <p className="text-teal-600 text-sm font-bold">Total: {formatPrice(totalPrice)}</p>
      <button
        className="w-full mt-2 rounded-md bg-teal-600 text-white py-2"
        onClick={handleCheckout}
      >
        Finalizar compra
      </button>
    </div>
  )
}