'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Props {
  href: string;
}

const LogoutButton = ({ href }: Props) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      className="normal-case text-sm mr-auto font-normal w-max"
      onClick={(e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        router.push(href);
        toast.success('Logout successful');
      }}
    >
      Logout
    </Link>
  );
};

export default LogoutButton;
