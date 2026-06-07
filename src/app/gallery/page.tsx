"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const REAL_IMAGES = [
  // ── New SA Series ──
  { file: 'sa1',  title: 'Royal Bridal Glow',          category: 'Bridal',    color: '#6e1224' },
  { file: 'sa2',  title: 'Elegant Hair Artistry',      category: 'Salon',     color: '#4a2511' },
  { file: 'sa3',  title: 'Flawless Bridal Eye Look',   category: 'Makeup',    color: '#6e1224' },
  { file: 'sa4',  title: 'Radiant Skin Hydration',     category: 'Skin Care', color: '#4a2511' },
  { file: 'sa5',  title: 'Designer Handloom Saree',    category: 'Boutique',  color: '#6e1224' },
  { file: 'sa6',  title: 'Advanced Pleating Session',  category: 'Academy',   color: '#4a2511' },
  { file: 'sa7',  title: 'Signature Lookbook Shoot',   category: 'Gallery',   color: '#6e1224' },
  { file: 'sa8',  title: 'Pure Zari Kanchipuram Bride',category: 'Bridal',    color: '#4a2511' },
  { file: 'sa9',  title: 'Traditional Jasmine Braid',  category: 'Salon',     color: '#6e1224' },
  { file: 'sa10', title: 'Classic South Indian Makeup', category: 'Makeup',    color: '#4a2511' },
  { file: 'sa11', title: 'Golden Radiance Facial',     category: 'Skin Care', color: '#6e1224' },
  { file: 'sa12', title: 'Exclusive Silk Collection',  category: 'Boutique',  color: '#4a2511' },
  { file: 'sa13', title: 'Professional Academy Class', category: 'Academy',   color: '#6e1224' },
  { file: 'sa14', title: 'Modern Draping Showcase',    category: 'Gallery',   color: '#4a2511' },
  { file: 'sa15', title: 'Traditional Tamil Bridal',   category: 'Bridal',    color: '#6e1224' },
  { file: 'sa16', title: 'Intricate Floral Styling',   category: 'Salon',     color: '#4a2511' },
  { file: 'sa17', title: 'High-Definition Bridal Base',category: 'Makeup',    color: '#6e1224' },
  { file: 'sa18', title: 'Luxury Skin Pampering Pack', category: 'Skin Care', color: '#4a2511' },
  { file: 'sa19', title: 'Heritage Bridal Lehenga',    category: 'Boutique',  color: '#6e1224' },
  { file: 'sa20', title: 'Hairstyling Masterclass',    category: 'Academy',   color: '#4a2511' },
  { file: 'sa21', title: 'Mathumi Signature Style',    category: 'Gallery',   color: '#6e1224' },
  { file: 'sa22', title: 'Regal Traditional Bride',    category: 'Bridal',    color: '#4a2511' },

  // ── Original S Series ──
  { file: 's1',   title: 'Bridal Elegance',            category: 'Bridal',    color: '#6e1224' },
  { file: 's2',   title: 'Classic Bride Portrait',     category: 'Bridal',    color: '#4a2511' },
  { file: 's3',   title: 'Graceful Saree Draping',     category: 'Boutique',  color: '#6e1224' },
  { file: 's4',   title: 'Stunning Hair Updo',         category: 'Salon',     color: '#4a2511' },
  { file: 's6',   title: 'Floral Mehndi Art',          category: 'Bridal',    color: '#6e1224' },
  { file: 's7',   title: 'Bridal Jewellery Styling',   category: 'Bridal',    color: '#4a2511' },
  { file: 's8',   title: 'Golden Bridal Look',         category: 'Bridal',    color: '#6e1224' },
  { file: 's9',   title: 'Elegant Draping Style',      category: 'Boutique',  color: '#4a2511' },
  { file: 's10',  title: 'Soft Bridal Glam',           category: 'Makeup',    color: '#6e1224' },
  { file: 's11',  title: 'Jewellery & Flowers',        category: 'Bridal',    color: '#4a2511' },
  { file: 's12',  title: 'Heritage Silk Bride',        category: 'Bridal',    color: '#6e1224' },
  { file: 's13',  title: 'Traditional Muhurtham Look', category: 'Bridal',    color: '#4a2511' },
  { file: 's14',  title: 'Professional Blow Dry',      category: 'Salon',     color: '#6e1224' },
  { file: 's15',  title: 'Signature Bridal Art',       category: 'Gallery',   color: '#4a2511' },
  { file: 's16',  title: 'Grand Bridal Portrait',      category: 'Bridal',    color: '#6e1224' },
  { file: 's18',  title: 'Radiant Bride Close-up',     category: 'Bridal',    color: '#4a2511' },

  // ── Original IMG Series ──
  { file: 'img1',  title: 'Bridal Transformation',     category: 'Bridal',    color: '#6e1224' },
  { file: 'img2',  title: 'Salon Hair Creation',       category: 'Salon',     color: '#4a2511' },
  { file: 'img3',  title: 'Makeup Mastery',            category: 'Makeup',    color: '#6e1224' },
  { file: 'img4',  title: 'Bridal Draping Art',        category: 'Boutique',  color: '#4a2511' },
  { file: 'img5',  title: 'Luxury Bridal Package',     category: 'Bridal',    color: '#6e1224' },
  { file: 'img6',  title: 'Creative Hair Design',      category: 'Salon',     color: '#4a2511' },
  { file: 'img7',  title: 'Elegant Party Makeup',      category: 'Makeup',    color: '#6e1224' },
  { file: 'img8',  title: 'Skin Glow Treatment',       category: 'Skin Care', color: '#4a2511' },
  { file: 'img9',  title: 'Couture Silk Style',        category: 'Boutique',  color: '#6e1224' },
  { file: 'img10', title: 'Academy Workshop Session',  category: 'Academy',   color: '#4a2511' },
  { file: 'img11', title: 'Portfolio Signature Shot',   category: 'Gallery',   color: '#6e1224' },
];

