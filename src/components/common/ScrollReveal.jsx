import React from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Aik dafa trigger ho, wapis scroll up par gayab na ho
    threshold: 0.1,    // Jab component 10% nazar aaye tab start ho
  });

  // Directions logic
  const getDirectionClass = () => {
    switch (direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return 'translate-x-16';
      case 'right': return '-translate-x-16';
      default: return 'translate-y-16';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : `opacity-0 ${getDirectionClass()}`
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;