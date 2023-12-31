'use client';

import React from 'react';
import Link from 'next/link';

export default function NavigateToTopButton() {
  return (
    <div className="flex justify-center">
      <Link href="#top">
        <span className="text-md select-none font-bold text-black dark:text-white">
          Back to top
        </span>
      </Link>
    </div>
  );
}
