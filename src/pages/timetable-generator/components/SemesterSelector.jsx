import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SemesterSelector = ({ selectedSemester, onSemesterChange, selectedPrograms }) => {
  const semesterOptions = [
    { value: 'all', label: 'All Semesters', description: 'Generate for all active semesters' },
    { value: 'sem1', label: 'Semester 1', description: 'First semester (July - December 2024)' },
    { value: 'sem2', label: 'Semester 2', description: 'Second semester (January - June 2025)' },
    { value: 'sem3', label: 'Semester 3', description: 'Third semester (July - December 2025)' },
    { value: 'sem4', label: 'Semester 4', description: 'Fourth semester (January - June 2026)' },
    { value: 'sem5', label: 'Semester 5', description: 'Fifth semester (July - December 2026)' },
    { value: 'sem6', label: 'Semester 6', description: 'Sixth semester (January - June 2027)' },
    { value: 'sem7', label: 'Semester 7', description: 'Seventh semester (July - December 2027)' },
    { value: 'sem8', label: 'Semester 8', description: 'Eighth semester (January - June 2028)' }
  ];

  const academicInfo = {
    currentSemester: 'Semester 1 (2024-25)',
    academicYear: '2024-25',
    totalStudents: selectedPrograms?.length > 0 ? 
      selectedPrograms?.reduce((total, programId) => {
        const counts = { bed: 120, med: 80, fyup: 200, itep: 150 };
        return total + (counts?.[programId] || 0);
      }, 0) : 0
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Semester & Academic Year</h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Target Semester"
          description="Select semester(s) for timetable generation"
          options={semesterOptions}
          value={selectedSemester}
          onChange={onSemesterChange}
          placeholder="Choose semester..."
          searchable
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BookOpen" size={16} className="text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Current Semester</span>
            </div>
            <p className="font-semibold text-foreground">{academicInfo?.currentSemester}</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CalendarDays" size={16} className="text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Academic Year</span>
            </div>
            <p className="font-semibold text-foreground">{academicInfo?.academicYear}</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Total Students</span>
            </div>
            <p className="font-semibold text-foreground">{academicInfo?.totalStudents?.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterSelector;