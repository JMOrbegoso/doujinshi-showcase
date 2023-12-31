import React from 'react';
import { ErrorCallingApi, LoadingSpinnerPage, DoujinshiPropertyButton } from '@/app/components';

interface Props {
  data: { name: string; quantity: number | undefined }[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  hrefType: 'artist' | 'category' | 'character' | 'circle' | 'parody' | 'tag';
  justify: 'start' | 'center' | 'end';
}

export default function DoujinshiPropertyButtonsCloud({
  data,
  isLoading,
  isError,
  hrefType,
  justify,
}: Props) {
  if (isLoading) return <LoadingSpinnerPage />;

  if (isError) return <ErrorCallingApi />;

  if (!data) return <ErrorCallingApi />;

  return (
    <div className={`flex flex-row flex-wrap gap-1 justify-start justify-${justify}`}>
      {data.map((d) => (
        <DoujinshiPropertyButton
          key={d.name}
          value={d.name}
          quantity={d.quantity}
          href={`/doujinshi?${hrefType}=${d.name}`}
        />
      ))}
    </div>
  );
}
