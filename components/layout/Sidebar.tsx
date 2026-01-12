'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/home-hashtag-active.svg' : '/icons/home-hashtag.svg'}
        alt="Dashboard"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'Courses/Materials',
    href: '/courses',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/book-active.svg' : '/icons/book.svg'}
        alt="Dashboard"
        width={20}
        height={20}
        className={
          isActive
            ? 'brightness-0 invert-[48%] sepia-[79%] saturate-[2476%] hue-rotate-[190deg] brightness-[118%] contrast-[119%]'
            : ''
        }
      />
    ),
  },
  {
    name: 'Classes',
    href: '/classes',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/board-math-active.svg' : '/icons/board-math.svg'}
        alt="Dashboard"
        width={20}
        height={20}
        className={
          isActive
            ? 'brightness-0 invert-[48%] sepia-[79%] saturate-[2476%] hue-rotate-[190deg] brightness-[118%] contrast-[119%]'
            : ''
        }
      />
    ),
  },
  {
    name: 'Assessments',
    href: '/assessments',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/assessment-book-active.svg' : '/icons/assessment-book.svg'}
        alt="Dashboard"
        width={20}
        height={20}
        className={
          isActive
            ? 'brightness-0 invert-[48%] sepia-[79%] saturate-[2476%] hue-rotate-[190deg] brightness-[118%] contrast-[119%]'
            : ''
        }
      />
    ),
  },
  {
    name: 'My Certification',
    href: '/certification',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/award-active.svg' : '/icons/award.svg'}
        alt="Dashboard"
        width={20}
        height={20}
        className={
          isActive
            ? 'brightness-0 invert-[48%] sepia-[79%] saturate-[2476%] hue-rotate-[190deg] brightness-[118%] contrast-[119%]'
            : ''
        }
      />
    ),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: (isActive: boolean) => (
      <Image
        src={isActive ? '/icons/setting-2-active.svg' : '/icons/setting-2.svg'}
        alt="Dashboard"
        width={20}
        height={20}
        className={
          isActive
            ? 'brightness-0 invert-[48%] sepia-[79%] saturate-[2476%] hue-rotate-[190deg] brightness-[118%] contrast-[119%]'
            : ''
        }
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
