import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let services = [];
  let courses = [];
  try {
    const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/salon-services`, { cache: 'no-store' });
    if (servicesRes.ok) {
      services = await servicesRes.json();
    }
  } catch (err) {
    console.error("Error fetching services on homepage:", err);
  }

  try {
    const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/academy-courses`, { cache: 'no-store' });
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
            SRI LANKA TO WORLD WIDE
          </span>
          <span className="text-[#d4af37] font-cursive text-xl sm:text-2xl lg:text-3xl block font-normal leading-tight mb-1">
            Welcome to the Sanctuary of Mathumi Bridal Care
          </span>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cursive text-[#4a2511] leading-none mb-1 font-normal">
            Mathumi Bridal
          </h1>
          <span className="text-[#6e1224] font-cursive text-base sm:text-lg lg:text-xl block leading-normal mb-2">
            Where the sacred threads of tradition meet the delicate grace of bridal beauty—exquisitely woven in silk, and masterfully taught to inspire generations.
          </span>
          
          <div className="w-full flex justify-center lg:justify-start mt-6">
            <Link href="/booking" className="gold-button rounded-full text-center py-5 px-12 text-sm sm:text-base tracking-[0.25em] font-sans font-bold shadow-[0_4px_25px_rgba(212,175,55,0.35)] uppercase block w-[320px] sm:w-auto mx-auto lg:mx-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgba(212,175,55,0.55)] active:scale-95">
              BOOKING FOR BRIDAL
            </Link>
          </div>
        </div>

        {/* Right: 3-Card Overlapping Dynamic Composition */}
        <div className="w-full lg:w-[52%] flex justify-center lg:justify-end items-center relative pl-4 lg:pl-8 py-6">
          {/* Outer relative container for absolute card positioning */}
          <div className="relative w-full max-w-[480px] h-[280px] sm:h-[380px] md:h-[430px] lg:h-[480px]">

            {/* === CARD 1: Main Background Card (large, top-left) === */}
            <div className="absolute top-0 left-6 w-[75%] h-[85%] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] z-10 hover:z-30 cursor-pointer group flex items-center justify-center">
              <img
                src="/home_header.png"
                alt="Mathumi Bride"
                className="max-w-full max-h-full w-auto h-auto rounded-2xl border-4 border-white shadow-[0_8px_30px_rgba(255,255,255,0.6)] group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:scale-105"
              />
            </div>

            {/* === CARD 2: Bottom-Left Offset Card === */}
            <div className="absolute bottom-2 left-0 w-[48%] h-[52%] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] z-20 hover:z-30 cursor-pointer group -rotate-3 hover:rotate-0 flex items-center justify-center">
              <img
                src="/imges/s8.webp"
                alt="Mathumi Bridal Portrait"
                className="max-w-full max-h-full w-auto h-auto rounded-2xl border-4 border-white shadow-[0_8px_30px_rgba(255,255,255,0.6)] group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:scale-105"
              />
            </div>

            {/* === CARD 3: Bottom-Right Offset Card === */}
            <div className="absolute bottom-0 right-0 w-[46%] h-[46%] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] z-20 hover:z-30 cursor-pointer group rotate-2 hover:rotate-0 flex items-center justify-center">
              <img
                src="/imges/sar.jpeg"
                alt="Mathumi Traditional Bridal"
                className="max-w-full max-h-full w-auto h-auto rounded-2xl border-4 border-white shadow-[0_8px_30px_rgba(255,255,255,0.6)] group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:scale-105"
              />
            </div>

            {/* Gold ✧ floating ornament */}
            <div className="absolute top-[78%] left-[68%] text-[#d4af37] text-2xl z-30 pointer-events-none animate-pulse select-none drop-shadow">✧</div>

          </div>
        </div>

      </div>

      {/* 3 Core Services Cards (Mockup 2 Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full z-10 mb-16 sm:mb-24">
        
        {/* Card 1: Salon Panel */}
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-transparent border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">MATHUMI BEAUTY SANCTUARY</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            HAIR & BEAUTY SALON
          </h2>
          <div className="w-full h-[260px] relative mb-6">
            <Image src="/imges/salon.webp" alt="Beauty Salon Facial" fill className="object-contain transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="text-[#d4af37] text-md mb-2">✧</div>
          <p className="text-xs text-[#1c1512]/80 mb-6 flex-grow leading-relaxed font-semibold font-sans px-2">
            Experience premium holistic care. From organic skincare and advanced facials to customized hair styling in Batticaloa.
          </p>
          <div className="w-full border-t border-dashed border-[#c2a670]/20 pt-4 mt-auto">
            <Link href="/salon" className="gold-button w-full py-3 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold">
              LEARN MORE
            </Link>
          </div>
        </div>

        {/* Card 2: Academy Panel */}
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-transparent border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">THE EDUCATION</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            MATHUMI ACADEMY
          </h2>
          <div className="w-full h-[260px] relative mb-6">
            <Image src="/imges/s.webp" alt="Academy Training" fill className="object-contain transition-transform duration-500 hover:scale-105" />
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
        <div className="gold-panel p-6 sm:p-8 flex flex-col items-center text-center rounded bg-transparent border-2 border-[#d4af37]">
          <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.25em] uppercase mb-1">THE ATELIER</span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4a2511] mb-4 uppercase tracking-[0.1em] h-8 flex items-center justify-center">
            MATHUMI BRIDAL BOUTIQUE
          </h2>
          <div className="w-full h-[260px] relative mb-6">
            <img src="/imges/img.webp" alt="Mathumi Bridal Styling" className="absolute inset-0 w-full h-full object-contain object-top transition-transform duration-500 hover:scale-105" />
          </div>
          <p className="text-xs text-[#1c1512]/80 mb-6 flex-grow leading-relaxed font-semibold font-sans px-2">
            Our pure Kanchipuram fabric of fine gold zari threads, hand-worked designer blouses, and lehengas are created and curated.
          </p>
          <div className="w-full border-t border-dashed border-[#c2a670]/20 pt-4 mt-auto">
            <Link href="/gallery" className="gold-button w-full py-3 rounded-full text-center block text-[10px] tracking-widest font-sans font-bold">
              LEARN MORE
            </Link>
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
                  src={`/imges/${img.file}.webp`}
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
          BOOKING
        </Link>
      </div>


    </div>
  );
}

