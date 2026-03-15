import React from 'react';

interface IconDropDownProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const IconDropDown: React.FC<IconDropDownProps> = ({
  width = 9,
  height = 5,
  color = '#35313C',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 9 5"
      fill="none"
      className={className}
    >
      <path d="M4.16667 4.16667L0 0H8.33333L4.16667 4.16667Z" fill={color} />
    </svg>
  );
};

export default IconDropDown;
