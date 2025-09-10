import React from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleStats = ({ selectedProgram, selectedSemester }) => {
  const mockStats = {
    'B.Ed': {
      'Semester 1': {
        totalClasses: 24,
        theoryClasses: 18,
        practicalClasses: 6,
        facultyUtilization: 78,
        roomUtilization: 65,
        conflicts: 3,
        optimizationScore: 85,
        weeklyHours: 32,
        averageClassSize: 35,
        peakHours: '10:00 - 12:00',
        freeSlots: 16
      }
    },
    'M.Ed': {
      'Semester 1': {
        totalClasses: 18,
        theoryClasses: 12,
        practicalClasses: 6,
        facultyUtilization: 72,
        roomUtilization: 58,
        conflicts: 1,
        optimizationScore: 92,
        weeklyHours: 24,
        averageClassSize: 28,
        peakHours: '11:00 - 13:00',
        freeSlots: 22
      }
    }
  };

  const currentStats = mockStats?.[selectedProgram]?.[selectedSemester] || mockStats?.['B.Ed']?.['Semester 1'];

  const statCards = [
    {
      title: 'Total Classes',
      value: currentStats?.totalClasses,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Theory Classes',
      value: currentStats?.theoryClasses,
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Practical Classes',
      value: currentStats?.practicalClasses,
      icon: 'Flask',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Weekly Hours',
      value: currentStats?.weeklyHours,
      icon: 'Clock',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Faculty Utilization',
      value: `${currentStats?.facultyUtilization}%`,
      icon: 'Users',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Room Utilization',
      value: `${currentStats?.roomUtilization}%`,
      icon: 'Building',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'Conflicts',
      value: currentStats?.conflicts,
      icon: 'AlertTriangle',
      color: currentStats?.conflicts > 0 ? 'text-error' : 'text-success',
      bgColor: currentStats?.conflicts > 0 ? 'bg-error/10' : 'bg-success/10'
    },
    {
      title: 'Optimization Score',
      value: `${currentStats?.optimizationScore}%`,
      icon: 'Target',
      color: currentStats?.optimizationScore >= 90 ? 'text-success' : 
             currentStats?.optimizationScore >= 70 ? 'text-warning' : 'text-error',
      bgColor: currentStats?.optimizationScore >= 90 ? 'bg-success/10' : 
               currentStats?.optimizationScore >= 70 ? 'bg-warning/10' : 'bg-error/10'
    }
  ];

  const getUtilizationStatus = (percentage) => {
    if (percentage >= 80) return { text: 'High', color: 'text-error' };
    if (percentage >= 60) return { text: 'Optimal', color: 'text-success' };
    return { text: 'Low', color: 'text-warning' };
  };

  const facultyStatus = getUtilizationStatus(currentStats?.facultyUtilization);
  const roomStatus = getUtilizationStatus(currentStats?.roomUtilization);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 hover:elevation-2 transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization Details */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Resource Utilization</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Faculty Utilization</span>
                <span className={`text-sm font-medium ${facultyStatus?.color}`}>
                  {currentStats?.facultyUtilization}% ({facultyStatus?.text})
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentStats?.facultyUtilization}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Room Utilization</span>
                <span className={`text-sm font-medium ${roomStatus?.color}`}>
                  {currentStats?.roomUtilization}% ({roomStatus?.text})
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentStats?.roomUtilization}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Insights */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} />
            <span>Schedule Insights</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Class Size</span>
              <span className="text-sm font-medium text-foreground">{currentStats?.averageClassSize} students</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Peak Hours</span>
              <span className="text-sm font-medium text-foreground">{currentStats?.peakHours}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Free Slots</span>
              <span className="text-sm font-medium text-foreground">{currentStats?.freeSlots} slots</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Optimization Score</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{currentStats?.optimizationScore}%</span>
                <Icon 
                  name={currentStats?.optimizationScore >= 90 ? "TrendingUp" : 
                        currentStats?.optimizationScore >= 70 ? "Minus" : "TrendingDown"} 
                  size={16} 
                  className={currentStats?.optimizationScore >= 90 ? "text-success" : 
                            currentStats?.optimizationScore >= 70 ? "text-warning" : "text-error"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStats;