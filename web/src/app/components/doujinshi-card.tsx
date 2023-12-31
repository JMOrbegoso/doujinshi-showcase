import React from 'react';
import { Doujinshi } from '@/models';
import { DoujinshiImage } from '@/app/components';

interface Props {
  doujinshi: Doujinshi;
}

export default function DoujinshiCard({ doujinshi }: Props) {
  return (
    <div className="flex flex-col border-blue-600 border-2 rounded-md w-full h-full pointer-events-none">
      <div className="flex-1 w-full h-2">
        <DoujinshiImage alt={doujinshi.Title} src={doujinshi.Cover} />
      </div>

      <div className="w-full h-8">
        <hr className="w-full h-px bg-blue-600 border-0" />

        <div className="flex w-full h-full">
          <span className="flex-grow p-1 text-center truncate font-bold text-sm text-black dark:text-white">
            {doujinshi.Title}
          </span>

          <hr className="w-px h-full bg-blue-600 border-0" />

          <span className="p-1 text-end whitespace-nowrap font-bold text-sm text-black dark:text-white">
            {doujinshi.Pages}📄
          </span>
        </div>
      </div>
    </div>
  );
}
