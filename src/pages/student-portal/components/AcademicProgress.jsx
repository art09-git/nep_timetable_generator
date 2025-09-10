import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcademicProgress = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');

  const academicData = {
    current: {
      semester: 'Semester 3',
      year: '2024-25',
      enrolledCredits: 20,
      completedCredits: 13,
      cgpa: 8.2,
      sgpa: 8.5,
      totalCredits: 120,
      completedTotalCredits: 53
    },
    overall: {
      totalSemesters: 8,
      completedSemesters: 2,
      overallCGPA: 8.2,
      totalCreditsRequired: 120,
      creditsCompleted: 53,
      creditsInProgress: 20
    }
  };

  const semesterHistory = [
    {
      semester: 'Semester 1',
      year: '2023-24',
      credits: 18,
      sgpa: 8.1,
      status: 'completed',
      subjects: [
        { name: 'Mathematics I', grade: 'A', credits: 4 },
        { name: 'Physics I', grade: 'A-', credits: 4 },
        { name: 'Chemistry I', grade: 'B+', credits: 4 },
        { name: 'English I', grade: 'A', credits: 3 },
        { name: 'Environmental Studies', grade: 'A-', credits: 3 }
      ]
    },
    {
      semester: 'Semester 2',
      year: '2023-24',
      credits: 18,
      sgpa: 8.3,
      status: 'completed',
      subjects: [
        { name: 'Mathematics II', grade: 'A', credits: 4 },
        { name: 'Physics II', grade: 'A', credits: 4 },
        { name: 'Chemistry II', grade: 'B+', credits: 4 },
        { name: 'English II', grade: 'A-', credits: 3 },
        { name: 'Computer Science I', grade: 'A', credits: 3 }
      ]
    },
    {
      semester: 'Semester 3',
      year: '2024-25',
      credits: 20,
      sgpa: 8.5,
      status: 'in_progress',
      subjects: [
        { name: 'Mathematics III', grade: 'A', credits: 4 },
        { name: 'Physics III', grade: 'A-', credits: 4 },
        { name: 'Computer Science II', grade: 'A', credits: 4 },
        { name: 'Statistics', grade: 'B+', credits: 3 },
        { name: 'Technical Writing', grade: 'A-', credits: 3 },
        { name: 'Project Work I', grade: 'IP', credits: 2 }
      ]
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'Mid-semester Examinations',
      date: '2025-09-25',
      type: 'exam',
      priority: 'high'
    },
    {
      title: 'Project Proposal Submission',
      date: '2025-09-18',
      type: 'assignment',
      priority: 'high'
    },
    {
      title: 'Course Registration for Semester 4',
      date: '2025-10-15',
      type: 'registration',
      priority: 'medium'
    },
    {
      title: 'Internship Application Deadline',
      date: '2025-10-30',
      type: 'application',
      priority: 'medium'
    }
  ];

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-success';
    if (grade === 'A-' || grade === 'B+') return 'text-primary';
    if (grade === 'B' || grade === 'B-') return 'text-warning';
    if (grade === 'IP') return 'text-accent';
    return 'text-muted-foreground';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-l-error bg-error/5',
      medium: 'border-l-warning bg-warning/5',
      low: 'border-l-muted-foreground bg-muted/5'
    };
    return colors?.[priority] || colors?.low;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const progressPercentage = (academicData?.overall?.creditsCompleted / academicData?.overall?.totalCreditsRequired) * 100;
  const currentSemesterProgress = (academicData?.current?.completedCredits / academicData?.current?.enrolledCredits) * 100;

  return (
    <div className="space-y-6">
      {/* Academic Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Academic Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">{academicData?.current?.cgpa}</div>
            <div className="text-sm text-muted-foreground">Current CGPA</div>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <div className="text-2xl font-bold text-accent">{academicData?.current?.sgpa}</div>
            <div className="text-sm text-muted-foreground">Current SGPA</div>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-2xl font-bold text-success">{academicData?.overall?.creditsCompleted}</div>
            <div className="text-sm text-muted-foreground">Credits Completed</div>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <div className="text-2xl font-bold text-warning">{academicData?.current?.enrolledCredits}</div>
            <div className="text-sm text-muted-foreground">Current Credits</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {academicData?.overall?.creditsCompleted}/{academicData?.overall?.totalCreditsRequired} Credits
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Current Semester</span>
              <span className="text-sm text-muted-foreground">
                {academicData?.current?.completedCredits}/{academicData?.current?.enrolledCredits} Credits
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${currentSemesterProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(currentSemesterProgress)}% Complete
            </div>
          </div>
        </div>
      </div>
      {/* Semester History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Semester History</h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Download Transcript
          </Button>
        </div>

        <div className="space-y-4">
          {semesterHistory?.map((semester, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{semester?.semester}</h4>
                  <p className="text-sm text-muted-foreground">{semester?.year}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">SGPA: {semester?.sgpa}</div>
                  <div className="text-sm text-muted-foreground">{semester?.credits} Credits</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {semester?.subjects?.map((subject, subIndex) => (
                  <div key={subIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <div className="text-sm font-medium text-foreground">{subject?.name}</div>
                      <div className="text-xs text-muted-foreground">{subject?.credits} Credits</div>
                    </div>
                    <div className={`text-sm font-bold ${getGradeColor(subject?.grade)}`}>
                      {subject?.grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
        
        <div className="space-y-3">
          {upcomingDeadlines?.map((deadline, index) => (
            <div key={index} className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(deadline?.priority)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{deadline?.title}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{deadline?.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {new Date(deadline.date)?.toLocaleDateString('en-GB')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(deadline?.date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;