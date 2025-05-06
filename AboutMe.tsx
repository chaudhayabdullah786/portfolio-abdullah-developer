
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutMe = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-12 mt-16">
          <div className="w-full md:w-5/12 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="Muhammad Abdullah - Professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {!isMobile && (
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-md text-center">
                      <span className="text-2xl font-bold text-portfolio-blue">50+</span>
                      <p className="text-xs text-portfolio-gray mt-1">Projects</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-md text-center">
                      <span className="text-2xl font-bold text-portfolio-purple">30+</span>
                      <p className="text-xs text-portfolio-gray mt-1">Clients</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-7/12 reveal">
            <h3 className="text-2xl font-bold text-portfolio-dark mb-4">Full Stack Developer & UI/UX Designer</h3>
            
            <p className="text-portfolio-gray mb-6">
              I'm Muhammad Abdullah, a passionate Full Stack Developer with over 5 years of experience in designing and developing robust web and mobile applications. With a strong foundation in both frontend and backend technologies, I specialize in creating seamless, user-centric solutions that drive business growth.
            </p>
            
            <p className="text-portfolio-gray mb-6">
              My journey in software development began with a fascination for turning ideas into functional, elegant solutions. Today, I leverage my expertise in multiple programming languages and frameworks to build scalable applications that meet and exceed client expectations.
            </p>

            <div className="grid grid-cols-2 gap-6 my-8">
              <div>
                <h4 className="font-semibold mb-3">Name:</h4>
                <p className="text-portfolio-gray">Muhammad Abdullah</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Email:</h4>
                <p className="text-portfolio-gray">chaudhayabdulah786@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Location:</h4>
                <p className="text-portfolio-gray">Gujranwala, Pakistan</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Availability:</h4>
                <p className="text-portfolio-gray">Available for freelance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
             <a 
                    href="https://i.postimg.cc/xCRJqtsp/Muhammad-Abdullah-resume.png" 
                          download 
                           target="_blank" 
                             rel="noopener noreferrer"
              >
                <Button className="btn-primary">
                  Download Resume
                </Button>
              </a>

              <Button 
                variant="outline" 
                className="btn-outline"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
