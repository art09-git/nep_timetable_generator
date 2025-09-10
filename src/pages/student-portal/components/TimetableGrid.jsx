import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimetableGrid = ({ selectedWeek, viewMode, studentData }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    '09:00 - 09:50',
    '10:00 - 10:50', 
    '11:00 - 11:50',
    '12:00 - 12:50',
    '14:00 - 14:50',
    '15:00 - 15:50',
    '16:00 - 16:50'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetableData = {
    'Monday': {
      '09:00 - 09:50': { subject: 'Mathematics', code: 'MATH101', faculty: 'Dr. Sharma', room: 'Room 201', type: 'theory' },
      '10:00 - 10:50': { subject: 'Physics', code: 'PHY101', faculty: 'Prof. Kumar', room: 'Lab 301', type: 'practical' },
      '11:00 - 11:50': { subject: 'Chemistry', code: 'CHEM101', faculty: 'Dr. Singh', room: 'Room 105', type: 'theory' },
      '14:00 - 14:50': { subject: 'English', code: 'ENG101', faculty: 'Ms. Gupta', room: 'Room 102', type: 'theory' }
    },
    'Tuesday': {
      '09:00 - 09:50': { subject: 'Computer Science', code: 'CS101', faculty: 'Dr. Patel', room: 'Lab 401', type: 'practical' },
      '10:00 - 10:50': { subject: 'Mathematics', code: 'MATH101', faculty: 'Dr. Sharma', room: 'Room 201', type: 'theory' },
      '15:00 - 15:50': { subject: 'Environmental Studies', code: 'EVS101', faculty: 'Prof. Mehta', room: 'Room 103', type: 'theory' }
    },
    'Wednesday': {
      '09:00 - 09:50': { subject: 'Physics', code: 'PHY101', faculty: 'Prof. Kumar', room: 'Room 205', type: 'theory' },
      '11:00 - 11:50': { subject: 'Chemistry', code: 'CHEM101', faculty: 'Dr. Singh', room: 'Lab 302', type: 'practical' },
      '14:00 - 14:50': { subject: 'Mathematics', code: 'MATH101', faculty: 'Dr. Sharma', room: 'Room 201', type: 'theory' },
      '16:00 - 16:50': { subject: 'Sports', code: 'SPT101', faculty: 'Coach Verma', room: 'Ground', type: 'practical' }
    },
    'Thursday': {
      '10:00 - 10:50': { subject: 'Computer Science', code: 'CS101', faculty: 'Dr. Patel', room: 'Room 401', type: 'theory' },
      '11:00 - 11:50': { subject: 'English', code: 'ENG101', faculty: 'Ms. Gupta', room: 'Room 102', type: 'theory' },
      '15:00 - 15:50': { subject: 'Physics', code: 'PHY101', faculty: 'Prof. Kumar', room: 'Lab 301', type: 'practical' }
    },
    'Friday': {
      '09:00 - 09:50': { subject: 'Chemistry', code: 'CHEM101', faculty: 'Dr. Singh', room: 'Room 105', type: 'theory' },
      '10:00 - 10:50': { subject: 'Environmental Studies', code: 'EVS101', faculty: 'Prof. Mehta', room: 'Room 103', type: 'theory' },
      '14:00 - 14:50': { subject: 'Computer Science', code: 'CS101', faculty: 'Dr. Patel', room: 'Lab 401', type: 'practical' },
      '15:00 - 15:50': { subject: 'Mathematics', code: 'MATH101', faculty: 'Dr. Sharma', room: 'Room 201', type: 'theory' }
    },
    'Saturday': {
      '09:00 - 09:50': { subject: 'English', code: 'ENG101', faculty: 'Ms. Gupta', room: 'Room 102', type: 'theory' },
      '11:00 - 11:50': { subject: 'Project Work', code: 'PRJ101', faculty: 'Dr. Agarwal', room: 'Lab 501', type: 'practical' }
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'Physics': 'bg-green-100 text-green-800 border-green-200',
      'Chemistry': 'bg-purple-100 text-purple-800 border-purple-200',
      'Computer Science': 'bg-orange-100 text-orange-800 border-orange-200',
      'English': 'bg-pink-100 text-pink-800 border-pink-200',
      'Environmental Studies': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Sports': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Project Work': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors?.[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleSlotClick = (day, time, classData) => {
    if (classData) {
      setSelectedSlot({ day, time, ...classData });
    }
  };

  if (viewMode === 'daily') {
    const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' });
    const todayClasses = timetableData?.[today] || {};
    
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
          <span className="text-sm text-muted-foreground">{today}</span>
        </div>
        <div className="space-y-3">
          {timeSlots?.map((time) => {
            const classData = todayClasses?.[time];
            return (
              <div key={time} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                <div className="w-24 text-sm font-medium text-muted-foreground">
                  {time}
                </div>
                {classData ? (
                  <div 
                    className={`flex-1 p-3 rounded-lg border cursor-pointer transition-smooth hover:shadow-sm ${getSubjectColor(classData?.subject)}`}
                    onClick={() => handleSlotClick(today, time, classData)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{classData?.subject}</h4>
                        <p className="text-sm opacity-80">{classData?.code} • {classData?.faculty}</p>
                        <p className="text-xs opacity-70 mt-1">{classData?.room}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={classData?.type === 'practical' ? 'FlaskConical' : 'BookOpen'} 
                          size={16} 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 p-3 text-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                    Free Period
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-32 p-4 text-left text-sm font-medium text-muted-foreground border-r border-border">
                Time
              </th>
              {weekDays?.map((day) => (
                <th key={day} className="p-4 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots?.map((time, timeIndex) => (
              <tr key={time} className="border-t border-border">
                <td className="p-4 text-sm font-medium text-muted-foreground bg-muted/30 border-r border-border">
                  {time}
                </td>
                {weekDays?.map((day) => {
                  const classData = timetableData?.[day]?.[time];
                  return (
                    <td key={`${day}-${time}`} className="p-2 border-r border-border last:border-r-0 h-20">
                      {classData ? (
                        <div 
                          className={`h-full p-2 rounded-md border cursor-pointer transition-smooth hover:shadow-sm ${getSubjectColor(classData?.subject)}`}
                          onClick={() => handleSlotClick(day, time, classData)}
                        >
                          <div className="text-xs font-medium truncate">{classData?.subject}</div>
                          <div className="text-xs opacity-80 truncate">{classData?.code}</div>
                          <div className="text-xs opacity-70 truncate">{classData?.room}</div>
                        </div>
                      ) : (
                        <div className="h-full bg-muted/20 rounded-md border border-dashed"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Class Details Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Class Details</h3>
              <button 
                onClick={() => setSelectedSlot(null)}
                className="p-1 hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${getSubjectColor(selectedSlot?.subject)}`}>
                <h4 className="font-semibold text-lg">{selectedSlot?.subject}</h4>
                <p className="text-sm opacity-80">{selectedSlot?.code}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Faculty</label>
                  <p className="text-foreground">{selectedSlot?.faculty}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Room</label>
                  <p className="text-foreground">{selectedSlot?.room}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Day</label>
                  <p className="text-foreground">{selectedSlot?.day}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p className="text-foreground">{selectedSlot?.time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name={selectedSlot?.type === 'practical' ? 'FlaskConical' : 'BookOpen'} size={16} />
                <span className="capitalize">{selectedSlot?.type} Class</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableGrid;