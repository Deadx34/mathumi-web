"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useToast } from '@/components/Toast';

function CategoryCard({ cat, slug, serviceCount }: { cat: any, slug: string, serviceCount: number }) {
  const images = cat.images && cat.images.length > 0 ? cat.images : (cat.image ? cat.image.split(',') : ['/salon-service.png']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="gold-panel flex flex-col rounded overflow-hidden bg-transparent border border-[#c2a670]/15 shadow-sm group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] flex flex-col bg-transparent">
        <Link href={`/salon/${slug}`} className="relative flex-grow min-h-0 block">
          <img src={images[currentIndex]} alt={`${cat.name} - ${currentIndex + 1}`} className="absolute inset-0 w-full h-full object-contain object-center img-luxury-hover transition-all duration-500" />
        </Link>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#6e1224] text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 cursor-pointer border border-white/10 shadow-md"
              aria-label="Previous image"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#6e1224] text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 cursor-pointer border border-white/10 shadow-md"
              aria-label="Next image"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10 bg-black/25 backdrop-blur-[2px] px-2.5 py-1 rounded-full">
              {images.map((_: any, idx: number) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-[#c2a670] scale-125' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow text-center items-center">
        <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-3 uppercase tracking-wide">{cat.name}</h3>
        <p className="text-xs text-[#1c1512]/75 mb-4 leading-relaxed max-w-xs font-sans">
          {cat.description}
        </p>
        <span className="text-[#6e1224] text-[10px] font-sans font-bold tracking-wider mb-4">{serviceCount} SERVICES</span>
        <Link href={`/salon/${slug}`} className="mt-auto py-2 px-6 rounded-full font-sans font-bold border border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase tracking-widest text-[9px]">
          VIEW TREATMENTS
        </Link>
      </div>
    </div>
  );
}

export default function SalonPage() {
  const { showToast, ToastElement } = useToast();
  const [salonServices, setSalonServices] = useState<any[]>([]);
  const [salonCategories, setSalonCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/salon-services`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/salon-categories`).then(res => res.json())
    ])
      .then(([services, categories]) => {
        setSalonServices(services);
        setSalonCategories(categories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching salon data:", err);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          contactNumber: formData.phone,
          serviceRequested: formData.service,
          preferredDate: formData.date,
          timeSlot: formData.time
        })
      });
      if (res.ok) {
        showToast(
          'Reservation Request Sent!',
          'success',
          'Your treatment booking has been received. Our beauty team will contact you shortly to confirm your appointment.'
        );
        setFormData({ fullName: '', phone: '', service: '', date: '', time: '' });
      } else if (res.status === 409) {
        showToast(
          'Time Slot Unavailable',
          'warning',
          'This time slot is already booked for this treatment. Please select a different date or time.'
        );
      } else {
        showToast(
          'Submission Failed',
          'error',
          'We could not process your reservation at this time. Please try again or contact us on WhatsApp.'
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        'Network Error',
        'error',
        'Unable to reach our servers. Please check your connection or contact us directly.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [activeRegion, setActiveRegion] = useState('batticaloa');

  const regions = [
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
    <>
      {ToastElement}
      <div className="flex flex-col w-full z-10 pb-20 text-[#1c1512]">
      
      {/* Hero Intro */}
      <div className="relative w-full h-[450px] md:h-[55vh] flex flex-col items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/salon_header.png" fill className="object-cover object-center" alt="Beauty Care Hero" priority />
          <div className="absolute inset-0 bg-[#1c1512]/65 backdrop-blur-[2px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 w-full">
          <span className="text-[#c2a670] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
            MATHUMI BEAUTY SANCTUARY
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 uppercase tracking-[0.08em] drop-shadow-md">
            BEAUTY SALON
          </h1>
          
          <div className="kolam-separator justify-center w-full max-w-[300px]">
            <div className="kolam-line"></div>
            <div className="kolam-ornament">✧</div>
            <div className="kolam-line"></div>
          </div>

          <p className="text-sm sm:text-base text-white/90 max-w-xl font-sans font-light leading-relaxed">
            Experience premium holistic care. From organic skincare and advanced facials to customized hair styling in Batticaloa.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-[#fbf9f6] pt-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Business Location Info Panel */}
          <div className="w-full max-w-5xl mb-20 gold-panel p-8 rounded bg-white border border-[#c2a670]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase block mb-1">SALON LOCATION</span>
              <p className="font-serif text-lg font-medium text-[#1c1512]">Trinco Road, Near Signal Light, Batticaloa</p>
              <p className="text-xs text-[#1c1512]/60 mt-1">Open Everyday, 8:30 AM - 6:00 PM</p>
            </div>
            <button 
              onClick={() => {
                const text = encodeURIComponent("Hi, I want to book a hair care / skin treatment appointment at your Trinco Road salon.");
                window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
              }}
              className="gold-button rounded-full text-[10px] tracking-[0.15em] font-sans font-bold whitespace-nowrap"
            >
              CHAT ON WHATSAPP
            </button>
          </div>

          {/* Interactive Bridal Packages Section (Embedded) */}
          <div className="w-full max-w-6xl mb-24 flex flex-col items-center">
            <span className="text-[#6e1224] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2">
              PRICING & EXPERIENCES
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#4a2511] mb-2 uppercase tracking-[0.08em] text-center">
              OUR BRIDAL PACKAGES
            </h2>
            
            <div className="kolam-separator mb-8 max-w-md">
              <div className="kolam-line"></div>
              <div className="kolam-ornament">✧</div>
              <div className="kolam-line"></div>
            </div>

            {/* Region Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 border-2 cursor-pointer
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch mb-10">
              {activeData.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`gold-panel p-6 sm:p-8 rounded bg-white flex flex-col hover:-translate-y-1 transition-all duration-500 border-2 relative
                    ${pkg.isPopular ? 'border-[#6e1224] shadow-lg' : 'border-[#d4af37]'}`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#6e1224] text-white px-3 py-0.5 rounded-full text-[8px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-base font-bold text-[#6e1224] mb-1 font-serif text-center uppercase tracking-wider">
                    {pkg.name}
                  </h3>
                  
                  <div className="text-center mb-6 border-y border-[#c2a670]/15 py-3 bg-[#6e1224]/5 mt-2">
                    <span className="text-xl font-serif font-bold text-[#4a2511] block">
                      {pkg.price}
                    </span>
                    {pkg.note && (
                      <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#6e1224] block mt-1">
                        {pkg.note}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 text-xs text-[#1c1512]/85 font-semibold mb-6 flex-grow font-sans pr-1">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <span className="text-[#0f5132] mr-2 mt-0.5 text-xs flex-shrink-0">🌿</span>
                        <span className="leading-relaxed text-[11px]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={`/booking?service=bridal&package=${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`w-full py-2.5 rounded-full text-[9px] tracking-[0.2em] font-sans font-bold text-center block uppercase transition-all duration-300 shadow-sm
                        ${pkg.isPopular
                          ? 'gold-button hover:scale-105'
                          : 'border border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224]'
                        }`}
                    >
                      BOOK YOUR DATE
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* WITH LOVE Accent */}
            <div className="text-center mt-6">
              <div className="font-cursive text-xl text-[#4a2511] italic font-normal tracking-wide">
                With Love — Mathumi Thayaparan
              </div>
            </div>
          </div>

          {/* Level 1 Services Grid */}
          <div className="w-full mb-20">
            <div className="text-center mb-12 flex flex-col items-center">
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1">SERVICE MENU</span>
              <h2 className="text-3xl font-serif text-[#1c1512] mb-2 uppercase tracking-[0.08em]">LUXURY SERVICE CATEGORIES</h2>
              
              <div className="kolam-separator">
                <div className="kolam-line"></div>
                <div className="kolam-ornament">✧</div>
                <div className="kolam-line"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              
              {!loading && salonCategories.map((cat: any, idx: number) => {
                const catName = cat.name;
                const slug = catName === 'Hair Styling' ? 'hair-care' : catName.toLowerCase().replace(/\s+/g, '-');
                const heroImage = cat.image || '/salon-service.png';
                const desc = cat.description;
                const serviceCount = salonServices.filter((s: any) => s.category === catName).length;

                return <CategoryCard key={slug + '-' + idx} cat={cat} slug={slug} serviceCount={serviceCount} />;
              })}

            </div>
          </div>

          {/* Booking Request Form Panel */}
          <div id="booking-form" className="w-full max-w-4xl mb-12 scroll-mt-32">
            <div className="gold-panel bg-white border border-[#c2a670]/20 rounded p-8 sm:p-12 shadow-sm">
              <div className="text-center mb-8">
                <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1 block">RESERVATIONS</span>
                <h2 className="text-2xl font-serif text-[#1c1512] mb-2 uppercase tracking-[0.08em]">BOOK A TREATMENT</h2>
                <p className="text-[#6e1224] font-sans font-bold text-[10px] tracking-wide uppercase">RESERVE YOUR GLOWING EXPERIENCE</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Anjali Kumar"
                    required
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    placeholder="+94 77 123 4567"
                    required
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Select Treatment Category *</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      required
                      className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] text-sm text-[#1c1512] appearance-none focus:outline-none focus:border-[#6e1224] font-medium"
                      onChange={handleChange}
                    >
                      <option value="">Choose a treatment...</option>
                      <option value="Facial Treatment">Facial Treatments</option>
                      <option value="Skin Treatment">Skin Treatments</option>
                      <option value="Hair Styling">Hair Care & Styling</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#c2a670]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Preferred Date *</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    required
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Preferred Time *</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    required
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 pt-6">
                  <button type="submit" className="gold-button w-full py-4 text-xs font-bold tracking-wider uppercase shadow-md cursor-pointer">
                    SUBMIT BOOKING REQUEST
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
      </div>
    </>
  );
}

