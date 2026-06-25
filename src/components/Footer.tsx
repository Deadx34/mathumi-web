import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#c2a670]/15 relative z-20 py-16 text-[#1c1512]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/logo.png" 
                alt="Mathumi Boutique & Salon Logo" 
                width={80} 
                height={80} 
                className="object-cover h-14 w-14 rounded-full border border-[#d4af37] shadow-sm" 
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg font-serif tracking-wider">MATHUMI</span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#6e1224] mt-1">Boutique & Salon</span>
              </div>
            </div>
            <p className="text-xs font-sans font-medium text-[#1c1512]/70 leading-relaxed max-w-xs">
              Batticaloa's premier destination for luxury Kanchipuram silks, professional beauty styling, and accredited education.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#6e1224] mb-5 uppercase">EXPLORE</h4>
            <div className="flex flex-col space-y-3 text-xs font-bold tracking-wider">
              <Link href="/" className="hover:text-[#6e1224] transition-colors">HOME</Link>
              <Link href="/salon" className="hover:text-[#6e1224] transition-colors">BEAUTY CARE</Link>
              <Link href="/gallery" className="hover:text-[#6e1224] transition-colors">GALLERY</Link>
              <Link href="/academy" className="hover:text-[#6e1224] transition-colors">ACADEMY</Link>
            </div>
          </div>

          {/* Locations Column */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#6e1224] mb-5 uppercase">LOCATIONS</h4>
            <div className="flex flex-col space-y-4 text-xs font-medium text-[#1c1512]/80 leading-relaxed">
              <div>
                <p className="font-bold text-[#1c1512] mb-0.5">Bridal Boutique</p>
                <p>St. Anthoniyar Road, Batticaloa<br/><span className="opacity-70">(Near Design Jewelry)</span></p>
              </div>
              <div>
                <p className="font-bold text-[#1c1512] mb-0.5">Beauty Salon</p>
                <p>Trinco Road, Near Signal Light, Batticaloa</p>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#6e1224] mb-5 uppercase">CONTACT</h4>
            <div className="flex flex-col space-y-2 text-xs font-medium text-[#1c1512]/80 mb-6">
              <p><span className="font-bold">Phone:</span> 0767510906</p>
              <p><span className="font-bold">WhatsApp:</span> 0767510906</p>
              <p><span className="font-bold">Email:</span> mathumibridal.com</p>
              <p><span className="font-bold">Hours:</span> Everyday | 8:30 AM - 6:00 PM</p>
            </div>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/mathumi_bridal_boutique/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all duration-300" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@mathumithayaparan_mua/video/7628283485739814164" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all duration-300" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.47-.77-.63-1.4-1.43-1.81-2.33v8.32c-.02 2.23-.71 4.54-2.43 6.02-1.8 1.6-4.39 2.23-6.71 1.68-2.63-.58-4.92-2.65-5.32-5.35-.61-3.65 1.71-7.44 5.33-8.22 1.01-.22 2.06-.21 3.07.03V13c-1.3-.4-2.77-.28-3.95.45-1.57.94-2.43 2.81-2.28 4.62.15 1.94 1.5 3.73 3.39 4.19 1.84.48 3.97-.09 5.09-1.63.78-1.04 1.02-2.41 1.01-3.69V.02z"/></svg>
              </a>
              <a href="https://www.facebook.com/Thayamathumi" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all duration-300" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-[#c2a670]/10 text-center text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1c1512]/50 flex flex-col gap-1 items-center">
          <span>© 2026 Mathumi Hair and Beauty. Crafted for Royal Elegance.</span>
          <a href="https://kingsparrowgroups.com/" target="_blank" rel="noopener noreferrer" className="text-[8px] text-[#6e1224]/70 font-semibold tracking-wider normal-case mt-1 hover:text-[#800020] hover:underline transition-all">
            Designed by King Sparrow Group of Companies (Pvt) Ltd.
          </a>
        </div>
      </div>
    </footer>
  );
}
