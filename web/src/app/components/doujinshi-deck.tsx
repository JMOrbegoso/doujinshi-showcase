'use client';

import React from 'react';
import Link from 'next/link';
import { DoujinshiCard } from '@/app/components';
import { Doujinshi } from '@/models';

interface Props {
  doujinshi: Doujinshi[];
}

export default function DoujinshiDeck({ doujinshi }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {doujinshi.map((d) => (
        <Link
          className="transition transform hover:-translate-y-2 w-80 h-96 sm:w-64 sm:h-80"
          key={d.Id}
          href={`/doujinshi/${d.Id}`}
        >
          <DoujinshiCard doujinshi={d} />
        </Link>
      ))}
    </div>
  );
}
