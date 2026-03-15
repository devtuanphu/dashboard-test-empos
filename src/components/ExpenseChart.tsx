'use client';

import React, { useState, useRef, useEffect } from 'react';
import IconDropDown from '@/components/icon/IconDropDown';

const filterOptions = ['Hôm nay', '7 ngày trước', 'Hôm qua', 'Tháng này', 'Tháng trước', 'Lựa chọn khác'];

const ExpenseChart: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Hôm nay');
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
        setActiveBar(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const data = [
    { month: 'JAN', value: 22, max: 40 },
    { month: 'FEB', value: 35, max: 40 },
    { month: 'MAR', value: 28, max: 40 },
    { month: 'APR', value: 18, max: 40 },
    { month: 'MAY', value: 30, max: 40 },
    { month: 'JUNE', value: 15, max: 40 },
  ];

  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];

  return (
    <div className="bg-white rounded-lg overflow-visible relative flex-1 h-[345px]" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[15px] leading-5" style={{ color: '#5f5a6a' }}>Chi phí</span>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 text-[15px] font-medium py-2 rounded-lg"
              style={{ color: '#35313c' }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedFilter}
              <IconDropDown width={20} height={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 min-w-[180px] py-2" style={{ boxShadow: '0px 6px 24px rgba(0,0,0,0.15)' }}>
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    className="w-full text-left px-4 py-2.5 text-[15px] hover:bg-gray-50 flex items-center justify-between"
                    style={{ color: '#35313c' }}
                    onClick={() => { setSelectedFilter(opt); setShowDropdown(false); }}
                  >
                    {opt}
                    {opt === selectedFilter && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6.5 11.5L3 8L4 7L6.5 9.5L12 4L13 5L6.5 11.5Z" fill="#119c72"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[28px] font-semibold leading-[34px]" style={{ color: '#35313c' }}>1</span>
          <span className="text-xs mb-1" style={{ color: '#35313c' }}>ĐVT: Triệu đồng</span>
        </div>
      </div>

      {/* Chart area */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '220px' }} ref={chartRef}>
        {/* Y-axis labels */}
        <div className="absolute left-4 top-0 bottom-[30px] flex flex-col justify-between">
          {[40, 30, 20, 10, 0].map((v) => (
            <span key={v} className="text-[13px] leading-[18px] text-right" style={{ color: '#949596', minWidth: '16px' }}>{v}</span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute left-[38px] right-[24px] top-0 bottom-[30px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute w-full" style={{ top: `${(i / 4) * 100}%`, borderBottom: '1px dashed #e8e8e8' }} />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute left-[50px] right-[24px] top-0 bottom-[30px] flex items-end justify-around">
          {data.map((d, index) => (
            <div
              key={d.month}
              className="relative h-full flex items-end cursor-pointer"
              style={{ width: '21px' }}
              onClick={() => setActiveBar(activeBar === index ? null : index)}
            >
              {/* Background bar */}
              <div className="w-full rounded-full absolute bottom-0" style={{ height: '100%', background: '#e9edf7' }} />
              {/* Value bar */}
              <div
                className="w-full rounded-full absolute bottom-0 z-10"
                style={{
                  height: `${(d.value / d.max) * 100}%`,
                  background: '#119c72',
                }}
              />
              {/* Tooltip - only when bar is active */}
              {activeBar === index && (
                <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{ top: `${(1 - d.value / d.max) * 100}%`, marginTop: '-35px' }}>
                  <div className="relative">
                    <div className="bg-[#35313c] text-white text-xs px-4 py-1.5 rounded-md whitespace-nowrap">
                      {months[index]}: {d.value}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#35313c] rotate-45" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-[38px] right-0 flex">
          {data.map((d) => (
            <div key={d.month} className="flex-1 text-center">
              <span className="text-[13px] leading-[18px]" style={{ color: '#949596' }}>{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
