"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Pelayanan sangat profesional. Hotel di Makkah sangat dekat dengan Masjidil Haram. Terima kasih Talita Umroh.",
    initial: "A",
    name: "Bpk. H. Ahmad Fauzi",
    role: "Jamaah Paket VIP 2024"
  },
  {
    text: "Pembimbing ibadahnya sangat sabar dan detail menjelaskan setiap rukun umroh. Sangat merekomendasikan paket VIP.",
    initial: "S",
    name: "Ibu Hj. Siti Aminah",
    role: "Jamaah Paket Reguler 2024"
  },
  {
    text: "Alhamdulillah perjalanan lancar dari berangkat sampai pulang. Makanan selera nusantara tersedia setiap hari.",
    initial: "B",
    name: "Bpk. H. Budi Santoso",
    role: "Jamaah Paket Reguler 2024"
  },
  {
    text: "Pelayanan yang sangat amanah. Fasilitas yang dijanjikan 100% terbukti nyata, membuat keluarga kami bisa fokus beribadah dengan tenang.",
    initial: "R",
    name: "Ibu Hj. Rina Marlina",
    role: "Jamaah Paket VIP 2023"
  },
  {
    text: "Tim handling bandara sangat sigap. Kami tidak perlu repot urus bagasi sama sekali. Luar biasa Talita Umroh!",
    initial: "H",
    name: "Bpk. H. Hendra Wijaya",
    role: "Jamaah Haji Plus 2023"
  },
  {
    text: "Kajian-kajian selama di Madinah sangat menambah ilmu. Perjalanan spiritual yang sangat membekas di hati.",
    initial: "D",
    name: "Dewi Lestari",
    role: "Jamaah Umrah 2024"
  }
];

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    if (containerRef.current) {
      // Calculate the width of the first original set of items
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (contentWidth > 0) {
      controls.start({
        x: -contentWidth,
        transition: {
          duration: 30, // Adjust speed here
          ease: "linear",
          repeat: Infinity,
        }
      });
    }
  }, [contentWidth, controls]);

  // Duplicate items to create a seamless infinite loop
  const displayItems = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden relative w-full py-8 group">
      {/* Gradient masks for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <motion.div 
        ref={containerRef}
        className="flex gap-gutter w-max"
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() => {
          controls.start({
            x: -contentWidth,
            transition: {
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }
          });
        }}
      >
        {displayItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-surface-container rounded-xl p-6 border border-[#D4AF37]/20 flex flex-col gap-4 w-[320px] md:w-[400px] shrink-0 transform transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] cursor-pointer"
          >
            <div className="flex gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="font-body-md text-on-surface-variant flex-1 italic">
              "{item.text}"
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center text-[#D4AF37] font-headline-md shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {item.initial}
              </div>
              <div>
                <h3 className="font-headline-md text-[16px] text-white">{item.name}</h3>
                <p className="font-label-sm text-on-surface-variant">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
