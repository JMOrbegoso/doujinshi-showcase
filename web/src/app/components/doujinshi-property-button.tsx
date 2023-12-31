import React from 'react';
import Link from 'next/link';

interface Props {
  value: string;
  quantity?: number;
  href: string;
}

export default function DoujinshiPropertyButton({ value, quantity, href }: Props) {
  return (
    <Link href={`${href}`}>
      <input className="hidden peer" type="button" id={value} name={value} />
      <label
        htmlFor={value}
        className="inline-flex items-center justify-between p-1 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="text-base font-semibold font-mono">{value}</div>

        {quantity && <div className="mx-1 text-base font-semibold text-red-600">{quantity}</div>}
      </label>
    </Link>
  );
}
