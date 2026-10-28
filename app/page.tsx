import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { About } from '@/components/About';
import { Products } from '@/components/Products';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
