import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  Settings, 
  Bell, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Power,
  Zap
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ user, currentPage, onPageChange, isMobileOpen, onMobileClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard, roles: ['super-admin', 'admin', 'customer'] },
    { id: 'devices', label: 'مدیریت دستگاه‌ها', icon: Cpu, roles: ['super-admin', 'admin', 'customer'] },
    { id: 'users', label: 'مدیریت کاربران', icon: Users, roles: ['super-admin', 'admin'] },
    { id: 'analytics', label: 'تحلیل و گزارش', icon: BarChart3, roles: ['super-admin', 'admin'] },
    { id: 'security', label: 'امنیت', icon: Shield, roles: ['super-admin'] },
    { id: 'settings', label: 'تنظیمات', icon: Settings, roles: ['super-admin', 'admin', 'customer'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user.role));

  const handlePageChange = (page: string) => {
    onPageChange(page);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        bg-slate-900 text-white w-64 min-h-screen flex flex-col fixed lg:relative z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">مرکز کنترل IoT</h1>
              <p className="text-slate-400 text-sm">نظارت هوشمند</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400">
                {user.role === 'super-admin' ? 'سوپر ادمین' : 
                 user.role === 'admin' ? 'ادمین' : 'مشتری'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}