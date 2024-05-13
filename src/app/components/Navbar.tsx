import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton
} from "@clerk/nextjs";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link href='/' className='uppercase font-bold text-md h-12 flex items-center'>
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <Cart />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="uppercase rounded-md border-gray-400 px-3 py-2"
              >
                Fazer Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}