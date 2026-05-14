'use client';

import Blog from '@/components/sections/Blog';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Blog />
      </main>
      <Footer />
    </>
  );
}
