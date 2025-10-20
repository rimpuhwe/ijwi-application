import Link from "next/link"
import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-[#F3F4F6] mb-4">IJWI Hub</h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Empowering creators through sound and technology innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F3F4F6] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#9CA3AF] hover:text-[#F97316] text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#F97316] text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#9CA3AF] hover:text-[#F97316] text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#9CA3AF] hover:text-[#F97316] text-sm transition-colors">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F3F4F6] font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>Email: info@ijwihub.com</li>
              <li>Phone: +250 788 544 839</li>
              <li>Kigali, Rwanda</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#F3F4F6] font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ijwihub?utm_source=qr&igsh=NWIwMTduN3QyMXhu" target="_blank" className="text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" target="_blank" className="text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" target="_blank" className="text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/IjwiHub?t=Ur_lctseTpRwY7XIYnsezw&s=09" target="_blank" className="text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#27272A] text-center text-sm text-[#9CA3AF]">
          <p>&copy; {new Date().getFullYear()} IJWI Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
