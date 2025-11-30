
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-hamoude-primary mb-12 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-hamoude-accent after:rounded">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
