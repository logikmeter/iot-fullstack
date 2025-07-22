import React from 'react';
import { 
  Cpu, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Battery,
  Wifi,
  Clock,
  Activity
} from 'lucide-react';
import { Device, DashboardStats, User } from '../types';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const stats: DashboardStats = {
    totalDevices: 156,
    activeDevices: 142,
    alerts: 8,
    powerConsumption: 2847.5
  };

  const recentDevices: Device[] = [
    {
      id: '1',
      name: 'ترموستات هوشمند اتاق نشیمن',
      type: 'کنترل آب و هوا',
      status: 'online',
      location: 'ساختمان الف - طبقه اول',
      temperature: 22.5,
      humidity: 45,
      power: 85,
      lastUpdate: '2 دقیقه پیش',
      batteryLevel: 92
    },
    {
      id: '2', 
      name: 'دوربین امنیتی ورودی اصلی',
      type: 'امنیت',
      status: 'warning',
      location: 'ساختمان الف - ورودی',
      power: 120,
      lastUpdate: '1 دقیقه پیش',
      batteryLevel: 78
    },
    {
      id: '3',
      name: 'کنترلر چراغ LED',
      type: 'روشنایی',
      status: 'offline',
      location: 'ساختمان ب - طبقه دوم',
      power: 0,
      lastUpdate: '15 دقیقه پیش',
      batteryLevel: 0
    },
    {
      id: '4',
      name: 'سنسور محیطی',
      type: 'نظارت',
      status: 'online',
      location: 'ساختمان الف - طبقه دوم',
      temperature: 21.8,
      humidity: 52,
      power: 45,
      lastUpdate: '30 ثانیه پیش',
      batteryLevel: 88
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Activity className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'offline': return <Wifi className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'آنلاین';
      case 'warning': return 'هشدار';
      case 'offline': return 'آفلاین';
      case 'error': return 'خطا';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              خوش آمدید، {user.name}!
            </h1>
            <p className="text-blue-100 text-base lg:text-lg">
              نمای کلی سیستم IoT شما برای امروز
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Zap className="h-8 lg:h-12 w-8 lg:w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow card-hover">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <Cpu className="h-4 lg:h-6 w-4 lg:w-6 text-blue-600" />
            </div>
            <div className="mr-3 lg:mr-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">کل دستگاه‌ها</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.totalDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow card-hover">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
              <Activity className="h-4 lg:h-6 w-4 lg:w-6 text-green-600" />
            </div>
            <div className="mr-3 lg:mr-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">دستگاه‌های فعال</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.activeDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow card-hover">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 lg:p-3 rounded-lg">
              <AlertTriangle className="h-4 lg:h-6 w-4 lg:w-6 text-red-600" />
            </div>
            <div className="mr-3 lg:mr-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">هشدارهای فعال</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.alerts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border hover:shadow-md transition-shadow card-hover">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg">
              <Zap className="h-4 lg:h-6 w-4 lg:w-6 text-yellow-600" />
            </div>
            <div className="mr-3 lg:mr-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">مصرف برق</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.powerConsumption}W</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Devices */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900">دستگاه‌های اخیر</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                مشاهده همه
              </button>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {recentDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${getStatusColor(device.status)}`}>
                      {getStatusIcon(device.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm lg:text-base">{device.name}</h3>
                      <p className="text-xs lg:text-sm text-gray-600">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{device.power}W</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 ml-1" />
                      {device.lastUpdate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base lg:text-lg font-semibold text-gray-900">سلامت سیستم</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">اتصال شبکه</span>
                  <span className="text-sm text-green-600 font-medium">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '98.5%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">زمان پاسخ دستگاه</span>
                  <span className="text-sm text-blue-600 font-medium">0.8s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">بار سیستم</span>
                  <span className="text-sm text-yellow-600 font-medium">64%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '64%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">یکپارچگی داده</span>
                  <span className="text-sm text-green-600 font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">میانگین دما</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">22.1°C</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 ml-1" />
                +1.2° نسبت به دیروز
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Thermometer className="h-6 lg:h-8 w-6 lg:w-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">میانگین رطوبت</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">48.7%</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 ml-1" />
                محدوده مطلوب
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Droplets className="h-6 lg:h-8 w-6 lg:w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Battery className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">سلامت باتری</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">86.3%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 ml-1" />
                وضعیت خوب
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Battery className="h-6 lg:h-8 w-6 lg:w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}