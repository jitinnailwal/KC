'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contact from '@/components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </>
  );
}
