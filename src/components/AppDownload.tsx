'use client';

import React from 'react';
import Image from 'next/image';

const AppDownload: React.FC = () => {
  return (
    <div className="flex gap-2 w-full">
      {/* App Store */}
      <div className="bg-white flex-1 flex items-center gap-1 xl:gap-2 px-1 xl:px-2 h-[56px] xl:h-[88px] rounded-lg min-w-0" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
        <div className="w-7 h-7 xl:w-10 xl:h-10 shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
          <Image
            src="/images/f69baa4bd9c2cf929b4e5fba1b9a527502563749.svg"
            alt="App Store"
            width={40}
            height={40}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col min-w-0 whitespace-nowrap">
          <span className="text-[8px] xl:text-xs leading-3 xl:leading-4" style={{ color: '#5f5a6a' }}>Tải ứng dụng</span>
          <span className="text-[10px] xl:text-[15px] font-semibold leading-3 xl:leading-5" style={{ color: '#35313c' }}>APP STORE</span>
        </div>
      </div>

      {/* Google Play */}
      <div className="bg-white flex-1 flex items-center gap-1 xl:gap-2 px-1 xl:px-2 h-[56px] xl:h-[88px] rounded-lg min-w-0" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
        <div className="w-7 h-7 xl:w-10 xl:h-10 shrink-0 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/23693012d7745b58ceb6fb45b2faadd9a8a49e3b.svg"
            alt="Google Play"
            width={37}
            height={40}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col min-w-0 whitespace-nowrap">
          <span className="text-[8px] xl:text-xs leading-3 xl:leading-4" style={{ color: '#5f5a6a' }}>Tải ứng dụng</span>
          <span className="text-[10px] xl:text-[15px] font-semibold leading-3 xl:leading-5" style={{ color: '#35313c' }}>CH PLAY</span>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
