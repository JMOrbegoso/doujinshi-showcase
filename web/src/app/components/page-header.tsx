import React from 'react';

interface Props {
  header: string;
}

export default function PageHeader({ header }: Props) {
  return <h1 className="text-center text-4xl font-bold text-black dark:text-white">{header}</h1>;
}
