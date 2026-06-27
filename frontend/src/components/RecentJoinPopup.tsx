"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const dummyNotifications = [
  { name: 'Ma***', action: 'telah upgrade Membership', location: 'INDONESIA', time: '9 hari lalu' },
  { name: 'IN*** MU***', action: 'telah bergabung sebagai Member', location: 'KOTA MEDAN', time: '6 hari lalu' },
  { name: 'An***', action: 'berhasil mendaftar Umroh VIP', location: 'JAKARTA', time: '1 jam lalu' },
  { name: 'Fa*** RI***', action: 'telah bergabung sebagai Mitra', location: 'SURABAYA', time: '2 hari lalu' },
  { name: 'De***', action: 'baru saja memesan Umroh Plus Turki', location: 'BANDUNG', time: '30 menit lalu' },
];

export default function RecentJoinPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed) return;

    // Start by showing the first popup after 3 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, [isClosed]);

  useEffect(() => {
    if (isClosed || !isVisible) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isClosed]);

  useEffect(() => {
    if (isClosed) return;
    if (isVisible) return; // Don't change index while visible

    // Wait 4 seconds while hidden, then show next
    const showNextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dummyNotifications.length);
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(showNextTimer);
  }, [isVisible, isClosed]);

  if (isClosed) return null;

  const currentNotif = dummyNotifications[currentIndex];

  return (
    <div 
      className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 transition-all duration-700 ease-in-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' 
          : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-4 pr-10 border border-gray-100 flex items-center gap-4 relative max-w-[320px]">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsClosed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-inner relative">
           <ShieldCheck className="w-6 h-6 text-on-primary" />
           {/* Green dot indicator */}
           <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-primary leading-tight">{currentNotif.name}</span>
            <span className="text-[12px] text-gray-600 leading-tight">{currentNotif.action}</span>
          </div>
          <div className="flex justify-between items-center mt-1 w-full">
            <span className="text-[10px] font-semibold text-blue-800 uppercase tracking-wide">{currentNotif.location}</span>
            <span className="text-[10px] font-bold text-primary">{currentNotif.time}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
