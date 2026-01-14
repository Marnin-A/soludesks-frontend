'use client';

import { useGetUserQuery } from '@/store/services/api';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const { data: user } = useGetUserQuery();

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border-gray bg-white px-4 sm:px-6 transition-[left] ${
        isSidebarOpen ? 'lg:left-64' : 'lg:left-0'
      }`}
    >
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleSidebar?.()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-dark hover:bg-bg-gray focus:outline-none focus:ring-2 focus:ring-blue-primary lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 min-w-0 max-w-xl">
          <input
            type="text"
            placeholder="Search soludesk"
            className="w-full rounded-full border border-border-gray bg-bg-gray py-2.5 pl-5 pr-10 text-sm text-text-dark placeholder:text-text-light focus:border-blue-primary focus:outline-none focus:ring-1 focus:ring-blue-primary"
          />
          <Image
            src="/icons/search-normal.svg"
            alt="Search"
            width={20}
            height={20}
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-light"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-4 flex items-center gap-2 sm:gap-4">
        {/* Messages */}
        <button className="rounded-lg p-2 text-text-gray hover:bg-bg-gray">
          <Image src="/icons/message-notif.svg" alt="Notification" width={24} height={24} />
        </button>

        {/* Notification */}
        <button className="relative rounded-lg p-2 text-text-gray hover:bg-bg-gray">
          <Image src="/icons/notification.svg" alt="Notification" width={24} height={24} />
          <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            4
          </span>
        </button>
        {/* User Profile */}
        <div className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2 hover:bg-bg-gray cursor-pointer sm:px-3">
          <Avatar className="h-9 w-9 border border-purple-primary">
            <AvatarImage src={user?.avatar} alt={user?.name || 'User'} className="object-cover" />
            <AvatarFallback className="text-sm font-medium text-text-gray">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 text-left sm:block">
            <p className="truncate text-base font-normal text-text-dark">{user?.name || 'Loading...'}</p>
            <p className="w-34 truncate text-sm font-normal text-text-gray">{user?.email || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
