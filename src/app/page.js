import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import QuickServices from '@/components/QuickServices';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Header />
      <HeroCarousel />
      <QuickServices />
    </main>
  );
}