const STATIC_IMAGES = REAL_IMAGES.map(img => ({
  _id: img.file,
  url: `/imges/${img.file}.webp`,
  title: img.title,
  category: img.category
}));

const CATEGORIES = ['All', 'Bridal', 'Salon', 'Makeup', 'Skin Care', 'Boutique', 'Academy', 'Gallery'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryList, setGalleryList] = useState<any[]>(STATIC_IMAGES);
  const [loading, setLoading] = useState(true);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px is standard mobile boundary (sm breakpoint)
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setExpandedMobile(false);
  }, [activeCategory]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/gallery`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch gallery database");
        return res.json();
      })
      .then(dbImages => {
        const formattedDbImages = dbImages.map((img: any) => ({
          _id: img._id,
          url: img.url,
          title: img.title,
          category: img.category
        }));
        // Filter out static images that are already in the database
        const dbIds = new Set(formattedDbImages.map((img: any) => img._id));
        const filteredStatic = STATIC_IMAGES.filter(img => !dbIds.has(img._id));
        
        setGalleryList([...formattedDbImages, ...filteredStatic]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading gallery API:", err);
        // Fallback to static images only
        setGalleryList(STATIC_IMAGES);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'All'
    ? [...galleryList].sort((a, b) => {
        const aIsBridal = a.category?.toLowerCase() === 'bridal';
        const bIsBridal = b.category?.toLowerCase() === 'bridal';
        if (aIsBridal && !bIsBridal) return -1;
        if (!aIsBridal && bIsBridal) return 1;
        return 0;
      })
    : galleryList.filter(img => img.category === activeCategory);

  const visibleImages = isMobile && !expandedMobile
    ? filtered.slice(0, 8)
    : filtered;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setLightboxIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex(prev => prev !== null ? (prev + 1) % filtered.length : null);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="flex-grow flex flex-col items-center py-6 px-4 sm:px-10 z-10 w-full max-w-7xl mx-auto">

      {/* ─── Hero: Split Layout (same style as homepage) ─── */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-14 mt-2">

        {/* Left: Text content */}
        <div className="w-full lg:w-[50%] flex flex-col items-start justify-center text-left">
          <span className="text-[#6e1224] font-sans font-bold tracking-[0.25em] uppercase mb-4 text-[10px] sm:text-xs">
            REAL WORK · REAL BRIDES
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-serif font-bold text-[#4a2511] leading-[1.25] mb-4 tracking-[0.05em] uppercase">
            OUR GALLERY
            <span className="text-[#6e1224] font-serif font-semibold text-lg sm:text-xl md:text-2xl tracking-[0.12em] mt-2 block">
              Every Moment, A Masterpiece.
            </span>
          </h1>

          <div className="kolam-separator !justify-start w-full mt-1 mb-5">
            <div className="kolam-line max-w-[100px]"></div>
            <div className="kolam-ornament font-light tracking-[0.3em] text-[#d4af37]">✧</div>
          </div>

          <p className="text-[#1c1512]/80 font-sans text-base sm:text-lg font-medium mb-6 leading-relaxed">
            Every image is a real moment captured at Mathumi — bridal transformations, expert styling, and heritage craftsmanship that tell the story of our work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-start mt-2">
            <Link href="/booking" className="gold-button rounded-full text-center py-3 px-8 text-[11px] sm:text-xs tracking-[0.2em] font-sans font-bold shadow-md uppercase block w-full sm:w-auto">
              BOOK YOUR SESSION
            </Link>
            <Link href="/boutique" className="px-8 py-3 border-2 border-[#c2a670]/40 text-[#1c1512] font-sans font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase hover:bg-[#6e1224] hover:text-white hover:border-[#6e1224] transition-all rounded-full text-center cursor-pointer block w-full sm:w-auto">
              THE COLLECTION
            </Link>
          </div>
        </div>

        {/* Right: 3-Card Overlapping Dynamic Composition */}
        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end items-center relative py-6">
          <div className="relative w-full max-w-[480px] h-[420px] sm:h-[490px] lg:h-[530px]">

            {/* CARD 1: Main — s16 Grand Bridal */}
            <div className="absolute top-0 left-6 w-[75%] h-[85%] rounded-2xl overflow-hidden border-4 border-[#d4af37] bg-[#fdf5eb] shadow-[0_16px_40px_rgba(74,37,17,0.18)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_28px_55px_rgba(74,37,17,0.28)] z-10 hover:z-30 cursor-pointer group">
              <img src="/imges/s16.webp" alt="Grand Bridal" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-2 border border-[#d4af37]/30 rounded-xl pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 bg-[#1c1512]/60 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#d4af37] font-sans font-bold text-[8px] tracking-[0.2em] uppercase">Grand Bridal</span>
              </div>
            </div>

            {/* CARD 2: Bottom-Left — s6 Floral Mehndi */}
            <div className="absolute bottom-2 left-0 w-[48%] h-[52%] rounded-2xl overflow-hidden border-4 border-white bg-[#fdf5eb] shadow-[0_12px_30px_rgba(74,37,17,0.22)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] hover:shadow-[0_22px_45px_rgba(74,37,17,0.32)] z-20 hover:z-30 cursor-pointer group -rotate-3 hover:rotate-0">
              <img src="/imges/s6.webp" alt="Floral Mehndi" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-1.5 border border-[#d4af37]/25 rounded-xl pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 bg-[#1c1512]/60 backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#d4af37] font-sans font-bold text-[7px] tracking-[0.18em] uppercase">Mehndi</span>
              </div>
            </div>

            {/* CARD 3: Bottom-Right — s11 Jewellery Styling */}
            <div className="absolute bottom-0 right-0 w-[46%] h-[46%] rounded-2xl overflow-hidden border-4 border-white bg-[#fdf5eb] shadow-[0_12px_30px_rgba(74,37,17,0.22)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.06] hover:shadow-[0_22px_45px_rgba(74,37,17,0.32)] z-20 hover:z-30 cursor-pointer group rotate-2 hover:rotate-0">
              <img src="/imges/s11.webp" alt="Jewellery Styling" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-1.5 border border-[#d4af37]/25 rounded-xl pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 bg-[#1c1512]/60 backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#d4af37] font-sans font-bold text-[7px] tracking-[0.18em] uppercase">Jewellery</span>
              </div>
            </div>

            {/* Gold ✧ floating ornament */}
            <div className="absolute top-[78%] left-[68%] text-[#d4af37] text-2xl z-30 pointer-events-none animate-pulse select-none drop-shadow">✧</div>

          </div>
        </div>
      </div>

      {/* Gold divider before filters */}
      <div className="flex items-center justify-center mb-8 w-full max-w-2xl">
        <div className="h-px bg-[#d4af37] flex-grow"></div>
        <div className="mx-4 text-[#d4af37] text-xl">✧</div>
        <div className="h-px bg-[#d4af37] flex-grow"></div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[10px] font-sans font-bold tracking-[0.18em] uppercase transition-all duration-300 border-2 cursor-pointer
              ${activeCategory === cat
                ? 'bg-[#6e1224] text-white border-[#6e1224] shadow-md'
                : 'bg-white text-[#4a2511] border-[#d4af37]/50 hover:border-[#6e1224] hover:text-[#6e1224]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Gallery Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-gap:1rem] w-full">
        {visibleImages.map((img, idx) => (
          <div
            key={img._id}
            className="break-inside-avoid mb-4 relative rounded border-2 border-[#d4af37] bg-white p-1.5 shadow-[0_8px_20px_rgba(74,37,17,0.10)] group hover:border-[#6e1224] hover:shadow-[0_14px_32px_rgba(74,37,17,0.22)] transition-all duration-500 overflow-hidden cursor-pointer"
            onClick={() => {
              const actualIdx = filtered.findIndex(item => item._id === img._id);
              setLightboxIndex(actualIdx);
            }}
          >
            <div className="relative w-full overflow-hidden rounded">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading={idx < 6 ? 'eager' : 'lazy'}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1512]/80 via-[#1c1512]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-end p-3">
                <span className="text-[#d4af37] font-sans font-bold text-[8px] tracking-[0.22em] uppercase mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  {img.category}
                </span>
                <span className="text-white font-serif font-semibold text-sm tracking-wide text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-350 delay-75">
                  {img.title}
                </span>
                <span className="text-[#d4af37]/80 text-[9px] font-sans mt-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-400 delay-100">
                  Click to enlarge ✦
                </span>
              </div>
              {/* Gold corner accents */}
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#d4af37] opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#d4af37] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {isMobile && filtered.length > 8 && !expandedMobile && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpandedMobile(true)}
            className="gold-button rounded-full px-10 py-3.5 text-xs font-sans font-bold tracking-[0.2em] uppercase shadow-md cursor-pointer"
          >
            VIEW MORE IMAGES
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-[#4a2511]/60 font-serif text-lg mt-16">No images in this category yet.</p>
      )}

      {/* CTA */}
      <div className="mt-14 text-center">
        <Link href="/booking" className="gold-button rounded-full px-10 py-3.5 text-xs font-sans font-bold tracking-[0.2em] uppercase shadow-md">
          BOOK YOUR BRIDAL SESSION
        </Link>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Main composition container */}
          <div className="relative max-w-4xl w-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-2 sm:right-0 text-white hover:text-[#d4af37] text-3xl font-light transition-colors p-2 cursor-pointer z-50"
              title="Close"
            >
              ✕
            </button>

            {/* Content box with border */}
            <div className="relative border-4 border-[#d4af37] rounded-lg overflow-hidden shadow-2xl bg-[#1c1512] w-full max-w-2xl flex flex-col">
              <div className="relative w-full h-[60vh] sm:h-[65vh] flex items-center justify-center bg-black">
                <img
                  src={filtered[lightboxIndex].url}
                  alt={filtered[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain mx-auto"
                />
              </div>
              
              {/* Description & Counter overlay/bar */}
              <div className="bg-[#1c1512] border-t border-[#d4af37]/30 p-4 text-center">
                <span className="text-[#d4af37] font-sans font-bold text-[10px] tracking-[0.25em] uppercase">
                  {filtered[lightboxIndex].category}
                </span>
                <h3 className="text-white font-serif font-bold text-base sm:text-lg mt-1 tracking-wide">
                  {filtered[lightboxIndex].title}
                </h3>
                <div className="text-white/40 text-[10px] font-sans mt-2 tracking-widest font-bold">
                  {lightboxIndex + 1} OF {filtered.length}
                </div>
              </div>
            </div>

            {/* Navigation buttons: Left (Prev) */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 bg-black/60 sm:bg-transparent border border-white/20 sm:border-none w-12 h-12 sm:w-auto sm:h-auto rounded-full flex items-center justify-center text-white hover:text-[#d4af37] text-4xl sm:text-6xl font-light transition-all duration-300 hover:scale-110 cursor-pointer z-40 select-none"
              title="Previous"
            >
              ‹
            </button>

            {/* Navigation buttons: Right (Next) */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 bg-black/60 sm:bg-transparent border border-white/20 sm:border-none w-12 h-12 sm:w-auto sm:h-auto rounded-full flex items-center justify-center text-white hover:text-[#d4af37] text-4xl sm:text-6xl font-light transition-all duration-300 hover:scale-110 cursor-pointer z-40 select-none"
              title="Next"
            >
              ›
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}
