import React from 'react';

interface Props {
  tag: string;
}

export default function DoujinshiTag(props: Props) {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
      {props.tag}
    </span>
  );
}
