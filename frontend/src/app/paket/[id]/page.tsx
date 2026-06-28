import React from 'react';
import Link from 'next/link';
import { 
  Calendar, MapPin, Plane, Building2, CheckCircle, 
  XCircle, Clock, ChevronLeft, MessageCircle 
} from 'lucide-react';

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Dummy Data for demonstration
  const pkg = {
    id: resolvedParams.id,
    title: "15 JULI 2026 | VIP",
    status: "Tersedia",
    seatsLeft: 14,
    duration: "9 Hari",
    departure: "Soekarno-Hatta (CGK)",
    airline: "Garuda Indonesia",
    price: "IDR 49.650.000,00",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Makkah_-_Kaaba_2.jpg",
    hotels: [
      { city: "Makkah", name: "Jumeirah Jabal Omar", distance: "50m", rating: 5 },
      { city: "Madinah", name: "Peninsula Worth", distance: "100m", rating: 5 }
    ],
    includes: [
      "Tiket Pesawat PP (Direct)", "Visa Umroh", "Hotel Bintang 5", 
      "Makan 3x Sehari (Menu Indonesia)", "Transportasi Bus AC", 
      "Muthawwif Berpengalaman", "Air Zamzam 5 Liter", "Perlengkapan Umroh (Koper, dll)"
    ],
    excludes: [
      "Pembuatan Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi"
    ],
    itinerary: [
      { day: 1, title: "Keberangkatan (Jakarta - Madinah)", desc: "Berkumpul di Bandara Soekarno-Hatta. Penerbangan menuju Madinah. Tiba di Madinah, check-in hotel dan istirahat." },
      { day: 2, title: "Ziarah Raudhah & Makam Rasulullah", desc: "Sholat subuh berjamaah di Masjid Nabawi. Ziarah ke Raudhah, Makam Rasulullah, dan pemakaman Baqi." },
      { day: 3, title: "Ziarah Kota Madinah", desc: "Mengunjungi Masjid Quba, Masjid Qiblatain, Jabal Uhud, dan Kebun Kurma." },
      { day: 4, title: "Perjalanan ke Makkah & Umroh Pertama", desc: "Mengambil miqat di Bir Ali. Perjalanan ke Makkah menggunakan Bus AC. Tiba di Makkah, check-in hotel, lalu melaksanakan ibadah Umroh (Tawaf, Sa'i, Tahallul)." },
      { day: 5, title: "Memperbanyak Ibadah", desc: "Acara bebas. Disarankan memperbanyak ibadah di Masjidil Haram." },
      { day: 6, title: "Ziarah Kota Makkah", desc: "Mengunjungi Jabal Thsur, Padang Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Jabal Nur." },
      { day: 7, title: "Memperbanyak Ibadah", desc: "Acara bebas. Memperbanyak ibadah wajib dan sunnah di Masjidil Haram." },
      { day: 8, title: "Tawaf Wada & Kepulangan", desc: "Melaksanakan Tawaf Wada (Tawaf Perpisahan). Perjalanan menuju bandara Jeddah untuk penerbangan kembali ke tanah air." },
      { day: 9, title: "Tiba di Indonesia", desc: "Tiba di Bandara Soekarno-Hatta. Perjalanan Umroh selesai dengan membawa predikat Mabrur." }
    ]
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-20">
      
      {/* TopNavBar (Simplified for this page) */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center px-margin-desktop h-20 max-w-container-max mx-auto px-margin-mobile">
          <Link href="/" className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-label-md">Kembali ke Beranda</span>
          </Link>
          <div className="ml-auto font-display-lg text-primary text-[20px] tracking-tight">Talita Umroh</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${pkg.coverImage}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30"></div>
        <div className="relative z-10 w-full max-w-container-max mx-auto h-full flex flex-col justify-end px-margin-mobile md:px-margin-desktop pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-on-primary font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase">
              {pkg.status}
            </span>
            <span className="text-primary-fixed bg-primary/10 border border-primary/30 font-bold px-3 py-1 rounded-full text-xs tracking-wider">
              Sisa {pkg.seatsLeft} Seat
            </span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-6xl text-white mb-4 drop-shadow-md">
            {pkg.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-on-surface-variant font-label-md">
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {pkg.duration}</div>
            <div className="flex items-center gap-2"><Plane className="w-5 h-5 text-primary" /> {pkg.airline}</div>
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Keberangkatan {pkg.departure}</div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <main className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column (Content) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          
          {/* Hotel & Fasilitas */}
          <section>
            <h2 className="font-headline-lg text-2xl text-primary-container mb-6 border-b border-primary/20 pb-2">Hotel & Akomodasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pkg.hotels.map((hotel, idx) => (
                <div key={idx} className="bg-surface-container rounded-xl p-6 border border-outline-variant hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-headline-md text-xl text-white">{hotel.city}</h3>
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-body-lg font-bold text-primary-fixed mb-1">{hotel.name}</p>
                  <p className="text-on-surface-variant text-sm">Jarak ke Masjid: {hotel.distance}</p>
                  <div className="flex mt-3 gap-1">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Include / Exclude */}
          <section>
            <h2 className="font-headline-lg text-2xl text-primary-container mb-6 border-b border-primary/20 pb-2">Fasilitas Paket</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low rounded-xl p-6 border border-green-500/20">
                <h3 className="font-headline-md text-lg text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Termasuk (Include)
                </h3>
                <ul className="space-y-3">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-on-surface-variant text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 border border-red-500/20">
                <h3 className="font-headline-md text-lg text-red-400 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Tidak Termasuk (Exclude)
                </h3>
                <ul className="space-y-3">
                  {pkg.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-on-surface-variant text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Itinerary Timeline */}
          <section>
            <h2 className="font-headline-lg text-2xl text-primary-container mb-8 border-b border-primary/20 pb-2">Rencana Perjalanan (Itinerary)</h2>
            <div className="relative border-l border-primary/30 ml-4 md:ml-6 space-y-8 pb-4">
              {pkg.itinerary.map((day, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10">
                  <div className="absolute w-6 h-6 bg-surface-container rounded-full border-2 border-primary -left-[13px] flex items-center justify-center top-0 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    <div className="w-2 h-2 bg-primary-fixed rounded-full"></div>
                  </div>
                  <div className="bg-surface-container rounded-xl p-5 border border-outline-variant hover:border-primary/40 transition-colors">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1 block">Hari {day.day}</span>
                    <h3 className="font-headline-md text-lg text-white mb-2">{day.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant/50 mt-4 italic">*Itinerary dapat berubah sewaktu-waktu menyesuaikan kondisi di lapangan tanpa mengurangi nilai ibadah.</p>
          </section>

        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-28 bg-surface-container rounded-2xl p-6 md:p-8 border border-primary/30 shadow-[0_10px_40px_rgba(212,175,55,0.05)]">
            <h3 className="font-headline-md text-xl text-white mb-2">Ringkasan Harga</h3>
            <p className="text-on-surface-variant text-sm mb-6 pb-6 border-b border-outline-variant">Harga mulai untuk Quad Room (Sekamar Berempat).</p>
            
            <div className="mb-8">
              <span className="text-primary font-display-lg text-4xl block leading-none">{pkg.price}</span>
            </div>

            <a 
              href="https://wa.me/6281234567890?text=Halo%20Talita%20Umroh,%20saya%20tertarik%20dengan%20Paket%2015%20Juli%202026%20VIP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_5px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              KONSULTASI VIA WHATSAPP
            </a>

            <p className="text-xs text-center text-on-surface-variant mt-4">
              Tim kami akan memandu proses pendaftaran dan menjawab pertanyaan Anda.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
}

// Simple star icon since Lucide's Star might need fill props configured differently
function StarIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
