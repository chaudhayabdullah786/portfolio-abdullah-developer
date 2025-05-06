
import React, { useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Teams from '@/components/Teams';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  useEffect(() => {
    // Update page title
    document.title = "Muhammad Abdullah - Full Stack Developer";
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio of Muhammad Abdullah, a Full Stack Developer specializing in web development, app development, UI/UX design, and more.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <Hero />
      <AboutMe />
      <Services />
      <Skills />
      <Projects />
      <Teams />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
