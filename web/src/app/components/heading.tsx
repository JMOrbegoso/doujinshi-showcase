import React from 'react';

interface Props {
  title: string;
}

export default function Heading({ title }: Props) {
  return <h1 className="text-2xl font-bold text-black dark:text-white">{title}</h1>;
}
