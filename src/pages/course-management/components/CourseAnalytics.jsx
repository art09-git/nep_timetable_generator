import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const CourseAnalytics = ({ courses }) => {
  // Calculate analytics data
  const programDistribution = courses?.reduce((acc, course) => {
    acc[course.program] = (acc?.[course?.program] || 0) + 1;
    return acc;
  }, {});

  const creditDistribution = courses?.reduce((acc, course) => {
    const range = course?.credits <= 2 ? '1-2' : course?.credits <= 4 ? '3-4' : '5+';
    acc[range] = (acc?.[range] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = courses?.reduce((acc, course) => {
    acc[course.status] = (acc?.[course?.status] || 0) + 1;
    return acc;
  }, {});

  const nepCompliance = courses?.reduce((acc, course) => {
    const key = course?.nepCompliant ? 'compliant' : 'non-compliant';
    acc[key] = (acc?.[key] || 0) + 1;
    return acc;
  }, {});

  // Chart data
  const programChartData = Object.entries(programDistribution)?.map(([program, count]) => ({
    program: program?.toUpperCase(),
    count,
    percentage: ((count / courses?.length) * 100)?.toFixed(1)
  }));

  const creditChartData = Object.entries(creditDistribution)?.map(([range, count]) => ({
    range: `${range} Credits`,
    count,
    percentage: ((count / courses?.length) * 100)?.toFixed(1)
  }));

  const statusPieData = Object.entries(statusDistribution)?.map(([status, count]) => ({
    name: status?.charAt(0)?.toUpperCase() + status?.slice(1),
    value: count,
    percentage: ((count / courses?.length) * 100)?.toFixed(1)
  }));

  const nepPieData = Object.entries(nepCompliance)?.map(([status, count]) => ({
    name: status === 'compliant' ? 'NEP Compliant' : 'Needs Review',
    value: count,
    percentage: ((count / courses?.length) * 100)?.toFixed(1)
  }));

  const COLORS = {
    primary: '#1e40af',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    secondary: '#64748b',
    accent: '#0ea5e9'
  };

  const pieColors = [COLORS?.primary, COLORS?.success, COLORS?.warning, COLORS?.error];

  const totalCredits = courses?.reduce((sum, course) => sum + course?.credits, 0);
  const avgCredits = courses?.length > 0 ? (totalCredits / courses?.length)?.toFixed(1) : 0;
  const activeCoursesCount = courses?.filter(c => c?.status === 'active')?.length;
  const nepCompliantCount = courses?.filter(c => c?.nepCompliant)?.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold text-foreground">{courses?.length}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold text-success">{activeCoursesCount}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Credits</p>
              <p className="text-2xl font-bold text-foreground">{totalCredits}</p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">NEP Compliant</p>
              <p className="text-2xl font-bold text-success">{nepCompliantCount}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-success" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Program Distribution</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="program" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [value, 'Courses']}
                />
                <Bar dataKey="count" fill={COLORS?.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="PieChart" size={20} />
            <span>Credit Distribution</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creditChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [value, 'Courses']}
                />
                <Bar dataKey="count" fill={COLORS?.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Activity" size={20} />
            <span>Course Status</span>
          </h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors?.[index % pieColors?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [`${value} (${statusPieData?.find(d => d?.name === name)?.percentage}%)`, 'Courses']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {statusPieData?.map((entry, index) => (
              <div key={entry?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: pieColors?.[index % pieColors?.length] }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry?.name} ({entry?.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NEP Compliance */}
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span>NEP 2020 Compliance</span>
          </h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nepPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {nepPieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS?.success : COLORS?.warning} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [`${value} (${nepPieData?.find(d => d?.name === name)?.percentage}%)`, 'Courses']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {nepPieData?.map((entry, index) => (
              <div key={entry?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: index === 0 ? COLORS?.success : COLORS?.warning }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry?.name} ({entry?.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Additional Insights */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Key Insights</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Average Credits per Course</p>
            <p className="text-xl font-semibold text-foreground">{avgCredits}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Most Common Program</p>
            <p className="text-xl font-semibold text-foreground">
              {Object.entries(programDistribution)?.reduce((a, b) => programDistribution?.[a?.[0]] > programDistribution?.[b?.[0]] ? a : b)?.[0]?.toUpperCase()}
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Compliance Rate</p>
            <p className="text-xl font-semibold text-success">
              {((nepCompliantCount / courses?.length) * 100)?.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;