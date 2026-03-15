'use client';

import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | React.ReactNode;
  percentage?: string;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconBg, label, value, percentage, trend = 'up' }) => {
  const trendColor = trend === 'up' ? '#0c9060' : '#dd415c';

  return (
    <div className="bg-white flex items-center gap-2 p-4 rounded-lg w-full" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: iconBg }}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-[15px] leading-5" style={{ color: '#5f5a6a' }}>{label}</span>
        <div className="flex items-end gap-2">
          <span className="text-[22px] font-semibold leading-7" style={{ color: '#35313c' }}>{value}</span>
          {percentage && (
            <div className="flex items-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: trend === 'down' ? 'rotate(180deg)' : 'none' }}>
                <path d="M5.25 10.875L9 7.125L12.75 10.875H5.25Z" fill={trendColor}/>
              </svg>
              <span className="text-xs font-bold tracking-[-0.24px]" style={{ color: trendColor, fontFamily: "'DM Sans', sans-serif" }}>
                {percentage}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
