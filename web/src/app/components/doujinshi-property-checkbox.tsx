import React from 'react';

interface Props {
  value: string;
  quantity: number;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function DoujinshiPropertyCheckbox({ value, quantity, checked, onChange }: Props) {
  return (
    <div className="p-1">
      <input
        className="hidden peer"
        type="checkbox"
        id={value}
        name={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={value}
        className="inline-flex items-center justify-between p-1 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-purple-600 peer-checked:bg-purple-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="text-base font-semibold">{value}</div>

        <div className="mx-1 text-base font-semibold text-red-600">{quantity}</div>
      </label>
    </div>
  );
}
