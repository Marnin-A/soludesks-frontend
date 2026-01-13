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

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[var(--border-gray)] px-6">
        <Image src="/soludesks_logo.png" alt="Soludesks Logo" width={136} height={36} />
      </div>

      {/* Navigation */}
      <nav className="pt-6 px-4 border-r h-full border-[var(--border-gray)]">
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
