"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-makkah.png',
    title: 'Wujudkan Umrah Impian Anda dengan Fasilitas Premium & Bimbingan Eksklusif',
    subtitle: 'Bersama Talita Umroh',
  },
  {
    image: '/images/hero-madinah.png',
    title: 'Raih Khusyuk Beribadah di Dua Tanah Haram, Makkah & Madinah',
    subtitle: 'Bersama Talita Umroh',
  },
  {
    image: '/images/hero-umroh.png',
    title: 'Layanan Bintang 5 untuk Pengalaman Spiritual Tanpa Kendala',
    subtitle: 'Bersama Talita Umroh',
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[921px] flex items-center justify-center pt-20 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden">
      
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src={slide.image} alt={slide.title} fill className="object-cover" style={{ objectFit: 'cover' }} priority={index === 0} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/30"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-50 w-full max-w-container-max mx-auto flex flex-col items-center text-center">
        
        {/* Dynamic Titles */}
        <div className="h-[120px] md:h-[150px] flex items-center justify-center mb-4 max-w-4xl">
          {slides.map((slide, index) => (
            <h2 
              key={index}
              className={`absolute font-display-lg text-headline-lg-mobile md:text-display-lg text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)] transition-all duration-700 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
              {slide.title}
            </h2>
          ))}
        </div>
        
        <h2 className="font-headline-md text-headline-md text-white/90 mb-12 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">
          {slides[0].subtitle}
        </h2>

        {/* Search / Filter Box */}
        <div className="glass-panel w-full max-w-3xl mt-8 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 rounded-[32px] md:rounded-full border border-white/20">
          <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
            <label className="font-label-sm text-label-sm text-white/80 uppercase tracking-wider" htmlFor="month">Bulan Keberangkatan</label>
            <div className="relative w-full">
              <select className="w-full interactive-control font-body-md text-body-md px-4 py-3 rounded-md appearance-none bg-surface/50 text-white cursor-pointer" id="month">
                <option value="">Pilih Bulan</option>
                <option value="agustus">Agustus 2026</option>
                <option value="september">September 2026</option>
                <option value="oktober">Oktober 2026</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none w-5 h-5" />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
            <label className="font-label-sm text-label-sm text-white/80 uppercase tracking-wider" htmlFor="type">Jenis Paket</label>
            <div className="relative w-full">
              <select className="w-full interactive-control font-body-md text-body-md px-4 py-3 rounded-md appearance-none bg-surface/50 text-white cursor-pointer" id="type">
                <option value="">Semua Paket</option>
                <option value="vip">Paket VIP</option>
                <option value="reguler">Paket Reguler</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none w-5 h-5" />
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <button className="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-all duration-300 gold-glow">
              <Search className="w-5 h-5" /> Temukan Paket Terbaik Anda
            </button>
          </div>
        </div>
        
        {/* Slider Dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="p-2"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={`block h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-primary-container w-8' : 'w-3 bg-outline-variant hover:bg-primary/50'}`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
