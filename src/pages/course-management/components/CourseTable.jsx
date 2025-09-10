import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CourseTable = ({ courses, selectedCourses, onSelectionChange, onEdit, onView }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedPrograms, setExpandedPrograms] = useState(new Set(['bed', 'med', 'fyup', 'itep']));

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleProgramExpansion = (program) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded?.has(program)) {
      newExpanded?.delete(program);
    } else {
      newExpanded?.add(program);
    }
    setExpandedPrograms(newExpanded);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(courses?.map(course => course?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectCourse = (courseId, checked) => {
    if (checked) {
      onSelectionChange([...selectedCourses, courseId]);
    } else {
      onSelectionChange(selectedCourses?.filter(id => id !== courseId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getNepComplianceBadge = (isCompliant) => {
    return isCompliant ? (
      <div className="flex items-center space-x-1 text-success">
        <Icon name="CheckCircle" size={14} />
        <span className="text-xs">NEP</span>
      </div>
    ) : (
      <div className="flex items-center space-x-1 text-warning">
        <Icon name="AlertCircle" size={14} />
        <span className="text-xs">Review</span>
      </div>
    );
  };

  const groupedCourses = courses?.reduce((acc, course) => {
    if (!acc?.[course?.program]) {
      acc[course.program] = [];
    }
    acc?.[course?.program]?.push(course);
    return acc;
  }, {});

  const programNames = {
    bed: 'Bachelor of Education (B.Ed.)',
    med: 'Master of Education (M.Ed.)',
    fyup: 'Four Year Undergraduate Programme (FYUP)',
    itep: 'Integrated Teacher Education Programme (ITEP)'
  };

  const isAllSelected = courses?.length > 0 && selectedCourses?.length === courses?.length;
  const isIndeterminate = selectedCourses?.length > 0 && selectedCourses?.length < courses?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      {/* Table Header */}
      <div className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            <h3 className="font-medium text-foreground">
              Course Catalog ({courses?.length} courses)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="Upload">
              Import
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left p-4 w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-smooth"
                  onClick={() => handleSort('code')}>
                <div className="flex items-center space-x-1">
                  <span>Course Code</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-smooth"
                  onClick={() => handleSort('title')}>
                <div className="flex items-center space-x-1">
                  <span>Course Title</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Credits</th>
              <th className="text-left p-4 font-medium text-foreground">Type</th>
              <th className="text-left p-4 font-medium text-foreground">Theory/Practical</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">NEP</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedCourses)?.map(([program, programCourses]) => (
              <React.Fragment key={program}>
                {/* Program Header */}
                <tr className="bg-muted/20 border-b border-border">
                  <td colSpan="9" className="p-4">
                    <button
                      onClick={() => toggleProgramExpansion(program)}
                      className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                    >
                      <Icon 
                        name={expandedPrograms?.has(program) ? "ChevronDown" : "ChevronRight"} 
                        size={16} 
                      />
                      <span>{programNames?.[program]} ({programCourses?.length} courses)</span>
                    </button>
                  </td>
                </tr>
                
                {/* Program Courses */}
                {expandedPrograms?.has(program) && programCourses?.map((course) => (
                  <tr key={course?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedCourses?.includes(course?.id)}
                        onChange={(e) => handleSelectCourse(course?.id, e?.target?.checked)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-sm text-foreground">{course?.code}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{course?.title}</div>
                      {course?.prerequisites?.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Prerequisites: {course?.prerequisites?.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground">{course?.credits}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground capitalize">{course?.type}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-foreground">
                        {course?.theoryHours}T + {course?.practicalHours}P
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(course?.status)}
                    </td>
                    <td className="p-4">
                      {getNepComplianceBadge(course?.nepCompliant)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => onView(course)}
                          title="View Details"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={() => onEdit(course)}
                          title="Edit Course"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MoreVertical"
                          title="More Actions"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {Object.entries(groupedCourses)?.map(([program, programCourses]) => (
          <div key={program} className="border-b border-border last:border-b-0">
            {/* Program Header */}
            <button
              onClick={() => toggleProgramExpansion(program)}
              className="w-full flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={expandedPrograms?.has(program) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                />
                <span className="font-medium text-foreground">{programNames?.[program]}</span>
              </div>
              <span className="text-sm text-muted-foreground">{programCourses?.length} courses</span>
            </button>
            
            {/* Program Courses */}
            {expandedPrograms?.has(program) && (
              <div className="divide-y divide-border">
                {programCourses?.map((course) => (
                  <div key={course?.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Checkbox
                          checked={selectedCourses?.includes(course?.id)}
                          onChange={(e) => handleSelectCourse(course?.id, e?.target?.checked)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono text-sm text-primary">{course?.code}</span>
                            {getStatusBadge(course?.status)}
                          </div>
                          <h4 className="font-medium text-foreground mb-2">{course?.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{course?.credits} Credits</span>
                            <span>{course?.theoryHours}T + {course?.practicalHours}P</span>
                            <span className="capitalize">{course?.type}</span>
                          </div>
                          {course?.prerequisites?.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-2">
                              Prerequisites: {course?.prerequisites?.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        {getNepComplianceBadge(course?.nepCompliant)}
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MoreVertical"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {courses?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or add new courses to get started.</p>
          <Button variant="default" iconName="Plus">
            Add Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseTable;