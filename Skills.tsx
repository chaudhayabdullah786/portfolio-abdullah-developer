
import React, { useEffect, useRef } from 'react';

const skillsData = [
  { name: 'HTML', percentage: 90 },
  { name: 'CSS', percentage: 90 },
  { name: 'JavaScript', percentage: 85 },
  { name: 'PHP', percentage: 95 },
  { name: 'MySQL', percentage: 80 },
  { name: 'Networking', percentage: 96 },
  { name: 'React', percentage: 88 },
  { name: 'Flutter', percentage: 85 }
];

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-value');
            progressBars.forEach((bar, index) => {
              const elem = bar as HTMLElement;
              const percentage = skillsData[index].percentage;
              elem.style.setProperty('--progress-width', `${percentage}%`);
              setTimeout(() => {
                elem.classList.add('animate-progress');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">My Skills</h2>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6" ref={skillsRef}>
          {skillsData.map((skill, index) => (
            <div key={index} className="mb-6 reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-portfolio-blue font-medium">{skill.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-value" style={{ width: '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
