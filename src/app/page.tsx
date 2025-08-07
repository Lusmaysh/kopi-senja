'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Coffee, Star, Menu, X } from 'lucide-react';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

// ===== Definisi Tipe Data (Interfaces) =====
interface NavLink {
  name: string;
  href: string;
}

interface Product {
  icon: string;
  name: string;
  description: string;
  price: string;
  isBestSeller?: boolean;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

// ===== Data untuk Konten Dinamis (dengan Tipe) =====
const navLinks: NavLink[] = [
  { name: 'Produk', href: '#produk' },
  { name: 'Galeri', href: '#galeri' },
  { name: 'Testimoni', href: '#testimoni' },
];

const products: Product[] = [
  {
    icon: '☕️',
    name: 'Kopi Senja Signature',
    description: 'Perpaduan arabika dan robusta dengan sentuhan rasa karamel yang lembut.',
    price: 'Rp 25.000',
    isBestSeller: true,
  },
  {
    icon: '🧊',
    name: 'Es Kopi Susu Gula Aren',
    description: 'Kopi susu kekinian dengan manis alami dari gula aren pilihan.',
    price: 'Rp 22.000',
  },
  {
    icon: '🌿',
    name: 'Matcha Latte',
    description: 'Bubuk matcha premium dari Jepang yang disajikan hangat atau dingin.',
    price: 'Rp 28.000',
  },
  {
    icon: '🥐',
    name: 'Croissant Cokelat',
    description: 'Pendamping kopi yang sempurna, renyah di luar dan lumer di dalam.',
    price: 'Rp 18.000',
  },
];

const galleryImages: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop', alt: 'Interior kedai kopi yang nyaman' },
  { src: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800&auto=format&fit=crop', alt: 'Secangkir kopi latte art' },
  { src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop', alt: 'Kopi dan croissant' },
  { src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop', alt: 'Barista menyiapkan kopi' },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop', alt: 'Biji kopi pilihan' },
  { src: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800&auto=format&fit=crop', alt: 'Interior kedai yang nyaman' },
];

const testimonials: Testimonial[] = [
  {
    quote: 'Tempatnya super nyaman buat nugas! Kopinya juga enak banget, Kopi Senja Signature jadi favoritku. Pasti balik lagi!',
    name: 'Aulia Putri',
    title: 'Mahasiswa',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote: 'Suka banget sama suasananya yang tenang dan inspiratif. Cocok buat cari ide sambil ngopi. Pelayanannya juga ramah.',
    name: 'Bagus Wijaya',
    title: 'Pekerja Lepas',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    quote: 'Lokasinya strategis dan jam bukanya pas buat ngopi sore setelah pulang kerja. Es Kopi Susunya juara!',
    name: 'Rina Hartono',
    title: 'Karyawan Swasta',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
];

// ===== Komponen untuk Animasi Scroll (dengan Tipe) =====
function FadeIn({ children }: { children: ReactNode }) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
}


// ===== Komponen Utama Halaman (dengan Tipe) =====
export default function LandingPage(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [featuredImage, setFeaturedImage] = useState<GalleryImage>(galleryImages[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Setel gambar unggulan awal di sisi klien untuk mencegah masalah hidrasi.
    if (galleryImages.length > 0) {
      setFeaturedImage(galleryImages[0]);
    }
  }, []); // Array 

  const handleImageSelect = (image: GalleryImage) => {
    if (featuredImage?.src !== image.src) {
      setIsLoading(true);
      setFeaturedImage(image);
    }
  };

  return (
    <div className="bg-cream-100 font-sans">
      {/* ===== Navbar ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream-100/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-espresso-900 flex items-center gap-2">
            <Coffee className="w-7 h-7 text-golden-hour-600" />
            Kopi Senja
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-espresso-700 hover:text-golden-hour-600 transition-colors duration-300">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link href="https://wa.me/6285225059731" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-md">
              Pesan Sekarang
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-espresso-800 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
            <div className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg text-slate-700 hover:text-orange-600 transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link href="https://wa.me/6285225059731" target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-900 transition-transform duration-300 transform hover:scale-105 shadow-md mt-4">
                Pesan Sekarang
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="pt-15">
        {/* ===== Hero Section ===== */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-orange-100 via-amber-50 to-white">
          <div className="relative z-10">
            <FadeIn>
              <div className="inline-block mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                ✨ Buka Setiap Hari!
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 via-amber-700 to-orange-800 bg-clip-text text-transparent block">Cari Kopi Terbaik?</span>
                <span className="text-gray-900 block mt-2">di SENJA aja!</span>
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-lg sm:text-xl text-gray-600">
                Temukan ketenangan di setiap cangkir. Kami menyajikan biji kopi pilihan dengan suasana <span className="font-bold text-orange-600">hangat dan nyaman</span> untuk menemani senja Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#produk" className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  Lihat Menu Kami
                </Link>
                <Link href="#galeri" className="w-full sm:w-auto bg-white text-orange-600 border-2 border-orange-600 font-semibold py-3 px-8 rounded-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300">
                  Intip Suasana
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== Products Section ===== */}
        <section id="produk" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Koleksi Terlaris Kami</h2>
                <p className="text-slate-600 mt-2">Cicipi racikan terbaik yang menjadi favorit pelanggan kami.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product.name} className="bg-slate-50 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ring-2 ring-orange-500">
                    {product.isBestSeller && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                        BEST SELLER
                      </div>
                    )}
                    <div className="text-5xl my-4">{product.icon}</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                    <p className="text-slate-600 mb-4 text-sm">{product.description}</p>
                    <p className="text-lg font-semibold text-orange-700">{product.price}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== Gallery Section ===== */}
        <section id="galeri" className="py-20 bg-slate-100">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Momen di Kopi Senja</h2>
                <p className="text-slate-600 mt-2">Setiap sudut bercerita, setiap cangkir membawa kehangatan.</p>
              </div>
              
              {/* Featured Image */}
              <div className="mb-4 overflow-hidden rounded-xl shadow-2xl aspect-video bg-slate-200 relative">
                {isLoading && (
                  <div className="absolute inset-0 w-full h-full bg-slate-200 animate-pulse z-10"></div>
                )}
                {featuredImage && (
                  <Image
                    key={featuredImage.src}
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    width={1200}
                    height={800}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="cursor-pointer overflow-hidden rounded-lg aspect-square"
                    onClick={() => handleImageSelect(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={200}
                      height={200}
                      className={`w-full h-full object-cover transition-all duration-300 transform hover:scale-110 ${featuredImage?.src === image.src ? 'ring-4 ring-orange-500' : 'opacity-70 hover:opacity-100'}`}
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== Testimonials Section ===== */}
        <section id="testimoni" className="py-24 px-4 bg-gradient-to-br from-white to-orange-50">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Apa Kata <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Pelanggan Setia</span> Kami?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Kepuasan Anda adalah kebahagiaan kami.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
                    </div>
                    <p className="italic text-gray-700 mb-6">“{testimonial.quote}”</p>
                    <div className="flex items-center gap-4">
                      <Image className="w-12 h-12 rounded-full object-cover" src={testimonial.avatar} width={48} height={48} alt={testimonial.name} />
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-orange-700 font-medium">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Kopi Senja</h3>
              <p className="text-slate-400">Menyajikan biji kopi pilihan dengan suasana hangat dan nyaman untuk menemani senja Anda.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Kontak & Lokasi</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="https://wa.me/6285225059731" className="hover:text-white transition-colors">WhatsApp: +62 852-2505-9731</a></li>
                <li><a href="mailto:info@kopisenja.com" className="hover:text-white transition-colors">Email: info@kopisenja.com</a></li>
                <li>Jl. Merdeka No. 12, Pekalongan</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Jam Operasional</h3>
              <ul className="space-y-2 text-slate-300">
                <li>Senin - Jumat: 09:00 - 22:00</li>
                <li>Sabtu - Minggu: 08:00 - 23:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Kopi Senja. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}