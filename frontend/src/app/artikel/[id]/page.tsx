import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ChevronLeft, Share2, Link as LinkIcon, MessageCircle } from 'lucide-react';
import WeatherClockBar from "@/components/WeatherClockBar";

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Dummy article data
  const article = {
    id: resolvedParams.id,
    title: 'Panduan Lengkap Syarat Keberangkatan Umroh Sesuai Aturan Kemenag 2026',
    category: 'Info Kemenag',
    date: '12 Jun 2026',
    author: 'Admin Talita',
    image: '/images/hero-makkah.png',
    content: `
      <p>Ibadah umroh adalah impian bagi setiap umat muslim. Namun, sebelum berangkat ke Tanah Suci, ada beberapa persyaratan administratif dan kesehatan yang wajib dipenuhi sesuai dengan regulasi terbaru dari Kementerian Agama (Kemenag) Republik Indonesia tahun 2026.</p>
      
      <h2>1. Dokumen Identitas Pribadi</h2>
      <p>Calon jamaah wajib memiliki paspor yang masih berlaku minimal 8 bulan sebelum jadwal keberangkatan. Pastikan nama di paspor terdiri dari minimal dua suku kata, sesuai dengan aturan imigrasi pemerintah Arab Saudi.</p>
      
      <h2>2. Rekam Medis & Vaksinasi</h2>
      <p>Berdasarkan edaran Kemenag terbaru, jamaah diwajibkan telah menerima vaksin meningitis (buku kuning) maksimal 14 hari sebelum keberangkatan. Vaksinasi COVID-19 booster juga masih dianjurkan meskipun sifatnya sudah tidak seketat tahun-tahun sebelumnya.</p>
      
      <blockquote>
        "Kesehatan dan keselamatan jamaah adalah prioritas utama. Pastikan seluruh dokumen medis dipersiapkan jauh-jauh hari agar fokus ibadah tidak terganggu oleh urusan administratif." - Juru Bicara Kemenag.
      </blockquote>
      
      <h2>3. Verifikasi Biometrik (Saudi Visa Bio)</h2>
      <p>Untuk mempercepat proses imigrasi di bandara Jeddah/Madinah, jamaah umroh dari Indonesia kini diwajibkan melakukan perekaman biometrik (sidik jari dan wajah) secara mandiri melalui aplikasi <strong>Saudi Visa Bio</strong> di smartphone masing-masing. Pastikan Anda melakukan ini sebelum proses cetak visa selesai.</p>

      <h2>Kesimpulan</h2>
      <p>Persiapan yang matang dari segi kelengkapan dokumen akan membuat perjalanan ibadah umroh Anda menjadi lebih tenang, nyaman, dan khusyuk. Tim Talita Umroh VIP selalu siap membantu proses pemberkasan Anda dari awal hingga akhir, memastikan 100% kepastian berangkat.</p>
    `
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-[112px]">
      
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(212,175,55,0.05)]">
        <WeatherClockBar />
        <div className="flex items-center px-margin-desktop h-20 max-w-container-max mx-auto px-margin-mobile">
          <Link href="/" className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-label-md">Kembali ke Beranda</span>
          </Link>
          <div className="ml-auto font-display-lg text-primary text-[20px] tracking-tight">Talita Umroh</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto px-margin-mobile md:px-0 py-12">
        {/* Article Header */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
            {article.category}
          </div>
          <h1 className="font-headline-lg text-3xl md:text-5xl font-bold text-primary-container leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-sm text-on-surface-variant">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {article.date}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {article.author}</span>
          </div>
        </div>

        {/* Article Image */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg relative">
          <Image 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          fill />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-lg prose-invert max-w-none 
          prose-headings:text-primary-container prose-headings:font-headline-md
          prose-p:text-on-surface-variant prose-p:leading-relaxed
          prose-a:text-primary hover:prose-a:text-primary-fixed
          prose-strong:text-on-surface prose-strong:font-bold
          prose-blockquote:border-l-primary prose-blockquote:bg-surface-container-low prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:text-on-surface prose-blockquote:italic
          mb-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share Section */}
        <div className="border-t border-outline-variant/30 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
            <Share2 className="w-5 h-5 text-primary" />
            <span>Bagikan Artikel Ini:</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors shadow-sm">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors shadow-sm">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-surface-container-lowest text-on-surface w-full py-12 border-t border-primary/30 mt-auto">
        <div className="text-center px-margin-mobile">
          <div className="font-display-lg text-primary text-2xl mb-4">Talita Umroh</div>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6">
            Penyedia layanan perjalanan Ibadah Umrah dan Haji Plus terpercaya dengan komitmen melayani sepenuh hati untuk ibadah yang mabrur.
          </p>
          <div className="text-xs text-on-surface-variant/60">
            &copy; {new Date().getFullYear()} Talita Umroh. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
