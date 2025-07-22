import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Power,
  Cpu,
  Thermometer,
  Droplets,
  Battery,
  Wifi,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';
import { Device, User } from '../types';

interface DeviceManagementProps {
  user: User;
}

export default function DeviceManagement({ user }: DeviceManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock devices data
  const devices: Device[] = [
    {
      id: '1',
      name: 'Smart Thermostat Living Room',
      type: 'Climate Control',
      status: 'online',
      location: 'Building A - Floor 1',
      temperature: 22.5,
      humidity: 45,
      power: 85,
      lastUpdate: '2024-01-15T10:30:00Z',
      batteryLevel: 92
    },
    {
      id: '2',
      name: 'Security Camera Main Entrance',
      type: 'Security',
      status: 'warning',
      location: 'Building A - Entrance',
      power: 120,
      lastUpdate: '2024-01-15T10:29:00Z',
      batteryLevel: 78
    },
    {
      id: '3',
      name: 'LED Light Controller Office',
      type: 'Lighting',
      status: 'offline',
      location: 'Building B - Floor 2',
      power: 0,
      lastUpdate: '2024-01-15T10:15:00Z',
      batteryLevel: 0
    },
    {
      id: '4',
      name: 'Environmental Sensor Lab',
      type: 'Monitoring',
      status: 'online',
      location: 'Building A - Floor 2',
      temperature: 21.8,
      humidity: 52,
      power: 45,
      lastUpdate: '2024-01-15T10:30:30Z',
      batteryLevel: 88
    },
    {
      id: '5',
      name: 'Smart Lock Conference Room',
      type: 'Security',
      status: 'online',
      location: 'Building B - Floor 1',
      power: 25,
      lastUpdate: '2024-01-15T10:28:00Z',
      batteryLevel: 95
    },
    {
      id: '6',
      name: 'Air Quality Monitor',
      type: 'Monitoring',
      status: 'error',
      location: 'Building A - Floor 3',
      temperature: 24.2,
      humidity: 38,
      power: 0,
      lastUpdate: '2024-01-15T09:45:00Z',
      batteryLevel: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'climate control': return <Thermometer className="h-4 w-4" />;
      case 'security': return <Wifi className="h-4 w-4" />;
      case 'lighting': return <Power className="h-4 w-4" />;
      case 'monitoring': return <Activity className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600 mt-1">Monitor and control all your IoT devices</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Device</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div key={device.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {getTypeIcon(device.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{device.location}</span>
                </div>

                {device.temperature && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Thermometer className="h-4 w-4 mr-1" />
                      Temperature
                    </span>
                    <span className="text-sm font-medium">{device.temperature}°C</span>
                  </div>
                )}

                {device.humidity && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Droplets className="h-4 w-4 mr-1" />
                      Humidity
                    </span>
                    <span className="text-sm font-medium">{device.humidity}%</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Power className="h-4 w-4 mr-1" />
                    Power Usage
                  </span>
                  <span className="text-sm font-medium">{device.power}W</span>
                </div>

                {device.batteryLevel !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Battery className="h-4 w-4 mr-1" />
                      Battery
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            device.batteryLevel > 50 ? 'bg-green-500' : 
                            device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{width: `${device.batteryLevel}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{device.batteryLevel}%</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatLastUpdate(device.lastUpdate)}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded transition-colors">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Device</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter device name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>Climate Control</option>
                  <option>Security</option>
                  <option>Lighting</option>
                  <option>Monitoring</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}