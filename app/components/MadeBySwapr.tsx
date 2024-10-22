'use client';

import { useState, useEffect } from 'react';

const cities = ['Stockholm', 'Porto', 'Barcelona'];

export const MadeBySwapr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const TEN_SECONDS_IN_MS = 10000;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cities.length);
    }, TEN_SECONDS_IN_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center border-t border-surface-surface-2 py-5 md:justify-start">
      <div className="flex space-x-2">
        <p className="flex items-center">
          Made with ☕️ in{' '}
          <span className="ml-1 inline-block overflow-hidden">
            <span key={currentIndex} className="animate-city-flip inline-block">
              {cities[currentIndex]}
            </span>
          </span>
        </p>
        <a
          href="https://swapr.eth.limo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1"
        >
          <div>
            <SwaprIcon />
          </div>
          <p className="font-semibold text-text-primary-main">Swapr</p>
        </a>
      </div>
    </div>
  );
};

const SwaprIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <g clipPath="url(#swapr_svg__a)">
      <path fill="#fff" d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0"></path>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M1.73 10.18V8A6.27 6.27 0 0 1 12.387 3.52l-1.333.833A4.756 4.756 0 0 0 3.244 8h1.513zm3.193 1.446A4.756 4.756 0 0 0 12.756 8h-1.514l3.027-2.215V8a6.27 6.27 0 0 1-10.677 4.458zm5.482-1.546h-1.73L8 9.168l-.676.912h-1.73l1.568-2.044-1.567-2.117h1.621L8 6.942l.783-1.023h1.622L8.838 8.036z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <clipPath id="swapr_svg__a">
        <path fill="#000" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
);
