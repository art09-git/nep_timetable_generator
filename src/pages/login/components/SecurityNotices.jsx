import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotices = () => {
  const [currentNotice, setCurrentNotice] = useState(0);

  const securityNotices = [
    {
      type: 'info',
      icon: 'Info',
      title: 'Session Security',
      message: 'Your session will automatically expire after 30 minutes of inactivity for security purposes.',
      color: 'text-accent'
    },
    {
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Account Protection',
      message: 'After 3 failed login attempts, your account will be temporarily locked for 15 minutes.',
      color: 'text-warning'
    },
    {
      type: 'success',
      icon: 'Shield',
      title: 'Secure Connection',
      message: 'All data transmission is encrypted using industry-standard SSL/TLS protocols.',
      color: 'text-success'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % securityNotices?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [securityNotices?.length]);

  const notice = securityNotices?.[currentNotice];

  return (
    <div className="space-y-4">
      {/* Rotating Security Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4 transition-all duration-500">
        <div className="flex items-start space-x-3">
          <Icon 
            name={notice?.icon} 
            size={20} 
            className={`${notice?.color} mt-0.5 flex-shrink-0`} 
          />
          <div className="flex-1">
            <h4 className="font-medium text-foreground text-sm mb-1">
              {notice?.title}
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {notice?.message}
            </p>
          </div>
        </div>
      </div>
      {/* Notice Indicators */}
      <div className="flex justify-center space-x-2">
        {securityNotices?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentNotice(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentNotice ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label={`View security notice ${index + 1}`}
          />
        ))}
      </div>
      {/* System Status */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-success text-xs font-medium">System Status: Online</span>
        </div>
        <p className="text-success/80 text-xs mt-1">
          Last updated: {new Date()?.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      {/* Quick Access Links */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground text-sm">Quick Access</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center space-x-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
            <Icon name="FileText" size={14} />
            <span>User Guide</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
            <Icon name="HelpCircle" size={14} />
            <span>FAQ</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
            <Icon name="Download" size={14} />
            <span>Mobile App</span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth">
            <Icon name="MessageCircle" size={14} />
            <span>Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotices;