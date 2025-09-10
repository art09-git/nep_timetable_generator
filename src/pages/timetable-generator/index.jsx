import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';



import Icon from '../../components/AppIcon';
import { Calendar, Settings, Brain } from 'lucide-react';
import { Helmet } from 'react-helmet';

// Import all components
import ProgramSelector from './components/ProgramSelector';
import SemesterSelector from './components/SemesterSelector';
import ConstraintPanel from './components/ConstraintPanel';
import TimetableGrid from './components/TimetableGrid';
import GenerationControls from './components/GenerationControls';
import ConflictPanel from './components/ConflictPanel';
import ExportOptions from './components/ExportOptions';
import AIIntegration from './components/AIIntegration';

const TimetableGenerator = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [detectedConflicts, setDetectedConflicts] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const [activeTab, setActiveTab] = useState('generator');
  
  // AI Integration state
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);

  const handleTimetableGeneration = useCallback((timetableData) => {
    setGeneratedTimetable(timetableData);
    // Simulate conflict detection
    const mockConflicts = [
      {
        id: 1,
        type: 'time_overlap',
        message: 'Computer Science 101 and Mathematics 201 have overlapping time slots',
        severity: 'high',
        courses: ['CS101', 'MATH201'],
      }
    ];
    setDetectedConflicts(mockConflicts);
  }, []);

  const handleConflictResolution = useCallback((conflictId) => {
    setDetectedConflicts(prev => 
      prev?.filter(conflict => conflict?.id !== conflictId)
    );
  }, []);

  const handleConstraintUpdate = useCallback((newConstraints) => {
    setConstraints(newConstraints);
  }, []);

  // AI Integration handlers
  const handleSchedulingSuggestion = useCallback((suggestion) => {
    setAiSuggestions(suggestion);
  }, []);

  const handleOptimizationResult = useCallback((result) => {
    setOptimizationResult(result);
  }, []);

  const courses = generatedTimetable?.courses || [];
  const availableSlots = [
    { day: 'Monday', time: '09:00-10:30' },
    { day: 'Monday', time: '11:00-12:30' },
    { day: 'Tuesday', time: '09:00-10:30' },
    { day: 'Tuesday', time: '11:00-12:30' },
    { day: 'Wednesday', time: '09:00-10:30' },
  ];

  const tabs = [
    { id: 'generator', label: 'Generator', icon: Calendar },
    { id: 'conflicts', label: 'Conflicts', icon: Settings, badge: detectedConflicts?.length },
    { id: 'ai', label: 'AI Features', icon: Brain },
  ];

  return (
    <>
      <Helmet>
        <title>Timetable Generator - NEP Academic System</title>
        <meta name="description" content="Generate and manage academic timetables with AI-powered optimization" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Timetable Generator</h1>
                <p className="text-sm text-gray-600">Create and optimize academic schedules with AI assistance</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs?.map((tab) => {
                  const Icon = tab?.icon;
                  return (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab?.id
                          ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab?.label}</span>
                      {tab?.badge > 0 && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {tab?.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'generator' && (
            <div className="space-y-8">
              {/* Configuration Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgramSelector
                  selectedProgram={selectedProgram}
                  onProgramChange={setSelectedProgram}
                  selectedPrograms={[selectedProgram]} // Add missing required prop
                />
                <SemesterSelector
                  selectedSemester={selectedSemester}
                  onSemesterChange={setSelectedSemester}
                  selectedPrograms={[selectedProgram]} // Add missing required prop
                />
              </div>

              {/* Generation Controls */}
              <GenerationControls
                selectedProgram={selectedProgram}
                selectedSemester={selectedSemester}
                onGenerate={handleTimetableGeneration}
                constraints={constraints}
                onSimulate={() => {}} // Add missing required prop
                onResolveConflicts={handleConflictResolution} // Add missing required prop
                isGenerating={false} // Add missing required prop
              />

              {/* Constraints Panel */}
              <ConstraintPanel
                constraints={constraints}
                onConstraintUpdate={handleConstraintUpdate}
                onConstraintChange={handleConstraintUpdate} // Add missing required prop (alias to existing)
              />

              {/* Timetable Display */}
              {generatedTimetable && (
                <TimetableGrid
                  timetable={generatedTimetable}
                  conflicts={detectedConflicts}
                  onCellEdit={() => {}} // Add missing required prop
                  onDragDrop={() => {}} // Add missing required prop
                />
              )}

              {/* Export Options */}
              {generatedTimetable && (
                <ExportOptions 
                  timetable={generatedTimetable}
                  onExport={() => {}} // Add missing required prop
                  onShare={() => {}} // Add missing required prop
                  onPublish={() => {}} // Add missing required prop
                />
              )}
            </div>
          )}

          {activeTab === 'conflicts' && (
            <ConflictPanel
              conflicts={detectedConflicts}
              onConflictResolve={handleConflictResolution}
              timetable={generatedTimetable}
              onResolveConflict={handleConflictResolution} // Add missing required prop (alias to existing)
              onResolveAll={() => setDetectedConflicts([])} // Add missing required prop
            />
          )}

          {activeTab === 'ai' && (
            <AIIntegration
              courses={courses}
              constraints={constraints}
              conflicts={detectedConflicts}
              programData={{
                program: selectedProgram,
                semester: selectedSemester
              }}
              availableSlots={availableSlots}
              onSchedulingSuggestion={handleSchedulingSuggestion}
              onOptimizationResult={handleOptimizationResult}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TimetableGenerator;