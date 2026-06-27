"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-makkah.png',
    title: 'Perjalanan Suci yang Tenang dan Penuh Makna',
    subtitle: 'Bersama Talita Umroh',
  },
  {
    image: '/images/hero-madinah.png',
    title: 'Meraih Khusyuk di Kota Cahaya Madinah',
    subtitle: 'Bersama Talita Umroh',
  },
  {
    image: '/images/hero-umroh.png',
    title: 'Pelayanan VIP Spesial untuk Ibadah Anda',
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
          {/* We use standard img for exact reproduction of the cover CSS behavior, avoiding Next/Image complexity with external configurations for now */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${slide.image}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/30"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col items-center text-center">
        
        {/* Dynamic Titles */}
        <div className="h-[120px] md:h-[150px] flex items-center justify-center mb-4 max-w-4xl">
          {slides.map((slide, index) => (
            <h1 
              key={index}
              className={`absolute font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface drop-shadow-lg transition-all duration-700 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
              {slide.title}
            </h1>
          ))}
        </div>
        
        <h2 className="font-headline-md text-headline-md text-primary-container mb-12 drop-shadow-md">
          {slides[0].subtitle}
        </h2>

        {/* Glassmorphism Search Box */}
        <div className="glass-panel w-full max-w-3xl rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end shadow-2xl">
          <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="month">Bulan Keberangkatan</label>
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
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="type">Jenis Paket</label>
            <div className="relative w-full">
              <select className="w-full interactive-control font-body-md text-body-md px-4 py-3 rounded-md appearance-none bg-surface/50 text-white cursor-pointer" id="type">
                <option value="">Semua Paket</option>
                <option value="gold">Gold (VIP)</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none w-5 h-5" />
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <button className="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-all duration-300 gold-glow">
              <Search className="w-5 h-5" /> Cari Paket
            </button>
          </div>
        </div>
        
        {/* Slider Dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-primary-container w-8' : 'bg-outline-variant hover:bg-primary/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
