'use client';

import React, { useState, useRef, useEffect } from 'react';
import IconDropDown from '@/components/icon/IconDropDown';

interface BestSellerItem {
  name: string;
  trend: string;
  trendType: 'up' | 'down';
  price: string;
}

const items: BestSellerItem[] = [
  { name: 'Sữa tươi', trend: 'Tăng 20%', trendType: 'up', price: '100.000.000' },
  { name: 'Sữa tươi', trend: 'Giảm 20%', trendType: 'down', price: '100.000.000' },
  { name: 'Sữa tươi', trend: 'Tăng 20%', trendType: 'up', price: '100.000.000' },
  { name: 'Sữa tươi', trend: 'Tăng 20%', trendType: 'up', price: '100.000.000' },
  { name: 'Sữa tươi', trend: 'Tăng 20%', trendType: 'up', price: '100.000.000' },
  { name: 'Sữa tươi', trend: 'Tăng 20%', trendType: 'up', price: '100.000.000' },
];

const filterOptions = ['Hôm nay', '7 ngày trước', 'Hôm qua', 'Tháng này', 'Tháng trước', 'Lựa chọn khác'];

const BestSellers: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Hôm nay');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 w-full h-full" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[22px] font-semibold" style={{ color: '#35313c' }}>
          Hàng bán chạy
        </h3>
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

      {/* Items */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between h-10">
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-6" style={{ color: '#35313c' }}>
                {item.name}
              </span>
              <span
                className="text-xs leading-4 font-medium"
                style={{ color: item.trendType === 'up' ? '#0c9060' : '#dd415c' }}
              >
                {item.trend}
              </span>
            </div>
            <span className="text-[15px] font-semibold leading-6" style={{ color: '#35313c' }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
