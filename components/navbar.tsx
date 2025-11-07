"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../public/ijwi-logo.png"

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide the global navbar for any admin routes
  if (pathname?.startsWith("/admin")) return null;

  // Spacer to offset the fixed navbar height so page content doesn't sit under it
  const Spacer = () => <div className="h-16" aria-hidden />;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Our Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-[#F3F4F6] hover:text-[#F97316] transition-colors"
          >
            <img src={Logo.src} alt="ijwi-hub-logo" className="h-20 w-20" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks
              .filter((l) => l.href !== "/contact")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#F97316]"
                      : "text-[#F3F4F6] hover:text-[#F97316]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Contact CTA (separated to the right on desktop) */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium bg-[#F97316] text-white px-4 py-2 rounded-md hover:bg-[#EA580C]"
            >
              Contact
            </Link>
          </div>

          {/* Admin Login Button
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F3F4F6]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#27272A]">
          <div className="px-4 py-4 space-y-3">
            {navLinks
              .filter((l) => l.href !== "/contact")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#F97316]"
                      : "text-[#F3F4F6] hover:text-[#F97316]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <Button asChild className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
