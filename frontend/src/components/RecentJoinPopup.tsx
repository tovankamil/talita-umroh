"use client";

import React, { useState, useEffect } from 'react';
import { Star, X, MapPin, Clock } from 'lucide-react';

const dummyNotifications = [
  { name: 'Bpk. Mahmud', action: 'Baru saja memesan Paket Umroh VIP', location: 'Jakarta', time: '5 menit lalu', rating: 5 },
  { name: 'Ibu Siti Khadijah', action: 'Telah bergabung sebagai Mitra Talita', location: 'Medan', time: '12 menit lalu', rating: 5 },
  { name: 'Keluarga Anwar', action: 'Berhasil mendaftar Umroh Plus Turki', location: 'Surabaya', time: '1 jam lalu', rating: 5 },
  { name: 'Bpk. Ridwan', action: 'Telah melunasi Paket Ramadhan', location: 'Bandung', time: '2 jam lalu', rating: 5 },
  { name: 'Ibu Fatimah', action: 'Baru saja memberikan ulasan Bintang 5', location: 'Makassar', time: 'Hari ini', rating: 5 },
];

export default function RecentJoinPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed) return;
    const initialDelay = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(initialDelay);
  }, [isClosed]);

  useEffect(() => {
    if (isClosed || !isVisible) return;
    const hideTimer = setTimeout(() => setIsVisible(false), 5500);
    return () => clearTimeout(hideTimer);
  }, [isVisible, isClosed]);

  useEffect(() => {
    if (isClosed) return;
    if (isVisible) return; 
    const showNextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dummyNotifications.length);
      setIsVisible(true);
    }, 4500);
    return () => clearTimeout(showNextTimer);
  }, [isVisible, isClosed]);

  if (isClosed) return null;

  const currentNotif = dummyNotifications[currentIndex];

  return (
    <div 
      className={`fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      {/* Glow Effect Behind */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-container/30 rounded-2xl blur-lg opacity-70 animate-pulse"></div>
      
      {/* Main Card - Dark Glassmorphism */}
      <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-2xl p-5 border border-primary/20 shadow-2xl flex flex-col gap-3 max-w-[340px] overflow-hidden group">
        
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={() => setIsClosed(true)}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-primary transition-colors bg-surface/50 rounded-full p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Top Header - Rating & Time */}
        <div className="flex justify-between items-center pr-6">
          <div className="flex gap-0.5">
            {[...Array(currentNotif.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant/80 text-[11px] font-medium">
            <Clock className="w-3 h-3" />
            {currentNotif.time}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-1">
          <h4 className="font-display-lg text-primary text-lg tracking-wide leading-tight">
            {currentNotif.name}
          </h4>
          <p className="text-on-surface text-sm font-light leading-snug">
            {currentNotif.action}
          </p>
        </div>

        {/* Bottom Footer - Location */}
        <div className="mt-1 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {currentNotif.location}
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>

      </div>
    </div>
  );
}
