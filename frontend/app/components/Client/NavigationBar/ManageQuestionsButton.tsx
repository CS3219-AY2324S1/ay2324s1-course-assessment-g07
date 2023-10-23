'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  href: string;
}

const ManageQuestionsButton = ({ href }: Props) => {
  return (
    <Link
      href={href}
      className="normal-case text-sm mr-auto font-normal"
    >
      Manage Questions
    </Link>
  );
};

export default ManageQuestionsButton;
