import React from 'react';
import Lottie from 'lottie-react';
import scanningAnimation from '../assets/scanning-animation.json';
import pulseAnimation from '../assets/pulse-animation.json';

export const ScanningSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="w-48 h-48">
      <Lottie
        animationData={scanningAnimation}
        loop={true}
        className="w-full h-full"
      />
    </div>
    <div className="mt-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Scanning in Progress
      </h3>
      <p className="text-gray-600">
        Discovering subdomains and analyzing security...
      </p>
    </div>
  </div>
);

export const PulseLoader = () => (
  <div className="w-24 h-24">
    <Lottie
      animationData={pulseAnimation}
      loop={true}
      className="w-full h-full"
    />
  </div>
);