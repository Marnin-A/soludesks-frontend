'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: (active: boolean) => (
      <Image
        src={active ? '/icons/home-hashtag-active.svg' : '/icons/home-hashtag.svg'}
        alt="Dashboard"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'Courses/Materials',
    href: '/courses',
    icon: (active: boolean) => (
      <Image src={active ? '/icons/book-active.svg' : '/icons/book.svg'} alt="Courses" width={20} height={20} />
    ),
  },
  {
    name: 'Classes',
    href: '/classes',
    icon: (active: boolean) => (
      <Image
        src={active ? '/icons/board-math-active.svg' : '/icons/board-math.svg'}
        alt="Classes"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'Assessments',
    href: '/assessments',
    icon: (active: boolean) => (
      <Image
        src={active ? '/icons/assessment-book-active.svg' : '/icons/assessment-book.svg'}
        alt="Assessments"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'My Certification',
    href: '/certification',
    icon: (active: boolean) => (
      <Image src={active ? '/icons/award-active.svg' : '/icons/award.svg'} alt="Certification" width={20} height={20} />
    ),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: (active: boolean) => (
      <Image
        src={active ? '/icons/setting-2-active.svg' : '/icons/setting-2.svg'}
        alt="Settings"
        width={20}
        height={20}
      />
    ),
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-lg transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:shadow-none`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[var(--border-gray)] px-6">
        <Image src="/soludesks_logo.png" alt="Soludesks Logo" width={136} height={36} />
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-md p-2 text-[var(--text-gray)] hover:bg-[var(--bg-gray)] lg:hidden"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100%-4rem)] overflow-y-auto border-r border-[var(--border-gray)] px-4 pt-6">
        <ul className="space-y-1">
          {navItems.map(item => {
            const active = isActive(item.href);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[var(--blue-light)] text-[var(--blue-primary)] border-l-2 border-[var(--blue-primary)]'
                      : 'text-[var(--text-gray)] hover:bg-[var(--bg-gray)] hover:text-[var(--text-dark)]'
                  }`}
                >
                  {item.icon(active)}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
