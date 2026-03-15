'use client';

import React from 'react';

const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed right-3 bottom-4 flex flex-col gap-3 z-50">
      {/* Phone button */}
      <button className="w-10 h-10 rounded-full bg-[#119c72] flex items-center justify-center shadow-lg hover:bg-[#0e8a64] transition-colors">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17.5 14.2V16.7C17.5 17 17.3 17.3 17 17.4C16.7 17.5 16.4 17.5 16.1 17.4C13.5 16.5 11.2 15 9.3 13C7.3 11 5.8 8.7 4.9 6.1C4.8 5.8 4.8 5.5 4.9 5.2C5 4.9 5.3 4.7 5.6 4.7H8.1C8.6 4.7 9 5 9.1 5.5C9.2 6 9.4 6.5 9.6 7C9.8 7.4 9.7 7.9 9.4 8.2L8.3 9.3C9.9 12 11.7 13.8 14.4 15.4L15.5 14.3C15.8 14 16.3 13.9 16.7 14.1C17.2 14.3 17.7 14.5 18.2 14.6C18.7 14.7 19 15.1 19 15.6V14.2" fill="white"/>
        </svg>
      </button>

      {/* Zalo button */}
      <button className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-[#0068FF]">
        <span className="text-white text-[11px] font-bold">Zalo</span>
      </button>
    </div>
  );
};

export default FloatingButtons;
