import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TimetableGrid from './components/TimetableGrid';
import NotificationPanel from './components/NotificationPanel';
import CourseInfoCards from './components/CourseInfoCards';
import AcademicProgress from './components/AcademicProgress';
import QuickAccessControls from './components/QuickAccessControls';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState('sem3');
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [viewMode, setViewMode] = useState('weekly');
  const [activeTab, setActiveTab] = useState('timetable');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock student data
  const studentData = {
    id: 'ST2024001',
    name: 'Arjun Kumar',
    rollNumber: '2024-CS-001',
    program: 'B.Tech Computer Science',
    semester: 3,
    year: '2024-25',
    email: 'arjun.kumar@student.jk.gov.in',
    phone: '+91 9876543210',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  useEffect(() => {
    // Check if user is authenticated (mock check)
    const isAuthenticated = localStorage.getItem('studentAuth');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleExport = async (format) => {
    console.log(`Exporting timetable as ${format}`);
    // Mock export functionality
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSync = async () => {
    console.log('Syncing with calendar');
    // Mock sync functionality
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const tabs = [
    { id: 'timetable', label: 'Timetable', icon: 'Calendar' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timetable':
        return (
          <div className="space-y-6">
            <QuickAccessControls
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              selectedWeek={selectedWeek}
              onWeekChange={setSelectedWeek}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onExport={handleExport}
              onSync={handleSync}
            />
            <TimetableGrid
              selectedWeek={selectedWeek}
              viewMode={viewMode}
              studentData={studentData}
            />
          </div>
        );
      case 'courses':
        return <CourseInfoCards />;
      case 'progress':
        return <AcademicProgress />;
      case 'notifications':
        return <NotificationPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Student Info Header */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={studentData?.avatar} 
                    alt={studentData?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl" style={{display: 'none'}}>
                    {studentData?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{studentData?.name}</h1>
                  <p className="text-muted-foreground">{studentData?.rollNumber} • {studentData?.program}</p>
                  <p className="text-sm text-muted-foreground">Semester {studentData?.semester} • {studentData?.year}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                >
                  Help
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('studentAuth');
                    navigate('/login');
                  }}
                  iconName="LogOut"
                  iconPosition="left"
                  className="text-error hover:text-error"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            {/* Desktop Tabs */}
            <div className="hidden md:flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden">
              <div className="flex items-center justify-between bg-card border border-border rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <Icon name={tabs?.find(t => t?.id === activeTab)?.icon} size={20} />
                  <span className="font-medium text-foreground">
                    {tabs?.find(t => t?.id === activeTab)?.label}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  iconName={isMobileMenuOpen ? "X" : "Menu"}
                />
              </div>
              
              {isMobileMenuOpen && (
                <div className="mt-2 bg-card border border-border rounded-lg p-2 space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => {
                        setActiveTab(tab?.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {renderTabContent()}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Overall Attendance</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success">8.2</div>
              <div className="text-sm text-muted-foreground">Current CGPA</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">20</div>
              <div className="text-sm text-muted-foreground">Credits Enrolled</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Pending Tasks</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;