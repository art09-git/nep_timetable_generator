import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const StudentStats = ({ students }) => {
  const stats = React.useMemo(() => {
    const total = students?.length;
    const active = students?.filter(s => s?.status === 'Active')?.length;
    const inactive = students?.filter(s => s?.status === 'Inactive')?.length;
    const graduated = students?.filter(s => s?.status === 'Graduated')?.length;
    
    const programDistribution = students?.reduce((acc, student) => {
      acc[student.program] = (acc?.[student?.program] || 0) + 1;
      return acc;
    }, {});
    
    const avgCredits = total > 0 ? 
      (students?.reduce((sum, s) => sum + s?.enrolledCredits, 0) / total)?.toFixed(1) : 0;
    
    const totalElectives = students?.reduce((sum, s) => sum + s?.electiveCount, 0);

    return {
      total,
      active,
      inactive,
      graduated,
      programDistribution,
      avgCredits,
      totalElectives
    };
  }, [students]);

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Students',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Average Credits',
      value: stats?.avgCredits,
      icon: 'BookOpen',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Total Electives',
      value: stats?.totalElectives,
      icon: 'GraduationCap',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 elevation-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Program Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="PieChart" size={20} className="mr-2" />
          Program Distribution
        </h3>
        <div className="space-y-3">
          {Object.entries(stats?.programDistribution)?.map(([program, count]) => {
            const percentage = stats?.total > 0 ? ((count / stats?.total) * 100)?.toFixed(1) : 0;
            return (
              <div key={program} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium text-foreground">{program}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count} ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Status Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Status Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="text-2xl font-bold text-success">{stats?.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="text-2xl font-bold text-warning">{stats?.inactive}</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
          <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats?.graduated}</div>
            <div className="text-sm text-muted-foreground">Graduated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;