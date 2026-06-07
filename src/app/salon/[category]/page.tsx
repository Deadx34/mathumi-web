"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

// Category metadata (hero images & descriptions for each URL slug)
const categoryMeta: Record<string, { title: string; description: string; heroImage: string; dbCategory: string }> = {
  'hair-care': {
    title: 'Hair Care & Styling',
    description: 'Transform your look with our professional hair styling, organic conditioning, and treatments.',
    heroImage: '/salon_hair.png',
    dbCategory: 'Hair Styling'
  },
  'skin-care': {
    title: 'Skin Care & Facials',
    description: 'Rejuvenate your skin with our customized treatments and advanced clinical facials.',
    heroImage: '/salon_facial.png',
    dbCategory: 'Skin Care'
  },
  'makeup-artistry': {
    title: 'Makeup Artistry',
    description: 'Professional bridal, party, and photoshoot makeup services by certified artists.',
    heroImage: '/hero_bride.png',
    dbCategory: 'Makeup Artistry'
  }
};

// Fallback static services (used only if backend is unreachable)
const fallbackServices: Record<string, any[]> = {
  'hair-care': [
    { _id: 'f1', title: 'Botanical Hair Styling', description: 'Professional blow-dry styling, thermal straightening, and updos tailored for any formal occasion.', image: '/imges/sa2.webp' },
    { _id: 'f2', title: 'Balayage & Coloring', description: 'Custom highlights and hand-painted balayage treatments using international organic products.', image: '/imges/sa16.webp' },
    { _id: 'f3', title: 'Keratin Deep Treatment', description: 'Restructuring protein therapies and intense hydration hair spas for absolute shine.', image: '/imges/sa9.webp' },
    { _id: 'f4', title: 'Bespoke Bridal Hair Design', description: 'Traditional South Indian long braids and jasmine garland draping for your wedding.', image: '/imges/sa15.webp' }
  ],
  'skin-care': [
    { _id: 'f5', title: 'Luxury Herbal Facial', description: 'Sandalwood and turmeric deep cleansing, exfoliation, and clarifying herbal face packs.', image: '/imges/sa4.webp' },
    { _id: 'f6', title: 'Advanced Skin Brightening', description: 'Gentle exfoliation and specialized serum infusions to restore skin clarity and natural glow.', image: '/imges/sa11.webp' },
    { _id: 'f7', title: 'Anti-Aging Therapy', description: 'Collagen-boosting treatments to tighten pores, reduce fine lines, and firm the skin.', image: '/imges/sa18.webp' },
    { _id: 'f8', title: 'Clarifying Acne Care', description: 'Detoxifying clay treatments and healing therapies designed to clear breakouts gently.', image: '/imges/sa18.webp' }
  ]
};

function ServiceCard({ service }: { service: any }) {
  const images = service.images && service.images.length > 0 ? service.images : (service.image ? service.image.split(',') : ['/salon-service.png']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="gold-panel flex flex-col sm:flex-row rounded overflow-hidden bg-white border border-[#c2a670]/15 shadow-sm group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="relative w-full sm:w-[40%] h-56 sm:h-auto bg-transparent flex-shrink-0">
        <img src={images[currentIndex]} alt={`${service.title} - ${currentIndex + 1}`} className="absolute inset-0 w-full h-full object-contain object-center img-luxury-hover transition-opacity duration-300" />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              &#10094;
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              &#10095;
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full border border-white transition-all ${idx === currentIndex ? 'bg-white scale-110' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col justify-center flex-grow">
        <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-1 uppercase tracking-wide leading-tight">{service.title}</h3>
        <p className="text-xs text-[#1c1512]/75 mb-6 leading-relaxed font-sans">{service.description}</p>
        
        <Link href="/booking" className="gold-button rounded-full text-[9px] tracking-[0.15em] font-sans font-bold w-max cursor-pointer mt-auto">
          BOOK SERVICE
        </Link>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: any }) {
  const { category: categoryKey } = React.use(params) as any;
  const [meta, setMeta] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/salon-services`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/salon-categories`).then(res => res.json())
    ])
      .then(([servicesData, categoriesData]) => {
        const matchedCat = categoriesData.find((c: any) => 
          c.name.toLowerCase().replace(/\s+/g, '-') === categoryKey ||
          (c.name === 'Hair Styling' && categoryKey === 'hair-care')
        );

        if (matchedCat) {
          const categoryMetadata = {
            title: matchedCat.name,
            description: matchedCat.description,
            heroImage: matchedCat.image || '/salon-service.png',
            dbCategory: matchedCat.name
          };
          setMeta(categoryMetadata);
          const filtered = servicesData.filter((s: any) => s.category === matchedCat.name);
          setServices(filtered);
        } else {
          // Fallback to static category mapping
          const fallbackMeta = categoryMeta[categoryKey];
          if (fallbackMeta) {
            setMeta(fallbackMeta);
            const filtered = servicesData.filter((s: any) => s.category === fallbackMeta.dbCategory);
            setServices(filtered);
          } else {
            setMeta(null);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching category details:", err);
        const fallbackMeta = categoryMeta[categoryKey];
        if (fallbackMeta) {
          setMeta(fallbackMeta);
          setServices(fallbackServices[categoryKey] || []);
        }
        setLoading(false);
      });
  }, [categoryKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-[#4a2511] font-bold text-xl animate-pulse">Loading treatments...</p>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 z-10 relative text-[#1c1512]">
        <h1 className="text-3xl font-serif text-[#1c1512] mb-4 uppercase tracking-wider">CATEGORY NOT FOUND</h1>
        <Link href="/salon" className="gold-button rounded-full font-bold">RETURN TO SALON MENU</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full z-10 pb-20 text-[#1c1512]">
      
      {/* Dynamic Hero */}
      <div className="relative w-full h-[400px] md:h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src={meta.heroImage} className="absolute inset-0 w-full h-full object-cover object-center" alt={meta.title} />
          <div className="absolute inset-0 bg-[#1c1512]/65 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 w-full">
          <Link href="/salon" className="text-[#c2a670] hover:text-white mb-6 uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2">
            <span>←</span>
            <span>BACK TO MENU</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 uppercase tracking-[0.08em] drop-shadow-md">
            {meta.title}
          </h1>
          <p className="text-sm sm:text-base text-white/95 max-w-xl font-sans font-light leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Sub-Services Grid */}
      <div className="w-full bg-[#fbf9f6] pt-16 px-6 sm:px-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-[#4a2511] font-bold text-xl animate-pulse">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#4a2511]/60 font-serif text-lg">No services found in this category yet.</p>
              <Link href="/salon" className="gold-button rounded-full font-bold mt-6 inline-block">RETURN TO SALON MENU</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
