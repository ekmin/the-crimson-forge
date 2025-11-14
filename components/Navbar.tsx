"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import EyeBall from "./EyeBall";
import { useScroll, useMotionValueEvent } from "framer-motion";
import {
  ClerkLoaded,
  SignInButton,
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const SCROLL_THRESHOLD = 10;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > SCROLL_THRESHOLD && !scrolled) {
      setScrolled(true);
    } else if (latest <= SCROLL_THRESHOLD && scrolled) {
      setScrolled(false);
    }
  });

  const isActive = (path: string) => pathname === path;

  const publicLinks = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
  ];

  const authLinks = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
    { href: "/orders", label: "MY ORDERS" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`text-sm tracking-wide transition-all duration-200 relative group ${
        isActive(href) ? "text-crimson" : "text-gray-400 hover:text-white"
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-[2px] bg-crimson transition-all duration-200 ${
          isActive(href) ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#393939] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/10"
          : "backdrop-blur-none bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="hidden md:flex text-xl md:text-2xl font-bold tracking-wider text-crimson transition-all duration-200 hover:crimson-glow"
          >
            <EyeBall />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <SignedOut>
              {publicLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </SignedOut>
            <SignedIn>
              {authLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </SignedIn>
            <Link
              href="/cart"
              className={`relative text-sm tracking-wide transition-all duration-200 group ${
                isActive("/cart")
                  ? "text-crimson"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-crimson text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center crimson-glow">
                  1
                </span>
              </div>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-crimson transition-all duration-200 ${
                  isActive("/cart") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <ClerkLoaded>
              {user ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <Button
                    size="sm"
                    className="border-2 border-crimson hover:bg-crimson-glow text-gray-400 hover:text-white px-5 py-5 crimson-glow-hover transition-all duration-200 cursor-pointer"
                  >
                    LOG IN
                  </Button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>

          <div className="flex md:hidden">
            <ClerkLoaded>
              {user ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <Button
                    size="sm"
                    className="border-2 border-crimson hover:bg-crimson-glow text-gray-400 hover:text-white px-5 py-5 crimson-glow-hover transition-all duration-200 cursor-pointer"
                  >
                    LOG IN
                  </Button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/cart"
              className={`relative text-sm tracking-wide transition-all duration-200 ${
                isActive("/cart")
                  ? "text-crimson"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-crimson text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center crimson-glow">
                  1
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-crimson hover:text-[#ff1a1a] transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`md:hidden ${scrolled ? "bg-trasparent" : "bg-[#111111]"} border-t border-[#1a1a1a] py-4 space-y-4`}
          >
            <SignedOut>
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-2 text-sm tracking-wide transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-crimson bg-[#0a0a0a] border-l-2 border-crimson crimson-glow"
                      : "text-gray-400 hover:text-white hover:bg-[#0a0a0a]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </SignedOut>
            <SignedIn>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-2 text-sm tracking-wide transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-crimson bg-[#0a0a0a] border-l-2 border-crimson crimson-glow"
                      : "text-gray-400 hover:text-white hover:bg-[#0a0a0a]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
