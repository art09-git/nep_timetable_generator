import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TimetableGrid = ({ generatedTimetable, onCellEdit, onDragDrop }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const gridRef = useRef(null);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const mockTimetableData = {
    'Monday-9:00 AM': {
      subject: 'Educational Psychology',
      faculty: 'Dr. Priya Sharma',
      room: 'Room 101',
      program: 'B.Ed.',
      students: 45,
      type: 'Theory',
      conflicts: [],
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    'Monday-10:00 AM': {
      subject: 'Mathematics Pedagogy',
      faculty: 'Prof. Rajesh Kumar',
      room: 'Room 102',
      program: 'B.Ed.',
      students: 42,
      type: 'Theory',
      conflicts: ['Room capacity exceeded'],
      color: 'bg-red-100 border-red-300 text-red-800'
    },
    'Tuesday-9:00 AM': {
      subject: 'Research Methodology',
      faculty: 'Dr. Anjali Verma',
      room: 'Room 201',
      program: 'M.Ed.',
      students: 35,
      type: 'Theory',
      conflicts: [],
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    'Wednesday-11:00 AM': {
      subject: 'Computer Science',
      faculty: 'Dr. Amit Singh',
      room: 'Lab 1',
      program: 'FYUP',
      students: 60,
      type: 'Practical',
      conflicts: [],
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
    'Thursday-2:00 PM': {
      subject: 'Teaching Practice',
      faculty: 'Dr. Meera Joshi',
      room: 'Practice School',
      program: 'ITEP',
      students: 25,
      type: 'Practical',
      conflicts: [],
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    }
  };

  const getCellData = (day, time) => {
    const key = `${day}-${time}`;
    return mockTimetableData?.[key] || null;
  };

  const handleCellClick = (day, time) => {
    setSelectedCell({ day, time });
  };

  const handleDragStart = (e, cellData, day, time) => {
    setDraggedItem({ ...cellData, originalDay: day, originalTime: time });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDay, targetTime) => {
    e?.preventDefault();
    if (draggedItem) {
      onDragDrop?.(draggedItem, targetDay, targetTime);
      setDraggedItem(null);
    }
  };

  const renderCell = (day, time) => {
    const cellData = getCellData(day, time);
    const isSelected = selectedCell?.day === day && selectedCell?.time === time;
    const hasConflicts = cellData?.conflicts?.length > 0;

    if (!cellData) {
      return (
        <div
          className={`h-20 border border-border rounded-lg p-2 cursor-pointer transition-smooth hover:bg-muted/50 ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleCellClick(day, time)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, day, time)}
        >
          <div className="flex items-center justify-center h-full">
            <Icon name="Plus" size={16} className="text-muted-foreground" />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`h-20 border-2 rounded-lg p-2 cursor-move transition-smooth ${cellData?.color} ${
          isSelected ? 'ring-2 ring-primary' : ''
        } ${hasConflicts ? 'border-red-500' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, cellData, day, time)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day, time)}
        onClick={() => handleCellClick(day, time)}
      >
        <div className="text-xs font-medium truncate">{cellData?.subject}</div>
        <div className="text-xs opacity-75 truncate">{cellData?.faculty}</div>
        <div className="text-xs opacity-75 truncate">{cellData?.room}</div>
        {hasConflicts && (
          <div className="absolute top-1 right-1">
            <Icon name="AlertTriangle" size={12} className="text-red-600" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Grid3X3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Timetable Grid</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ZoomIn">
              Zoom In
            </Button>
            <Button variant="outline" size="sm" iconName="ZoomOut">
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" iconName="Maximize2">
              Full Screen
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-full" ref={gridRef}>
            {/* Header Row */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              <div className="h-12 flex items-center justify-center font-medium text-muted-foreground">
                Time
              </div>
              {days?.map((day) => (
                <div key={day} className="h-12 flex items-center justify-center font-medium text-foreground bg-muted/30 rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots?.map((time) => (
              <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                <div className="h-20 flex items-center justify-center font-medium text-muted-foreground bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm">{time}</div>
                  </div>
                </div>
                {days?.map((day) => (
                  <div key={`${day}-${time}`} className="relative">
                    {renderCell(day, time)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-3">Program Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-sm text-foreground">B.Ed.</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-foreground">M.Ed.</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span className="text-sm text-foreground">FYUP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
              <span className="text-sm text-foreground">ITEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableGrid;