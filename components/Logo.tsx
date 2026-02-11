
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 24 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
      >
        <path 
          d="M12 21L3 17.5V5.5L12 2L21 5.5V17.5L12 21Z" 
          stroke="#d4af37" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M12 6V17" 
          stroke="#d4af37" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        <path 
          d="M7 8.5C7 8.5 8.5 8 12 8C15.5 8 17 8.5 17 8.5" 
          stroke="#d4af37" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        <path 
          d="M7 11.5C7 11.5 8.5 11 12 11C15.5 11 17 11.5 17 11.5" 
          stroke="#d4af37" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.6"
        />
        <path 
          d="M7 14.5C7 14.5 8.5 14 12 14C15.5 14 17 14.5 17 14.5" 
          stroke="#d4af37" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default Logo;
