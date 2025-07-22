import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { User as UserType, Notification } from '../types';

interface HeaderProps {
  user: UserType;
  notifications: Notification[];
  onNotificationClick: () => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export default function Header({ 
  user, 
  notifications, 
  onNotificationClick, 
  onMobileMenuToggle,
  isMobileMenuOpen 
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="جستجوی دستگاه‌ها، کاربران یا داده‌ها..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80 lg:w-96"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Mobile Search */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.role === 'super-admin' ? 'سوپر ادمین' : 
                   user.role === 'admin' ? 'ادمین' : 'مشتری'}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full px-4 py-2 text-right text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>پروفایل</span>
                </button>
                <button className="w-full px-4 py-2 text-right text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse">
                  <Settings className="h-4 w-4" />
                  <span>تنظیمات</span>
                </button>
                <hr className="my-2" />
                <button className="w-full px-4 py-2 text-right text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse">
                  <LogOut className="h-4 w-4" />
                  <span>خروج</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}