"use client";
import React, { useState } from 'react';
import Link from 'next/link';

type Package = {
  name: string;
  price: string;
  note?: string;
  features: string[];
  isPopular?: boolean;
};

type RegionData = {
  id: string;
  label: string;
  packages: Package[];
};

export default function PackagesPage() {
  const [activeRegion, setActiveRegion] = useState('batticaloa');

  const regions: RegionData[] = [
    {
      id: 'batticaloa',
      label: 'Batticaloa Area',
      packages: [
        {
          name: 'SILVER PACKAGE',
          price: '138,000/-',
          features: [
            'Natural Stable Makeup Look',
            '02 Dressing (Sarees pleating, ironing, and draping)',
            '02 Hairstyling (with natural flowers/Headdress)',
            'Jewellery Collections (02 premium sets)',
            '02 Floral Bouquets (01 Natural & 01 Artificial)',
            'Services: Classic Facial, Threading, Nail Extensions & Polish'
          ]
        },
        {
          name: 'GOLDEN PACKAGE',
          price: '158,000/-',
          isPopular: true,
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Couture Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (01 Luxury Natural, 01 Artificial)',
            'Bridal Care (Glow luxury facial, full body treatment, mani, pedi, threading, nails)'
          ]
        },
        {
          name: 'PREMIUM STANDARD PACKAGE',
          price: '198,000/-',
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Luxury Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (02 Luxury Natural bouquets)',
            'VIP Bridal Care (Full Mehendi, facials, body treatment, luxury mani/pedi, threading, nails)'
          ]
        }
      ]
    },
    {
      id: 'out-of-batticaloa',
      label: 'Out of Batticaloa Area',
      packages: [
        {
          name: 'SILVER PACKAGE',
          price: '138,000/-',
          note: '+ Transport & Travel costs apply',
          features: [
            'Natural Stable Makeup Look',
            '02 Dressing (Sarees pleating, ironing, and draping)',
            '02 Hairstyling (with natural flowers/Headdress)',
            'Jewellery Collections (02 premium sets)',
            '02 Floral Bouquets (01 Natural & 01 Artificial)',
            'Services: Classic Facial, Threading, Nail Extensions & Polish'
          ]
        },
        {
          name: 'GOLDEN PACKAGE',
          price: '158,000/-',
          note: '+ Transport & Travel costs apply',
          isPopular: true,
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Couture Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (01 Luxury Natural, 01 Artificial)',
            'Bridal Care (Glow luxury facial, full body treatment, mani, pedi, threading, nails)'
          ]
        },
        {
          name: 'PREMIUM STANDARD PACKAGE',
          price: '198,000/-',
          note: '+ Transport & Travel costs apply',
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Luxury Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (02 Luxury Natural bouquets)',
            'VIP Bridal Care (Full Mehendi, facials, body treatment, luxury mani/pedi, threading, nails)'
          ]
        }
      ]
    },
    {
      id: 'out-of-sri-lanka',
      label: 'Out of Sri Lanka',
      packages: [
        {
          name: 'SILVER PACKAGE',
          price: '138,000/-',
          note: '+ Custom Destination Rates apply',
          features: [
            'Natural Stable Makeup Look',
            '02 Dressing (Sarees pleating, ironing, and draping)',
            '02 Hairstyling (with natural flowers/Headdress)',
            'Jewellery Collections (02 premium sets)',
            '02 Floral Bouquets (01 Natural & 01 Artificial)',
            'Services: Classic Facial, Threading, Nail Extensions & Polish'
          ]
        },
        {
          name: 'GOLDEN PACKAGE',
          price: '158,000/-',
          note: '+ Custom Destination Rates apply',
          isPopular: true,
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Couture Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (01 Luxury Natural, 01 Artificial)',
            'Bridal Care (Glow luxury facial, full body treatment, mani, pedi, threading, nails)'
          ]
        },
        {
          name: 'PREMIUM STANDARD PACKAGE',
          price: '198,000/-',
          note: '+ Custom Destination Rates apply',
          features: [
            'Signature Bridal Makeup (Soft, radiant, premium cosmetics)',
            'Couture Dressing (02 Grand Looks: saree pleating, ironing & draping)',
            'Luxury Hairstyling (02 latest styles with fresh natural flowers)',
            'Designer Jewellery (02 premium designer sets)',
            'Signature Floral Bouquets (02 Luxury Natural bouquets)',
            'VIP Bridal Care (Full Mehendi, facials, body treatment, luxury mani/pedi, threading, nails)'
          ]
        }
      ]
    }
  ];

  const activeData = regions.find(r => r.id === activeRegion) || regions[0];

  return (
    <div className="flex-grow flex flex-col items-center py-16 px-4 sm:px-8 md:px-12 relative z-10 w-full max-w-7xl mx-auto text-[#1c1512]">
      
      {/* Page Header */}
      <span className="text-[#6e1224] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2">
        PRICING & EXPERIENCES
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#4a2511] mb-2 uppercase tracking-[0.08em] text-center">
        OUR BRIDAL PACKAGES
      </h1>
      
      <div className="kolam-separator mb-8 max-w-md">
        <div className="kolam-line"></div>
        <div className="kolam-ornament">✧</div>
        <div className="kolam-line"></div>
      </div>

      <p className="text-center text-xs sm:text-sm text-[#1c1512]/70 max-w-xl mb-12 font-sans font-semibold leading-relaxed">
        Invest in bridal perfection. Handcrafted luxury packages designed to enhance your natural grace with premium styling, designer jewelry, and signature care.
      </p>

      {/* Region Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`px-6 py-3 rounded-full text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-350 border-2 cursor-pointer
              ${activeRegion === region.id
                ? 'bg-[#6e1224] text-white border-[#6e1224] shadow-md'
                : 'bg-white text-[#4a2511] border-[#d4af37]/50 hover:border-[#6e1224] hover:text-[#6e1224]'
              }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch mb-16">
        {activeData.packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`gold-panel p-8 rounded bg-white flex flex-col hover:-translate-y-1.5 transition-all duration-500 border-2 relative
              ${pkg.isPopular ? 'border-[#6e1224] shadow-lg' : 'border-[#d4af37]'}`}
          >
            {/* Popular Badge */}
            {pkg.isPopular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#6e1224] text-white px-4 py-1 rounded-full text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                MOST POPULAR
              </div>
            )}

            {/* Package Name */}
            <h3 className="text-lg font-bold text-[#6e1224] mb-1 font-serif text-center uppercase tracking-wider">
              {pkg.name}
            </h3>
            
            {/* Price & Note */}
            <div className="text-center mb-8 border-y border-[#c2a670]/15 py-4 bg-[#6e1224]/5 mt-3">
              <span className="text-2xl font-serif font-bold text-[#4a2511] block">
                {pkg.price}
              </span>
              {pkg.note && (
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#6e1224] block mt-1.5 animate-pulse">
                  {pkg.note}
                </span>
              )}
            </div>

            {/* Features List */}
            <ul className="space-y-4 text-xs text-[#1c1512]/85 font-semibold mb-8 flex-grow font-sans pr-2">
              {pkg.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start">
                  {/* Subtle Botanical Green Leaf / Checkmark Accent */}
                  <span className="text-[#0f5132] mr-3 mt-0.5 text-sm flex-shrink-0">🌿</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-auto">
              <Link
                href={`/booking?service=bridal&package=${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`w-full py-3.5 rounded-full text-[10px] sm:text-xs tracking-[0.2em] font-sans font-bold text-center block uppercase transition-all duration-300 shadow-sm
                  ${pkg.isPopular
                    ? 'gold-button hover:scale-105'
                    : 'border-2 border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224]'
                  }`}
              >
                BOOK YOUR DATE
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Beauty Salon Section */}
      <div className="w-full bg-[#6e1224]/5 p-8 sm:p-12 rounded border-2 border-[#d4af37] text-center max-w-5xl mb-12 shadow-sm relative mt-8">
        <span className="text-[#6e1224] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase block mb-2">BEAUTY SALON</span>
        <div className="text-[#d4af37] text-xl mb-3">✧</div>
        <p className="text-xs sm:text-sm text-[#1c1512]/80 max-w-xl mx-auto mb-6 font-sans font-semibold leading-relaxed">
          Experience premium holistic care. From organic skincare and advanced facials to customized hair styling in Batticaloa.
        </p>
        <Link href="/salon" className="gold-button rounded-full font-bold px-8 py-3.5 text-xs font-sans uppercase">
          EXPLORE SALON TREATMENTS
        </Link>
      </div>

      {/* "WITH LOVE - Mathumi Thayaparan" Accent */}
      <div className="text-center mt-12 mb-6">
        <span className="text-[10px] tracking-[0.4em] font-sans font-semibold text-[#6e1224]/70 uppercase block mb-1">
          Crafted For Royal Elegance
        </span>
        <div className="font-cursive text-2xl sm:text-3xl text-[#4a2511] italic font-normal tracking-wide mt-2">
          With Love — Mathumi Thayaparan
        </div>
      </div>

    </div>
  );
}
