import React from 'react';
import { ConnectButton } from '../components/ConnectButton'
import Link from 'next/link'
import '../input.css'; // You can create a separate CSS file for styling if needed

const Header: React.FC = () => {
  return (
    <header className="relative z-30 w-screen px-3 pt-4 pb-5 sm:pl-5 sm:pr-6 bg-blue-700 mb-4">
      <div className="flex items-center justify-between text-white text-bold">
        <Link href="/">STAKEFORUKRAINE</Link>
        <ConnectButton />
      </div>

    </header>
  );
};

export default Header;