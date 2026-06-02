"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const sareeItems = [
  { 
    id: 's1', 
    name: 'Royal Madder Maroon Kanchipuram', 
    category: 'Pure Kanchipuram Silk Sarees', 
    type: 'SAREE', 
    price: 'LKR 85,000',
    desc: 'Woven with authentic gold zari thread, featuring intricate heritage borders and traditional peacock motifs.', 
    image: '/lookbook/sa5.webp', 
    fabric: 'Pure Mulberry Silk', 
    zari: 'Chased Gold Zari' 
  },
  { 
    id: 's2', 
    name: 'Emerald Temple Green Silk Saree', 
    category: 'Pure Kanchipuram Silk Sarees', 
    type: 'SAREE', 
    price: 'LKR 92,000',
    desc: 'Draped in royal green silk featuring elegant broad temple borders and traditional floral buttis.', 
    image: '/lookbook/sa12.webp', 
    fabric: 'Pure Silk', 
    zari: 'Antique Gold Zari' 
  },
  { 
    id: 's3', 
    name: 'Elixir Peach Bridal Silk Saree', 
    category: 'Pure Kanchipuram Silk Sarees', 
    type: 'SAREE', 
    price: 'LKR 78,000',
    desc: 'Soft pastel peach silk woven for modern bridal aesthetics, displaying delicate paisley details.', 
    image: '/lookbook/sa8.webp', 
    fabric: 'Raw Silk Blend', 
    zari: 'Fine Silver Gold Zari' 
  },
  { 
    id: 'b1', 
    name: 'Heritage Peacock Motif Blouse', 
    category: 'Rich Aari Work Blouses', 
    type: 'AARI BLOUSE', 
    price: 'LKR 18,000',
    desc: 'Exquisite hand-carved aari embroidery featuring traditional double-headed peacock motifs on premium velvet.', 
    image: '/lookbook/sa15.webp', 
    fabric: 'Premium Velvet & Silk', 
    zari: 'Heavy Zardosi Beadwork' 
  },
  { 
    id: 'b2', 
    name: 'Heavy Zardosi Bridal Atelier Blouse', 
    category: 'Rich Aari Work Blouses', 
    type: 'AARI BLOUSE', 
    price: 'LKR 22,000',
    desc: 'Elaborate kundan and gold thread hand-embroidery on high-sheen silk fabric, perfect for wedding sarees.', 
    image: '/lookbook/sa22.webp', 
    fabric: 'Pure Raw Silk', 
    zari: 'Kundan & Bead Embroidery' 
  },
  { 
    id: 'l1', 
    name: 'Imperial Crimson Bridal Lehenga', 
    category: 'Lehengas', 
    type: 'BRIDAL LEHENGA', 
    price: 'LKR 145,000',
    desc: 'Stunning traditional lehenga skirt with a matching blouse and diaphanous dupatta, heavily embroidered in gold.', 
    image: '/lookbook/sa19.webp', 
    fabric: 'Handloom Georgette Silk', 
    zari: 'Heavy Zardosi Work' 
  },
];

const sareeCategories = ['All', 'Pure Kanchipuram Silk Sarees', 'Rich Aari Work Blouses', 'Lehengas'];

