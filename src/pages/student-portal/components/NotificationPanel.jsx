import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'schedule_change',
      title: 'Schedule Update',
      message: 'Mathematics class on Monday has been moved from Room 201 to Room 205',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment Reminder',
      message: 'Physics lab report is due tomorrow. Submit before 5:00 PM',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Holiday Notice',
      message: 'College will remain closed on 15th September due to public holiday',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'exam',
      title: 'Exam Schedule Released',
      message: 'Mid-semester examination schedule has been published. Check your timetable',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Your attendance in Chemistry is below 75%. Please attend upcoming classes',
      timestamp: new Date(Date.now() - 172800000),
      read: false,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const icons = {
      schedule_change: 'Calendar',
      assignment: 'FileText',
      announcement: 'Megaphone',
      exam: 'GraduationCap',
      attendance: 'UserCheck'
    };
    return icons?.[type] || 'Bell';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications?.filter(notif => {
    if (filter === 'unread') return !notif?.read;
    if (filter === 'high') return notif?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('high')}
          >
            Priority
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-smooth cursor-pointer ${
                  !notification?.read ? 'bg-accent/5' : ''
                }`}
                onClick={() => markAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-muted ${getPriorityColor(notification?.priority)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification?.timestamp)}
                        </span>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification?.message}
                    </p>
                    
                    {notification?.priority === 'high' && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Icon name="AlertTriangle" size={12} className="text-error" />
                        <span className="text-xs text-error font-medium">High Priority</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;