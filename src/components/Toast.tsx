"use client";
import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  message: string;
  subMessage?: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, subMessage, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 5.5s
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 5500);
    return () => { clearTimeout(enterTimer); clearTimeout(exitTimer); };
  }, [onClose]);

  const configs = {
    success: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#d4af37]',
      iconBg: 'bg-[#d4af37]/10',
      iconColor: 'text-[#d4af37]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      titleColor: 'text-[#3a1f0d]',
    },
    error: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#800020]',
      iconBg: 'bg-red-50',
      iconColor: 'text-[#800020]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      titleColor: 'text-[#800020]',
    },
    warning: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#b45309]',
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#b45309]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
      titleColor: 'text-[#b45309]',
    },
  };

  const c = configs[type];

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999] max-w-sm w-full
        transition-all duration-400 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
      `}
      style={{ transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      <div className={`${c.bg} ${c.border} rounded-xl shadow-2xl overflow-hidden`}
           style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)' }}>
        {/* Gold shimmer top line */}
        <div className="h-[2px] bg-gradient-to-r from-[#c2a670] via-[#d4af37] to-[#c2a670] w-full" />
        
        <div className="p-5 flex items-start gap-4">
          {/* Icon */}
          <div className={`${c.iconBg} ${c.iconColor} rounded-full p-2.5 flex-shrink-0 mt-0.5`}>
            {c.icon}
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <p className={`font-serif font-bold text-sm tracking-wide ${c.titleColor} mb-0.5`}>
              {message}
            </p>
            {subMessage && (
              <p className="text-xs text-[#1c1512]/65 font-sans leading-relaxed mt-1">
                {subMessage}
              </p>
            )}
            {/* Branding */}
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-[#c2a670] uppercase mt-2">
              MATHUMI BRIDAL BOUTIQUE & SALON
            </p>
          </div>

          {/* Close */}
          <button
            onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
            className="text-[#1c1512]/30 hover:text-[#1c1512]/70 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="h-[3px] bg-[#f4e8d3]">
          <div
            className={`h-full ${type === 'success' ? 'bg-[#d4af37]' : type === 'error' ? 'bg-[#800020]' : 'bg-[#b45309]'}`}
            style={{
              animation: 'shrink 5.5s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// Hook to manage toast state easily
export function useToast() {
  const [toast, setToast] = useState<{ message: string; subMessage?: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success', subMessage?: string) => {
    setToast({ message, type, subMessage });
  };

  const hideToast = () => setToast(null);

  const ToastElement = toast ? (
    <Toast
      key={`${toast.message}-${Date.now()}`}
      message={toast.message}
      subMessage={toast.subMessage}
      type={toast.type}
      onClose={hideToast}
    />
  ) : null;

  return { showToast, ToastElement };
}