export default function BoutiquePage() {
  const [activeSareeCat, setActiveSareeCat] = useState('All');
  const { addItem } = useCart();
  const [sareesList, setSareesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sarees`)
      .then(res => res.json())
      .then(data => {
        setSareesList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching sarees:", err);
        // Fallback to static items if backend fails
        setSareesList(sareeItems.map(item => ({
          _id: item.id,
          name: item.name,
          category: item.category,
          type: item.type,
          price: item.price,
          description: item.desc,
          image: item.image,
          fabric: item.fabric,
          zari: item.zari
        })));
        setLoading(false);
      });
  }, []);

  const filteredSarees = activeSareeCat === 'All' 
    ? sareesList 
    : sareesList.filter(item => item.category === activeSareeCat);

  return (
    <div className="flex flex-col w-full z-10 pb-20 text-[#1c1512]">
      
      {/* Hero Intro */}
      <div className="relative w-full h-[450px] md:h-[55vh] flex flex-col items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/boutique_header.png" fill className="object-cover object-center" alt="Bridal Boutique Hero" priority />
          <div className="absolute inset-0 bg-[#1c1512]/65 backdrop-blur-[2px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 w-full">
          <span className="text-[#c2a670] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
            MATHUMI BRIDAL ATELIER
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 uppercase tracking-[0.08em] drop-shadow-md">
            THE BRIDAL BOUTIQUE
          </h1>
          
          <div className="kolam-separator justify-center w-full max-w-[300px]">
            <div className="kolam-line"></div>
            <div className="kolam-ornament">✧</div>
            <div className="kolam-line"></div>
          </div>

          <p className="text-sm sm:text-base text-white/90 max-w-xl font-sans font-light leading-relaxed">
            Discover unmatched traditional craftsmanship. Explore heritage Kanchipuram silks, bespoke hand-embroidered blouses, and royal bridal lehengas in Batticaloa.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-[#fbf9f6] pt-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">

          {/* Business Location & Hours Highlight Banner */}
          <div className="w-full max-w-5xl mb-20 gold-panel p-8 rounded bg-white border border-[#c2a670]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase block mb-1">ATELIER LOCATION</span>
              <p className="font-serif text-lg font-medium text-[#1c1512]">St. Anthoniyar Road, Batticaloa</p>
              <p className="text-xs text-[#1c1512]/60 mt-1">Near Design Jewelry | Open Mon - Sat, 9:00 AM - 7:00 PM</p>
            </div>
            <button 
              onClick={() => {
                const text = encodeURIComponent("Hi, I want to inquire about custom Kanchipuram saree bookings and price listings.");
                window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
              }}
              className="gold-button rounded-full text-[10px] tracking-[0.15em] font-sans font-bold whitespace-nowrap"
            >
              CHAT ON WHATSAPP
            </button>
          </div>

          {/* Bridal Boutique Section */}
          <div className="w-full mb-16">
            <div className="text-center mb-12 flex flex-col items-center">
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1">THE COLLECTION</span>
              <h2 className="text-3xl font-serif text-[#1c1512] mb-2 uppercase tracking-[0.08em]">DYNAMIC SARTORIAL CATALOG</h2>
              
              <div className="kolam-separator">
                <div className="kolam-line"></div>
                <div className="kolam-ornament">✧</div>
                <div className="kolam-line"></div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {sareeCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveSareeCat(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    activeSareeCat === cat
                      ? 'bg-[#6e1224] text-white shadow-sm border border-[#6e1224]'
                      : 'bg-white text-[#1c1512] border border-[#c2a670]/20 hover:bg-[#c2a670]/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dresses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {filteredSarees.map((item) => (
                <div key={item._id} className="gold-panel flex flex-col rounded overflow-hidden bg-white border border-[#c2a670]/15 shadow-sm group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="relative w-full h-[300px] sm:h-[360px] md:h-[380px] overflow-hidden bg-[#faf7f2] p-2">
                    <div className="relative w-full h-full overflow-hidden rounded">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow text-center items-center">
                    <span className="text-[#6e1224] text-[9px] font-sans font-bold uppercase tracking-[0.25em] mb-2">{item.type}</span>
                    <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-2 uppercase tracking-wide leading-snug">{item.name}</h3>
                    <p className="text-xs text-[#1c1512]/75 mb-4 leading-relaxed font-sans max-w-xs">{item.description || item.desc}</p>
                    
                    {/* Fabric details */}
                    <div className="w-full flex justify-between border-t border-dashed border-[#c2a670]/15 pt-3 mb-6 text-[10px] font-sans text-[#1c1512]/60 uppercase tracking-widest px-1">
                      <span>{item.fabric}</span>
                      <span>{item.zari}</span>
                    </div>
 
                    <div className="mt-auto w-full flex flex-col gap-2">
                      <div className="text-sm font-serif font-semibold text-[#1c1512] border-b border-[#c2a670]/10 pb-2 mb-2">
                        {item.price}
                      </div>
                      
                      <button 
                        onClick={() => addItem({ id: item._id, name: item.name, image: item.image, category: item.category, type: item.type })} 
                        className="w-full py-2.5 rounded-full font-sans font-bold border border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase tracking-widest text-[9px] cursor-pointer"
                      >
                        ADD TO INQUIRY CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full border-t border-[#c2a670]/15 my-8"></div>

          {/* Complete Combo Promotion Section */}
          <div className="w-full text-center bg-[#6e1224]/5 p-10 sm:p-14 rounded border border-[#c2a670]/25 shadow-sm max-w-5xl mt-12 mb-8">
            <span className="text-[#6e1224] font-sans font-bold text-[10px] tracking-[0.25em] uppercase block mb-1">EXCLUSIVE SAVINGS</span>
            <h3 className="text-2xl font-serif text-[#1c1512] mb-4 uppercase tracking-[0.08em]">THE COMPLETE BRIDAL COMBINATION</h3>
            <p className="text-xs text-[#1c1512]/80 max-w-xl mx-auto mb-8 font-sans leading-relaxed">
              Unlock elegant synergies. Book your bridal makeup, dress draping, and luxury jewelry rental together to claim premium combination discounts for your wedding day.
            </p>
            <Link href="/booking" className="gold-button rounded-full font-bold px-10 py-3.5 shadow-md">
              INQUIRE ABOUT BRIDAL PACKAGES
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
