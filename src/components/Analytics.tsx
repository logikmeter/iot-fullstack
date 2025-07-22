import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Thermometer,
  Droplets
} from 'lucide-react';
import { User } from '../types';

interface AnalyticsProps {
  user: User;
}

export default function Analytics({ user }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');

  // Mock analytics data
  const analyticsData = {
    energyConsumption: {
      current: 12847.3,
      previous: 11923.8,
      change: 7.7,
      trend: 'up',
      data: [
        { day: 'Mon', value: 1850 },
        { day: 'Tue', value: 1920 },
        { day: 'Wed', value: 1780 },
        { day: 'Thu', value: 1950 },
        { day: 'Fri', value: 2100 },
        { day: 'Sat', value: 1980 },
        { day: 'Sun', value: 2267 },
      ]
    },
    deviceUtilization: {
      online: 84,
      warning: 12,
      offline: 4,
      total: 156
    },
    environmentalData: {
      avgTemperature: 22.3,
      avgHumidity: 48.7,
      tempChange: 1.2,
      humidityChange: -2.1
    }
  };

  const maxValue = Math.max(...analyticsData.energyConsumption.data.map(d => d.value));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your IoT system performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 text-gray-600" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Energy Usage</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.energyConsumption.current.toLocaleString()}W</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">
                  +{analyticsData.energyConsumption.change}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Device Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">87.4%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+2.1%</span>
                <span className="text-sm text-gray-500 ml-1">improvement</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.environmentalData.avgTemperature}°C</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600 font-medium">
                  +{analyticsData.environmentalData.tempChange}°C
                </span>
                <span className="text-sm text-gray-500 ml-1">this week</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Humidity</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.environmentalData.avgHumidity}%</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600 font-medium">
                  {analyticsData.environmentalData.humidityChange}%
                </span>
                <span className="text-sm text-gray-500 ml-1">this week</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Consumption Chart */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Energy Consumption</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'line' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'pie' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {analyticsData.energyConsumption.data.map((item) => (
                <div key={item.day} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{item.day}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-sm font-medium text-gray-900 text-right">
                    {item.value}W
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Device Status Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {/* Simple Donut Chart Representation */}
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-green-200"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-green-500 border-r-transparent border-b-transparent transform -rotate-90"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + (analyticsData.deviceUtilization.online / 100) * 50}% 0%, 100% ${50 - (analyticsData.deviceUtilization.online / 100) * 50}%, 100% 100%, 50% 100%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">{analyticsData.deviceUtilization.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Online</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.online}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.online / 100) * analyticsData.deviceUtilization.total)} devices</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Warning</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.warning}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.warning / 100) * analyticsData.deviceUtilization.total)} devices</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Offline</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.offline}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.offline / 100) * analyticsData.deviceUtilization.total)} devices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance Reports</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">System Uptime</h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">99.8%</p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Efficiency Gain</h4>
              <p className="text-2xl font-bold text-green-600 mt-1">+12.3%</p>
              <p className="text-sm text-gray-600">This quarter</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900">Cost Savings</h4>
              <p className="text-2xl font-bold text-orange-600 mt-1">$2,847</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}