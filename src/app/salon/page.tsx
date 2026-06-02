"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function SalonPage() {
  const [salonServices, setSalonServices] = useState<any[]>([]);
  const [salonCategories, setSalonCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/salon-services').then(res => res.json()),
      fetch('http://localhost:5000/api/salon-categories').then(res => res.json())
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
      const res = await fetch('http://localhost:5000/api/bookings', {
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
        alert("Your reservation request has been successfully submitted! Our team will contact you shortly.");
        setFormData({ fullName: '', phone: '', service: '', date: '', time: '' });
      } else if (res.status === 409) {
        alert("This time slot is already booked for this treatment. Please select a different date or time!");
      } else {
        alert("Failed to submit reservation. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Failed to request reservation.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
              <p className="text-xs text-[#1c1512]/60 mt-1">Open Mon - Sat, 9:00 AM - 7:00 PM | Sunday by Appointment</p>
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
              
              {!loading && (salonCategories.length > 0 ? salonCategories : [
                { name: 'Hair Styling', description: 'Precision cuts, botanical oil massages, keratin repair, and gorgeous bridal styling designed for exquisite bounce.', image: '/salon_hair.png' },
                { name: 'Skin Care', description: 'Herbal facials, deep cleansing, and anti-aging therapies customized to elevate your skin\'s organic radiance.', image: '/salon_facial.png' },
                { name: 'Makeup Artistry', description: 'Professional bridal, party, and photoshoot makeup services by certified artists.', image: '/hero_bride.png' }
              ]).map((cat: any) => {
                const catName = cat.name;
                const slug = catName === 'Hair Styling' ? 'hair-care' : catName.toLowerCase().replace(/\s+/g, '-');
                const heroImage = cat.image || '/salon-service.png';
                const desc = cat.description;
                const serviceCount = salonServices.filter((s: any) => s.category === catName).length;

                return (
                  <Link key={catName} href={`/salon/${slug}`} className="gold-panel flex flex-col rounded overflow-hidden bg-white border border-[#c2a670]/15 shadow-sm group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] overflow-hidden bg-[#faf7f2]">
                      <img src={heroImage} alt={catName} className="absolute inset-0 w-full h-full object-cover object-center img-luxury-hover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow text-center items-center">
                      <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-3 uppercase tracking-wide">{catName}</h3>
                      <p className="text-xs text-[#1c1512]/75 mb-4 leading-relaxed max-w-xs font-sans">
                        {desc}
                      </p>
                      <span className="text-[#6e1224] text-[10px] font-sans font-bold tracking-wider mb-4">{serviceCount} SERVICES</span>
                      <span className="mt-auto py-2 px-6 rounded-full font-sans font-bold border border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase tracking-widest text-[9px]">
                        VIEW TREATMENTS
                      </span>
                    </div>
                  </Link>
                );
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
  );
}
