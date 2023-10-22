'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const GetStartedButton = () => {
  return (
    <Link href="/users/login" className="">
      <Button color="primary" variant="ghost" size="lg">
        Get Started
      </Button>
    </Link>
  );
};

export default GetStartedButton;
