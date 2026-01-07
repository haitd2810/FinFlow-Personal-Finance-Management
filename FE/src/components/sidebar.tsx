'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PiggyBank,
  Receipt,
  TrendingUp,
  Calculator,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/jars', icon: PiggyBank, label: 'Hũ Chi Tiêu' },
    { href: '/bills', icon: Receipt, label: 'Upload Bill' },
    { href: '/compound', icon: TrendingUp, label: 'Lãi Kép & Tiết Kiệm' },
    { href: '/loans', icon: Calculator, label: 'Quản Lý Khoản Vay' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-emerald-600 text-xl font-bold">
          FinFlow VN
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Personal Finance Companion
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 absolute left-0 bottom-0 w-full">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Tổng Tài Sản</p>
          <p className="text-2xl mt-1">0 ₫</p>
        </div>
      </div>
    </aside>
  );
}
