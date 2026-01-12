'use client';

import { useGetUserQuery } from '@/store/services/api';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { data: user } = useGetUserQuery();

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-[var(--border-gray)] bg-white px-6">
      {/* Search Bar */}
      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search soludesk"
          className="w-full rounded-full border border-[var(--border-gray)] bg-[var(--bg-gray)] py-2.5 pl-5 pr-4 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-light)] focus:border-[var(--blue-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--blue-primary)]"
        />
        <Image
          src="/icons/search-normal.svg"
          alt="Search"
          width={20}
          height={20}
          className="absolute right-4.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-light)]"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Messages */}
        <button className="rounded-lg p-2 text-[var(--text-gray)] hover:bg-[var(--bg-gray)]">
          <Image src="/icons/message-notif.svg" alt="Notification" width={20} height={20} />
        </button>

        {/* Notification */}
        <button className="relative rounded-lg p-2 text-[var(--text-gray)] hover:bg-[var(--bg-gray)]">
          <Image src="/icons/notification.svg" alt="Notification" width={20} height={20} />
          <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full bg-red-500"></span>
        </button>
        {/* User Profile */}
        <div className="flex items-center w-48 gap-3 rounded-lg px-3 py-2 hover:bg-[var(--bg-gray)] cursor-pointer">
          <Avatar className="h-9 w-9 border border-[var(--purple-primary)]">
            <AvatarImage src={user?.avatar} alt={user?.name || 'User'} className="object-cover" />
            <AvatarFallback className="text-sm font-medium text-[var(--text-gray)]">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-left truncate">
            <p className="text-base font-medium text-[var(--text-dark)]">{user?.name || 'Loading...'}</p>
            <p className="text-base w-34 truncate text-[var(--text-gray)]">{user?.email || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
