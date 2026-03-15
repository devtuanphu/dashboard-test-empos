import React from 'react';

interface IconFlagVNProps {
  width?: number;
  height?: number;
  className?: string;
}

const IconFlagVN: React.FC<IconFlagVNProps> = ({
  width = 32,
  height = 23,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 23"
      fill="none"
      className={className}
      style={{ borderRadius: 2 }}
    >
      <rect width="32" height="23" rx="3" fill="#DC220D" />
      <path
        d="M16 5.5L17.3 9.5H21.5L18.1 12L19.4 16L16 13.5L12.6 16L13.9 12L10.5 9.5H14.7L16 5.5Z"
        fill="#FFCD00"
      />
    </svg>
  );
};

export default IconFlagVN;
