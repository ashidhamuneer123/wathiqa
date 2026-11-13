import Navbar from "@/components/Navbar";
import { Hero, Authorities, Services, About, HowItWorks, Stats, Why, CtaBanner, Contact, Footer, WhatsAppFloat } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Authorities />
        <Services />
        <About />
        <HowItWorks />
        <Stats />
        <Why />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
