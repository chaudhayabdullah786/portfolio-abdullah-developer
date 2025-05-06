
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<HTMLSpanElement>(null);
  
  const phrases = [
    'Full Stack Developer',
    'Web Developer',
    'App Developer',
    'UI/UX Designer',
    'Data Analyst'
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Typing effect
    if (!isDeleting && displayText !== currentPhrase) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 100);
    } 
    // Deleting effect
    else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1));
      }, 50);
    } 
    // Switch to deleting mode when phrase is complete
    else if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } 
    // Switch to next phrase when deletion is complete
    else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
    }
    
    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, phrases]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl text-portfolio-gray mb-2">Hello, I'm</h3>
            <h1 className="text-4xl md:text-6xl font-bold mb-3 text-portfolio-dark">
              Muhammad Abdullah
            </h1>
            <div className="h-12">
              <h2 className="text-xl md:text-3xl font-semibold text-portfolio-blue inline-flex">
                I'm a <span className="ml-2 relative">
                  <span ref={typingRef} className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-portfolio-blue">
                    {displayText}
                  </span>
                </span>
              </h2>
            </div>
            <p className="text-portfolio-gray mt-6 mb-8 max-w-xl">
              Passionate about creating elegant solutions to complex problems through clean, efficient code and beautiful design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="btn-primary"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-portfolio-blue shadow-xl">
                <img 
                  src="https://i.postimg.cc/bwwdZyx8/Abdullah.jpg" 
                  alt="Muhammad Abdullah" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                <div className="bg-portfolio-blue text-white p-2 rounded-md">
                  <span className="text-xl font-bold">5+</span>
                  <p className="text-xs">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
