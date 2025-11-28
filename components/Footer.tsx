import { Flame, Shield, Zap, Heart } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Footer = () => {
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  const authLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orders", label: "My Orders" },
    { href: "/about", label: "About" },
  ];

  return (
    <footer className="bg-black border-t border-[#1a1a1a] mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-crimson">
              THE CRIMSON FORGE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed w-full md:w-[75%]">
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
                <Flame className="w-4 h-4 text-crimson mt-1 shrink-0" />
                <p className="text-gray-400 text-sm">Forged to Endure</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-crimson mt-1 shrink-0" />
                <p className="text-gray-400 text-sm">Quality Guaranteed</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-crimson mt-1 shrink-0" />
                <p className="text-gray-400 text-sm">Power Amplified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8">
          <p className="text-center text-gray-500 text-sm flex justify-center items-center flex-wrap">
            Made with <Heart className="w-4 h-4 mx-1 text-crimson" /> by <Link href="https://portfolio-ekmins-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="mx-1 text-crimson hover:text-crimson-glow transition-colors">Ekmin Samaraweera.</Link> All rights reserved © {new Date().getFullYear()}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
