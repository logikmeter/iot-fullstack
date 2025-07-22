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

  const analyticsData = {
    energyConsumption: {
      current: 12847.3,
      previous: 11923.8,
      change: 7.7,
      trend: 'up',
      data: [
        { day: 'دوشنبه', value: 1850 },
        { day: 'سه‌شنبه', value: 1920 },
        { day: 'چهارشنبه', value: 1780 },
        { day: 'پنج‌شنبه', value: 1950 },
        { day: 'جمعه', value: 2100 },
        { day: 'شنبه', value: 1980 },
        { day: 'یکشنبه', value: 2267 },
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
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">داشبورد تحلیل‌ها</h1>
          <p className="text-gray-600 mt-1">بینش جامع از عملکرد سیستم IoT شما</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse w-full lg:w-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="24h">24 ساعت گذشته</option>
            <option value="7d">7 روز گذشته</option>
            <option value="30d">30 روز گذشته</option>
            <option value="90d">90 روز گذشته</option>
          </select>
          <div className="flex space-x-2 space-x-reverse">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors">
              <Download className="h-4 w-4" />
              <span>خروجی</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">کل مصرف انرژی</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{analyticsData.energyConsumption.current.toLocaleString()}W</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                <span className="text-xs lg:text-sm text-green-600 font-medium">
                  +{analyticsData.energyConsumption.change}%
                </span>
                <span className="text-xs lg:text-sm text-gray-500 mr-1">نسبت به قبل</span>
              </div>
            </div>
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <Zap className="h-4 lg:h-6 w-4 lg:w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">کارایی دستگاه</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">87.4%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                <span className="text-xs lg:text-sm text-green-600 font-medium">+2.1%</span>
                <span className="text-xs lg:text-sm text-gray-500 mr-1">بهبود</span>
              </div>
            </div>
            <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
              <Activity className="h-4 lg:h-6 w-4 lg:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">میانگین دما</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{analyticsData.environmentalData.avgTemperature}°C</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-orange-500 ml-1" />
                <span className="text-xs lg:text-sm text-orange-600 font-medium">
                  +{analyticsData.environmentalData.tempChange}°C
                </span>
                <span className="text-xs lg:text-sm text-gray-500 mr-1">این هفته</span>
              </div>
            </div>
            <div className="bg-orange-100 p-2 lg:p-3 rounded-lg">
              <Thermometer className="h-4 lg:h-6 w-4 lg:w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">میانگین رطوبت</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{analyticsData.environmentalData.avgHumidity}%</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="h-4 w-4 text-blue-500 ml-1" />
                <span className="text-xs lg:text-sm text-blue-600 font-medium">
                  {analyticsData.environmentalData.humidityChange}%
                </span>
                <span className="text-xs lg:text-sm text-gray-500 mr-1">این هفته</span>
              </div>
            </div>
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <Droplets className="h-4 lg:h-6 w-4 lg:w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Consumption Chart */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900">مصرف انرژی</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
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
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {analyticsData.energyConsumption.data.map((item) => (
                <div key={item.day} className="flex items-center">
                  <div className="w-16 lg:w-20 text-xs lg:text-sm text-gray-600">{item.day}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 lg:w-16 text-xs lg:text-sm font-medium text-gray-900 text-left">
                    {item.value}W
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">توزیع وضعیت دستگاه‌ها</h3>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-24 lg:w-32 h-24 lg:h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-green-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg lg:text-xl font-bold text-gray-900">{analyticsData.deviceUtilization.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">آنلاین</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.online}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.online / 100) * analyticsData.deviceUtilization.total)} دستگاه</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">هشدار</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.warning}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.warning / 100) * analyticsData.deviceUtilization.total)} دستگاه</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">آفلاین</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.deviceUtilization.offline}%</span>
                    <div className="text-xs text-gray-500">{Math.floor((analyticsData.deviceUtilization.offline / 100) * analyticsData.deviceUtilization.total)} دستگاه</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">گزارش‌های عملکرد</h3>
        </div>
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">زمان فعالیت سیستم</h4>
              <p className="text-xl lg:text-2xl font-bold text-blue-600 mt-1">99.8%</p>
              <p className="text-sm text-gray-600">30 روز گذشته</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">افزایش کارایی</h4>
              <p className="text-xl lg:text-2xl font-bold text-green-600 mt-1">+12.3%</p>
              <p className="text-sm text-gray-600">این فصل</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900">صرفه‌جویی هزینه</h4>
              <p className="text-xl lg:text-2xl font-bold text-orange-600 mt-1">۲,۸۴۷ تومان</p>
              <p className="text-sm text-gray-600">این ماه</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}