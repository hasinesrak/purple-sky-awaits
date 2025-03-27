
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Avatar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position (limited range)
      const maxRotation = 5;
      const rotateX = Math.min(Math.max(-(y / 50), -maxRotation), maxRotation);
      const rotateY = Math.min(Math.max((x / 50), -maxRotation), maxRotation);
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative transition-all duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-being-sucked">
        {/* Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))" }}
          >
            {/* Head */}
            <circle cx="100" cy="85" r="55" fill="#6366F1" />
            
            {/* Face */}
            <circle cx="100" cy="85" r="52" fill="#121212" />
            
            {/* Eyes */}
            <ellipse cx="80" cy="78" rx="8" ry="10" fill="#A5B4FC" className="animate-pulse" />
            <ellipse cx="120" cy="78" rx="8" ry="10" fill="#A5B4FC" className="animate-pulse" />
            
            {/* Smile */}
            <path d="M80 100 Q100 120 120 100" stroke="#A5B4FC" strokeWidth="4" fill="none" />
            
            {/* Body */}
            <rect x="70" y="138" width="60" height="40" rx="5" fill="#6366F1" />
            
            {/* Neck */}
            <rect x="90" y="130" width="20" height="15" fill="#6366F1" />
            
            {/* Arms */}
            <rect x="130" y="138" width="45" height="15" rx="5" fill="#6366F1" />
            <rect x="25" y="138" width="45" height="15" rx="5" fill="#6366F1" />
          </svg>
        </div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-radial from-glow-purple/20 to-transparent rounded-full blur-xl opacity-70"></div>
      </div>
    </div>
  );
};

export default Avatar;
