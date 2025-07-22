import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DeviceManagement from './components/DeviceManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import ChatBot from './components/ChatBot';
import NotificationCenter from './components/NotificationCenter';
import LoginPage from './components/LoginPage';
import { User, Notification } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'دستگاه آفلاین',
      message: 'کنترلر چراغ LED در ساختمان ب - طبقه دوم آفلاین شده است',
      type: 'error',
      timestamp: '2024-01-15T10:15:00Z',
      isRead: false
    },
    {
      id: '2',
      title: 'هشدار باتری کم',
      message: 'سطح باتری دوربین امنیتی ورودی اصلی به ۱۵٪ رسیده است',
      type: 'warning',
      timestamp: '2024-01-15T09:30:00Z',
      isRead: false
    },
    {
      id: '3',
      title: 'به‌روزرسانی سیستم کامل شد',
      message: 'مرکز کنترل IoT با موفقیت به نسخه ۲.۱.۰ به‌روزرسانی شد',
      type: 'success',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true
    },
    {
      id: '4',
      title: 'دستگاه جدید متصل شد',
      message: 'قفل هوشمند اتاق جلسات با موفقیت به شبکه شما اضافه شد',
      type: 'info',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: false
    },
    {
      id: '5',
      title: 'هشدار دمای بالا',
      message: 'سنسور محیطی آزمایشگاه دمای بالاتر از حد طبیعی (۲۶.۵°C) را گزارش می‌دهد',
      type: 'warning',
      timestamp: '2024-01-14T14:30:00Z',
      isRead: true
    },
    {
      id: '6',
      title: 'گزارش مصرف انرژی',
      message: 'گزارش مصرف انرژی ماهانه شما آماده دانلود است',
      type: 'info',
      timestamp: '2024-01-14T12:00:00Z',
      isRead: false
    },
    {
      id: '7',
      title: 'هشدار امنیتی',
      message: 'تلاش‌های متعدد ورود ناموفق از IP ۱۹۲.۱۶۸.۱.۱۰۰ شناسایی شد',
      type: 'error',
      timestamp: '2024-01-14T10:45:00Z',
      isRead: false
    },
    {
      id: '8',
      title: 'نگهداری برنامه‌ریزی شده',
      message: 'نگهداری سیستم برای امشب از ساعت ۲:۰۰ تا ۴:۰۰ صبح برنامه‌ریزی شده است',
      type: 'info',
      timestamp: '2024-01-13T18:00:00Z',
      isRead: true
    }
  ]);

  const handleLogin = (role: 'super-admin' | 'admin' | 'customer') => {
    const mockUsers = {
      'super-admin': {
        id: '1',
        name: 'احمد محمدی',
        email: 'superadmin@demo.com',
        role: 'super-admin' as const,
        isActive: true,
        lastLogin: new Date().toISOString()
      },
      'admin': {
        id: '2',
        name: 'فاطمه احمدی',
        email: 'admin@demo.com',
        role: 'admin' as const,
        isActive: true,
        lastLogin: new Date().toISOString()
      },
      'customer': {
        id: '3',
        name: 'علی رضایی',
        email: 'customer@demo.com',
        role: 'customer' as const,
        isActive: true,
        lastLogin: new Date().toISOString()
      }
    };

    setCurrentUser(mockUsers[role]);
    setIsLoggedIn(true);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const renderCurrentPage = () => {
    if (!currentUser) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'devices':
        return <DeviceManagement user={currentUser} />;
      case 'users':
        return <UserManagement currentUser={currentUser} />;
      case 'analytics':
        return <Analytics user={currentUser} />;
      case 'settings':
        return <Settings user={currentUser} />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  if (!isLoggedIn || !currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        user={currentUser} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser} 
          notifications={notifications}
          onNotificationClick={() => setShowNotifications(true)}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <ChatBot 
        isOpen={showChatBot}
        onToggle={() => setShowChatBot(!showChatBot)}
      />
    </div>
  );
}

export default App;