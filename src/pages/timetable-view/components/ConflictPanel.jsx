import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConflictPanel = ({ conflicts = [], onResolveConflict, onViewDetails }) => {
  const [expandedConflict, setExpandedConflict] = useState(null);

  const mockConflicts = [
    {
      id: 1,
      type: 'Faculty Conflict',
      severity: 'high',
      title: 'Dr. Priya Sharma - Double Booking',
      description: 'Faculty scheduled for two classes at the same time',
      details: {
        timeSlot: 'Monday 14:00 - 15:00',
        courses: ['Educational Psychology (BED101)', 'Child Development (BED105)'],
        rooms: ['Room 101', 'Room 105'],
        affectedStudents: 45
      },
      suggestions: [
        'Move Child Development to Tuesday 14:00 - 15:00',
        'Assign alternate faculty for Child Development',
        'Split the class into two sessions'
      ],
      autoResolvable: true
    },
    {
      id: 2,
      type: 'Room Conflict',
      severity: 'medium',
      title: 'Computer Lab - Capacity Exceeded',
      description: 'Room capacity insufficient for scheduled class size',
      details: {
        timeSlot: 'Wednesday 10:00 - 11:00',
        course: 'Educational Technology (BED104)',
        roomCapacity: 30,
        enrolledStudents: 42,
        room: 'Computer Lab'
      },
      suggestions: [
        'Move to larger Computer Lab 2',
        'Split class into two batches',
        'Use hybrid teaching approach'
      ],
      autoResolvable: false
    },
    {
      id: 3,
      type: 'Resource Conflict',
      severity: 'low',
      title: 'Projector Equipment Clash',
      description: 'Multiple classes requiring same equipment',
      details: {
        timeSlot: 'Friday 11:00 - 12:00',
        equipment: 'Smart Projector',
        courses: ['Research Methodology (MED102)', 'Curriculum Development (BED103)'],
        rooms: ['Room 201', 'Room 103']
      },
      suggestions: [
        'Use alternate projector in Room 103',
        'Reschedule one class to different time',
        'Use mobile projector unit'
      ],
      autoResolvable: true
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'AlertCircle';
    }
  };

  const handleResolveConflict = (conflictId, suggestionIndex) => {
    if (onResolveConflict) {
      onResolveConflict(conflictId, suggestionIndex);
    }
  };

  const toggleExpanded = (conflictId) => {
    setExpandedConflict(expandedConflict === conflictId ? null : conflictId);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <span>Schedule Conflicts</span>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {mockConflicts?.length} conflicts found
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="Zap"
              onClick={() => console.log('Auto-resolve all conflicts')}
            >
              Auto-Resolve
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockConflicts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No Conflicts Found</h4>
            <p className="text-sm text-muted-foreground">
              Your timetable is optimized and conflict-free!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {mockConflicts?.map((conflict) => (
              <div key={conflict?.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={getSeverityIcon(conflict?.severity)} 
                        size={16} 
                        className={getSeverityColor(conflict?.severity)?.split(' ')?.[0]}
                      />
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(conflict?.severity)}`}>
                        {conflict?.severity?.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{conflict?.type}</span>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-1">{conflict?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{conflict?.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName={expandedConflict === conflict?.id ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleExpanded(conflict?.id)}
                      >
                        {expandedConflict === conflict?.id ? 'Less Details' : 'More Details'}
                      </Button>
                      
                      {conflict?.autoResolvable && (
                        <Button
                          variant="outline"
                          size="xs"
                          iconName="Zap"
                          onClick={() => handleResolveConflict(conflict?.id, 0)}
                        >
                          Quick Fix
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="ExternalLink"
                        onClick={() => onViewDetails?.(conflict)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                {expandedConflict === conflict?.id && (
                  <div className="mt-4 p-4 bg-muted rounded-lg animate-fade-in">
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm text-foreground mb-2">Conflict Details</h5>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>Time: {conflict?.details?.timeSlot}</div>
                          {conflict?.details?.courses && (
                            <div>Courses: {conflict?.details?.courses?.join(', ')}</div>
                          )}
                          {conflict?.details?.course && (
                            <div>Course: {conflict?.details?.course}</div>
                          )}
                          {conflict?.details?.rooms && (
                            <div>Rooms: {conflict?.details?.rooms?.join(', ')}</div>
                          )}
                          {conflict?.details?.room && (
                            <div>Room: {conflict?.details?.room}</div>
                          )}
                          {conflict?.details?.affectedStudents && (
                            <div>Affected Students: {conflict?.details?.affectedStudents}</div>
                          )}
                          {conflict?.details?.roomCapacity && (
                            <div>
                              Capacity: {conflict?.details?.roomCapacity} / Enrolled: {conflict?.details?.enrolledStudents}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm text-foreground mb-2">Suggested Solutions</h5>
                        <div className="space-y-2">
                          {conflict?.suggestions?.map((suggestion, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-card rounded border border-border">
                              <span className="text-sm text-foreground">{suggestion}</span>
                              <Button
                                variant="ghost"
                                size="xs"
                                iconName="Check"
                                onClick={() => handleResolveConflict(conflict?.id, index)}
                              >
                                Apply
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConflictPanel;