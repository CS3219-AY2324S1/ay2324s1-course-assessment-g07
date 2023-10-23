'use client';
import React from 'react';
import Link from 'next/link';

const GetStartedButton = () => {
  return (
    <Link href="/users/login" className="btn btn-primary">
      Get Started
    </Link>
  );
};

export default GetStartedButton;
