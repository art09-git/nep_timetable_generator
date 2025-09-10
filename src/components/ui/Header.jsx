import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { label: 'Courses', path: '/course-management', icon: 'BookOpen' },
    { label: 'Students', path: '/student-management', icon: 'Users' },
    { label: 'Timetables', path: '/timetable-generator', icon: 'Calendar' },
    { label: 'View Schedule', path: '/timetable-view', icon: 'Eye' }
  ];

  const notifications = [
    { id: 1, title: 'Schedule Updated', message: 'Computer Science timetable has been updated', time: '5 min ago', unread: true },
    { id: 2, title: 'Conflict Resolved', message: 'Room allocation conflict resolved for Mathematics', time: '1 hour ago', unread: true },
    { id: 3, title: 'New Course Added', message: 'Data Structures course has been added', time: '2 hours ago', unread: false }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') return location?.pathname === '/';
    return location?.pathname?.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-2">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">NEP Timetable</h1>
              <p className="text-xs text-muted-foreground">Government of J&K</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg elevation-3 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth ${
                        notification?.unread ? 'bg-accent/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-popover-foreground">{notification?.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                        </div>
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-accent rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium">Admin</span>
              <Icon name="ChevronDown" size={16} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg elevation-3 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">Administrator</p>
                  <p className="text-sm text-muted-foreground">admin@jk.gov.in</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border elevation-2">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;