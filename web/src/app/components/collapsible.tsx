import React, { useState } from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Collapsible({ title, children }: Props) {
  const [open, setOPen] = useState(false);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOPen((prev) => !prev);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 px-2 text-base font-bold text-black dark:text-white w-full h-8"
        onClick={toggle}
      >
        {title}
      </button>
      {open && <div className="border-blue-600 border-b-2 border-x-2 ">{children}</div>}
    </div>
  );
}
