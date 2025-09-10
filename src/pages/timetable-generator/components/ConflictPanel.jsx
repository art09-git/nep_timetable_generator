import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConflictPanel = ({ conflicts, onResolveConflict, onResolveAll }) => {
  const [selectedConflict, setSelectedConflict] = useState(null);

  const mockConflicts = [
    {
      id: 1,
      type: 'faculty',
      severity: 'high',
      title: 'Faculty Double Booking',
      description: 'Dr. Priya Sharma is scheduled for two classes at the same time',
      details: {
        time: 'Monday, 10:00 AM',
        conflicts: [
          { subject: 'Educational Psychology', room: 'Room 101', program: 'B.Ed.', students: 45 },
          { subject: 'Child Development', room: 'Room 203', program: 'M.Ed.', students: 35 }
        ]
      },
      suggestions: [
        'Move Educational Psychology to 11:00 AM',
        'Assign Child Development to Dr. Anjali Verma',
        'Split Educational Psychology into two sections'
      ]
    },
    {
      id: 2,
      type: 'room',
      severity: 'medium',
      title: 'Room Capacity Exceeded',
      description: 'Room 102 capacity (40) exceeded by Mathematics Pedagogy class (42 students)',
      details: {
        time: 'Tuesday, 2:00 PM',
        room: 'Room 102',
        capacity: 40,
        required: 42,
        subject: 'Mathematics Pedagogy',
        faculty: 'Prof. Rajesh Kumar'
      },
      suggestions: [
        'Move to Room 201 (capacity: 50)',
        'Split class into two sections',
        'Use hybrid teaching approach'
      ]
    },
    {
      id: 3,
      type: 'resource',
      severity: 'low',
      title: 'Lab Equipment Conflict',
      description: 'Computer Lab 1 required by two different programs',
      details: {
        time: 'Wednesday, 3:00 PM',
        resource: 'Computer Lab 1',
        conflicts: [
          { subject: 'Computer Applications', program: 'FYUP', students: 30 },
          { subject: 'Digital Pedagogy', program: 'B.Ed.', students: 25 }
        ]
      },
      suggestions: [
        'Use Computer Lab 2 for Digital Pedagogy',
        'Reschedule Computer Applications to 4:00 PM',
        'Combine classes for shared learning'
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'AlertTriangle';
      case 'low': return 'Info';
      default: return 'HelpCircle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'faculty': return 'User';
      case 'room': return 'Building';
      case 'resource': return 'Monitor';
      default: return 'AlertTriangle';
    }
  };

  const handleResolveConflict = (conflictId, suggestionIndex) => {
    onResolveConflict?.(conflictId, suggestionIndex);
  };

  const handleResolveAll = () => {
    onResolveAll?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Conflicts & Issues</h3>
            <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
              {mockConflicts?.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCheck"
            onClick={handleResolveAll}
            disabled={mockConflicts?.length === 0}
          >
            Resolve All
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockConflicts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No Conflicts Found</h4>
            <p className="text-sm text-muted-foreground">Your timetable is optimized and conflict-free!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {mockConflicts?.map((conflict) => (
              <div key={conflict?.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSeverityColor(conflict?.severity)}`}>
                      <Icon name={getSeverityIcon(conflict?.severity)} size={16} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={getTypeIcon(conflict?.type)} size={16} className="text-muted-foreground" />
                      <h4 className="font-medium text-foreground">{conflict?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(conflict?.severity)}`}>
                        {conflict?.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{conflict?.description}</p>
                    
                    {selectedConflict === conflict?.id && (
                      <div className="space-y-3">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <h5 className="font-medium text-foreground mb-2">Conflict Details</h5>
                          {conflict?.type === 'faculty' && (
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Time: {conflict?.details?.time}</p>
                              {conflict?.details?.conflicts?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span>{item?.subject} ({item?.program})</span>
                                  <span className="text-muted-foreground">{item?.room} - {item?.students} students</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {conflict?.type === 'room' && (
                            <div className="space-y-1 text-sm">
                              <p>Time: {conflict?.details?.time}</p>
                              <p>Room: {conflict?.details?.room}</p>
                              <p>Capacity: {conflict?.details?.capacity} | Required: {conflict?.details?.required}</p>
                              <p>Subject: {conflict?.details?.subject}</p>
                              <p>Faculty: {conflict?.details?.faculty}</p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Suggested Solutions</h5>
                          <div className="space-y-2">
                            {conflict?.suggestions?.map((suggestion, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                                <span className="text-sm text-foreground">{suggestion}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
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
                    )}
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={selectedConflict === conflict?.id ? "ChevronUp" : "ChevronDown"}
                        onClick={() => setSelectedConflict(selectedConflict === conflict?.id ? null : conflict?.id)}
                      >
                        {selectedConflict === conflict?.id ? 'Hide Details' : 'View Details'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Zap"
                        onClick={() => handleResolveConflict(conflict?.id, 0)}
                      >
                        Auto Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConflictPanel;