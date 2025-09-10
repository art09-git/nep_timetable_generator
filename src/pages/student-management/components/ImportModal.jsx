import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (file) => {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (allowedTypes?.includes(file?.type)) {
      setSelectedFile(file);
      setValidationErrors([]);
    } else {
      setValidationErrors(['Please select a valid Excel (.xlsx, .xls) or CSV file.']);
    }
  };

  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const simulateImport = async () => {
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    for (let i = 0; i <= 100; i += 10) {
      setImportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Simulate validation errors
    const mockErrors = [
      'Row 5: Invalid email format for student "John Doe"',
      'Row 12: Missing program information for student "Jane Smith"',
      'Row 18: Credit count exceeds maximum allowed (30) for student "Mike Johnson"'
    ];
    
    setValidationErrors(mockErrors);
    setIsImporting(false);
    
    // If no errors, close modal and trigger import
    if (mockErrors?.length === 0) {
      onImport(selectedFile);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImportProgress(0);
    setIsImporting(false);
    setValidationErrors([]);
    setDragActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Import Students</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="FileText" size={32} className="text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedFile?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Upload" size={32} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drop your file here, or{' '}
                    <button
                      onClick={() => fileInputRef?.current?.click()}
                      className="text-primary hover:underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports Excel (.xlsx, .xls) and CSV files up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Importing...</span>
                <span className="text-sm text-muted-foreground">{importProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors?.length > 0 && (
            <div className="bg-error/5 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="AlertTriangle" size={20} className="text-error" />
                <h3 className="font-medium text-error">Validation Errors</h3>
              </div>
              <ul className="space-y-1 text-sm text-error">
                {validationErrors?.map((error, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Dot" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Template Download */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Need a template?</h3>
                <p className="text-sm text-muted-foreground">
                  Download our Excel template with the correct format and sample data.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Download Template
              </Button>
            </div>
          </div>

          {/* Format Requirements */}
          <div className="text-sm text-muted-foreground space-y-2">
            <h4 className="font-medium text-foreground">Required Columns:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <li>• Roll Number</li>
              <li>• Student Name</li>
              <li>• Email Address</li>
              <li>• Program (B.Ed./M.Ed./FYUP/ITEP)</li>
              <li>• Semester (1-8)</li>
              <li>• Enrolled Credits</li>
              <li>• Status (Active/Inactive)</li>
              <li>• Elective Courses (comma-separated)</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={simulateImport}
            disabled={!selectedFile || isImporting}
            loading={isImporting}
            iconName="Upload"
            iconPosition="left"
          >
            Import Students
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;