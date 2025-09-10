import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimetableGrid = ({ 
  selectedProgram, 
  selectedSemester, 
  selectedFaculty, 
  selectedRoomType,
  onCellEdit,
  onDragDrop,
  conflicts = []
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00', 
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const mockTimetableData = {
    'B.Ed': {
      'Semester 1': {
        'Monday': {
          '09:00 - 10:00': {
            course: 'Educational Psychology',
            courseCode: 'BED101',
            faculty: 'Dr. Priya Sharma',
            room: 'Room 101',
            roomType: 'Classroom',
            credits: 4,
            type: 'Theory',
            program: 'B.Ed',
            hasConflict: false
          },
          '10:00 - 11:00': {
            course: 'Philosophy of Education',
            courseCode: 'BED102',
            faculty: 'Prof. Rajesh Kumar',
            room: 'Room 102',
            roomType: 'Classroom',
            credits: 3,
            type: 'Theory',
            program: 'B.Ed',
            hasConflict: false
          },
          '14:00 - 15:00': {
            course: 'Teaching Practice',
            courseCode: 'BED201',
            faculty: 'Dr. Meera Singh',
            room: 'Practice School',
            roomType: 'Laboratory',
            credits: 2,
            type: 'Practical',
            program: 'B.Ed',
            hasConflict: true
          }
        },
        'Tuesday': {
          '09:00 - 10:00': {
            course: 'Curriculum Development',
            courseCode: 'BED103',
            faculty: 'Dr. Amit Verma',
            room: 'Room 103',
            roomType: 'Classroom',
            credits: 4,
            type: 'Theory',
            program: 'B.Ed',
            hasConflict: false
          },
          '11:00 - 12:00': {
            course: 'Educational Technology',
            courseCode: 'BED104',
            faculty: 'Prof. Sunita Rao',
            room: 'Computer Lab',
            roomType: 'Laboratory',
            credits: 3,
            type: 'Practical',
            program: 'B.Ed',
            hasConflict: false
          }
        }
      }
    },
    'M.Ed': {
      'Semester 1': {
        'Monday': {
          '11:00 - 12:00': {
            course: 'Advanced Educational Psychology',
            courseCode: 'MED101',
            faculty: 'Dr. Kavita Joshi',
            room: 'Room 201',
            roomType: 'Classroom',
            credits: 4,
            type: 'Theory',
            program: 'M.Ed',
            hasConflict: false
          },
          '15:00 - 16:00': {
            course: 'Research Methodology',
            courseCode: 'MED102',
            faculty: 'Prof. Deepak Gupta',
            room: 'Research Lab',
            roomType: 'Laboratory',
            credits: 3,
            type: 'Practical',
            program: 'M.Ed',
            hasConflict: false
          }
        },
        'Wednesday': {
          '10:00 - 11:00': {
            course: 'Educational Leadership',
            courseCode: 'MED103',
            faculty: 'Dr. Ravi Patel',
            room: 'Room 202',
            roomType: 'Classroom',
            credits: 4,
            type: 'Theory',
            program: 'M.Ed',
            hasConflict: false
          }
        }
      }
    }
  };

  const getCurrentData = () => {
    return mockTimetableData?.[selectedProgram]?.[selectedSemester] || {};
  };

  const handleDragStart = (e, cellData, day, timeSlot) => {
    setDraggedItem({ ...cellData, day, timeSlot });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDay, targetTimeSlot) => {
    e?.preventDefault();
    if (draggedItem && onDragDrop) {
      onDragDrop(draggedItem, targetDay, targetTimeSlot);
    }
    setDraggedItem(null);
  };

  const handleCellClick = (day, timeSlot, cellData) => {
    const cellKey = `${day}-${timeSlot}`;
    if (selectedCells?.includes(cellKey)) {
      setSelectedCells(selectedCells?.filter(key => key !== cellKey));
    } else {
      setSelectedCells([...selectedCells, cellKey]);
    }
  };

  const handleCellDoubleClick = (day, timeSlot, cellData) => {
    if (onCellEdit) {
      onCellEdit(day, timeSlot, cellData);
    }
  };

  const getProgramColor = (program) => {
    const colors = {
      'B.Ed': 'bg-blue-100 border-blue-300 text-blue-800',
      'M.Ed': 'bg-green-100 border-green-300 text-green-800',
      'FYUP': 'bg-purple-100 border-purple-300 text-purple-800',
      'ITEP': 'bg-orange-100 border-orange-300 text-orange-800'
    };
    return colors?.[program] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const renderCell = (day, timeSlot) => {
    const currentData = getCurrentData();
    const cellData = currentData?.[day]?.[timeSlot];
    const cellKey = `${day}-${timeSlot}`;
    const isSelected = selectedCells?.includes(cellKey);
    const hasConflict = cellData?.hasConflict || conflicts?.some(c => c?.day === day && c?.timeSlot === timeSlot);

    if (!cellData) {
      return (
        <div
          className={`h-16 border border-border bg-card hover:bg-muted transition-smooth cursor-pointer ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, day, timeSlot)}
          onClick={() => handleCellClick(day, timeSlot, null)}
          onDoubleClick={() => handleCellDoubleClick(day, timeSlot, null)}
        >
          <div className="p-2 h-full flex items-center justify-center">
            <Icon name="Plus" size={16} className="text-muted-foreground opacity-50" />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`h-16 border transition-smooth cursor-move relative ${
          getProgramColor(cellData?.program)
        } ${hasConflict ? 'ring-2 ring-error' : ''} ${
          isSelected ? 'ring-2 ring-primary' : ''
        }`}
        draggable
        onDragStart={(e) => handleDragStart(e, cellData, day, timeSlot)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day, timeSlot)}
        onClick={() => handleCellClick(day, timeSlot, cellData)}
        onDoubleClick={() => handleCellDoubleClick(day, timeSlot, cellData)}
        onMouseEnter={() => {
          setHoveredCell({ day, timeSlot, data: cellData });
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setHoveredCell(null);
          setShowTooltip(false);
        }}
      >
        <div className="p-1 h-full">
          <div className="text-xs font-medium truncate">{cellData?.courseCode}</div>
          <div className="text-xs truncate opacity-80">{cellData?.course}</div>
          <div className="text-xs truncate opacity-70">{cellData?.room}</div>
        </div>
        {hasConflict && (
          <div className="absolute top-1 right-1">
            <Icon name="AlertTriangle" size={12} className="text-error" />
          </div>
        )}
        {cellData?.type === 'Practical' && (
          <div className="absolute bottom-1 right-1">
            <Icon name="Flask" size={10} className="opacity-60" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Grid Header */}
      <div className="bg-muted border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">
            {selectedProgram} - {selectedSemester} Timetable
          </h3>
          <div className="flex items-center space-x-2">
            {selectedCells?.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => console.log('Bulk edit selected cells')}
              >
                Edit Selected ({selectedCells?.length})
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={() => setSelectedCells([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      </div>
      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Time Header */}
          <div className="grid grid-cols-7 border-b border-border">
            <div className="p-3 bg-muted font-medium text-sm text-center border-r border-border">
              Time / Day
            </div>
            {days?.map((day) => (
              <div key={day} className="p-3 bg-muted font-medium text-sm text-center border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots?.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-7 border-b border-border last:border-b-0">
              <div className="p-3 bg-muted font-medium text-sm text-center border-r border-border flex items-center justify-center">
                {timeSlot}
              </div>
              {days?.map((day) => (
                <div key={`${day}-${timeSlot}`} className="border-r border-border last:border-r-0">
                  {renderCell(day, timeSlot)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Tooltip */}
      {showTooltip && hoveredCell && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-popover border border-border rounded-lg p-3 elevation-3 max-w-xs animate-fade-in"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        >
          <div className="space-y-2">
            <div className="font-medium text-popover-foreground">
              {hoveredCell?.data?.course}
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Code: {hoveredCell?.data?.courseCode}</div>
              <div>Faculty: {hoveredCell?.data?.faculty}</div>
              <div>Room: {hoveredCell?.data?.room}</div>
              <div>Credits: {hoveredCell?.data?.credits}</div>
              <div>Type: {hoveredCell?.data?.type}</div>
            </div>
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              Double-click to edit • Drag to move
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableGrid;