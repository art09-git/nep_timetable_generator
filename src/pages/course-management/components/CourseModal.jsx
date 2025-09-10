import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CourseModal = ({ isOpen, onClose, course, onSave, mode = 'edit' }) => {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    credits: '',
    program: '',
    semester: '',
    type: '',
    theoryHours: '',
    practicalHours: '',
    prerequisites: [],
    description: '',
    learningOutcomes: '',
    assessmentMethods: '',
    status: 'active',
    nepCompliant: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (course && mode === 'edit') {
      setFormData({
        code: course?.code || '',
        title: course?.title || '',
        credits: course?.credits?.toString() || '',
        program: course?.program || '',
        semester: course?.semester?.toString() || '',
        type: course?.type || '',
        theoryHours: course?.theoryHours?.toString() || '',
        practicalHours: course?.practicalHours?.toString() || '',
        prerequisites: course?.prerequisites || [],
        description: course?.description || '',
        learningOutcomes: course?.learningOutcomes || '',
        assessmentMethods: course?.assessmentMethods || '',
        status: course?.status || 'active',
        nepCompliant: course?.nepCompliant || false
      });
    } else if (mode === 'add') {
      setFormData({
        code: '',
        title: '',
        credits: '',
        program: '',
        semester: '',
        type: '',
        theoryHours: '',
        practicalHours: '',
        prerequisites: [],
        description: '',
        learningOutcomes: '',
        assessmentMethods: '',
        status: 'active',
        nepCompliant: false
      });
    }
    setErrors({});
  }, [course, mode, isOpen]);

  const programOptions = [
    { value: 'bed', label: 'Bachelor of Education (B.Ed.)' },
    { value: 'med', label: 'Master of Education (M.Ed.)' },
    { value: 'fyup', label: 'Four Year Undergraduate Programme (FYUP)' },
    { value: 'itep', label: 'Integrated Teacher Education Programme (ITEP)' }
  ];

  const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    value: (i + 1)?.toString(),
    label: `Semester ${i + 1}`
  }));

  const typeOptions = [
    { value: 'core', label: 'Core Course' },
    { value: 'elective', label: 'Elective Course' },
    { value: 'practical', label: 'Practical Course' },
    { value: 'project', label: 'Project Work' },
    { value: 'internship', label: 'Internship' },
    { value: 'fieldwork', label: 'Field Work' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.code?.trim()) newErrors.code = 'Course code is required';
    if (!formData?.title?.trim()) newErrors.title = 'Course title is required';
    if (!formData?.credits || formData?.credits < 1) newErrors.credits = 'Valid credits required';
    if (!formData?.program) newErrors.program = 'Program selection is required';
    if (!formData?.semester) newErrors.semester = 'Semester selection is required';
    if (!formData?.type) newErrors.type = 'Course type is required';
    if (!formData?.theoryHours || formData?.theoryHours < 0) newErrors.theoryHours = 'Theory hours required';
    if (!formData?.practicalHours || formData?.practicalHours < 0) newErrors.practicalHours = 'Practical hours required';

    // NEP compliance validation
    const totalCredits = parseInt(formData?.credits) || 0;
    const theoryHours = parseInt(formData?.theoryHours) || 0;
    const practicalHours = parseInt(formData?.practicalHours) || 0;
    
    if (totalCredits > 0 && (theoryHours + practicalHours) === 0) {
      newErrors.theoryHours = 'Total hours cannot be zero for credited course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const courseData = {
        ...formData,
        credits: parseInt(formData?.credits),
        semester: parseInt(formData?.semester),
        theoryHours: parseInt(formData?.theoryHours),
        practicalHours: parseInt(formData?.practicalHours),
        id: course?.id || Date.now()
      };

      await onSave(courseData);
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden elevation-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'add' ? 'Add New Course' : 'Edit Course'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'add' ? 'Create a new course in the curriculum' : 'Modify course details and settings'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="BookOpen" size={18} />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Course Code"
                  type="text"
                  placeholder="e.g., EDU101"
                  value={formData?.code}
                  onChange={(e) => handleInputChange('code', e?.target?.value)}
                  error={errors?.code}
                  required
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

              <Input
                label="Course Title"
                type="text"
                placeholder="Enter course title"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                error={errors?.title}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Credits"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="4"
                  value={formData?.credits}
                  onChange={(e) => handleInputChange('credits', e?.target?.value)}
                  error={errors?.credits}
                  required
                />
                
                <Select
                  label="Semester"
                  options={semesterOptions}
                  value={formData?.semester}
                  onChange={(value) => handleInputChange('semester', value)}
                  error={errors?.semester}
                  required
                />
                
                <Select
                  label="Course Type"
                  options={typeOptions}
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  error={errors?.type}
                  required
                />
              </div>
            </div>

            {/* Course Structure */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="Clock" size={18} />
                <span>Course Structure</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Theory Hours per Week"
                  type="number"
                  min="0"
                  placeholder="3"
                  value={formData?.theoryHours}
                  onChange={(e) => handleInputChange('theoryHours', e?.target?.value)}
                  error={errors?.theoryHours}
                  required
                />
                
                <Input
                  label="Practical Hours per Week"
                  type="number"
                  min="0"
                  placeholder="2"
                  value={formData?.practicalHours}
                  onChange={(e) => handleInputChange('practicalHours', e?.target?.value)}
                  error={errors?.practicalHours}
                  required
                />
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="FileText" size={18} />
                <span>Course Details</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Course Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Brief description of the course content and objectives..."
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Learning Outcomes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    rows="3"
                    placeholder="List the expected learning outcomes..."
                    value={formData?.learningOutcomes}
                    onChange={(e) => handleInputChange('learningOutcomes', e?.target?.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assessment Methods
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    rows="2"
                    placeholder="Describe assessment and evaluation methods..."
                    value={formData?.assessmentMethods}
                    onChange={(e) => handleInputChange('assessmentMethods', e?.target?.value)}
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="Settings" size={18} />
                <span>Course Settings</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
                
                <div className="space-y-2">
                  <Checkbox
                    label="NEP 2020 Compliant"
                    description="Mark if this course meets NEP 2020 guidelines"
                    checked={formData?.nepCompliant}
                    onChange={(e) => handleInputChange('nepCompliant', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            {mode === 'add' ? 'Create Course' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;