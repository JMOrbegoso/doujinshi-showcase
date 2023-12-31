import React from 'react';

export default function ErrorCallingApi() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="text-5xl font-semibold text-black dark:text-white">ERROR CALLING API</div>
    </div>
  );
}
