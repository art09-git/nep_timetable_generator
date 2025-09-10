import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentModal = ({ isOpen, onClose, onSave, student = null, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    phone: '',
    program: '',
    semester: '',
    enrolledCredits: '',
    status: 'Active',
    electives: [],
    address: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    parentName: '',
    parentPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programOptions = [
    { value: 'B.Ed.', label: 'Bachelor of Education (B.Ed.)' },
    { value: 'M.Ed.', label: 'Master of Education (M.Ed.)' },
    { value: 'FYUP', label: 'Four Year Undergraduate Programme (FYUP)' },
    { value: 'ITEP', label: 'Integrated Teacher Education Programme (ITEP)' }
  ];

  const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    value: (i + 1)?.toString(),
    label: `Semester ${i + 1}`
  }));

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Graduated', label: 'Graduated' }
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
    { value: 'EWS', label: 'EWS' }
  ];

  const electiveOptions = [
    { value: 'psychology', label: 'Educational Psychology' },
    { value: 'philosophy', label: 'Philosophy of Education' },
    { value: 'sociology', label: 'Sociology of Education' },
    { value: 'technology', label: 'Educational Technology' },
    { value: 'measurement', label: 'Measurement and Evaluation' },
    { value: 'guidance', label: 'Guidance and Counselling' },
    { value: 'administration', label: 'Educational Administration' },
    { value: 'curriculum', label: 'Curriculum Development' }
  ];

  useEffect(() => {
    if (student && mode === 'edit') {
      setFormData({
        rollNumber: student?.rollNumber || '',
        name: student?.name || '',
        email: student?.email || '',
        phone: student?.phone || '',
        program: student?.program || '',
        semester: student?.semester?.toString() || '',
        enrolledCredits: student?.enrolledCredits?.toString() || '',
        status: student?.status || 'Active',
        electives: student?.electives || [],
        address: student?.address || '',
        dateOfBirth: student?.dateOfBirth || '',
        gender: student?.gender || '',
        category: student?.category || '',
        parentName: student?.parentName || '',
        parentPhone: student?.parentPhone || ''
      });
    } else {
      // Reset form for add mode
      setFormData({
        rollNumber: '',
        name: '',
        email: '',
        phone: '',
        program: '',
        semester: '',
        enrolledCredits: '',
        status: 'Active',
        electives: [],
        address: '',
        dateOfBirth: '',
        gender: '',
        category: '',
        parentName: '',
        parentPhone: ''
      });
    }
    setErrors({});
  }, [student, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.rollNumber?.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    if (!formData?.program) newErrors.program = 'Program is required';
    if (!formData?.semester) newErrors.semester = 'Semester is required';
    if (!formData?.enrolledCredits) newErrors.enrolledCredits = 'Enrolled credits is required';
    else if (isNaN(formData?.enrolledCredits) || formData?.enrolledCredits < 0 || formData?.enrolledCredits > 30) {
      newErrors.enrolledCredits = 'Credits must be between 0 and 30';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const studentData = {
        ...formData,
        semester: parseInt(formData?.semester),
        enrolledCredits: parseInt(formData?.enrolledCredits),
        electiveCount: formData?.electives?.length,
        id: student?.id || Date.now()
      };
      
      onSave(studentData);
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleElectiveChange = (electiveValue, checked) => {
    setFormData(prev => ({
      ...prev,
      electives: checked 
        ? [...prev?.electives, electiveValue]
        : prev?.electives?.filter(e => e !== electiveValue)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'edit' ? 'Edit Student' : 'Add New Student'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Basic Information
              </h3>
              
              <Input
                label="Roll Number"
                type="text"
                value={formData?.rollNumber}
                onChange={(e) => handleInputChange('rollNumber', e?.target?.value)}
                error={errors?.rollNumber}
                required
                placeholder="Enter roll number"
              />
              
              <Input
                label="Full Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
                placeholder="Enter full name"
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
                placeholder="Enter email address"
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                placeholder="Enter phone number"
              />
              
              <Input
                label="Date of Birth"
                type="date"
                value={formData?.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                error={errors?.dateOfBirth}
              />
              
              <Select
                label="Gender"
                options={genderOptions}
                value={formData?.gender}
                onChange={(value) => handleInputChange('gender', value)}
                error={errors?.gender}
                placeholder="Select gender"
              />
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Academic Information
              </h3>
              
              <Select
                label="Program"
                options={programOptions}
                value={formData?.program}
                onChange={(value) => handleInputChange('program', value)}
                error={errors?.program}
                required
                placeholder="Select program"
              />
              
              <Select
                label="Semester"
                options={semesterOptions}
                value={formData?.semester}
                onChange={(value) => handleInputChange('semester', value)}
                error={errors?.semester}
                required
                placeholder="Select semester"
              />
              
              <Input
                label="Enrolled Credits"
                type="number"
                value={formData?.enrolledCredits}
                onChange={(e) => handleInputChange('enrolledCredits', e?.target?.value)}
                error={errors?.enrolledCredits}
                required
                min="0"
                max="30"
                placeholder="Enter enrolled credits"
              />
              
              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                error={errors?.status}
                placeholder="Select status"
              />
              
              <Select
                label="Category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors?.category}
                placeholder="Select category"
              />
            </div>
          </div>

          {/* Elective Courses */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
              Elective Courses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {electiveOptions?.map((elective) => (
                <Checkbox
                  key={elective?.value}
                  label={elective?.label}
                  checked={formData?.electives?.includes(elective?.value)}
                  onChange={(e) => handleElectiveChange(elective?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              label="Address"
              type="text"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              placeholder="Enter address"
            />
            
            <Input
              label="Parent/Guardian Name"
              type="text"
              value={formData?.parentName}
              onChange={(e) => handleInputChange('parentName', e?.target?.value)}
              error={errors?.parentName}
              placeholder="Enter parent/guardian name"
            />
            
            <Input
              label="Parent/Guardian Phone"
              type="tel"
              value={formData?.parentPhone}
              onChange={(e) => handleInputChange('parentPhone', e?.target?.value)}
              error={errors?.parentPhone}
              placeholder="Enter parent/guardian phone"
            />
          </div>
          
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Save"
              iconPosition="left"
            >
              {mode === 'edit' ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;