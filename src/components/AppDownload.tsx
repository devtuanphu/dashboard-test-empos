'use client';

import React from 'react';
import Image from 'next/image';

const AppDownload: React.FC = () => {
  return (
    <div className="flex gap-2 w-full">
      {/* App Store */}
      <div className="bg-white flex-1 flex items-center gap-2 p-2 rounded-lg" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
        <div className="w-10 h-10 shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
          <Image
            src="/images/f69baa4bd9c2cf929b4e5fba1b9a527502563749.svg"
            alt="App Store"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-4" style={{ color: '#5f5a6a' }}>Tải ứng dụng</span>
          <span className="text-[15px] font-semibold leading-5" style={{ color: '#35313c' }}>APP STORE</span>
        </div>
      </div>

      {/* Google Play */}
      <div className="bg-white flex-1 flex items-center gap-2 p-2 rounded-lg" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
        <div className="w-10 h-10 shrink-0 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/23693012d7745b58ceb6fb45b2faadd9a8a49e3b.svg"
            alt="Google Play"
            width={37}
            height={40}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-4" style={{ color: '#5f5a6a' }}>Tải ứng dụng</span>
          <span className="text-[15px] font-semibold leading-5" style={{ color: '#35313c' }}>CH PLAY</span>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
