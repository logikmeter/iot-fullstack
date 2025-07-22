import React, { useState } from 'react';
import { Send, Bot, User, Minimize2, Maximize2, X, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'سلام! من دستیار هوشمند IoT شما هستم. چطور می‌تونم کمکتون کنم؟',
      isUser: false,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('دستگاه') || input.includes('سنسور')) {
      return 'می‌تونم در مدیریت دستگاه‌ها کمکتون کنم. در حال حاضر ۱۵۶ دستگاه در سیستم شما وجود داره. می‌خواید وضعیت یک دستگاه خاص رو بررسی کنیم یا نمای کلی دستگاه‌ها رو ببینید؟';
    } else if (input.includes('دما') || input.includes('حرارت')) {
      return 'میانگین دمای فعلی سنسورهای شما ۲۲.۱ درجه سانتی‌گراد است. متوجه تغییرات دمایی در ساختمان الف شدم - می‌خواید بیشتر بررسی کنم؟';
    } else if (input.includes('انرژی') || input.includes('برق') || input.includes('مصرف')) {
      return 'مصرف برق فعلی شما ۲,۸۴۷ وات است. این میزان ۷.۷٪ بیشتر از دوره قبل است. می‌خواید ببینید کدوم دستگاه‌ها بیشترین انرژی رو مصرف می‌کنن؟';
    } else if (input.includes('هشدار') || input.includes('اخطار') || input.includes('آلارم')) {
      return 'شما ۸ هشدار فعال دارید. مشکلات اصلی عبارتند از: ۲ دستگاه با باتری کم، ۳ دستگاه با مشکل اتصال، و ۳ هشدار محیطی. می‌خواید اولویت‌بندی کنم؟';
    } else if (input.includes('کمک') || input.includes('راهنما')) {
      return 'می‌تونم در موارد زیر کمکتون کنم:\n• وضعیت و مدیریت دستگاه‌ها\n• تحلیل مصرف انرژی\n• هشدارهای سیستم و عیب‌یابی\n• نظارت بر عملکرد\n• مدیریت کاربران\n\nدرباره کدوم موضوع می‌خواید بیشتر بدونید؟';
    } else {
      return 'متوجه شدم که درباره سیستم IoT سوال دارید. می‌تونید دقیق‌تر بگید؟ می‌تونم در مورد دستگاه‌ها، نظارت انرژی، هشدارها یا عملکرد سیستم کمک کنم.';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 left-6 bg-white rounded-2xl shadow-2xl border z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 lg:w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">دستیار IoT</h3>
            <p className="text-xs text-blue-100">همیشه آماده کمک</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs ${message.isUser ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-600 text-white mr-2'
                        : 'bg-gray-100 text-gray-900 ml-2'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                <div className={`${message.isUser ? 'order-2' : 'order-1'} flex-shrink-0`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="هر سوالی درباره سیستم IoT بپرسید..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}