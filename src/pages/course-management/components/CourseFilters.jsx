import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CourseFilters = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const programOptions = [
    { value: 'all', label: 'All Programs' },
    { value: 'bed', label: 'B.Ed.' },
    { value: 'med', label: 'M.Ed.' },
    { value: 'fyup', label: 'FYUP' },
    { value: 'itep', label: 'ITEP' }
  ];

  const semesterOptions = [
    { value: 'all', label: 'All Semesters' },
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' }
  ];

  const courseTypeOptions = [
    { value: 'core', label: 'Core' },
    { value: 'elective', label: 'Elective' },
    { value: 'practical', label: 'Practical' },
    { value: 'project', label: 'Project' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCourseTypeToggle = (type, checked) => {
    const updatedTypes = checked 
      ? [...filters?.courseTypes, type]
      : filters?.courseTypes?.filter(t => t !== type);
    handleFilterChange('courseTypes', updatedTypes);
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => {
    if (Array.isArray(value)) return value?.length > 0;
    return value && value !== 'all' && value !== '';
  })?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="md:hidden"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${!isExpanded ? 'hidden md:grid' : ''}`}>
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search courses by code or title..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Program Type */}
        <Select
          label="Program Type"
          options={programOptions}
          value={filters?.program}
          onChange={(value) => handleFilterChange('program', value)}
        />

        {/* Semester */}
        <Select
          label="Semester"
          options={semesterOptions}
          value={filters?.semester}
          onChange={(value) => handleFilterChange('semester', value)}
        />

        {/* Credit Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Credit Range</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.minCredits}
              onChange={(e) => handleFilterChange('minCredits', e?.target?.value)}
              className="w-20"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters?.maxCredits}
              onChange={(e) => handleFilterChange('maxCredits', e?.target?.value)}
              className="w-20"
            />
          </div>
        </div>

        {/* Course Types */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Course Types</label>
          <div className="space-y-2">
            {courseTypeOptions?.map((type) => (
              <Checkbox
                key={type?.value}
                label={type?.label}
                checked={filters?.courseTypes?.includes(type?.value)}
                onChange={(e) => handleCourseTypeToggle(type?.value, e?.target?.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <Select
          label="Status"
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'draft', label: 'Draft' }
          ]}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* NEP Compliance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">NEP Compliance</label>
          <Checkbox
            label="Show only NEP compliant courses"
            checked={filters?.nepCompliant}
            onChange={(e) => handleFilterChange('nepCompliant', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;