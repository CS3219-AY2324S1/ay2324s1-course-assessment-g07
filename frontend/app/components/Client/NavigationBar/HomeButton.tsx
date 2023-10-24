'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  href: string;
}

const HomeButton = ({ href }: Props) => {
  return (
    <Link href={href} className="btn btn-ghost normal-case text-2xl">
      Leetcode Racer
    </Link>
  );
};

export default HomeButton;
