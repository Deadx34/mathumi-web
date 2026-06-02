"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomeClient({ services, gallery }: { services: any[], gallery: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All Services");
  
  const categories = ["All Services", "Hair Styling", "Skin Care", "Makeup Artistry"];
  
  const filteredServices = activeFilter === "All Services" 
    ? services 
    : services.filter(s => s.category === activeFilter);

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-8 sm:p-12 relative w-full max-w-7xl mx-auto z-10">
      
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-16 mt-4">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start pr-8">
          <span className="text-[#800020] font-bold tracking-widest uppercase mb-4 text-sm">Premium Beauty Experience</span>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#4a2511] mb-6 leading-tight font-serif tracking-tight">
            Mathumi Hair & Beauty
          </h1>
          <div className="flex items-center justify-start mb-6 w-full">
            <div className="h-px bg-[#d4af37] w-12"></div>
            <div className="mx-3 text-[#d4af37] text-sm">✧</div>
            <div className="h-px bg-[#d4af37] w-12"></div>
          </div>
          <h2 className="text-2xl text-[#800020] font-serif italic mb-4">
            Where elegance meets excellence.
          </h2>
          <p className="text-xl text-[#4a2511] font-light mb-8 max-w-lg">
            Discover luxury beauty care, bridal perfection, and professional education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-start">
            <Link href="/booking" className="gold-button">
              Book Your Appointment
            </Link>
            <Link href="/boutique" className="px-6 py-2 border-2 border-[#d4af37] text-[#4a2511] font-bold uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-white transition-colors rounded-full">
              Explore Bridal Collection
            </Link>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0 relative h-[400px]">
          <div className="relative w-full md:w-4/5 h-full rounded shadow-xl overflow-hidden border-2 border-[#d4af37]">
            <Image src="/hero_bride.png" alt="Mathumi Bride" fill className="object-cover object-top" />
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="w-full gold-panel p-8 mb-16 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-pattern.png')] bg-blend-multiply opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-around items-center divide-y md:divide-y-0 md:divide-x divide-[#d4af37]">
          <div className="flex flex-col items-center py-4 md:py-0 w-full text-[#4a2511]">
            <span className="text-5xl font-bold font-serif mb-2">500+</span>
            <span className="uppercase tracking-widest text-sm font-bold">Happy Brides</span>
          </div>
          <div className="flex flex-col items-center py-4 md:py-0 w-full text-[#4a2511]">
            <span className="text-5xl font-bold font-serif mb-2">15+</span>
            <span className="uppercase tracking-widest text-sm font-bold">Expert Stylists</span>
          </div>
          <div className="flex flex-col items-center py-4 md:py-0 w-full text-[#4a2511]">
            <span className="text-5xl font-bold font-serif mb-2">10+</span>
            <span className="uppercase tracking-widest text-sm font-bold">Years Experience</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold font-serif text-[#4a2511] mb-4">Your Beauty Destination</h2>
        <div className="h-1 w-20 bg-[#d4af37] mx-auto mb-6"></div>
        <p className="text-lg text-[#4a2511] leading-relaxed">
          At Mathumi Hair & Beauty, we believe that beauty is an art. With years of expertise and a passion for perfection, we offer comprehensive beauty services, exquisite bridal experiences, and professional training that transforms lives.
        </p>
      </div>

      {/* Services Section */}
      <div className="w-full mb-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-serif text-[#4a2511] mb-2 uppercase">Our Services</h2>
          <p className="text-[#800020] font-serif italic text-lg">Excellence in every detail</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded text-sm uppercase tracking-wider font-semibold border ${
                activeFilter === cat 
                  ? 'bg-[#800020] text-white border-[#800020] shadow-md' 
                  : 'bg-[#fdf5eb] text-[#4a2511] border-[#d4af37] hover:bg-[#f4e8d3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <div key={service._id} className="gold-panel p-4 flex flex-col text-center">
              <div className="relative w-full h-48 rounded border border-[#d4af37]/50 overflow-hidden mb-4 shadow-inner">
                <img src={service.image || '/salon-service.png'} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[#4a2511] font-bold font-serif text-lg leading-tight mb-2 h-10">{service.title}</h3>
              <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-4 block">{service.category}</span>
              <div className="mt-auto">
                <Link href="/salon" className="gold-button block py-1.5 text-xs w-full">
                  Explore
                </Link>
              </div>
            </div>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full text-center text-[#4a2511] py-10 font-bold">No services found for this category.</div>
          )}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="w-full gold-panel p-10 text-center mb-16 border-4 border-[#800020]">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-[#800020]">
          Your Complete Bridal Look in One Place.
        </h2>
        <p className="text-xl text-[#4a2511] font-medium mb-8">
          Makeup, Dress & Jewelry with Exclusive Combo Discounts!
        </p>
        <Link href="/booking" className="gold-button px-10 py-3 text-lg">
          Claim Your Discount Now
        </Link>
      </div>

      {/* Gallery Section */}
      <div className="w-full mb-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-serif text-[#4a2511] mb-2 uppercase">Our Work</h2>
          <p className="text-[#800020] font-serif italic text-lg">Beauty in Every Detail</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative w-full h-64 border-2 border-[#d4af37] p-1 bg-white shadow-lg group">
              <div className="relative w-full h-full overflow-hidden">
                <img src={img.url} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#4a2511]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/gallery" className="gold-button">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full text-center py-10 border-t border-[#d4af37]">
        <h2 className="text-3xl font-bold font-serif text-[#4a2511] mb-4">Ready to Transform?</h2>
        <p className="text-lg text-[#4a2511] mb-8">
          Experience the Mathumi difference. Book your appointment today and discover the luxury you deserve.
        </p>
        <Link href="/booking" className="gold-button px-10 py-3 text-lg">
          Book Your Appointment
        </Link>
      </div>

      {/* Social Icons Bottom Right (Mockup Style) */}
      <div className="fixed bottom-6 right-6 flex gap-3 opacity-80 z-50">
        <div className="w-8 h-8 rounded-full border-2 border-[#d4af37] bg-[#fdf5eb] shadow flex items-center justify-center text-[#4a2511] font-bold text-xs hover:bg-[#d4af37] hover:text-[#fdf5eb] cursor-pointer transition-colors">In</div>
        <div className="w-8 h-8 rounded-full border-2 border-[#d4af37] bg-[#fdf5eb] shadow flex items-center justify-center text-[#4a2511] font-bold text-xs hover:bg-[#d4af37] hover:text-[#fdf5eb] cursor-pointer transition-colors">Fb</div>
        <div className="w-8 h-8 rounded-full border-2 border-[#d4af37] bg-[#fdf5eb] shadow flex items-center justify-center text-[#4a2511] font-bold text-xs hover:bg-[#d4af37] hover:text-[#fdf5eb] cursor-pointer transition-colors">Wa</div>
      </div>

    </div>
  );
}
