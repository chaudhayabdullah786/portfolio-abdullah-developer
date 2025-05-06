
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Layout, Database, Image } from 'lucide-react';

const servicesData = [
  {
    icon: <Code size={40} className="text-portfolio-blue" />,
    title: 'Web Development',
    description: 'Creating responsive, high-performance websites and web applications using modern technologies like React, Angular, and Node.js.'
  },
  {
    icon: <Smartphone size={40} className="text-portfolio-blue" />,
    title: 'App Development',
    description: 'Building native and cross-platform mobile applications for iOS and Android using Flutter, React Native, and native technologies.'
  },
  {
    icon: <Layout size={40} className="text-portfolio-blue" />,
    title: 'UI/UX Design',
    description: 'Designing intuitive and engaging user interfaces with a focus on exceptional user experience and accessibility.'
  },
  {
    icon: <Database size={40} className="text-portfolio-blue" />,
    title: 'Data Analytics',
    description: 'Transforming raw data into actionable insights using advanced analytics tools and visualization techniques.'
  },
  {
    icon: <Image size={40} className="text-portfolio-blue" />,
    title: 'UI/UX Design',
    description: 'Creating beautiful, functional designs that enhance user experience and drive engagement.'
  },
  {
    icon: <Code size={40} className="text-portfolio-blue" />,
    title: 'Networking',
    description: 'Setting up and managing secure, efficient network infrastructures for businesses of all sizes.'
  }
];

const Services = () => {
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
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">My Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {servicesData.map((service, index) => (
            <div className="reveal" style={{ animationDelay: `${index * 0.1}s` }} key={index}>
              <Card className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg border-none">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-blue-50 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-portfolio-gray">{service.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
