"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/components/Toast';

export default function BookingPage() {
  const { showToast, ToastElement } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    serviceRequested: 'Beauty Salon Services',
    preferredDate: '',
    timeSlot: '09:00 AM - 11:00 AM',
    message: ''
  });
 
  // Detect pre-selected service from URL query params (e.g. from homepage links)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      if (serviceParam === 'bridal') {
        setFormData(prev => ({ ...prev, serviceRequested: 'Bridal Package Consultation' }));
      } else if (serviceParam === 'skin') {
        setFormData(prev => ({ ...prev, serviceRequested: 'Skin Care & Facials' }));
      } else if (serviceParam === 'hair') {
        setFormData(prev => ({ ...prev, serviceRequested: 'Hair Artistry & Styling' }));
      }
    }
  }, []);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(
          'Your Request Has Been Sent!',
          'success',
          'Thank you for reaching out to Mathumi. Our team will personally contact you within 24 hours to confirm your appointment.'
        );
        setFormData({
          fullName: '',
          contactNumber: '',
          serviceRequested: 'Beauty Salon Services',
          preferredDate: '',
          timeSlot: '09:00 AM - 11:00 AM',
          message: ''
        });
      } else if (res.status === 409) {
        showToast(
          'Time Slot Already Booked',
          'warning',
          'This time slot is already reserved. Please select a different date or time slot to continue.'
        );
      } else {
        showToast(
          'Submission Failed',
          'error',
          'We could not process your request at this time. Please verify your details and try again.'
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        'Connection Error',
        'error',
        'Unable to reach our server. Please check your internet connection or contact us directly at +94 77 123 4567.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getWhatsAppLink = (packageName: string) => {
    const text = encodeURIComponent(`Hi, I am interested in booking the ${packageName} with Mathumi.`);
    return `https://wa.me/94771234567?text=${text}`;
  };

  return (
    <>
      {ToastElement}
      <div className="flex-grow flex flex-col items-center py-16 px-4 sm:px-8 md:px-12 relative z-10 w-full max-w-7xl mx-auto text-[#1c1512]">
      
      {/* Page Header */}
      <span className="text-[#6e1224] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2">
        RESERVATIONS & CONTACT
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#4a2511] mb-2 uppercase tracking-[0.08em] text-center">
        CONTACT US & MAKE A BOOKING
      </h1>
      
      <div className="kolam-separator mb-12 max-w-md">
        <div className="kolam-line"></div>
        <div className="kolam-ornament">✧</div>
        <div className="kolam-line"></div>
      </div>

      {/* Exclusive Packages Section (Grid Intro) */}
      <div className="w-full mb-16">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4a2511] mb-8 uppercase tracking-[0.1em] text-center">
          OUR EXCLUSIVE BRIDAL PACKAGES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Silver Package */}
          <div className="gold-panel p-6 sm:p-8 rounded bg-white flex flex-col hover:-translate-y-1 transition-all duration-300 border-2 border-[#d4af37]">
            <h3 className="text-lg font-bold text-[#6e1224] mb-1 font-serif text-center uppercase tracking-wider">SILVER BRIDAL</h3>
            <p className="text-center text-[#1c1512]/60 mb-6 font-sans text-[10px] tracking-widest uppercase">Essential Bridal Styling</p>
            <div className="text-center mb-6 border-y border-[#c2a670]/15 py-3 bg-[#6e1224]/5">
              <span className="text-xl font-serif font-bold text-[#4a2511]">LKR 45,000</span>
            </div>
            <ul className="space-y-3 text-xs text-[#1c1512]/80 font-semibold mb-8 flex-grow font-sans">
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Bridal Makeup & Hair Styling</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Professional Saree Draping</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Essential Bridal Jewelry Rental</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Pre-wedding look consultation</li>
            </ul>
            <div className="flex flex-col gap-2 mt-auto">
              <button 
                onClick={() => {
                  setFormData(prev => ({ ...prev, serviceRequested: 'Bridal Package Consultation' }));
                  document.getElementById('split-booking-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold border-2 border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase cursor-pointer"
              >
                BOOK NOW
              </button>
              <a 
                href={getWhatsAppLink('Silver Bridal Package')}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold bg-[#c2a670] text-[#1c1512] hover:bg-[#6e1224] hover:text-white transition-all uppercase text-center cursor-pointer shadow-sm"
              >
                WHATSAPP INQUIRY
              </a>
            </div>
          </div>

          {/* Gold Package */}
          <div className="gold-panel p-6 sm:p-8 rounded bg-white flex flex-col hover:-translate-y-1 transition-all duration-300 border-2 border-[#d4af37] relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#6e1224] text-white px-4 py-1 rounded-full text-[8px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">MOST POPULAR</div>
            <h3 className="text-lg font-bold text-[#6e1224] mb-1 font-serif text-center mt-2 uppercase tracking-wider">GOLD BRIDAL</h3>
            <p className="text-center text-[#1c1512]/60 mb-6 font-sans text-[10px] tracking-widest uppercase">Complete Bridal Experience</p>
            <div className="text-center mb-6 border-y border-[#c2a670]/15 py-3 bg-[#6e1224]/5">
              <span className="text-xl font-serif font-bold text-[#4a2511]">LKR 75,000</span>
            </div>
            <ul className="space-y-3 text-xs text-[#1c1512]/80 font-semibold mb-8 flex-grow font-sans">
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Premium HD Makeup & Custom Hair</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Advanced Saree Draping & Pleating</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Full Premium Traditional Jewelry Rental</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Pre-wedding skin preparation regime</li>
            </ul>
            <div className="flex flex-col gap-2 mt-auto">
              <button 
                onClick={() => {
                  setFormData(prev => ({ ...prev, serviceRequested: 'Bridal Package Consultation' }));
                  document.getElementById('split-booking-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold border-2 border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase cursor-pointer"
              >
                BOOK NOW
              </button>
              <a 
                href={getWhatsAppLink('Gold Bridal Package')}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold bg-[#c2a670] text-[#1c1512] hover:bg-[#6e1224] hover:text-white transition-all uppercase text-center cursor-pointer shadow-sm"
              >
                WHATSAPP INQUIRY
              </a>
            </div>
          </div>

          {/* Platinum Package */}
          <div className="gold-panel p-6 sm:p-8 rounded bg-white flex flex-col hover:-translate-y-1 transition-all duration-300 border-2 border-[#d4af37]">
            <h3 className="text-lg font-bold text-[#6e1224] mb-1 font-serif text-center uppercase tracking-wider">PLATINUM BRIDAL</h3>
            <p className="text-center text-[#1c1512]/60 mb-6 font-sans text-[10px] tracking-widest uppercase">Luxury Bridal Transformation</p>
            <div className="text-center mb-6 border-y border-[#c2a670]/15 py-3 bg-[#6e1224]/5">
              <span className="text-xl font-serif font-bold text-[#4a2511]">LKR 120,000</span>
            </div>
            <ul className="space-y-3 text-xs text-[#1c1512]/80 font-semibold mb-8 flex-grow font-sans">
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> VIP Airbrush Makeup & Royal Hair Design</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Exclusive Designer Silk Saree Rental</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Antique / Heritage Gold Jewelry Set</li>
              <li className="flex items-center"><span className="text-[#d4af37] mr-2">✓</span> Comprehensive pre-wedding bridal spa</li>
            </ul>
            <div className="flex flex-col gap-2 mt-auto">
              <button 
                onClick={() => {
                  setFormData(prev => ({ ...prev, serviceRequested: 'Bridal Package Consultation' }));
                  document.getElementById('split-booking-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold border-2 border-[#c2a670]/40 text-[#1c1512] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all uppercase cursor-pointer"
              >
                BOOK NOW
              </button>
              <a 
                href={getWhatsAppLink('Platinum Bridal Package')}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold bg-[#c2a670] text-[#1c1512] hover:bg-[#6e1224] hover:text-white transition-all uppercase text-center cursor-pointer shadow-sm"
              >
                WHATSAPP INQUIRY
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Split Section Layout (Mockup 4) */}
      <div id="split-booking-container" className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-36">
        
        {/* Left Side Panel (GET IN TOUCH) */}
        <div className="gold-panel p-6 sm:p-8 lg:col-span-5 bg-white rounded border-2 border-[#d4af37] flex flex-col justify-between shadow-sm relative">
          {/* Inner Accent Line */}
          <div className="absolute inset-1.5 border border-[#d4af37]/25 pointer-events-none z-0 rounded"></div>
          
          <div className="relative z-10 flex-grow flex flex-col">
            <h2 className="text-xl font-serif font-bold text-[#4a2511] mb-6 uppercase tracking-wider text-center md:text-left border-b border-[#d4af37]/20 pb-2">
              GET IN TOUCH
            </h2>
            
            {/* Quick Contact Info Stack */}
            <div className="space-y-6 text-xs font-sans font-semibold text-[#1c1512]/90 mb-8 leading-relaxed">
              
              <div className="flex items-start">
                <span className="mr-3 text-[#6e1224] font-bold text-sm">📍</span>
                <div>
                  <p className="font-bold text-[#1c1512] mb-0.5">Boutique Location</p>
                  <p className="font-medium text-[#1c1512]/75">St. Anthoniyar Road, Batticaloa<br/><span className="opacity-75 font-normal">(Near Design Jewelry)</span></p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="mr-3 text-[#6e1224] font-bold text-sm">📍</span>
                <div>
                  <p className="font-bold text-[#1c1512] mb-0.5">Beauty Salon Location</p>
                  <p className="font-medium text-[#1c1512]/75">Trinco Road, Near Signal Light, Batticaloa</p>
                </div>
              </div>

              <div className="flex items-start border-t border-[#c2a670]/10 pt-4">
                <span className="mr-3 text-[#6e1224] font-bold text-sm">📞</span>
                <div>
                  <p className="font-bold text-[#1c1512] mb-0.5">Inquiry Hotline</p>
                  <p className="font-medium text-[#1c1512]/75">+94 77 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="mr-3 text-[#6e1224] font-bold text-sm">✉</span>
                <div>
                  <p className="font-bold text-[#1c1512] mb-0.5">Email Support</p>
                  <p className="font-medium text-[#1c1512]/75 text-wrap">info@mathumi.lk</p>
                </div>
              </div>

            </div>

            {/* OUR LOCATIONS (Mockup Map) */}
            <div className="mt-auto">
              <h3 className="text-[10px] font-sans font-bold text-[#6e1224] tracking-widest mb-3 uppercase">
                OUR LOCATIONS
              </h3>
              <div className="relative w-full h-36 rounded overflow-hidden border border-[#d4af37]/30 shadow-inner bg-[#fdf5eb] p-1 mb-6">
                <div className="relative w-full h-full rounded overflow-hidden">
                  <Image src="/map_graphic.png" alt="Mathumi Location Maps" fill className="object-cover" />
                </div>
              </div>

              {/* FOLLOW OUR JOURNEY */}
              <h3 className="text-[10px] font-sans font-bold text-[#6e1224] tracking-widest mb-3 uppercase">
                FOLLOW OUR JOURNEY
              </h3>
              <div className="flex space-x-3.5 pb-2">
                <a href="https://www.instagram.com/mathumi_bridal_boutique/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all cursor-pointer text-xs font-bold shadow-sm" title="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@mathumithayaparan_mua/video/7628283485739814164" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all cursor-pointer text-xs font-bold shadow-sm" title="TikTok">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.47-.77-.63-1.4-1.43-1.81-2.33v8.32c-.02 2.23-.71 4.54-2.43 6.02-1.8 1.6-4.39 2.23-6.71 1.68-2.63-.58-4.92-2.65-5.32-5.35-.61-3.65 1.71-7.44 5.33-8.22 1.01-.22 2.06-.21 3.07.03V13c-1.3-.4-2.77-.28-3.95.45-1.57.94-2.43 2.81-2.28 4.62.15 1.94 1.5 3.73 3.39 4.19 1.84.48 3.97-.09 5.09-1.63.78-1.04 1.02-2.41 1.01-3.69V.02z"/></svg>
                </a>
                <a href="https://www.facebook.com/Thayamathumi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all cursor-pointer text-xs font-bold shadow-sm" title="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#fdf5eb] flex items-center justify-center hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all cursor-pointer text-xs font-bold shadow-sm" title="WhatsApp">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.118-2.884-6.98-1.862-1.862-4.343-2.887-6.984-2.889-5.439 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.41 1.32 4.933l-.994 3.635 3.723-.975zM17.95 14.65c-.327-.164-1.93-.953-2.227-1.062-.297-.11-.513-.164-.73.164-.216.328-.838 1.063-1.027 1.28-.19.219-.378.247-.705.082-.328-.164-1.385-.511-2.637-1.633-.973-.869-1.63-1.944-1.822-2.272-.19-.328-.02-.505.143-.669.147-.148.328-.378.492-.569.164-.189.218-.328.327-.546.11-.219.055-.41-.027-.573-.082-.164-.73-1.758-.999-2.408-.262-.63-.53-.54-.73-.55-.19-.01-.406-.01-.622-.01-.216 0-.568.082-.865.41-.297.328-1.135 1.109-1.135 2.703 0 1.594 1.162 3.133 1.324 3.352.162.219 2.287 3.491 5.54 4.896.774.334 1.38.533 1.85.682.779.247 1.488.212 2.05.128.625-.094 1.93-.79 2.2-1.514.271-.723.271-1.344.19-1.472-.083-.129-.297-.203-.625-.367z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side Panel (BOOK YOUR EXPERIENCE) */}
        <div className="gold-panel p-6 sm:p-8 lg:col-span-7 bg-white rounded border-2 border-[#d4af37] flex flex-col justify-between shadow-sm relative">
          {/* Inner Accent Line */}
          <div className="absolute inset-1.5 border border-[#d4af37]/25 pointer-events-none z-0 rounded"></div>
          
          <div className="relative z-10 w-full">
            <h2 className="text-xl font-serif font-bold text-[#4a2511] mb-6 uppercase tracking-wider text-center border-b border-[#d4af37]/20 pb-2">
              BOOK YOUR EXPERIENCE
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ex: Anjali Kumar"
                  className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512] font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Contact Number *</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Ex: +94 77 123 4567"
                  className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512] font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Service Requested *</label>
                <div className="relative">
                  <select 
                    name="serviceRequested"
                    value={formData.serviceRequested}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] text-sm text-[#1c1512] appearance-none focus:outline-none focus:border-[#6e1224] font-bold"
                  >
                    <option value="Beauty Salon Services">Beauty Salon & Skin Facials</option>
                    <option value="Academy Enrollment">Academy Course Registration</option>
                    <option value="Bridal Package Consultation">Bridal Makeup & Saree Combo Consultation</option>
                    <option value="Saree Draping Consultation">Accredited Saree Draping Masterclass</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#c2a670]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Preferred Date *</label>
                <input 
                  type="date" 
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512] font-semibold"
                  required
                />
              </div>
 
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Preferred Time Slot *</label>
                <div className="relative">
                  <select 
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] text-sm text-[#1c1512] appearance-none focus:outline-none focus:border-[#6e1224] font-bold"
                    required
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#c2a670]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4a2511] font-sans font-bold text-[10px] tracking-wider uppercase">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your wedding date, saree color ideas, or class enrollment queries..."
                  className="w-full p-3.5 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512] resize-none font-semibold"
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="gold-button w-full py-4 text-xs font-bold tracking-wider uppercase shadow-md cursor-pointer">
                  SUBMIT REQUEST
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
      </div>
    </>
  );
}
