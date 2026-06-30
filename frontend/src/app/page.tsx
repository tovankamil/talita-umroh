/* eslint-disable react/no-unescaped-entities */

import Link from 'next/link';
import Image from 'next/image';
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSlider from "@/components/HeroSlider";
import GalleryFilter from "@/components/GalleryFilter";
import WeatherClockBar from "@/components/WeatherClockBar";
import ScrollReveal from "@/components/ScrollReveal";
import ArticleSection from "@/components/ArticleSection";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Plane, Building2, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      
    



{/* TopNavBar */}
<header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(212,175,55,0.05)]">
<WeatherClockBar />
<div className="flex justify-between items-center px-margin-desktop h-20 max-w-container-max mx-auto md:px-margin-desktop px-margin-mobile">
{/* Brand Logo */}
<a className="font-display-lg text-headline-md text-primary tracking-tight" href="#" style={{"fontSize":"24px","lineHeight":"32px"}}>
                Talita Umroh
            </a>
{/* Desktop Navigation Links */}
<nav className="hidden md:flex items-center space-x-8">
<a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md scale-95 duration-150 ease-in-out" href="#">Beranda</a>
<a className="text-on-surface hover:text-primary transition-colors duration-300 font-label-md text-label-md hover:bg-primary/10 hover:text-primary-fixed px-2 py-1 rounded" href="#paket">Paket Umrah</a>
<a className="text-on-surface hover:text-primary transition-colors duration-300 font-label-md text-label-md hover:bg-primary/10 hover:text-primary-fixed px-2 py-1 rounded" href="#haji">Haji Plus</a>
<a className="text-on-surface hover:text-primary transition-colors duration-300 font-label-md text-label-md hover:bg-primary/10 hover:text-primary-fixed px-2 py-1 rounded" href="#tentang">Tentang Kami</a>
<a className="text-on-surface hover:text-primary transition-colors duration-300 font-label-md text-label-md hover:bg-primary/10 hover:text-primary-fixed px-2 py-1 rounded" href="#testimoni">Testimoni</a>
</nav>
{/* CTA &amp; Mobile Menu Toggle */}
<div className="flex items-center gap-4">
<a className="hidden md:inline-flex items-center justify-center rounded-md bg-primary-container text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-DEFAULT hover:bg-primary-fixed-dim transition-all duration-300 gold-glow" href="#">
                    Konsultasi Gratis
                </a>
<button className="md:hidden text-on-surface p-2 focus:outline-none">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
</div>
</header>
<main className="flex-grow pt-[112px]">
<h1 className="sr-only">Talita Umroh - Biro Perjalanan Umroh Terpercaya dan Haji Plus</h1>
<HeroSlider />
{/* Trust Bar */}
<ScrollReveal>
<section className="bg-surface-container-low py-8 border-y border-outline-variant/20">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<p className="text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-6">Mitra Resmi &amp; Maskapai Terpercaya</p>
<div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 text-on-surface-variant/60 hover:text-primary transition-colors duration-500">
  <div className="flex items-center gap-2 font-display-lg text-2xl tracking-widest"><Plane className="w-8 h-8"/> GARUDA</div>
  <div className="flex items-center gap-2 font-display-lg text-2xl tracking-widest"><Plane className="w-8 h-8"/> SAUDIA</div>
  <div className="flex items-center gap-2 font-display-lg text-2xl tracking-widest"><Building2 className="w-8 h-8"/> HILTON</div>
  <div className="flex items-center gap-2 font-display-lg text-2xl tracking-widest"><Building2 className="w-8 h-8"/> PULLMAN</div>
  <div className="flex items-center gap-2 font-display-lg text-2xl tracking-widest"><ShieldCheck className="w-8 h-8"/> KEMENAG RI</div>
