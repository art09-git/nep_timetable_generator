import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseInfoCards = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      code: 'MATH101',
      name: 'Mathematics',
      credits: 4,
      faculty: 'Dr. Sharma',
      attendance: 78,
      requiredAttendance: 75,
      assignments: [
        { title: 'Calculus Problem Set', dueDate: '2025-09-15', status: 'pending' },
        { title: 'Linear Algebra Quiz', dueDate: '2025-09-12', status: 'completed' }
      ],
      nextClass: '2025-09-11 09:00',
      room: 'Room 201',
      type: 'Core',
      progress: 65
    },
    {
      id: 2,
      code: 'PHY101',
      name: 'Physics',
      credits: 4,
      faculty: 'Prof. Kumar',
      attendance: 82,
      requiredAttendance: 75,
      assignments: [
        { title: 'Lab Report - Mechanics', dueDate: '2025-09-11', status: 'pending' },
        { title: 'Optics Assignment', dueDate: '2025-09-18', status: 'not_started' }
      ],
      nextClass: '2025-09-11 10:00',
      room: 'Lab 301',
      type: 'Core',
      progress: 72
    },
    {
      id: 3,
      code: 'CS101',
      name: 'Computer Science',
      credits: 3,
      faculty: 'Dr. Patel',
      attendance: 85,
      requiredAttendance: 75,
      assignments: [
        { title: 'Programming Project', dueDate: '2025-09-20', status: 'in_progress' },
        { title: 'Data Structures Quiz', dueDate: '2025-09-14', status: 'pending' }
      ],
      nextClass: '2025-09-12 09:00',
      room: 'Lab 401',
      type: 'Elective',
      progress: 80
    },
    {
      id: 4,
      code: 'ENG101',
      name: 'English',
      credits: 2,
      faculty: 'Ms. Gupta',
      attendance: 90,
      requiredAttendance: 75,
      assignments: [
        { title: 'Essay Writing', dueDate: '2025-09-16', status: 'completed' },
        { title: 'Literature Review', dueDate: '2025-09-22', status: 'not_started' }
      ],
      nextClass: '2025-09-12 14:00',
      room: 'Room 102',
      type: 'Core',
      progress: 88
    }
  ];

  const getAttendanceColor = (attendance, required) => {
    if (attendance >= required + 10) return 'text-success';
    if (attendance >= required) return 'text-warning';
    return 'text-error';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      in_progress: 'bg-primary/10 text-primary border-primary/20',
      not_started: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[status] || colors?.not_started;
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'Completed',
      pending: 'Pending',
      in_progress: 'In Progress',
      not_started: 'Not Started'
    };
    return texts?.[status] || 'Unknown';
  };

  const formatNextClass = (dateTime) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    let dayText = '';
    if (date?.toDateString() === today?.toDateString()) {
      dayText = 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      dayText = 'Tomorrow';
    } else {
      dayText = date?.toLocaleDateString('en-GB', { weekday: 'long' });
    }

    const time = date?.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    return `${dayText} at ${time}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Enrolled Courses</h3>
        <span className="text-sm text-muted-foreground">
          Total Credits: {courses?.reduce((sum, course) => sum + course?.credits, 0)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses?.map((course) => (
          <div
            key={course?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-smooth cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{course?.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course?.type === 'Core' ?'bg-primary/10 text-primary' :'bg-accent/10 text-accent'
                  }`}>
                    {course?.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{course?.code} • {course?.credits} Credits</p>
                <p className="text-sm text-muted-foreground">{course?.faculty}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Attendance</span>
                <span className={`text-sm font-medium ${getAttendanceColor(course?.attendance, course?.requiredAttendance)}`}>
                  {course?.attendance}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${course?.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{course?.progress}%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Next: {formatNextClass(course?.nextClass)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <Icon name="MapPin" size={14} />
                  <span>{course?.room}</span>
                </div>
              </div>

              {course?.assignments?.filter(a => a?.status === 'pending')?.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-warning">
                  <Icon name="AlertCircle" size={14} />
                  <span>
                    {course?.assignments?.filter(a => a?.status === 'pending')?.length} pending assignment(s)
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selectedCourse?.name}</h3>
                  <p className="text-muted-foreground">{selectedCourse?.code} • {selectedCourse?.faculty}</p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-muted rounded-md transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{selectedCourse?.credits}</div>
                  <div className="text-sm text-muted-foreground">Credits</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className={`text-2xl font-bold ${getAttendanceColor(selectedCourse?.attendance, selectedCourse?.requiredAttendance)}`}>
                    {selectedCourse?.attendance}%
                  </div>
                  <div className="text-sm text-muted-foreground">Attendance</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedCourse?.progress}%</div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {selectedCourse?.assignments?.filter(a => a?.status === 'completed')?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Next Class</h4>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 text-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>{formatNextClass(selectedCourse?.nextClass)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                    <Icon name="MapPin" size={16} />
                    <span>{selectedCourse?.room}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Assignments</h4>
                <div className="space-y-3">
                  {selectedCourse?.assignments?.map((assignment, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-foreground">{assignment?.title}</h5>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate)?.toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(assignment?.status)}`}>
                          {getStatusText(assignment?.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="default" className="flex-1">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Course Materials
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Contact Faculty
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInfoCards;