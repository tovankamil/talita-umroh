import React from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { Calendar, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Panduan Lengkap Syarat Keberangkatan Umroh Sesuai Aturan Kemenag 2026',
    excerpt: 'Kementerian Agama (Kemenag) RI kembali memperbarui regulasi syarat keberangkatan umroh tahun ini demi keamanan dan kenyamanan jamaah. Simak panduan lengkapnya di sini.',
    category: 'Info Kemenag',
    date: '12 Jun 2026',
    author: 'Admin Talita',
    image: '/images/hero-makkah.png',
    delay: 0.1
  },
  {
    id: 2,
    title: '5 Persiapan Fisik & Mental Sebelum Menginjakkan Kaki di Tanah Suci',
    excerpt: 'Ibadah umroh membutuhkan kesiapan fisik yang prima. Berikut adalah tips jitu melatih kebugaran tubuh dan kesiapan mental sebelum Anda berangkat ke Baitullah.',
    category: 'Tips Umroh',
    date: '08 Jun 2026',
    author: 'Ustadz Ahmad',
    image: '/images/gallery_turki.png',
    delay: 0.2
  },
  {
    id: 3,
    title: 'Mengenal Lebih Dekat Sejarah Singkat Perluasan Masjid Nabawi',
    excerpt: 'Masjid Nabawi adalah jantung spiritual kota Madinah. Mari selami sejarah pembangunannya sejak zaman Rasulullah SAW hingga perluasan megah di era modern.',
    category: 'Sejarah Islam',
    date: '01 Jun 2026',
    author: 'Redaksi',
    image: '/images/hero-madinah.png',
    delay: 0.3
  }
];

export default function ArticleSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low text-on-surface" id="artikel">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-4 relative inline-block">
              Artikel & Berita Terbaru
              <div className="h-px w-3/4 bg-primary-container mx-auto mt-2"></div>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
              Dapatkan informasi terkini seputar panduan ibadah umroh, regulasi resmi Kemenag, serta tips bermanfaat untuk perjalanan suci Anda.
            </p>
          </div>
        </ScrollReveal>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ScrollReveal key={article.id} direction="up" delay={article.delay}>
              <article className="bg-surface-container rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-500">
                
                {/* Image Box */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {article.category}
                  </div>
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fill sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-80"></div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col flex-grow relative z-10 -mt-8 bg-surface-container rounded-t-3xl">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {article.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> {article.author}</span>
                  </div>
                  
                  {/* Title & Excerpt */}
                  <h3 className="font-headline-md text-lg font-bold text-primary-container mb-3 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto">
                    <Link href={`/artikel/${article.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-md transition-colors group/link">
                      Baca Selengkapnya
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-12 text-center">
            <button className="px-8 py-3 rounded-lg border border-primary-container text-primary-container font-label-md hover:bg-primary-container hover:text-on-primary transition-all duration-300">
              Lihat Semua Artikel
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
