
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import EmailSignup from "@/components/EmailSignup";
import { cn } from "@/lib/utils";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);
  
  // Create stars randomly on the page
  useEffect(() => {
    if (!starsRef.current) return;
    
    const container = starsRef.current;
    container.innerHTML = '';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starCount = Math.floor((width * height) / 5000); // Adjust density
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      star.style.animationDelay = `${Math.random() * 10}s`;
      
      star.className = 'absolute rounded-full bg-white animate-pulse';
      container.appendChild(star);
    }
    
    // Trigger animation after a short delay
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-dark-purple to-dark">
      {/* Stars background */}
      <div ref={starsRef} className="absolute inset-0 z-0"></div>
      
      {/* Content container */}
      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center min-h-screen py-20">
        <div className={cn(
          "max-w-4xl mx-auto text-center transform transition-all duration-1000",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          {/* Label */}
          <div className="inline-block mb-6 glass-card px-4 py-1.5 rounded-full">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-light-purple">Coming Soon</span>
          </div>
          
          {/* Title */}
          <h1 className={cn(
            "mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight glow-text text-gradient",
            "transition-all duration-1000 delay-100",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            Under Development
          </h1>
          
          {/* Description */}
          <p className={cn(
            "mb-10 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto",
            "transition-all duration-1000 delay-200",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            My portfolio website is currently under construction. I'm working on something amazing for you.
          </p>
          
          {/* Avatar */}
          <div className={cn(
            "mb-10 transition-all duration-1000 delay-300",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <Avatar />
          </div>
          
          {/* Email signup */}
          <div className={cn(
            "transition-all duration-1000 delay-400",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <EmailSignup />
          </div>
        </div>
        
        {/* Footer */}
        <div className={cn(
          "absolute bottom-4 w-full text-center text-xs text-foreground/50",
          "transition-all duration-1000 delay-500",
          loaded ? "opacity-100" : "opacity-0"
        )}>
          &copy; {new Date().getFullYear()} • Coming Soon
        </div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent z-0"></div>
      <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] bg-purplish-blue/10 rounded-full blur-[120px] z-0"></div>
      <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] bg-glow-purple/10 rounded-full blur-[120px] z-0"></div>
    </div>
  );
};

export default Index;
