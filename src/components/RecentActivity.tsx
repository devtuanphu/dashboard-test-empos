'use client';

import React from 'react';
import Image from 'next/image';

interface ActivityItem {
  avatar: string;
  name: string;
  time: string;
  amount: number;
}

const activities: ActivityItem[] = [
  { avatar: '/images/760418c80b07829994b3f5ac07832e546df611d1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: 50 },
  { avatar: '/images/c723a55af51a21e84fcd41ae1873eb4efc7b61b1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: -27 },
  { avatar: '/images/760418c80b07829994b3f5ac07832e546df611d1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: 50 },
  { avatar: '/images/760418c80b07829994b3f5ac07832e546df611d1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: 50 },
  { avatar: '/images/760418c80b07829994b3f5ac07832e546df611d1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: 50 },
  { avatar: '/images/c723a55af51a21e84fcd41ae1873eb4efc7b61b1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: -27 },
  { avatar: '/images/760418c80b07829994b3f5ac07832e546df611d1.png', name: 'From Alex Manda', time: 'Today, 16:36', amount: 50 },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full flex-1 flex flex-col gap-4" style={{ boxShadow: '0px 6px 16px 0px rgba(0,0,0,0.1)' }}>
      <h3 className="text-[20px] font-semibold leading-[26px]" style={{ color: '#35313c' }}>
        Hoạt động gần đây
      </h3>
      <div className="flex flex-col gap-4 flex-1 overflow-hidden">
        {activities.map((item, index) => {
          const isPositive = item.amount >= 0;
          return (
            <div key={index} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden relative">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Name and time */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[15px] font-semibold leading-5 truncate" style={{ color: '#35313c' }}>
                    {item.name}
                  </span>
                  <span className="text-xs leading-4" style={{ color: '#a3aed0' }}>
                    {item.time}
                  </span>
                </div>
              </div>
              {/* Badge */}
              <div
                className="w-10 flex items-center justify-center p-1 rounded shrink-0"
                style={{
                  backgroundColor: isPositive ? '#ecfff8' : '#ffeef1',
                }}
              >
                <span
                  className="text-[15px] font-semibold leading-5 whitespace-nowrap"
                  style={{
                    color: isPositive ? '#0c9060' : '#dd415c',
                  }}
                >
                  {isPositive ? `+${item.amount}` : item.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
