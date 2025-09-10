import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickAccessControls = ({ 
  selectedSemester, 
  onSemesterChange, 
  selectedWeek, 
  onWeekChange, 
  viewMode, 
  onViewModeChange,
  onExport,
  onSync 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const semesterOptions = [
    { value: 'sem1', label: 'Semester 1 (2023-24)' },
    { value: 'sem2', label: 'Semester 2 (2023-24)' },
    { value: 'sem3', label: 'Semester 3 (2024-25)', description: 'Current' },
    { value: 'sem4', label: 'Semester 4 (2024-25)', description: 'Upcoming' }
  ];

  const weekOptions = [
    { value: 'current', label: 'Current Week' },
    { value: 'week1', label: 'Week 1 (Sep 9-15)' },
    { value: 'week2', label: 'Week 2 (Sep 16-22)' },
    { value: 'week3', label: 'Week 3 (Sep 23-29)' },
    { value: 'week4', label: 'Week 4 (Sep 30-Oct 6)' }
  ];

  const viewModeOptions = [
    { value: 'weekly', label: 'Weekly View', icon: 'Calendar' },
    { value: 'daily', label: 'Daily View', icon: 'CalendarDays' },
    { value: 'monthly', label: 'Monthly View', icon: 'CalendarRange' }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport?.(format);
      // Simulate export delay
      setTimeout(() => setIsExporting(false), 2000);
    } catch (error) {
      setIsExporting(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await onSync?.();
      setTimeout(() => setIsSyncing(false), 1500);
    } catch (error) {
      setIsSyncing(false);
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today?.getDay();
    const monday = new Date(today);
    monday?.setDate(today?.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const sunday = new Date(monday);
    sunday?.setDate(monday?.getDate() + 6);
    
    return {
      start: monday?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      end: sunday?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    };
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      {/* Top Row - Semester and Week Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Academic Semester"
          options={semesterOptions}
          value={selectedSemester}
          onChange={onSemesterChange}
          className="w-full"
        />
        
        <Select
          label="Week Selection"
          options={weekOptions}
          value={selectedWeek}
          onChange={onWeekChange}
          description={selectedWeek === 'current' ? `${weekDates?.start} - ${weekDates?.end}` : ''}
          className="w-full"
        />
      </div>
      {/* View Mode Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">View Mode</label>
        <div className="flex flex-wrap gap-2">
          {viewModeOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={viewMode === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange?.(option?.value)}
              iconName={option?.icon}
              iconPosition="left"
              className="flex-1 md:flex-none"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('pdf')}
          loading={isExporting}
          iconName="FileText"
          iconPosition="left"
          className="flex-1 md:flex-none"
        >
          Export PDF
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('ical')}
          loading={isExporting}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1 md:flex-none"
        >
          Export Calendar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          loading={isSyncing}
          iconName="RefreshCw"
          iconPosition="left"
          className="flex-1 md:flex-none"
        >
          Sync Calendar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          className="flex-1 md:flex-none"
        >
          Share Schedule
        </Button>
      </div>
      {/* Week Navigation for Weekly/Daily View */}
      {(viewMode === 'weekly' || viewMode === 'daily') && (
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle previous week navigation
              console.log('Previous week');
            }}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {viewMode === 'daily' ? 'Today' : 'This Week'}
            </div>
            <div className="text-xs text-muted-foreground">
              {viewMode === 'daily' ? new Date()?.toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    day: '2-digit', 
                    month: 'long' 
                  })
                : `${weekDates?.start} - ${weekDates?.end}`
              }
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle next week navigation
              console.log('Next week');
            }}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
      {/* Mobile-specific quick access */}
      <div className="md:hidden flex justify-center">
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            // Scroll to today's schedule
            const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' });
            const element = document.getElementById(`schedule-${today?.toLowerCase()}`);
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          iconName="MapPin"
          iconPosition="left"
          className="w-full"
        >
          Go to Today
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessControls;