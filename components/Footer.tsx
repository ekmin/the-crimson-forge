import { Flame, Shield, Zap } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Footer = () => {
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  const authLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orders", label: "My Orders" },
  ];

  return (
    <footer className="bg-black border-t border-[#1a1a1a] mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-crimson">
              THE CRIMSON FORGE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed w-[75%]">
              Forging the tools of power for those who dare to rise. Every piece
              is crafted with precision and tested in the fires of combat.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-white tracking-wider">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              <SignedOut>
                {publicLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-crimson transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </SignedOut>
              <SignedIn>
                {authLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-crimson transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </SignedIn>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-white tracking-wider">
              OUR PRINCIPLES
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Flame className="w-4 h-4 text-crimson mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Forged to Endure</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-crimson mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Quality Guaranteed</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-crimson mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Power Amplified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} The Crimson Forge. All rights
            reserved. Strength is earned, not given.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
