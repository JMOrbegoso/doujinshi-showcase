'use client';

import React from 'react';
import Link from 'next/link';
import { DoujinshiImage, ErrorCallingApi, LoadingSpinnerPage, NoContent } from '@/app/components';
import { useGetDoujinshiByIdQuery } from '@/services/showcase-api';
import { Doujinshi } from '@/models';

interface Props {
  doujinshiId: string;
}

export default function DoujinshiImages({ doujinshiId }: Props) {
  const { data, isLoading, isError } = useGetDoujinshiByIdQuery(doujinshiId);

  if (isLoading) return <LoadingSpinnerPage />;

  if (isError) return <ErrorCallingApi />;

  if (!data) return <NoContent />;

  const doujinshi: Doujinshi = data as Doujinshi;

  return (
    <div className="flex flex-row flex-wrap justify-center gap-2">
      {doujinshi.Images.map((image) => (
        <Link
          className="transition transform hover:scale-105 w-80 h-96 sm:w-64 sm:h-80"
          key={image}
          href={`/doujinshi/${doujinshi.Id}/${doujinshi.Images.indexOf(image)}`}
        >
          <DoujinshiImage src={image} />
        </Link>
      ))}
    </div>
  );
}
