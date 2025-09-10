import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({
  selectedProgram,
  setSelectedProgram,
  selectedSemester,
  setSelectedSemester,
  selectedFaculty,
  setSelectedFaculty,
  selectedRoomType,
  setSelectedRoomType,
  onRefresh,
  onReset
}) => {
  const programOptions = [
    { value: 'B.Ed', label: 'Bachelor of Education (B.Ed)' },
    { value: 'M.Ed', label: 'Master of Education (M.Ed)' },
    { value: 'FYUP', label: 'Four Year Undergraduate Programme' },
    { value: 'ITEP', label: 'Integrated Teacher Education Programme' }
  ];

  const semesterOptions = [
    { value: 'Semester 1', label: 'Semester 1' },
    { value: 'Semester 2', label: 'Semester 2' },
    { value: 'Semester 3', label: 'Semester 3' },
    { value: 'Semester 4', label: 'Semester 4' },
    { value: 'Semester 5', label: 'Semester 5' },
    { value: 'Semester 6', label: 'Semester 6' },
    { value: 'Semester 7', label: 'Semester 7' },
    { value: 'Semester 8', label: 'Semester 8' }
  ];

  const facultyOptions = [
    { value: 'all', label: 'All Faculty' },
    { value: 'Dr. Priya Sharma', label: 'Dr. Priya Sharma' },
    { value: 'Prof. Rajesh Kumar', label: 'Prof. Rajesh Kumar' },
    { value: 'Dr. Meera Singh', label: 'Dr. Meera Singh' },
    { value: 'Dr. Amit Verma', label: 'Dr. Amit Verma' },
    { value: 'Prof. Sunita Rao', label: 'Prof. Sunita Rao' },
    { value: 'Dr. Kavita Joshi', label: 'Dr. Kavita Joshi' },
    { value: 'Prof. Deepak Gupta', label: 'Prof. Deepak Gupta' },
    { value: 'Dr. Ravi Patel', label: 'Dr. Ravi Patel' }
  ];

  const roomTypeOptions = [
    { value: 'all', label: 'All Room Types' },
    { value: 'Classroom', label: 'Classroom' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Seminar Hall', label: 'Seminar Hall' },
    { value: 'Computer Lab', label: 'Computer Lab' },
    { value: 'Practice School', label: 'Practice School' }
  ];

  const handleReset = () => {
    setSelectedProgram('B.Ed');
    setSelectedSemester('Semester 1');
    setSelectedFaculty('all');
    setSelectedRoomType('all');
    if (onReset) onReset();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter Timetable</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={onRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Programme"
          options={programOptions}
          value={selectedProgram}
          onChange={setSelectedProgram}
          required
        />

        <Select
          label="Semester"
          options={semesterOptions}
          value={selectedSemester}
          onChange={setSelectedSemester}
          required
        />

        <Select
          label="Faculty Filter"
          options={facultyOptions}
          value={selectedFaculty}
          onChange={setSelectedFaculty}
          searchable
        />

        <Select
          label="Room Type"
          options={roomTypeOptions}
          value={selectedRoomType}
          onChange={setSelectedRoomType}
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
        <Button
          variant="ghost"
          size="xs"
          iconName="BookOpen"
          onClick={() => setSelectedRoomType('Classroom')}
        >
          Theory Classes
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="Flask"
          onClick={() => setSelectedRoomType('Laboratory')}
        >
          Practical Classes
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="Users"
          onClick={() => setSelectedRoomType('Seminar Hall')}
        >
          Seminars
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="Monitor"
          onClick={() => setSelectedRoomType('Computer Lab')}
        >
          Computer Labs
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;