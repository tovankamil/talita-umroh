"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

const dummyImages = [
  { id: 1, url: '/images/hero-makkah.png', alt: 'Makkah Kaaba', tahun: '2024', kategori: 'Umroh VIP', destinasi: 'Mekkah' },
  { id: 2, url: '/images/hero-madinah.png', alt: 'Masjid Nabawi', tahun: '2024', kategori: 'Umroh VIP', destinasi: 'Madinah' },
  { id: 3, url: '/images/gallery_turki.png', alt: 'Hagia Sophia Turki', tahun: '2023', kategori: 'Umroh Plus', destinasi: 'Turki' },
  { id: 4, url: '/images/hero-umroh.png', alt: 'Al-Ula Saudi', tahun: '2024', kategori: 'Umroh Plus', destinasi: 'Al-Ula' },
  { id: 5, url: '/images/gallery_dubai.png', alt: 'Dubai Skyline', tahun: '2022', kategori: 'Umroh Plus', destinasi: 'Dubai' },
  { id: 6, url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg', alt: 'Pyramids Egypt', tahun: '2023', kategori: 'Umroh Plus', destinasi: 'Mesir' },
  { id: 7, url: '/images/gallery_aqsa.png', alt: 'Al-Aqsa Mosque', tahun: '2024', kategori: 'Umroh Plus', destinasi: 'Aqsa' },
  { id: 8, url: '/images/hero-makkah.png', alt: 'Makkah Night View', tahun: '2023', kategori: 'Umroh VIP', destinasi: 'Mekkah' },
  { id: 9, url: '/images/hero-madinah.png', alt: 'Madinah Sunrise', tahun: '2022', kategori: 'Umroh VIP', destinasi: 'Madinah' },
  { id: 10, url: '/images/hero-umroh.png', alt: 'Luxury Islamic Interior', tahun: '2024', kategori: 'Umroh VIP', destinasi: 'Mekkah' },
  { id: 11, url: '/images/hero-makkah.png', alt: 'Mecca City Overview', tahun: '2022', kategori: 'Umroh VIP', destinasi: 'Mekkah' },
  { id: 12, url: '/images/hero-madinah.png', alt: 'Masjid Nabawi Courtyard', tahun: '2023', kategori: 'Umroh VIP', destinasi: 'Madinah' }
];

export default function GalleryFilter() {
  const [activeTahun, setActiveTahun] = useState('Semua');
  const [activeKategori, setActiveKategori] = useState('Semua');
  const [activeDestinasi, setActiveDestinasi] = useState('Semua');

  const filteredImages = useMemo(() => {
    return dummyImages.filter((img) => {
      const matchTahun = activeTahun === 'Semua' || img.tahun === activeTahun;
      const matchKategori = activeKategori === 'Semua' || img.kategori === activeKategori;
      const matchDestinasi = activeDestinasi === 'Semua' || img.destinasi === activeDestinasi;
      return matchTahun && matchKategori && matchDestinasi;
    });
  }, [activeTahun, activeKategori, activeDestinasi]);

  const activeBtnClass = "cursor-pointer px-6 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md transition-all duration-300 transform scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]";
  const inactiveBtnClass = "cursor-pointer px-6 py-2 rounded-lg border border-primary-container/30 text-primary-container font-label-md text-label-md hover:bg-primary/10 transition-all duration-300";

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Filter Tahun */}
        <div>
          <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Filter Tahun</h3>
          <div className="flex flex-wrap gap-2">
            {['Semua', '2024', '2023', '2022'].map((tahun) => (
              <button 
                key={tahun}
                onClick={() => setActiveTahun(tahun)}
                className={activeTahun === tahun ? activeBtnClass : inactiveBtnClass}
              >
                {tahun}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Kategori */}
        <div>
          <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Filter Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Umroh VIP', 'Umroh Plus'].map((kategori) => (
              <button 
                key={kategori}
                onClick={() => setActiveKategori(kategori)}
                className={activeKategori === kategori ? activeBtnClass : inactiveBtnClass}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Destinasi */}
        <div>
          <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Filter Destinasi</h3>
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Mekkah', 'Madinah', 'Turki', 'Al-Ula', 'Dubai', 'Mesir', 'Aqsa'].map((destinasi) => (
              <button 
                key={destinasi}
                onClick={() => setActiveDestinasi(destinasi)}
                className={activeDestinasi === destinasi ? activeBtnClass : inactiveBtnClass}
              >
                {destinasi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 min-h-[300px]">
          {filteredImages.map((img) => (
            <div key={img.id} className="aspect-[4/3] rounded-xl overflow-hidden group relative shadow-lg border border-outline-variant/30 bg-surface-container">
              {/* Overlay with Meta Info */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-primary font-bold text-sm tracking-wider">{img.destinasi}</span>
                <span className="text-white text-xs">{img.tahun} - {img.kategori}</span>
              </div>
              <img 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                src={img.url}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-surface-container rounded-2xl border border-outline-variant border-dashed">
          <p className="text-on-surface-variant font-body-lg mb-2">Tidak ada gambar yang ditemukan untuk filter ini.</p>
          <button 
            onClick={() => { setActiveTahun('Semua'); setActiveKategori('Semua'); setActiveDestinasi('Semua'); }}
            className="text-primary hover:underline font-label-md"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* CTA Button */}
      {filteredImages.length > 0 && (
        <div className="flex justify-center">
          <button className="bg-primary-container text-on-primary font-label-md text-label-md py-3 px-10 rounded-lg hover:bg-primary-fixed-dim transition-all duration-300 gold-glow">
            Lihat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}
