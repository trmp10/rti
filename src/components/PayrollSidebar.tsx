'use client';

import {
  Home, Clock, File, Bank, User, Users, Warning, Wallet, ArrowRight, Filter, Calendar, Star,
} from '@finity/design-system';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
  icon: React.ReactNode;
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: 'PAYROLL',
    items: [
      { label: 'Timesheet dashboard', href: '#', icon: <Home size={16} /> },
      { label: 'Salaried dashboard', href: '#', icon: <User size={16} /> },
      { label: 'Previous batches', href: '#', icon: <Clock size={16} /> },
    ],
  },
  {
    section: 'ATTACHMENT ORDER',
    items: [
      { label: 'Payment summary', href: '#', icon: <Wallet size={16} /> },
      { label: 'Payment history', href: '#', icon: <Calendar size={16} /> },
    ],
  },
  {
    section: 'HMRC RTI',
    items: [
      { label: 'RTI submissions', href: '/', active: true, badge: 2, icon: <File size={16} /> },
      { label: 'CIS verifications', href: '#', icon: <Users size={16} /> },
    ],
  },
  {
    section: 'BANKING',
    items: [
      { label: 'Banking dashboard', href: '#', icon: <Bank size={16} /> },
      { label: 'Caxton dashboard', href: '#', icon: <Star size={16} /> },
      { label: 'Bank files', href: '#', icon: <File size={16} /> },
      { label: 'Failed payments', href: '#', badge: 12, icon: <Warning size={16} /> },
    ],
  },
  {
    section: 'BANK TRANSACTIONS',
    items: [
      { label: 'Bank matching', href: '#', icon: <Filter size={16} /> },
      { label: 'Bank transactions', href: '#', icon: <Wallet size={16} /> },
    ],
  },
];

export function PayrollSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[200px] bg-[var(--color-grey-900)] flex flex-col overflow-y-auto z-20">
      {/* Header */}
      <div className="flex items-center h-14 px-4 shrink-0">
        <span className="text-white text-[15px] font-semibold">Payroll</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mx-4 shrink-0" />

      {/* Nav */}
      <nav className="flex flex-col gap-4 px-2 py-4 flex-1 overflow-y-auto">
        {NAV.map(({ section, items }) => (
          <div key={section} className="flex flex-col">
            <div className="flex items-center h-7 px-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-grey-500)]">
                {section}
              </span>
            </div>
            <div className="flex flex-col">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`
                    flex items-center justify-between h-9 px-2 rounded-lg
                    text-[13px] transition-colors duration-100
                    hover:bg-white/5
                    ${item.active
                      ? 'text-[var(--color-coral-400)] font-semibold'
                      : 'text-[var(--color-grey-300)] font-medium'
                    }
                  `}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className={`shrink-0 ${item.active ? 'text-[var(--color-coral-400)]' : 'text-[var(--color-grey-500)]'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-coral-500)] text-white text-[10px] font-bold shrink-0 ml-1">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10">
        <a
          href="#"
          className="flex items-center gap-2.5 h-10 px-4 text-[var(--color-grey-400)] hover:text-white text-[13px] font-medium transition-colors"
        >
          <ArrowRight size={15} />
          Sign out
        </a>
        <div className="flex items-center justify-center pb-3 pt-0.5">
          <span className="text-[10px] text-[var(--color-grey-600)]">Finity Payroll 4.6.424</span>
        </div>
      </div>
    </aside>
  );
}
