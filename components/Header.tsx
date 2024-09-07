import Link from "next/link";
import { CreditCardIcon, TrendingUpDownIcon } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center opacity-75 hover:opacity-100">
      <Link className="flex items-center justify-center" href="/">
        <TrendingUpDownIcon className="h-10 w-10" />
        <span className="ml-2 text-lg font-semibold">FixPanel</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/products">
          Products
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
          Sign In
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
          About
        </Link>
      </nav>
    </header>
  );
}
