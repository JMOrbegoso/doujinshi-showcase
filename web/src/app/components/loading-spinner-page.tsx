import React from 'react';
import { LoadingSpinner } from '.';

export default function LoadingSpinnerPage() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
