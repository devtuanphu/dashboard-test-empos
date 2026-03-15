'use client';

import React, { useState, useRef, useEffect } from 'react';
import IconDropDown from '@/components/icon/IconDropDown';

const filterOptions = ['Hôm nay', '7 ngày trước', 'Hôm qua', 'Tháng này', 'Tháng trước', 'Lựa chọn khác'];

const RevenueChart: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Hôm nay');
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      // Close tooltip when clicking outside chart
      if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
        setActivePoint(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dataPoints = [
    { month: 'JAN', value: 15 },
    { month: 'FEB', value: 22 },
    { month: 'MAR', value: 28 },
    { month: 'APR', value: 24 },
    { month: 'MAY', value: 32 },
    { month: 'JUNE', value: 20 },
  ];

  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
  const maxVal = 40;
  const chartWidth = 310;
  const chartHeight = 155;

  const points = dataPoints.map((d, i) => {
    const x = (i / (dataPoints.length - 1)) * chartWidth;
    const y = chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) / 3;
    const cpx2 = p.x - (p.x - prev.x) / 3;
    return `C ${cpx1} ${prev.y} ${cpx2} ${p.y} ${p.x} ${p.y}`;
  }).join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="bg-white rounded-lg overflow-visible relative flex-1 h-[345px]" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[15px] leading-5" style={{ color: '#5f5a6a' }}>Doanh thu</span>
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
        <span className="text-[28px] font-semibold leading-[34px]" style={{ color: '#35313c' }}>15</span>
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

        {/* SVG Chart */}
        <svg className="absolute left-[38px] top-0" width={chartWidth + 30} height={chartHeight + 10} viewBox={`-5 -5 ${chartWidth + 40} ${chartHeight + 15}`}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#119c72" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#119c72" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#revenueGradient)" />
          <path d={linePath} fill="none" stroke="#119c72" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Clickable data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={activePoint === i ? 5 : 4}
              fill={activePoint === i ? '#119c72' : 'transparent'}
              stroke={activePoint === i ? 'white' : 'transparent'}
              strokeWidth="2"
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === i ? null : i)}
            />
          ))}
          {/* Invisible larger hit areas */}
          {points.map((p, i) => (
            <circle
              key={`hit-${i}`}
              cx={p.x}
              cy={p.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setActivePoint(activePoint === i ? null : i)}
            />
          ))}
        </svg>

        {/* Tooltip bubble - only when a point is active */}
        {activePoint !== null && (
          <div className="absolute z-20" style={{ left: `${38 + points[activePoint].x - 36}px`, top: `${points[activePoint].y - 35}px` }}>
            <div className="relative">
              <div className="bg-[#35313c] text-white text-xs px-4 py-1.5 rounded-md whitespace-nowrap">
                {months[activePoint]}: {dataPoints[activePoint].value}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#35313c] rotate-45" />
            </div>
          </div>
        )}

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-[38px] right-0 flex">
          {dataPoints.map((d) => (
            <div key={d.month} className="flex-1 text-center">
              <span className="text-[13px] leading-[18px]" style={{ color: '#949596' }}>{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
