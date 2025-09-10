import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditModal = ({ isOpen, onClose, cellData, day, timeSlot, onSave }) => {
  const [formData, setFormData] = useState({
    course: '',
    courseCode: '',
    faculty: '',
    room: '',
    roomType: '',
    credits: '',
    type: 'Theory',
    program: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cellData) {
      setFormData({
        course: cellData?.course || '',
        courseCode: cellData?.courseCode || '',
        faculty: cellData?.faculty || '',
        room: cellData?.room || '',
        roomType: cellData?.roomType || '',
        credits: cellData?.credits || '',
        type: cellData?.type || 'Theory',
        program: cellData?.program || ''
      });
    } else {
      setFormData({
        course: '',
        courseCode: '',
        faculty: '',
        room: '',
        roomType: '',
        credits: '',
        type: 'Theory',
        program: ''
      });
    }
    setErrors({});
  }, [cellData, isOpen]);

  const courseOptions = [
    { value: 'Educational Psychology', label: 'Educational Psychology' },
    { value: 'Philosophy of Education', label: 'Philosophy of Education' },
    { value: 'Curriculum Development', label: 'Curriculum Development' },
    { value: 'Educational Technology', label: 'Educational Technology' },
    { value: 'Teaching Practice', label: 'Teaching Practice' },
    { value: 'Research Methodology', label: 'Research Methodology' },
    { value: 'Educational Leadership', label: 'Educational Leadership' },
    { value: 'Child Development', label: 'Child Development' }
  ];

  const facultyOptions = [
    { value: 'Dr. Priya Sharma', label: 'Dr. Priya Sharma' },
    { value: 'Prof. Rajesh Kumar', label: 'Prof. Rajesh Kumar' },
    { value: 'Dr. Meera Singh', label: 'Dr. Meera Singh' },
    { value: 'Dr. Amit Verma', label: 'Dr. Amit Verma' },
    { value: 'Prof. Sunita Rao', label: 'Prof. Sunita Rao' },
    { value: 'Dr. Kavita Joshi', label: 'Dr. Kavita Joshi' },
    { value: 'Prof. Deepak Gupta', label: 'Prof. Deepak Gupta' },
    { value: 'Dr. Ravi Patel', label: 'Dr. Ravi Patel' }
  ];

  const roomOptions = [
    { value: 'Room 101', label: 'Room 101' },
    { value: 'Room 102', label: 'Room 102' },
    { value: 'Room 103', label: 'Room 103' },
    { value: 'Room 201', label: 'Room 201' },
    { value: 'Room 202', label: 'Room 202' },
    { value: 'Computer Lab', label: 'Computer Lab' },
    { value: 'Research Lab', label: 'Research Lab' },
    { value: 'Practice School', label: 'Practice School' },
    { value: 'Seminar Hall', label: 'Seminar Hall' }
  ];

  const roomTypeOptions = [
    { value: 'Classroom', label: 'Classroom' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Seminar Hall', label: 'Seminar Hall' },
    { value: 'Computer Lab', label: 'Computer Lab' },
    { value: 'Practice School', label: 'Practice School' }
  ];

  const typeOptions = [
    { value: 'Theory', label: 'Theory' },
    { value: 'Practical', label: 'Practical' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Tutorial', label: 'Tutorial' }
  ];

  const programOptions = [
    { value: 'B.Ed', label: 'Bachelor of Education (B.Ed)' },
    { value: 'M.Ed', label: 'Master of Education (M.Ed)' },
    { value: 'FYUP', label: 'Four Year Undergraduate Programme' },
    { value: 'ITEP', label: 'Integrated Teacher Education Programme' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.course?.trim()) newErrors.course = 'Course is required';
    if (!formData?.courseCode?.trim()) newErrors.courseCode = 'Course code is required';
    if (!formData?.faculty?.trim()) newErrors.faculty = 'Faculty is required';
    if (!formData?.room?.trim()) newErrors.room = 'Room is required';
    if (!formData?.roomType?.trim()) newErrors.roomType = 'Room type is required';
    if (!formData?.credits || formData?.credits < 1) newErrors.credits = 'Valid credits required';
    if (!formData?.program?.trim()) newErrors.program = 'Program is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        day,
        timeSlot,
        credits: parseInt(formData?.credits)
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      onSave(null); // Pass null to indicate deletion
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 elevation-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {cellData ? 'Edit Class' : 'Add New Class'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {day} • {timeSlot}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Course"
              options={courseOptions}
              value={formData?.course}
              onChange={(value) => handleInputChange('course', value)}
              error={errors?.course}
              required
              searchable
            />

            <Input
              label="Course Code"
              type="text"
              value={formData?.courseCode}
              onChange={(e) => handleInputChange('courseCode', e?.target?.value)}
              error={errors?.courseCode}
              placeholder="e.g., BED101"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Faculty"
              options={facultyOptions}
              value={formData?.faculty}
              onChange={(value) => handleInputChange('faculty', value)}
              error={errors?.faculty}
              required
              searchable
            />

            <Select
              label="Program"
              options={programOptions}
              value={formData?.program}
              onChange={(value) => handleInputChange('program', value)}
              error={errors?.program}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Room"
              options={roomOptions}
              value={formData?.room}
              onChange={(value) => handleInputChange('room', value)}
              error={errors?.room}
              required
              searchable
            />

            <Select
              label="Room Type"
              options={roomTypeOptions}
              value={formData?.roomType}
              onChange={(value) => handleInputChange('roomType', value)}
              error={errors?.roomType}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Credits"
              type="number"
              value={formData?.credits}
              onChange={(e) => handleInputChange('credits', e?.target?.value)}
              error={errors?.credits}
              min="1"
              max="6"
              required
            />

            <Select
              label="Class Type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {cellData && (
              <Button
                variant="destructive"
                iconName="Trash2"
                onClick={handleDelete}
              >
                Delete Class
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Save"
              onClick={handleSave}
            >
              {cellData ? 'Update Class' : 'Add Class'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;