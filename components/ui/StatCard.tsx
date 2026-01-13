import Image from 'next/image';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: number;
  iconBgColor?: string;
}

export function StatCard({ icon, label, value, trend, iconBgColor = 'bg-[var(--blue-primary)]/10' }: StatCardProps) {
  return (
    <div className="flex items-center p-1 bg-white rounded-sm">
      <div className="flex items-center gap-4 w-full rounded-sm bg-gray-100 p-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-md ${iconBgColor}`}>{icon}</div>
        <div className="w-full">
          <p className="text-sm text-text-gray">{label}</p>
          <div className="flex items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-text-dark">{value}</p>
            {trend !== undefined && (
              <span
                className={`text-sm font-medium flex items-center gap-1 ${
                  trend >= 0 ? 'text-green-stat' : 'text-red-500'
                }`}
              >
                <Image src="/icons/auto-conversations.svg" alt="Auto Conversations" width={12} height={12} />
                {trend >= 0 ? '+' : ''}
                {trend}% {trend >= 0 ? 'up from last month' : 'down from last month'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
