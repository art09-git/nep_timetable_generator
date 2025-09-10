import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportOptions = ({ onExport, onShare, onPublish }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('all');
  const [includeOptions, setIncludeOptions] = useState({
    facultyDetails: true,
    roomInfo: true,
    studentCount: true,
    conflicts: false,
    notes: true
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', description: 'Printable PDF format' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Editable Excel format' },
    { value: 'csv', label: 'CSV File', description: 'Comma-separated values' },
    { value: 'image', label: 'Image (PNG)', description: 'High-resolution image' }
  ];

  const exportScopes = [
    { value: 'all', label: 'All Programs', description: 'Complete timetable for all programs' },
    { value: 'bed', label: 'B.Ed. Only', description: 'Bachelor of Education timetable' },
    { value: 'med', label: 'M.Ed. Only', description: 'Master of Education timetable' },
    { value: 'fyup', label: 'FYUP Only', description: 'Four-Year Undergraduate Programme' },
    { value: 'itep', label: 'ITEP Only', description: 'Integrated Teacher Education Programme' }
  ];

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      scope: exportScope,
      options: includeOptions,
      timestamp: new Date()?.toISOString()
    };
    onExport?.(exportData);
  };

  const handleShare = () => {
    onShare?.({
      format: exportFormat,
      scope: exportScope,
      shareType: 'link'
    });
  };

  const handlePublish = () => {
    onPublish?.({
      scope: exportScope,
      publishTo: 'portal'
    });
  };

  const handleOptionChange = (option, checked) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export & Share</h3>
      </div>
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <Select
            label="Export Format"
            description="Choose the format for your timetable export"
            options={exportFormats}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>

        {/* Export Scope */}
        <div>
          <Select
            label="Export Scope"
            description="Select which programs to include in the export"
            options={exportScopes}
            value={exportScope}
            onChange={setExportScope}
          />
        </div>

        {/* Include Options */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Include in Export</h4>
          <div className="space-y-3">
            <Checkbox
              label="Faculty Details"
              description="Include faculty names and contact information"
              checked={includeOptions?.facultyDetails}
              onChange={(e) => handleOptionChange('facultyDetails', e?.target?.checked)}
            />
            
            <Checkbox
              label="Room Information"
              description="Include room numbers and capacity details"
              checked={includeOptions?.roomInfo}
              onChange={(e) => handleOptionChange('roomInfo', e?.target?.checked)}
            />
            
            <Checkbox
              label="Student Count"
              description="Show number of students for each class"
              checked={includeOptions?.studentCount}
              onChange={(e) => handleOptionChange('studentCount', e?.target?.checked)}
            />
            
            <Checkbox
              label="Conflict Indicators"
              description="Highlight any remaining conflicts or issues"
              checked={includeOptions?.conflicts}
              onChange={(e) => handleOptionChange('conflicts', e?.target?.checked)}
            />
            
            <Checkbox
              label="Additional Notes"
              description="Include any special instructions or notes"
              checked={includeOptions?.notes}
              onChange={(e) => handleOptionChange('notes', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            className="w-full"
          >
            Export Timetable
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              iconName="Share2"
              iconPosition="left"
              className="w-full"
            >
              Share Link
            </Button>
            
            <Button
              variant="secondary"
              onClick={handlePublish}
              iconName="Globe"
              iconPosition="left"
              className="w-full"
            >
              Publish
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Quick Export</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              onClick={() => onExport?.({ format: 'pdf', scope: 'all', quick: true })}
              className="w-full"
            >
              PDF (All)
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="FileSpreadsheet"
              onClick={() => onExport?.({ format: 'excel', scope: 'all', quick: true })}
              className="w-full"
            >
              Excel (All)
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Image"
              onClick={() => onExport?.({ format: 'image', scope: 'all', quick: true })}
              className="w-full"
            >
              Image
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Printer"
              onClick={() => window.print()}
              className="w-full"
            >
              Print
            </Button>
          </div>
        </div>

        {/* Export History */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Recent Exports</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} className="text-muted-foreground" />
                <span className="text-foreground">Complete_Timetable_2024.pdf</span>
              </div>
              <span className="text-muted-foreground">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="FileSpreadsheet" size={14} className="text-muted-foreground" />
                <span className="text-foreground">BEd_Schedule_Sept.xlsx</span>
              </div>
              <span className="text-muted-foreground">1 day ago</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Image" size={14} className="text-muted-foreground" />
                <span className="text-foreground">FYUP_Timetable.png</span>
              </div>
              <span className="text-muted-foreground">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;