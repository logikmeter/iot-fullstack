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
  // Mock data - در پروژه واقعی از API دریافت می‌شود
  const stats: DashboardStats = {
    totalDevices: 156,
    activeDevices: 142,
    alerts: 8,
    powerConsumption: 2847.5
  };

  const recentDevices: Device[] = [
    {
      id: '1',
      name: 'Smart Thermostat Living Room',
      type: 'Climate Control',
      status: 'online',
      location: 'Building A - Floor 1',
      temperature: 22.5,
      humidity: 45,
      power: 85,
      lastUpdate: '2 minutes ago',
      batteryLevel: 92
    },
    {
      id: '2', 
      name: 'Security Camera Main Entrance',
      type: 'Security',
      status: 'warning',
      location: 'Building A - Entrance',
      power: 120,
      lastUpdate: '1 minute ago',
      batteryLevel: 78
    },
    {
      id: '3',
      name: 'LED Light Controller',
      type: 'Lighting',
      status: 'offline',
      location: 'Building B - Floor 2',
      power: 0,
      lastUpdate: '15 minutes ago',
      batteryLevel: 0
    },
    {
      id: '4',
      name: 'Environmental Sensor',
      type: 'Monitoring',
      status: 'online',
      location: 'Building A - Floor 2',
      temperature: 21.8,
      humidity: 52,
      power: 45,
      lastUpdate: '30 seconds ago',
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

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-blue-100 text-lg">
              Here's your IoT system overview for today
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Zap className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Devices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.alerts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Power Usage</p>
              <p className="text-2xl font-bold text-gray-900">{stats.powerConsumption}W</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Devices */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Devices</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(device.status)}`}>
                      {getStatusIcon(device.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <p className="text-sm text-gray-600">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{device.power}W</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
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
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Network Connectivity</span>
                  <span className="text-sm text-green-600 font-medium">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '98.5%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Device Response Time</span>
                  <span className="text-sm text-blue-600 font-medium">0.8s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">System Load</span>
                  <span className="text-sm text-yellow-600 font-medium">64%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '64%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Data Integrity</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">Average Temperature</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">22.1°C</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +1.2° from yesterday
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Average Humidity</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">48.7%</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                Optimal range
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Battery className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">Battery Health</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">86.3%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                Good condition
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Battery className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}