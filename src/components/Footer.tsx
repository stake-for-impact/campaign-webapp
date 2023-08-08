import React from 'react';
import Link from 'next/link'
import '../input.css'; // You can create a separate CSS file for styling if needed

const Footer = () => {
    return (
      <div className="relative z-30 w-screen px-3 pt-4 pb-5 sm:pl-5 sm:pr-6 bg-blue-700 mb-4 items-center">
        <div className="flex items-center text-white text-bold">
          Powered by <Link href="https://stakeforimpact.xyz">Stake for Impact</Link>
        </div>
      </div>
    );
  };

export default Footer;