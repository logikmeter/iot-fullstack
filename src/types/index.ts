export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'customer';
  avatar?: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  location: string;
  temperature?: number;
  humidity?: number;
  power: number;
  lastUpdate: string;
  batteryLevel?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}

export interface DashboardStats {
  totalDevices: number;
  activeDevices: number;
  alerts: number;
  powerConsumption: number;
}