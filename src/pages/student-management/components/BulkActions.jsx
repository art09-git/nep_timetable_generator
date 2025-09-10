import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'updateStatus', label: 'Update Status' },
    { value: 'updateSemester', label: 'Update Semester' },
    { value: 'assignElectives', label: 'Assign Electives' },
    { value: 'exportData', label: 'Export Selected' },
    { value: 'generateReports', label: 'Generate Reports' },
    { value: 'sendNotifications', label: 'Send Notifications' }
  ];

  const handleApplyAction = () => {
    if (selectedAction && selectedCount > 0) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
          <div>
            <div className="font-medium text-foreground">
              {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
            </div>
            <div className="text-sm text-muted-foreground">
              Choose an action to apply to selected students
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Select
            options={bulkActionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Select action..."
            className="min-w-48"
          />
          
          <Button
            onClick={handleApplyAction}
            disabled={!selectedAction}
            iconName="Play"
            iconPosition="left"
          >
            Apply
          </Button>
          
          <Button
            variant="outline"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;