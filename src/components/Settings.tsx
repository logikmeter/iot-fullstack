import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Shield, 
  Bell, 
  Monitor, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

export default function Settings({ user }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      sms: false,
      deviceAlerts: true,
      systemUpdates: true,
      weeklyReports: true
    },
    preferences: {
      theme: 'light',
      language: 'fa',
      timezone: 'Asia/Tehran',
      dateFormat: 'YYYY/MM/DD',
      temperatureUnit: 'celsius'
    }
  });

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: UserIcon },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'notifications', label: 'اعلانات', icon: Bell },
    { id: 'preferences', label: 'تنظیمات', icon: Monitor },
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData);
    alert('تنظیمات با موفقیت ذخیره شد!');
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">تنظیمات</h1>
        <p className="text-gray-600 mt-1">مدیریت تنظیمات حساب کاربری و ترجیحات شما</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border">
            <nav className="space-y-1 p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-right transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">اطلاعات پروفایل</h3>
                
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <button className="absolute bottom-0 left-0 bg-white p-2 rounded-full shadow-lg border hover:bg-gray-50 transition-colors">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="text-center sm:text-right">
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-gray-600">
                      {user.role === 'super-admin' ? 'سوپر ادمین' : 
                       user.role === 'admin' ? 'ادمین' : 'مشتری'}
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1">
                      تغییر عکس
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نام کامل
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      آدرس ایمیل
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ltr"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نقش
                    </label>
                    <input
                      type="text"
                      value={user.role === 'super-admin' ? 'سوپر ادمین' : 
                             user.role === 'admin' ? 'ادمین' : 'مشتری'}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      آخرین ورود
                    </label>
                    <input
                      type="text"
                      value={user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fa-IR') : 'هرگز'}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">تنظیمات امنیتی</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">تغییر رمز عبور</h4>
                    <div className="grid grid-cols-1 gap-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رمز عبور فعلی
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ltr"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ltr"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تکرار رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ltr"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">احراز هویت دو مرحله‌ای</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">فعال‌سازی 2FA</p>
                        <p className="text-sm text-gray-600">لایه امنیتی اضافی به حساب شما اضافه کنید</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        راه‌اندازی
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">تنظیمات اعلانات</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">روش‌های اعلان</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'اعلانات ایمیل', description: 'دریافت اعلانات از طریق ایمیل' },
                        { key: 'push', label: 'اعلانات پوش', description: 'اعلانات مرورگر و موبایل' },
                        { key: 'sms', label: 'اعلانات پیامک', description: 'پیام متنی برای هشدارهای مهم' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{label}</p>
                            <p className="text-sm text-gray-600">{description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.notifications[key as keyof typeof formData.notifications]}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">انواع اعلانات</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'deviceAlerts', label: 'هشدارهای دستگاه', description: 'اعلانات مربوط به تغییر وضعیت دستگاه‌ها' },
                        { key: 'systemUpdates', label: 'به‌روزرسانی‌های سیستم', description: 'اطلاعات مربوط به نگهداری و تغییرات سیستم' },
                        { key: 'weeklyReports', label: 'گزارش‌های هفتگی', description: 'خلاصه هفتگی عملکرد سیستم' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{label}</p>
                            <p className="text-sm text-gray-600">{description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.notifications[key as keyof typeof formData.notifications]}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">تنظیمات سیستم</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تم
                    </label>
                    <select
                      value={formData.preferences.theme}
                      onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="light">روشن</option>
                      <option value="dark">تیره</option>
                      <option value="auto">خودکار</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      زبان
                    </label>
                    <select
                      value={formData.preferences.language}
                      onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="fa">فارسی</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      منطقه زمانی
                    </label>
                    <select
                      value={formData.preferences.timezone}
                      onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="Asia/Tehran">تهران (UTC+3:30)</option>
                      <option value="UTC">UTC+0 (GMT)</option>
                      <option value="America/New_York">نیویورک (UTC-5)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      فرمت تاریخ
                    </label>
                    <select
                      value={formData.preferences.dateFormat}
                      onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      واحد دما
                    </label>
                    <select
                      value={formData.preferences.temperatureUnit}
                      onChange={(e) => handleInputChange('preferences', 'temperatureUnit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="celsius">سانتی‌گراد (°C)</option>
                      <option value="fahrenheit">فارنهایت (°F)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-4 lg:px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>ذخیره تغییرات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}