</div>
</div>
</section>
</ScrollReveal>
{/* Mengapa Memilih Kami? */}
<ScrollReveal direction="up">
<section id="paket" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface text-on-surface relative overflow-hidden">
<Image src="/images/pattern.png" alt="" fill className="object-cover opacity-10 pointer-events-none" sizes="100vw" priority={false} />
<div className="max-w-container-max mx-auto relative z-10">
{/* BEGIN: Section Header */}
<ScrollReveal direction="up" delay={0.1}>
<div className="text-center mb-16 flex flex-col items-center">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-6 relative inline-block">
        Pilihan Paket Umrah
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
        Pilihan paket perjalanan umrah eksklusif dengan fasilitas premium untuk kelancaran ibadah Anda.
      </p>
</div>
</ScrollReveal>
{/* END: Section Header */}
{/* BEGIN: Packages Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/* BEGIN: Card 1 (SOLD) */}
<article className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-outline-variant flex flex-col relative group transition-transform duration-300 hover:-translate-y-2">
{/* SOLD Overlay */}
<div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center">
<span className="text-white font-headline-lg text-[40px] font-bold tracking-wider drop-shadow-md">SOLD</span>
</div>
{/* Card Image Placeholder */}
<div className="h-48 bg-surface-bright relative overflow-hidden">
<Image alt="Umroh Bronze Package Cover" className="w-full h-full object-cover opacity-50 grayscale" src="/images/hero-makkah.png" fill sizes="(max-width: 768px) 100vw, 50vw" />
</div>
{/* Card Content */}
<div className="p-6 flex-1 flex flex-col relative z-0">
<h3 className="text-primary-container font-headline-md text-[18px] font-bold mb-4 border-b border-outline-variant pb-2">02 JULI 2026 | REGULER</h3>
<ul className="space-y-3 font-body-md text-[14px] text-on-surface-variant mb-6 flex-1">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="calendar_today">calendar_today</span>
<span>02 Juli 2026</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Al Shohada Hotel (Makkah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Concorde Dar Al Khair Hotel (Madinah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="flight">flight</span>
<span>Garuda Indonesia</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="location_on">location_on</span>
<span>Soekarno-Hatta International Airport (CGK)</span>
</li>
</ul>
<div className="mb-6">
<div className="flex justify-between items-center mb-2">
<span className="font-headline-md text-[16px] font-bold">Sisa Seat : 0</span>
</div>
<div className="w-full bg-surface-bright rounded-full h-1.5">
<div className="bg-primary-container h-1.5 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="mb-6">
<span className="font-body-md text-[14px] text-on-surface-variant block mb-1">Harga mulai :</span>
<span className="font-headline-md text-[24px] font-bold text-primary-container">IDR 35.500.000,00</span>
</div>
<button className="w-full py-3 bg-primary-container/20 text-primary-container font-label-md rounded-md border border-primary-container/50 cursor-not-allowed opacity-50 transition-colors" disabled>
            DETAIL PAKET
          </button>
</div>
</article>
{/* END: Card 1 */}
{/* BEGIN: Card 2 */}
<article className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-outline-variant flex flex-col group transition-transform duration-300 hover:-translate-y-2 hover:border-primary-container/50">
{/* Card Image Placeholder */}
<div className="h-48 bg-surface-bright relative overflow-hidden">
<Image alt="Umroh Gold Package Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/hero-madinah.png" fill sizes="(max-width: 768px) 100vw, 50vw" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
</div>
{/* Card Content */}
<div className="p-6 flex-1 flex flex-col">
<h3 className="text-primary-container font-headline-md text-[18px] font-bold mb-4 border-b border-outline-variant pb-2">15 JULI 2026 | VIP</h3>
<ul className="space-y-3 font-body-md text-[14px] text-on-surface-variant mb-6 flex-1">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="calendar_today">calendar_today</span>
<span>15 Juli 2026</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Jumeirah Jabal Omar (Makkah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Peninsula Worth (Madinah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="flight">flight</span>
<span>Garuda Indonesia</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="location_on">location_on</span>
<span>Soekarno-Hatta International Airport (CGK)</span>
</li>
</ul>
<div className="mb-6">
<div className="flex justify-between items-center mb-2">
<span className="font-headline-md text-[16px] font-bold">Sisa Seat : 14</span>
</div>
<div className="w-full bg-surface-bright rounded-full h-1.5">
<div className="bg-primary-container h-1.5 rounded-full" style={{"width":"70%"}}></div>
</div>
</div>
<div className="mb-6">
<span className="font-body-md text-[14px] text-on-surface-variant block mb-1">Harga mulai :</span>
<span className="font-headline-md text-[24px] font-bold text-primary-container">IDR 49.650.000,00</span>
</div>
<a className="block text-center w-full py-3 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-md rounded-md transition-colors duration-300" href="/paket/gold-juli-2026">
            DETAIL PAKET
          </a>
</div>
</article>
{/* END: Card 2 */}
{/* BEGIN: Card 3 */}
<article className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-outline-variant flex flex-col group transition-transform duration-300 hover:-translate-y-2 hover:border-primary-container/50">
{/* Card Image Placeholder */}
<div className="h-48 bg-surface-bright relative overflow-hidden">
<Image alt="Umroh Bronze Package Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/hero-umroh.png" fill sizes="(max-width: 768px) 100vw, 50vw" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
</div>
{/* Card Content */}
<div className="p-6 flex-1 flex flex-col">
<h3 className="text-primary-container font-headline-md text-[18px] font-bold mb-4 border-b border-outline-variant pb-2">30 JULI 2026 | REGULER</h3>
<ul className="space-y-3 font-body-md text-[14px] text-on-surface-variant mb-6 flex-1">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="calendar_today">calendar_today</span>
<span>30 Juli 2026</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Al Shohada Hotel (Makkah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Concorde Dar Al Khair Hotel (Madinah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="flight">flight</span>
<span>Garuda Indonesia</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="location_on">location_on</span>
<span>Soekarno-Hatta International Airport (CGK)</span>
</li>
</ul>
<div className="mb-6">
<div className="flex justify-between items-center mb-2">
<span className="font-headline-md text-[16px] font-bold">Sisa Seat : 3</span>
</div>
<div className="w-full bg-surface-bright rounded-full h-1.5">
<div className="bg-primary-container h-1.5 rounded-full" style={{"width":"15%"}}></div>
</div>
</div>
<div className="mb-6">
<span className="font-body-md text-[14px] text-on-surface-variant block mb-1">Harga mulai :</span>
<span className="font-headline-md text-[24px] font-bold text-primary-container">IDR 41.900.000,00</span>
</div>
<a className="block text-center w-full py-3 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-md rounded-md transition-colors duration-300" href="/paket/gold-juli-2026">
            DETAIL PAKET
          </a>
</div>
</article>
{/* END: Card 3 */}
{/* BEGIN: Card 4 */}
<article className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-outline-variant flex flex-col group transition-transform duration-300 hover:-translate-y-2 hover:border-primary-container/50">
{/* Card Image Placeholder */}
<div className="h-48 bg-surface-bright relative overflow-hidden">
<Image alt="Umroh Bronze Package Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/family_ihram_premium.png" fill sizes="(max-width: 768px) 100vw, 50vw" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
</div>
{/* Card Content */}
<div className="p-6 flex-1 flex flex-col">
<h3 className="text-primary-container font-headline-md text-[18px] font-bold mb-4 border-b border-outline-variant pb-2">03 AGUSTUS 2026 | REGULER</h3>
<ul className="space-y-3 font-body-md text-[14px] text-on-surface-variant mb-6 flex-1">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="calendar_today">calendar_today</span>
<span>03 Agustus 2026</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Al Shohada Hotel (Makkah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="hotel">hotel</span>
<span>Concorde Dar Al Khair Hotel (Madinah)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="flight">flight</span>
<span>Garuda Indonesia</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-[20px] shrink-0 text-primary-container" data-icon="location_on">location_on</span>
<span>Soekarno-Hatta International Airport (CGK)</span>
</li>
</ul>
<div className="mb-6">
<div className="flex justify-between items-center mb-2">
<span className="font-headline-md text-[16px] font-bold">Sisa Seat : 6</span>
</div>
<div className="w-full bg-surface-bright rounded-full h-1.5">
<div className="bg-primary-container h-1.5 rounded-full" style={{"width":"30%"}}></div>
</div>
</div>
<div className="mb-6">
<span className="font-body-md text-[14px] text-on-surface-variant block mb-1">Harga mulai :</span>
<span className="font-headline-md text-[24px] font-bold text-primary-container">IDR 41.700.000,00</span>
</div>
<a className="block text-center w-full py-3 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label-md rounded-md transition-colors duration-300" href="/paket/gold-juli-2026">
            DETAIL PAKET
          </a>
</div>
</article>
{/* END: Card 4 */}
</div>
{/* END: Packages Grid */}
</div>
</section>
{/* FIT Package Section */}
<section id="tentang" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background text-on-surface">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-16 flex flex-col items-center">
<span className="font-label-md text-label-md text-white uppercase tracking-widest mb-2">Kualitas &amp; Kepercayaan</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container">Mengapa Memilih Talita Umroh</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-gutter">
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-2xl"></div>
<Image alt="Official Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="verified">verified</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Biro Haji Umroh Resmi</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Kami telah mengantongi ijin Penyelenggara Umroh Resmi dari Kementerian Agama dengan komitmen legalitas penuh.</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 flex items-center justify-center opacity-20"><div className="w-24 h-24 border border-[#D4AF37] rounded-full"></div><div className="absolute w-16 h-16 border border-[#D4AF37] rounded-full"></div></div>
<Image alt="Accreditation Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="workspace_premium">workspace_premium</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Akreditasi A</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Terakreditasi 'Sangat Baik' (A) secara resmi oleh Kementerian Agama sebagai bukti pelayanan profesional.</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] scale-150 rotate-45"></div>
<Image alt="Best Operator Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="military_tech">military_tech</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Operator Umroh Terbaik</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Salah satu penyelenggara dengan predikat operator terbaik dalam Ajang Pariwisata Halal Nasional 2023.</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-t-full"></div>
<Image alt="Manasik Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="school">school</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Sekolah Manasik</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Persiapan ibadah dengan kurikulum lengkap dan pembimbing berpengalaman untuk ibadah yang lebih bermakna.</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 opacity-10" style={{"backgroundImage":"radial-gradient(#D4AF37 0.5px, transparent 0.5px)","backgroundSize":"8px 8px"}}></div>
<Image alt="Handling Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="groups">groups</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Tim Handling Profesional</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Petugas perwakilan di Makkah dan Madinah yang siap melayani seluruh akomodasi dan kebutuhan jamaah.</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-32 h-32 mb-6 relative flex items-center justify-center"><div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-20"><div className="h-px w-full bg-[#D4AF37]"></div><div className="h-px w-3/4 bg-[#D4AF37] mx-auto"></div><div className="h-px w-full bg-[#D4AF37]"></div></div>
<Image alt="Departure Badge" className="w-full h-full object-contain filter sepia brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSzKmmfwMn_m0S0QlDOXUwx7R8jPMrlCyGaq7PLmfQE1wvCqQVsG3BUFYxQEzjTWwKWa3LKa_wyypIBooR_-duJn-LGxP8rYzHHVhI50S_l2iYl0aGiGEbdrvGI3mitOBpkdLMuBqZZxUjPsyb_HkN4s_clFuog9BhsfIfth0lStGI69rG2415sTSMzgqfDfvOfirOCi6i28EoWHQXwv5sOYxSauh7CmoMCzvPtmhWCAZdqsrdI6yIHULHNWOMZ4z-kH4-BO6y9p8" fill sizes="(max-width: 768px) 100vw, 50vw" />
<span className="material-symbols-outlined absolute text-primary-container text-[40px]" data-icon="flight_takeoff">flight_takeoff</span>
</div>
<h3 className="font-headline-md text-[20px] text-white mb-3">Pasti Berangkat</h3>
<p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">Kami menjamin keberangkatan tepat waktu sesuai jadwal yang Anda pilih dengan kepastian kursi yang tersedia.</p>
</div>
</div>
</div>
</section>
<section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-[#FFF8ED] relative overflow-hidden">
{/* Decorative Background Elements */}
<div className="absolute inset-0 pointer-events-none z-0"><Image src="/images/islamic_bg_pattern.png" alt="" fill className="object-cover opacity-30 mix-blend-multiply" sizes="100vw" priority={false} /></div>
<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

<div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
{/* Left: Image */}
<div className="w-full md:w-5/12 flex justify-center">
<Image alt="Family in Ihram" className="w-full h-auto object-cover rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.15)] ring-1 ring-primary/20" src="/images/family_ihram_premium.png" width={600} height={400} />
</div>
{/* Right: Content */}
<div className="w-full md:w-7/12 flex flex-col">
<h2 className="font-headline-lg text-[32px] md:text-[40px] font-bold text-[#1b1b1b] mb-4">
            Rancang Perjalanan Umroh Eksklusif Impian Anda
        </h2>
<p className="font-body-md text-[16px] text-[#47464a] mb-8 leading-relaxed">
            Nikmati fleksibilitas tanpa batas dengan layanan Umroh Mandiri (FIT) eksklusif dari Talita Umroh. Ciptakan momen ibadah yang lebih intim, nyaman, dan berkesan bersama keluarga tercinta dengan kebebasan penuh dalam mengatur waktu, maskapai, akomodasi, hingga rute perjalanan ibadah Anda.
        </p>
<div className="mb-8">
<button className="bg-[#D4AF37] text-white font-label-md text-label-md py-3 px-8 rounded-lg hover:bg-[#c39b26] transition-all duration-300">
                Pesan Umroh Sekarang
            </button>
</div>
{/* Features Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Feature 1 */}
<div className="flex items-start gap-4">
<div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
<span className="material-symbols-outlined text-[#1b1b1b]" data-icon="schedule">schedule</span>
</div>
<div>
<h3 className="font-headline-md text-[16px] font-bold text-[#1b1b1b]">Kebebasan Mengatur Jadwal</h3>
<p className="font-body-md text-[14px] text-[#47464a]">Tentukan sendiri tanggal pergi, durasi, dan rute sesuai agenda Anda.</p>
</div>
</div>
{/* Feature 2 */}
<div className="flex items-start gap-4">
<div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
<span className="material-symbols-outlined text-[#1b1b1b]" data-icon="hotel">hotel</span>
</div>
<div>
<h3 className="font-headline-md text-[16px] font-bold text-[#1b1b1b]">Hotel Ring 1 Terjamin</h3>
<p className="font-body-md text-[14px] text-[#47464a]">Akses instan ke Masjidil Haram & Nabawi tanpa membuang waktu.</p>
</div>
</div>
{/* Feature 3 */}
<div className="flex items-start gap-4">
<div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
<span className="material-symbols-outlined text-[#1b1b1b]" data-icon="person">person</span>
</div>
<div>
<h3 className="font-headline-md text-[16px] font-bold text-[#1b1b1b]">Muthawif Pribadi Berpengalaman</h3>
<p className="font-body-md text-[14px] text-[#47464a]">Pendamping ibadah eksklusif hanya untuk Anda dan keluarga.</p>
</div>
</div>
{/* Feature 4 */}
<div className="flex items-start gap-4">
<div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
<span className="material-symbols-outlined text-[#1b1b1b]" data-icon="star">star</span>
</div>
<div>
<h3 className="font-headline-md text-[16px] font-bold text-[#1b1b1b]">Fasilitas VIP Menyeluruh</h3>
<p className="font-body-md text-[14px] text-[#47464a]">Dapatkan pelayanan khusus dan prioritas maskapai kelas dunia.</p>
</div>
</div>
</div>
</div>
</div>
</section>
</ScrollReveal>
{/* Testimonials Section */}
<ScrollReveal direction="up" delay={0.2}>
<section id="testimoni" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background text-on-surface overflow-hidden">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#D4AF37] mb-6">Apa Kata Mereka</h2>
</div>

<TestimonialSlider />
</div>
</section>
</ScrollReveal>
</main>
{/* Galeri */}
<ScrollReveal direction="up">
<section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background text-on-surface" id="galeri-perjalanan">
<div className="max-w-container-max mx-auto">
{/* Section Header */}
<div className="text-center mb-12 flex flex-col items-center">
<h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-4 relative inline-block">
        Galeri Perjalanan
        <div className="h-px w-3/4 bg-primary-container mx-auto mt-2"></div>
</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
        Momen-momen berharga dari jamaah kami dalam menunaikan ibadah suci di tanah suci.
      </p>
</div>
<div className="w-full">
  <GalleryFilter />
</div>
</div>
</section>
</ScrollReveal>

<ArticleSection />

<footer className="bg-surface-container-lowest text-on-surface w-full py-section-gap border-t border-primary/30 mt-auto">
<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
{/* Column 1: Logo &amp; Bio */}
<div className="flex flex-col gap-4">
<div className="font-display-lg text-headline-md text-primary" style={{"fontSize":"24px","lineHeight":"32px"}}>
                    Talita Umroh
                </div>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xs">
                    Penyedia layanan perjalanan Ibadah Umrah dan Haji Plus terpercaya dengan komitmen melayani sepenuh hati untuk ibadah yang mabrur.
                </p>
</div>
{/* Column 2: Quick Links */}
<div>
<h3 className="font-headline-md text-[20px] mb-6 text-on-surface">Tautan Cepat</h3>
<ul className="flex flex-col gap-3">
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/50 transition-all" href="#paket">Paket Reguler</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/50 transition-all" href="#paket">Paket VIP</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/50 transition-all" href="#">Jadwal Keberangkatan</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/50 transition-all" href="#">Persyaratan Visa</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/50 transition-all" href="#">Pusat Bantuan</a></li>
</ul>
</div>
{/* Column 3: Contact Info */}
<div>
<h3 className="font-headline-md text-[20px] mb-6 text-on-surface">Hubungi Kami</h3>
<ul className="flex flex-col gap-4">
<li className="flex items-start gap-3 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-primary" data-icon="phone_in_talk">phone_in_talk</span>
<a className="font-body-md text-body-md" href="tel:+6281234567890">+62 812 3456 7890</a>
</li>
<li className="flex items-start gap-3 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-primary" data-icon="mail">mail</span>
<a className="font-body-md text-body-md" href="mailto:info@talitaumroh.com">info@talitaumroh.com</a>
</li>
<li className="flex items-start gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-primary mt-1" data-icon="location_on">location_on</span>
<span className="font-body-md text-body-md">Gedung Perkantoran Menara Mulia Lt. 12<br/>Jl. Gatot Subroto Kav. 9-11<br/>Jakarta Selatan 12930</span>
</li>
</ul>
</div>
{/* Column 4: Newsletter */}
<div>
<h3 className="font-headline-md text-[20px] mb-6 text-on-surface">Berlangganan Info</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    Dapatkan info promo dan jadwal keberangkatan terbaru.
                </p>
<form className="flex flex-col gap-3">
<input className="w-full bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-3 focus:ring-1 focus:ring-primary focus:border-primary transition-colors" placeholder="Alamat Email" required type="email"/>
<button className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg hover:bg-primary-fixed-dim transition-all duration-300 gold-glow" type="submit">
                        Berlangganan
                    </button>
</form>
</div>
</div>
<div className="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-outline-variant/30 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
<p className="font-body-md text-body-md text-on-surface-variant">
                © 2024 Talita Umroh. Perjalanan Ibadah yang Amanah dan Terpercaya.
            </p>
<div className="flex gap-4">
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined" data-icon="public">public</span></a>
</div>
</div>
</footer>

    <ChatbotWidget />
    </div>
  );
}
