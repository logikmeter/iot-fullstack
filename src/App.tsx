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

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Device Offline',
      message: 'LED Light Controller in Building B - Floor 2 has gone offline',
      type: 'error',
      timestamp: '2024-01-15T10:15:00Z',
      isRead: false
    },
    {
      id: '2',
      title: 'Low Battery Warning',
      message: 'Security Camera Main Entrance battery level is at 15%',
      type: 'warning',
      timestamp: '2024-01-15T09:30:00Z',
      isRead: false
    },
    {
      id: '3',
      title: 'System Update Complete',
      message: 'IoT Control Hub has been successfully updated to version 2.1.0',
      type: 'success',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true
    },
    {
      id: '4',
      title: 'New Device Connected',
      message: 'Smart Lock Conference Room has been successfully added to your network',
      type: 'info',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: false
    },
    {
      id: '5',
      title: 'High Temperature Alert',
      message: 'Environmental Sensor Lab is reporting temperature above normal range (26.5°C)',
      type: 'warning',
      timestamp: '2024-01-14T14:30:00Z',
      isRead: true
    },
    {
      id: '6',
      title: 'Energy Consumption Report',
      message: 'Your monthly energy consumption report is now available for download',
      type: 'info',
      timestamp: '2024-01-14T12:00:00Z',
      isRead: false
    },
    {
      id: '7',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      type: 'error',
      timestamp: '2024-01-14T10:45:00Z',
      isRead: false
    },
    {
      id: '8',
      title: 'Maintenance Scheduled',
      message: 'System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM',
      type: 'info',
      timestamp: '2024-01-13T18:00:00Z',
      isRead: true
    }
  ]);

  const handleLogin = (role: 'super-admin' | 'admin' | 'customer') => {
    const mockUsers = {
      'super-admin': {
        id: '1',
        name: 'John Smith',
        email: 'superadmin@demo.com',
        role: 'super-admin' as const,
        isActive: true,
        lastLogin: new Date().toISOString()
      },
      'admin': {
        id: '2',
        name: 'Sarah Johnson',
        email: 'admin@demo.com',
        role: 'admin' as const,
        isActive: true,
        lastLogin: new Date().toISOString()
      },
      'customer': {
        id: '3',
        name: 'Mike Wilson',
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
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser} 
          notifications={notifications}
          onNotificationClick={() => setShowNotifications(true)} 
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