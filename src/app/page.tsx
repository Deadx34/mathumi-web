import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let services = [];
  let courses = [];
  try {
    const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/salon-services`, { cache: 'no-store' });
    if (servicesRes.ok) {
      services = await servicesRes.json();
    }
  } catch (err) {
    console.error("Error fetching services on homepage:", err);
  }

  try {
    const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/academy-courses`, { cache: 'no-store' });
    if (coursesRes.ok) {
      courses = await coursesRes.json();
    }
  } catch (err) {
    console.error("Error fetching courses on homepage:", err);
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-start px-4 sm:px-8 md:px-12 py-10 relative z-10 w-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Traditional Background Mandala/Kolam Watermark (Left) */}
      <div className="absolute -left-24 top-6 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] text-[#d4af37] opacity-[0.06] pointer-events-none z-0 spin-slow select-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75" className="w-full h-full">
          <circle cx="100" cy="100" r="95" strokeDasharray="4,4" />
          <circle cx="100" cy="100" r="82" />
          <circle cx="100" cy="100" r="70" strokeDasharray="6,6" />
          <circle cx="100" cy="100" r="55" />
          <circle cx="100" cy="100" r="40" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="25" />
          <circle cx="100" cy="100" r="10" />
          <path d="M100 5 V195 M5 100 H195" />
          <path d="M32.82 32.82 L167.18 167.18 M32.82 167.18 L167.18 32.82" />
          {/* Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x1 = 100 + 40 * Math.cos(angle);
            const y1 = 100 + 40 * Math.sin(angle);
            const x2 = 100 + 55 * Math.cos(angle);
            const y2 = 100 + 55 * Math.sin(angle);
            return <path key={i} d={`M${x1} ${y1} C${100 + 48 * Math.cos(angle - 0.1)} ${100 + 48 * Math.sin(angle - 0.1)}, ${100 + 48 * Math.cos(angle + 0.1)} ${100 + 48 * Math.sin(angle + 0.1)}, ${x2} ${y2}`} />;
          })}
          {/* Outer Ring Petals */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI) / 12;
            const x1 = 100 + 70 * Math.cos(angle);
            const y1 = 100 + 70 * Math.sin(angle);
            const x2 = 100 + 82 * Math.cos(angle);
            const y2 = 100 + 82 * Math.sin(angle);
            return <path key={i} d={`M${x1} ${y1} Q${100 + 76 * Math.cos(angle - 0.08)} ${100 + 76 * Math.sin(angle - 0.08)}, ${x2} ${y2} Q${100 + 76 * Math.cos(angle + 0.08)} ${100 + 76 * Math.sin(angle + 0.08)}, ${x1} ${y1}`} />;
          })}
        </svg>
      </div>

      {/* Traditional Background Gopuram Motif Watermark (Right) */}
      <div className="absolute -right-20 bottom-[40%] w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] text-[#6e1224] opacity-[0.05] pointer-events-none z-0 float-traditional select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75" className="w-full h-full">
          {/* Gopuram Temple Architecture Shape */}
          <path d="M50 5 L53 12 L47 12 Z" fill="currentColor" />
          <path d="M42 12 H58 V16 H42 Z" />
          <path d="M38 16 H62 V22 H38 Z" />
          <path d="M34 22 H66 V30 H34 Z" />
          <path d="M30 30 H70 V40 H30 Z" />
          <path d="M26 40 H74 V52 H26 Z" />
          <path d="M20 52 H80 V68 H20 Z" />
          <path d="M12 68 H88 V88 H12 Z" />
          <path d="M8 88 H92 V95 H8 Z" />
          {/* Inner carvings details */}
          <path d="M50 16 V88 M46 22 V88 M54 22 V88 M40 30 V88 M60 30 V88 M36 40 V88 M64 40 V88 M30 52 V88 M70 52 V88" strokeDasharray="2,3" />
          {/* Temple Gate arch */}
          <path d="M40 95 V80 C40 72, 60 72, 60 80 V95" strokeWidth="1" />
        </svg>
      </div>

      {/* ----------------- SECTION 1: HERO & CORE PILLARS (Mockup 2) ----------------- */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 mb-12 mt-4 relative overflow-hidden">
        
        {/* Left: Hero Text Content with Creative Copywriting */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-4 lg:px-0 py-1 z-20">
          <span className="text-[#6e1224]/80 font-sans font-bold tracking-[0.3em] uppercase text-[9px] sm:text-[10px] mb-1 block">
            A PRESTIGE SYNERGY · BATTICALOA & COLOMBO, SRI LANKA
          </span>
          <span className="text-[#d4af37] font-cursive text-xl sm:text-2xl lg:text-3xl block font-normal leading-tight mb-1">
            Welcome to the Sanctuary of Mathumi Bridal Care
          </span>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cursive text-[#4a2511] leading-none mb-1 font-normal">
            Mathumi
          </h1>
          <span className="text-[#6e1224] font-cursive text-base sm:text-lg lg:text-xl block leading-normal mb-2">
            Where the sacred threads of tradition meet the delicate grace of bridal beauty—exquisitely woven in silk, and masterfully taught to inspire generations.
          </span>
          
          <div className="kolam-separator justify-center lg:justify-start w-full max-w-[260px] mx-auto lg:mx-0 mt-1 mb-2">
            <div className="kolam-line"></div>
            <div className="kolam-ornament font-light tracking-[0.3em] text-[#d4af37]">✧</div>
            <div className="kolam-line"></div>
          </div>

          <p className="text-[#6e1224] font-sans font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1.5">
            Bespoke Bridal Styling • Pure Kanchipuram Silks • Professional Academy
          </p>
          <p className="text-[#1c1512]/80 font-sans text-xs sm:text-sm font-medium max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed">
            Your journey to elegance starts here. Explore our exquisite collections and cultivate professional beauty mastery in Batticaloa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start mt-1">
            <Link href="/booking" className="gold-button rounded-full text-center py-3 px-8 text-[10px] sm:text-xs tracking-[0.2em] font-sans font-bold shadow-md uppercase block w-[220px] sm:w-auto mx-auto lg:mx-0 transition-transform duration-300 hover:scale-105 active:scale-95">
              BOOK NOW
            </Link>
            <Link href="/boutique" className="px-8 py-3 border-2 border-[#d4af37] text-[#4a2511] font-sans font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase bg-transparent hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all rounded-full text-center cursor-pointer block w-[220px] sm:w-auto mx-auto lg:mx-0 transition-transform duration-300 hover:scale-105 active:scale-95">
              THE COLLECTION
            </Link>
          </div>
        </div>

        {/* Right: 3-Card Overlapping Dynamic Composition */}
        <div className="w-full lg:w-[52%] flex justify-center lg:justify-end items-center relative pl-4 lg:pl-8 py-6">
          {/* Outer relative container for absolute card positioning */}
          <div className="relative w-full max-w-[480px] h-[280px] sm:h-[380px] md:h-[430px] lg:h-[480px]">

            {/* === CARD 1: Main Background Card (large, top-left) === */}
            <div className="absolute top-0 left-6 w-[75%] h-[85%] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] z-10 hover:z-30 cursor-pointer group">
              <img
                src="/home_header.png"
                alt="Mathumi Bride"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* === CARD 2: Bottom-Left Offset Card === */}
            <div className="absolute bottom-2 left-0 w-[48%] h-[52%] rounded-2xl overflow-hidden border-4 border-white bg-[#fdf5eb] shadow-[0_12px_30px_rgba(74,37,17,0.22)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] hover:shadow-[0_22px_45px_rgba(74,37,17,0.32)] z-20 hover:z-30 cursor-pointer group -rotate-3 hover:rotate-0">
              <img
                src="/lookbook/s8.webp"
                alt="Mathumi Bridal Portrait"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-1.5 border border-[#d4af37]/25 rounded-xl pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 bg-[#1c1512]/60 backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#d4af37] font-sans font-bold text-[7px] tracking-[0.18em] uppercase">Portrait</span>
              </div>
            </div>

            {/* === CARD 3: Bottom-Right Offset Card === */}
            <div className="absolute bottom-0 right-0 w-[46%] h-[46%] rounded-2xl overflow-hidden border-4 border-white bg-[#fdf5eb] shadow-[0_12px_30px_rgba(74,37,17,0.22)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] hover:shadow-[0_22px_45px_rgba(74,37,17,0.32)] z-20 hover:z-30 cursor-pointer group rotate-2 hover:rotate-0">
              <img
                src="/lookbook/s13.webp"
                alt="Mathumi Traditional Bridal"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-1.5 border border-[#d4af37]/25 rounded-xl pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 bg-[#1c1512]/60 backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#d4af37] font-sans font-bold text-[7px] tracking-[0.18em] uppercase">Traditional</span>
              </div>
            </div>

            {/* Gold ✧ floating ornament */}
            <div className="absolute top-[78%] left-[68%] text-[#d4af37] text-2xl z-30 pointer-events-none animate-pulse select-none drop-shadow">✧</div>

          </div>
        </div>

      </div>

      {/* 3 Core Services Cards (Mockup 2 Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full z-10 mb-16 sm:mb-24">
        
        {/* Card 1: Salon Panel */}
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-white border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">THE SANCTUARY</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            MATHUMI BEAUTY SALON
          </h2>
          <div className="w-full h-44 relative mb-6 rounded overflow-hidden shadow-inner border border-[#c2a670]/20 bg-[#fdf5eb]">
            <Image src="/salon_facial.png" alt="Beauty Salon Facial" fill className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <p className="text-xs text-[#1c1512]/80 mb-6 flex-grow leading-relaxed font-semibold font-sans px-2">
            Beauty repair completion of skin treatments, nahny, routine treatments and professional facial therapies.
          </p>
          <div className="w-full border-t border-dashed border-[#c2a670]/20 pt-4 mt-auto">
            <Link href="/salon" className="gold-button w-full py-3 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold">
              LEARN MORE
            </Link>
          </div>
        </div>

        {/* Card 2: Academy Panel */}
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-white border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">THE EDUCATION</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            MATHUMI ACADEMY
          </h2>
          <div className="w-full h-44 relative mb-6 rounded overflow-hidden shadow-inner border border-[#c2a670]/20 bg-[#fdf5eb]">
            <Image src="/academy_class1.png" alt="Academy Training" fill className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <p className="text-xs text-[#1c1512]/80 mb-6 flex-grow leading-relaxed font-semibold font-sans px-2">
            Professional makeup instruction, saree draping masterclasses, and certified courses for upcoming wedding styling specialists.
          </p>
          <div className="w-full border-t border-dashed border-[#c2a670]/20 pt-4 mt-auto">
            <Link href="/academy" className="gold-button w-full py-3 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold">
              LEARN MORE
            </Link>
          </div>
        </div>

        {/* Card 3: Boutique Panel */}
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-white border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">THE ATELIER</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            MATHUMI BRIDAL BOUTIQUE
          </h2>
          <div className="w-full h-44 relative mb-6 rounded overflow-hidden shadow-inner border border-[#c2a670]/20 bg-[#fdf5eb]">
            <img src="/lookbook/s2.webp" alt="Mathumi Bridal Styling" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" />
          </div>
          <p className="text-xs text-[#1c1512]/80 mb-6 flex-grow leading-relaxed font-semibold font-sans px-2">
            Our pure Kanchipuram fabric of fine gold zari threads, hand-worked designer blouses, and lehengas are created and curated.
          </p>
          <div className="w-full border-t border-dashed border-[#c2a670]/20 pt-4 mt-auto">
            <Link href="/boutique" className="gold-button w-full py-3 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold">
              LEARN MORE
            </Link>
          </div>
        </div>

      </div>


      {/* ----------------- SECTION 2: EXTENSIVE ACADEMY & SALON MENU (Mockup 1) ----------------- */}
      <div className="w-full mb-10 flex flex-col items-center text-center">
        <span className="text-[#6e1224] font-sans font-bold text-[10px] tracking-[0.25em] uppercase mb-2">
          EXPERIENCE RADIANCE
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4a2511] uppercase tracking-[0.08em] leading-tight">
          MATHUMI BEAUTY SALON & ACADEMY
        </h2>
        
        <div className="kolam-separator my-6 max-w-xl">
          <div className="kolam-line"></div>
          <div className="kolam-ornament">✧</div>
          <div className="kolam-line"></div>
        </div>
      </div>

      {/* Split Section Layout (Left Discover/Training + Right Portrait Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full mb-24 items-stretch">
        
        {/* Left Columns (Discover Panel & Training Cards) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-8">
          
          {/* Discover Radiance Horizontal Panel */}
          <div className="gold-panel p-6 sm:p-8 rounded bg-white border-2 border-[#d4af37] w-full flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
            <div className="flex flex-col items-start text-left md:max-w-[55%]">
              <h3 className="text-xl font-serif font-bold text-[#4a2511] mb-4 tracking-wide">
                Discover your Radiance, Learn the Art of Beauty.
              </h3>
              
              {/* Three Thumbnails Row */}
              <div className="flex items-center gap-3 mt-2">
                <div className="relative w-16 h-16 rounded overflow-hidden border border-[#d4af37]/40">
                  <Image src="/gallery_makeup_artist_1780157979803.png" alt="Mehndi Thumb" fill className="object-cover" />
                </div>
                <div className="relative w-16 h-16 rounded overflow-hidden border border-[#d4af37]/40">
                  <Image src="/gallery_hair_styling_1780157961534.png" alt="Hair Thumb" fill className="object-cover" />
                </div>
                <div className="relative w-16 h-16 rounded overflow-hidden border border-[#d4af37]/40">
                  <Image src="/gallery_spa_facial_1780157996108.png" alt="Skincare Thumb" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Quick Links on the Right of Discover Box */}
            <div className="flex flex-col gap-2.5 w-full md:w-[40%] items-stretch">
              <Link href="/booking?service=bridal" className="text-left font-sans font-bold text-[10px] tracking-wider uppercase bg-[#6e1224]/5 border border-[#d4af37]/50 rounded-lg py-2.5 px-4 text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all flex justify-between items-center">
                <span>Bridal Makeup</span> <span>➔</span>
              </Link>
              <Link href="/booking?service=skin" className="text-left font-sans font-bold text-[10px] tracking-wider uppercase bg-[#6e1224]/5 border border-[#d4af37]/50 rounded-lg py-2.5 px-4 text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all flex justify-between items-center">
                <span>Skin Services</span> <span>➔</span>
              </Link>
              <Link href="/booking?service=hair" className="text-left font-sans font-bold text-[10px] tracking-wider uppercase bg-[#6e1224]/5 border border-[#d4af37]/50 rounded-lg py-2.5 px-4 text-[#4a2511] hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all flex justify-between items-center">
                <span>Hair Artistry</span> <span>➔</span>
              </Link>
            </div>
          </div>

          {/* Sub-cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Card Left: Mathumi Beauty Salon */}
            <div className="gold-panel p-6 rounded bg-white border-2 border-[#d4af37] flex flex-col justify-between items-stretch">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-wider text-center border-b border-[#d4af37]/20 pb-2">
                  MATHUMI BEAUTY SALON
                </h3>
                <div className="relative w-full h-32 rounded overflow-hidden border border-[#d4af37]/20 mb-4 bg-[#fdf5eb]">
                  <Image src="/salon_hair.png" alt="Salon Services" fill className="object-cover" />
                </div>
                <ul className="text-xs text-[#1c1512]/80 space-y-3 font-semibold font-sans mb-6 px-1">
                  {services.length > 0 ? (
                    [...services]
                      .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                      .slice(0, 3)
                      .map((service: any) => (
                        <li key={service._id} className="flex items-center truncate">
                          <span className="text-[#c2a670] mr-2">✦</span> {service.title}
                        </li>
                      ))
                  ) : (
                    <>
                      <li className="flex items-center"><span className="text-[#c2a670] mr-2">✦</span> Hair Styling & Cuts</li>
                      <li className="flex items-center"><span className="text-[#c2a670] mr-2">✦</span> Organic Skin Care</li>
                    </>
                  )}
                </ul>
              </div>
              <Link href="/salon" className="gold-button py-2.5 rounded-full text-center block text-[9px] tracking-widest font-sans font-bold">
                LEARN MORE
              </Link>
            </div>

            {/* Card Right: Academy & Training */}
            <div className="gold-panel p-6 rounded bg-white border-2 border-[#d4af37] flex flex-col justify-between items-stretch">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-wider text-center border-b border-[#d4af37]/20 pb-2">
                  ACADEMY & TRAINING
                </h3>
                <div className="relative w-full h-32 rounded overflow-hidden border border-[#d4af37]/20 mb-4 bg-[#fdf5eb]">
                  <Image src="/academy_class2.png" alt="Academy Class" fill className="object-cover" />
                </div>
                <ul className="text-xs text-[#1c1512]/80 space-y-3 font-semibold font-sans mb-6 px-1">
                  {courses.length > 0 ? (
                    [...courses]
                      .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                      .slice(0, 3)
                      .map((course: any) => (
                        <li key={course._id} className="flex items-center truncate">
                          <span className="text-[#c2a670] mr-2">✦</span> {course.title}
                        </li>
                      ))
                  ) : (
                    <>
                      <li className="flex items-center"><span className="text-[#c2a670] mr-2">✦</span> Saree Draping Masterclass</li>
                      <li className="flex items-center"><span className="text-[#c2a670] mr-2">✦</span> Saree Draping Masterclass</li>
                    </>
                  )}
                </ul>
              </div>
              <Link href="/academy" className="gold-button py-2.5 rounded-full text-center block text-[9px] tracking-widest font-sans font-bold">
                LEARN MORE
              </Link>
            </div>

          </div>

        </div>

        {/* Right Column (Big Vertical Bridalpamper card) */}
        <div className="lg:col-span-4 flex flex-col items-stretch">
          <div className="gold-panel p-5 rounded bg-white border-2 border-[#d4af37] h-full flex flex-col justify-between shadow-sm relative overflow-hidden">
            {/* Border Accent Overlay */}
            <div className="absolute inset-1.5 border border-[#d4af37]/35 pointer-events-none z-10 rounded"></div>
            
            <div className="relative w-full h-[360px] md:h-[420px] lg:h-[460px] rounded overflow-hidden border border-[#d4af37]/20 bg-[#fdf5eb] shadow-inner mb-4">
              <Image src="/gallery_bridal_makeup_1780157939359.png" alt="Bride Pampering Facial" fill className="object-cover object-top transition-transform duration-700 hover:scale-105" />
            </div>

            <div className="text-center pt-2 flex flex-col items-center">
              <div className="w-16 h-px bg-[#d4af37]/30 mb-2"></div>
              <Link href="/booking" className="gold-button w-full py-3.5 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold relative z-20">
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ----------------- SECTION 3: ACCREDITED REAL BRIDES PORTFOLIO ----------------- */}
      <div className="w-full mb-20 mt-8">
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">
            MATHUMI PORTFOLIO
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#4a2511] mb-2 uppercase tracking-[0.08em]">
            OUR BRIDAL GALLERY
          </h2>
          
          <div className="kolam-separator">
            <div className="kolam-line"></div>
            <div className="kolam-ornament">✧</div>
            <div className="kolam-line"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { file: 's1',  title: 'Bridal Makeup',    category: 'Makeup' },
            { file: 's6',  title: 'Floral Mehndi',    category: 'Bridal' },
            { file: 's8',  title: 'Bridal Portrait',  category: 'Bridal' },
            { file: 's11', title: 'Jewellery Look',   category: 'Bridal' },
            { file: 's12', title: 'Hair & Flowers',   category: 'Salon'  },
            { file: 's13', title: 'Traditional Look', category: 'Bridal' },
            { file: 's16', title: 'Grand Bridal',     category: 'Bridal' },
            { file: 's18', title: 'Signature Style',  category: 'Gallery' }
          ].map((img, idx) => (
            <div key={idx} className="relative w-full h-[180px] sm:h-[260px] md:h-[300px] lg:h-[320px] rounded shadow-[0_10px_25px_rgba(74,37,17,0.06)] border-2 border-[#d4af37] p-1.5 bg-white overflow-hidden group hover:border-[#6e1224] transition-all duration-500">
              <div className="relative w-full h-full overflow-hidden rounded">
                <img
                  src={`/lookbook/${img.file}.webp`}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a2511]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4">
                  <p className="text-[#d4af37] font-sans font-bold text-[9px] tracking-widest uppercase mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">{img.category}</p>
                  <p className="text-white font-serif font-semibold text-xs text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-350 delay-75">{img.title}</p>
                  <Link href="/gallery" className="gold-button text-[8px] py-1.5 px-4 rounded-full mt-2 inline-block font-sans translate-y-3 group-hover:translate-y-0 transition-transform duration-400 delay-100">
                    VIEW FULL
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/gallery" className="text-[#6e1224] font-serif font-bold uppercase tracking-[0.2em] text-[11px] hover:text-[#c2a670] transition-colors flex items-center justify-center gap-2">
            <span>EXPLORE FULL GALLERY</span>
            <span className="text-sm">➔</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Promo Banner Card */}
      <div className="w-full bg-[#6e1224]/5 p-6 sm:p-12 rounded border-2 border-[#d4af37] text-center max-w-5xl mb-12 shadow-sm">
        <span className="text-[#6e1224] font-sans font-bold text-[10px] tracking-[0.25em] uppercase block mb-1">SPECIAL OFFER</span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4a2511] mb-3 uppercase tracking-wider">
          THE FULL BRIDAL COMBINATION EXPERIENCE
        </h3>
        <p className="text-xs sm:text-sm text-[#1c1512]/80 max-w-xl mx-auto mb-6 font-sans font-semibold leading-relaxed">
          Makeup, Designer Saree Pleating, and Luxury Jewelry Rental with Exclusive Combo Discounts! Let us curate your perfect traditional wedding appearance.
        </p>
        <Link href="/booking" className="gold-button rounded-full font-bold px-8 py-3.5 text-xs font-sans">
          CLAIM YOUR BRIDAL DISCOUNT
        </Link>
      </div>


    </div>
  );
}
