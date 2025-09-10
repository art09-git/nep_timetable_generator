import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'activate', label: 'Activate Courses' },
    { value: 'deactivate', label: 'Deactivate Courses' },
    { value: 'delete', label: 'Delete Courses' },
    { value: 'export', label: 'Export Selected' },
    { value: 'duplicate', label: 'Duplicate Courses' },
    { value: 'update-credits', label: 'Update Credits' },
    { value: 'assign-faculty', label: 'Assign Faculty' },
    { value: 'set-prerequisites', label: 'Set Prerequisites' }
  ];

  const handleApplyAction = async () => {
    if (!selectedAction || selectedCount === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-slide-in">
      <div className="bg-card border border-border rounded-lg elevation-3 p-4 min-w-96">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {selectedCount} course{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-muted-foreground">Choose an action to apply</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              className="min-w-48"
            />
            
            <Button
              variant="default"
              size="sm"
              onClick={handleApplyAction}
              disabled={!selectedAction || isProcessing}
              loading={isProcessing}
              iconName="Play"
              iconPosition="left"
            >
              Apply
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              title="Clear Selection"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">Quick actions:</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('activate')}
            iconName="Play"
            iconPosition="left"
          >
            Activate
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('deactivate')}
            iconName="Pause"
            iconPosition="left"
          >
            Deactivate
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('export')}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;