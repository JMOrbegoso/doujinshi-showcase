import React from 'react';

export default function NoContent() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="text-5xl font-semibold text-black dark:text-white">NO CONTENT FOUND</div>
    </div>
  );
}
