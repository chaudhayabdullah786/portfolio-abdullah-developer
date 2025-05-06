
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Set active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'teams', label: 'Teams' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-portfolio-blue flex items-center">
          <span className="mr-2">&lt;</span>
          <span>Abdullah</span>
          <span className="ml-2">/&gt;</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map(item => (
            <button
              key={item.id}
              className={cn('nav-link', activeSection === item.id && 'active')}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <Button 
            className="ml-6 bg-portfolio-blue hover:bg-blue-700"
            onClick={() => {
              const resumeLink = document.getElementById('resume-download');
              if (resumeLink) {
                resumeLink.click();
              }
            }}
          >
            Resume
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-portfolio-dark p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        'fixed top-[60px] left-0 w-full bg-white shadow-lg md:hidden transform transition-transform duration-300 ease-in-out',
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      )}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                className={cn('text-left py-2 px-4 rounded-md transition-colors', 
                  activeSection === item.id ? 'bg-secondary text-portfolio-blue font-medium' : 'text-portfolio-gray'
                )}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="mt-4 w-full bg-portfolio-blue hover:bg-blue-700"
              onClick={() => {
                setMobileMenuOpen(false);
                const resumeLink = document.getElementById('resume-download');
                if (resumeLink) {
                  resumeLink.click();
                }
              }}
            >
              Download Resume
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
