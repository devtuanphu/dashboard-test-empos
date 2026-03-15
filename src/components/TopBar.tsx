'use client';

import React from 'react';
import Image from 'next/image';
import IconDropDown from '@/components/icon/IconDropDown';
import IconFlagVN from '@/components/icon/IconFlagVN';
import IconAvatar from '@/components/icon/IconAvatar';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white border-b flex items-center justify-between px-[56px] h-[56px]" style={{ borderColor: 'rgba(210,205,219,0.5)' }}>
      {/* Left - Logo */}
      <div className="flex gap-2 items-center">
        <div className="relative w-[36px] h-[36px] overflow-hidden">
          <Image
            src="/images/a1d52f9f1c9ba7f3f746329331fdbdad08190bea.svg"
            alt="Empos Logo"
            width={32}
            height={32}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 32, height: 32 }}
          />
        </div>
        <span className="text-[16px] font-semibold leading-[26px] whitespace-nowrap" style={{ color: '#35313c' }}>
          Empos
        </span>
      </div>

      {/* Right side */}
      <div className="flex gap-6 items-center">
        {/* Nav buttons */}
        <div className="flex items-center">
          {/* Gia hạn/Kích hoạt bản quyền - no dropdown */}
          <button className="flex items-center justify-center px-2 py-2 rounded-lg">
            <span className="text-[15px] font-medium leading-5 whitespace-nowrap" style={{ color: '#35313c' }}>
              Gia hạn/Kích hoạt bản quyền
            </span>
          </button>

          {/* Chủ đề - with dropdown */}
          <button className="flex gap-1 items-center justify-center px-2 py-2 rounded-lg">
            <span className="text-[15px] font-medium leading-5 whitespace-nowrap" style={{ color: '#35313c' }}>
              Chủ đề
            </span>
            <IconDropDown />
          </button>

          {/* Chi nhánh - with dropdown */}
          <button className="flex gap-1 items-center justify-center px-2 py-2 rounded-lg">
            <span className="text-[15px] font-medium leading-5 whitespace-nowrap" style={{ color: '#35313c' }}>
              Chi nhánh Hồ Chí Minh
            </span>
            <IconDropDown />
          </button>
        </div>

        {/* Right icons */}
        <div className="flex gap-4 items-center">
          {/* Language selector */}
          <div className="flex gap-2 items-center px-1 py-1.5 rounded-2xl backdrop-blur-[16px]">
            <div className="flex gap-2 items-center">
              <IconFlagVN />
              <span className="text-[14px] font-normal leading-5 whitespace-nowrap" style={{ color: '#0d1017' }}>
                VI
              </span>
            </div>
            <IconDropDown />
          </div>

          {/* Settings */}
          <div className="flex gap-1 items-center">
            <div className="relative w-[36px] h-[36px] flex items-center justify-center">
              <Image
                src="/images/a3a0ce3edabc6101e4781bbfd0d57c2b32f68643.svg"
                alt="Settings"
                width={28}
                height={28}
                style={{ width: 28, height: 28 }}
              />
            </div>
            <span className="text-[14px] font-normal leading-5 whitespace-nowrap" style={{ color: '#35313c' }}>
              Thiết lập
            </span>
          </div>

          {/* User avatar */}
          <div className="flex gap-2 items-center">
            <IconAvatar />
            <span className="text-[14px] font-normal leading-5 whitespace-nowrap" style={{ color: '#35313c' }}>
              Nguyễn Ngọc Quỳnh Trang
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
