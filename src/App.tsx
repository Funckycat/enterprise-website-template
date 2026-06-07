import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import CompanySection from './sections/CompanySection';
import ChairmanSection from './sections/ChairmanSection';
import CarriersSection from './sections/CarriersSection';
import IncubatorsSection from './sections/IncubatorsSection';
import CultureSection from './sections/CultureSection';
import PartnersSection from './sections/PartnersSection';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <CompanySection />
      <ChairmanSection />
      <CarriersSection />
      <IncubatorsSection />
      <CultureSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}

export default App;
