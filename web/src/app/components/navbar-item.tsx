'use client';

import React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  href: string;
  isActive: boolean;
}

export default function NavbarItem({ title, href, isActive }: Props) {
  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 font-medium select-none ${
        isActive
          ? 'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
          : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
      }`}
      aria-current="page"
    >
      {title}
    </Link>
  );
}
