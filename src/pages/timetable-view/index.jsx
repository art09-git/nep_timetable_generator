import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FilterControls from './components/FilterControls';
import TimetableGrid from './components/TimetableGrid';
import ConflictPanel from './components/ConflictPanel';
import ScheduleStats from './components/ScheduleStats';
import EditModal from './components/EditModal';

const TimetableView = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('B.Ed');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedRoomType, setSelectedRoomType] = useState('all');
  const [showConflictPanel, setShowConflictPanel] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, cellData: null, day: '', timeSlot: '' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'calendar'
  const [isLoading, setIsLoading] = useState(false);

  const mockConflicts = [
    {
      id: 1,
      day: 'Monday',
      timeSlot: '14:00 - 15:00',
      type: 'Faculty Conflict',
      severity: 'high'
    }
  ];

  useEffect(() => {
    // Simulate loading when filters change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedProgram, selectedSemester, selectedFaculty, selectedRoomType]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Timetable refreshed');
    }, 1000);
  };

  const handleReset = () => {
    console.log('Filters reset');
  };

  const handleCellEdit = (day, timeSlot, cellData) => {
    setEditModal({
      isOpen: true,
      cellData,
      day,
      timeSlot
    });
  };

  const handleDragDrop = (draggedItem, targetDay, targetTimeSlot) => {
    console.log('Moving class:', draggedItem, 'to', targetDay, targetTimeSlot);
    // Implement drag and drop logic here
  };

  const handleSaveEdit = (updatedData) => {
    console.log('Saving edit:', updatedData);
    // Implement save logic here
  };

  const handleResolveConflict = (conflictId, suggestionIndex) => {
    console.log('Resolving conflict:', conflictId, 'with suggestion:', suggestionIndex);
    // Implement conflict resolution logic here
  };

  const handleExport = (format) => {
    console.log('Exporting timetable as:', format);
    // Implement export logic here
  };

  const handleSave = () => {
    console.log('Saving timetable changes');
    // Implement save logic here
  };

  const handleShare = () => {
    console.log('Sharing timetable');
    // Implement share logic here
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePublish = () => {
    if (window.confirm('Are you sure you want to publish this timetable? This will make it visible to all students and faculty.')) {
      console.log('Publishing timetable');
      // Implement publish logic here
    }
  };

  const handleGenerateNew = () => {
    navigate('/timetable-generator');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Breadcrumb />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Eye" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Timetable View</h1>
                  <p className="text-muted-foreground">
                    View and manage generated academic schedules
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Plus"
                onClick={handleGenerateNew}
              >
                Generate New
              </Button>
              <Button
                variant="default"
                iconName="Upload"
                onClick={handlePublish}
              >
                Publish Schedule
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            selectedFaculty={selectedFaculty}
            setSelectedFaculty={setSelectedFaculty}
            selectedRoomType={selectedRoomType}
            setSelectedRoomType={setSelectedRoomType}
            onRefresh={handleRefresh}
            onReset={handleReset}
          />

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Calendar"
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={showStats ? 'default' : 'ghost'}
                  size="sm"
                  iconName="BarChart3"
                  onClick={() => setShowStats(!showStats)}
                >
                  Statistics
                </Button>
                <Button
                  variant={showConflictPanel ? 'default' : 'ghost'}
                  size="sm"
                  iconName="AlertTriangle"
                  onClick={() => setShowConflictPanel(!showConflictPanel)}
                >
                  Conflicts ({mockConflicts?.length})
                </Button>
              </div>
            </div>

            <QuickActions
              context="timetable"
              onExport={handleExport}
              onSave={handleSave}
              onShare={handleShare}
              onPrint={handlePrint}
            />
          </div>

          {/* Statistics Panel */}
          {showStats && (
            <div className="mb-6">
              <ScheduleStats
                selectedProgram={selectedProgram}
                selectedSemester={selectedSemester}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Timetable Grid */}
            <div className={showConflictPanel ? 'xl:col-span-3' : 'xl:col-span-4'}>
              {isLoading ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Loader2" size={48} className="text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="font-medium text-foreground mb-2">Loading Timetable</h3>
                  <p className="text-sm text-muted-foreground">
                    Fetching schedule data for {selectedProgram} - {selectedSemester}
                  </p>
                </div>
              ) : (
                <TimetableGrid
                  selectedProgram={selectedProgram}
                  selectedSemester={selectedSemester}
                  selectedFaculty={selectedFaculty}
                  selectedRoomType={selectedRoomType}
                  onCellEdit={handleCellEdit}
                  onDragDrop={handleDragDrop}
                  conflicts={mockConflicts}
                />
              )}
            </div>

            {/* Conflict Panel */}
            {showConflictPanel && (
              <div className="xl:col-span-1">
                <ConflictPanel
                  conflicts={mockConflicts}
                  onResolveConflict={handleResolveConflict}
                  onViewDetails={(conflict) => console.log('View conflict details:', conflict)}
                />
              </div>
            )}
          </div>

          {/* Mobile Conflict Panel */}
          {showConflictPanel && (
            <div className="xl:hidden mt-6">
              <ConflictPanel
                conflicts={mockConflicts}
                onResolveConflict={handleResolveConflict}
                onViewDetails={(conflict) => console.log('View conflict details:', conflict)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => handleExport('pdf')}
            >
              Download PDF
            </Button>
            <Button
              variant="outline"
              iconName="FileSpreadsheet"
              onClick={() => handleExport('excel')}
            >
              Export Excel
            </Button>
            <Button
              variant="outline"
              iconName="Share2"
              onClick={handleShare}
            >
              Share Schedule
            </Button>
            <Button
              variant="default"
              iconName="Save"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </main>
      {/* Edit Modal */}
      <EditModal
        isOpen={editModal?.isOpen}
        onClose={() => setEditModal({ isOpen: false, cellData: null, day: '', timeSlot: '' })}
        cellData={editModal?.cellData}
        day={editModal?.day}
        timeSlot={editModal?.timeSlot}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default TimetableView;