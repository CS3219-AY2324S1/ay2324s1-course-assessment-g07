import React from 'react';
import Link from 'next/link';

const LandingPageNavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        Leetcode Racer
      </Link>
    </div>
  );
};

export default LandingPageNavBar;
