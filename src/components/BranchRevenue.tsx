'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import IconDropDown from '@/components/icon/IconDropDown';

interface Branch {
  rank: number;
  name: string;
  percentage: string;
  color: string;
  value: number;
}

// Colors from Figma Primary tokens, proportions from visual measurement
const branches: Branch[] = [
  { rank: 1, name: 'Chi nhánh Hồ Chí Minh', percentage: '48.8%', color: '#004a34', value: 48 },
  { rank: 2, name: 'Chi nhánh Đà Nẵng', percentage: '48.8%', color: '#007350', value: 22 },
  { rank: 3, name: 'Chi nhánh Hà Nội', percentage: '48.8%', color: '#119c72', value: 12 },
  { rank: 4, name: 'Chi nhánh Hạ Long', percentage: '48.8%', color: '#2bc596', value: 9 },
  { rank: 5, name: 'Chi nhánh Hải Phòng', percentage: '48.8%', color: '#4fedbd', value: 5 },
  { rank: 6, name: 'Chi nhánh khác', percentage: '48.8%', color: '#92ffde', value: 4 },
];

const filterOptions = ['Hôm nay', '7 ngày trước', 'Hôm qua', 'Tháng này', 'Tháng trước', 'Lựa chọn khác'];

const RADIAN = Math.PI / 180;

// Custom label: ranks 1-4 INSIDE the ring (white), only 5-6 OUTSIDE (dark)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
  const rank = index + 1;

  if (rank <= 4) {
    // Inside ring — white text
    const midR = (innerRadius + outerRadius) / 2;
    const x = cx + midR * Math.cos(-midAngle * RADIAN);
    const y = cy + midR * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#f3f3f4" textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600}>
        {rank}
      </text>
    );
  } else {
    // Outside ring — dark text
    const labelR = outerRadius + 16;
    const x = cx + labelR * Math.cos(-midAngle * RADIAN);
    const y = cy + labelR * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#35313c" textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600}>
        {rank}
      </text>
    );
  }
};

const BranchRevenue: React.FC = () => {
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
    <div className="bg-white rounded-lg p-4 w-full h-full relative overflow-hidden" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-0">
        <h3 className="text-[16px] xl:text-[20px] font-semibold leading-[22px] xl:leading-[26px]" style={{ color: '#35313c' }}>
          Doanh thu theo chi nhánh
        </h3>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 text-[13px] xl:text-[15px] font-medium py-2 rounded-lg whitespace-nowrap"
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

      <div className="flex flex-row items-start">
        {/* Branch list */}
        <div className="flex flex-col gap-1 xl:gap-2 shrink-0 w-[140px] xl:w-[220px]">
          {branches.map((branch) => (
            <div key={branch.rank} className="flex items-center gap-2 xl:gap-4">
              <div
                className="w-6 h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center text-white text-[14px] xl:text-[20px] font-semibold shrink-0 leading-[20px] xl:leading-[26px]"
                style={{ background: branch.color }}
              >
                {branch.rank}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] xl:text-[17px] font-semibold leading-5 xl:leading-6" style={{ color: '#35313c' }}>
                  {branch.name}
                </span>
                <span className="text-[10px] xl:text-[12px] leading-3 xl:leading-4" style={{ color: '#dd980a' }}>
                  {branch.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="flex-1 flex items-center justify-center py-2">
          <PieChart width={250} height={250}>
            <Pie
              data={branches}
              cx={125}
              cy={125}
              innerRadius={50}
              outerRadius={105}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              label={renderCustomLabel}
              labelLine={false}
              isAnimationActive={false}
            >
              {branches.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                value="Doanh thu"
                position="center"
                fill="#212023"
                fontSize={14}
                fontWeight={600}
              />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default BranchRevenue;
