import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ConstraintPanel = ({ constraints, onConstraintChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    faculty: true,
    rooms: false,
    courses: false,
    advanced: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const facultyConstraints = [
    { id: 'maxHoursPerDay', label: 'Maximum hours per day', value: '6', type: 'select', options: [
      { value: '4', label: '4 hours' },
      { value: '5', label: '5 hours' },
      { value: '6', label: '6 hours' },
      { value: '7', label: '7 hours' },
      { value: '8', label: '8 hours' }
    ]},
    { id: 'maxConsecutiveHours', label: 'Maximum consecutive hours', value: '3', type: 'select', options: [
      { value: '2', label: '2 hours' },
      { value: '3', label: '3 hours' },
      { value: '4', label: '4 hours' }
    ]},
    { id: 'respectAvailability', label: 'Respect faculty availability', value: true, type: 'checkbox' },
    { id: 'balanceWorkload', label: 'Balance workload across faculty', value: true, type: 'checkbox' }
  ];

  const roomConstraints = [
    { id: 'respectCapacity', label: 'Respect room capacity limits', value: true, type: 'checkbox' },
    { id: 'preferSpecializedRooms', label: 'Prefer specialized rooms for subjects', value: true, type: 'checkbox' },
    { id: 'minimizeRoomChanges', label: 'Minimize room changes for students', value: false, type: 'checkbox' },
    { id: 'allowOverflow', label: 'Allow 10% capacity overflow', value: false, type: 'checkbox' }
  ];

  const courseConstraints = [
    { id: 'respectPrerequisites', label: 'Respect course prerequisites', value: true, type: 'checkbox' },
    { id: 'balanceTheoryPractical', label: 'Balance theory and practical sessions', value: true, type: 'checkbox' },
    { id: 'groupElectives', label: 'Group elective courses together', value: false, type: 'checkbox' },
    { id: 'avoidBackToBack', label: 'Avoid back-to-back heavy subjects', value: true, type: 'checkbox' }
  ];

  const advancedConstraints = [
    { id: 'optimizationPriority', label: 'Optimization priority', value: 'balanced', type: 'select', options: [
      { value: 'faculty', label: 'Faculty satisfaction' },
      { value: 'students', label: 'Student convenience' },
      { value: 'resources', label: 'Resource utilization' },
      { value: 'balanced', label: 'Balanced approach' }
    ]},
    { id: 'conflictResolution', label: 'Conflict resolution strategy', value: 'automatic', type: 'select', options: [
      { value: 'automatic', label: 'Automatic resolution' },
      { value: 'manual', label: 'Manual review required' },
      { value: 'hybrid', label: 'Hybrid approach' }
    ]},
    { id: 'allowSplitSessions', label: 'Allow split sessions', value: false, type: 'checkbox' },
    { id: 'enableAIOptimization', label: 'Enable AI optimization', value: true, type: 'checkbox' }
  ];

  const constraintSections = [
    { id: 'faculty', title: 'Faculty Constraints', icon: 'Users', constraints: facultyConstraints },
    { id: 'rooms', title: 'Room & Infrastructure', icon: 'Building', constraints: roomConstraints },
    { id: 'courses', title: 'Course Requirements', icon: 'BookOpen', constraints: courseConstraints },
    { id: 'advanced', title: 'Advanced Settings', icon: 'Settings', constraints: advancedConstraints }
  ];

  const renderConstraint = (constraint) => {
    switch (constraint?.type) {
      case 'select':
        return (
          <Select
            options={constraint?.options}
            value={constraint?.value}
            onChange={(value) => onConstraintChange(constraint?.id, value)}
            className="w-full"
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            checked={constraint?.value}
            onChange={(e) => onConstraintChange(constraint?.id, e?.target?.checked)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sliders" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Scheduling Constraints</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={() => console.log('Reset constraints')}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {constraintSections?.map((section) => (
          <div key={section?.id} className="p-4">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <div className="flex items-center space-x-2">
                <Icon name={section?.icon} size={18} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{section?.title}</span>
              </div>
              <Icon 
                name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>

            {expandedSections?.[section?.id] && (
              <div className="mt-4 space-y-4 pl-6">
                {section?.constraints?.map((constraint) => (
                  <div key={constraint?.id} className="flex items-center justify-between">
                    <label className="text-sm text-foreground flex-1">
                      {constraint?.label}
                    </label>
                    <div className="w-48">
                      {renderConstraint(constraint)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 bg-muted/30 rounded-b-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Constraints help optimize timetable generation based on your institution's requirements</span>
        </div>
      </div>
    </div>
  );
};

export default ConstraintPanel;