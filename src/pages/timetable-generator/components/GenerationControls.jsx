import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const GenerationControls = ({ onGenerate, onSimulate, onResolveConflicts, isGenerating }) => {
  const [generationMode, setGenerationMode] = useState('auto');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const generationModes = [
    { value: 'auto', label: 'Auto Generate', description: 'Fully automated timetable generation' },
    { value: 'guided', label: 'Guided Generation', description: 'Step-by-step generation with user input' },
    { value: 'template', label: 'Template Based', description: 'Generate from existing template' },
    { value: 'manual', label: 'Manual Setup', description: 'Manual slot-by-slot assignment' }
  ];

  const simulateGeneration = async () => {
    const steps = [
      'Analyzing constraints...',
      'Loading faculty data...',
      'Processing room availability...',
      'Optimizing schedules...',
      'Resolving conflicts...',
      'Finalizing timetable...'
    ];

    for (let i = 0; i < steps?.length; i++) {
      setCurrentStep(steps?.[i]);
      setProgress(((i + 1) / steps?.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setCurrentStep('Generation complete!');
    setTimeout(() => {
      setProgress(0);
      setCurrentStep('');
    }, 2000);
  };

  const handleGenerate = async () => {
    await simulateGeneration();
    onGenerate?.(generationMode);
  };

  const handleSimulate = () => {
    onSimulate?.();
  };

  const handleResolveConflicts = () => {
    onResolveConflicts?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Generation Controls</h3>
      </div>

      <div className="space-y-6">
        {/* Generation Mode */}
        <div>
          <Select
            label="Generation Mode"
            description="Choose how you want to generate the timetable"
            options={generationModes}
            value={generationMode}
            onChange={setGenerationMode}
          />
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {currentStep && (
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="default"
            onClick={handleGenerate}
            loading={isGenerating}
            iconName="Play"
            iconPosition="left"
            className="w-full"
          >
            Generate
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSimulate}
            disabled={isGenerating}
            iconName="TestTube"
            iconPosition="left"
            className="w-full"
          >
            Simulate
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleResolveConflicts}
            disabled={isGenerating}
            iconName="AlertTriangle"
            iconPosition="left"
            className="w-full"
          >
            Resolve Conflicts
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              onClick={() => console.log('Copy from previous')}
              className="w-full"
            >
              Copy Previous
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Upload"
              onClick={() => console.log('Import template')}
              className="w-full"
            >
              Import
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              onClick={() => console.log('Save as template')}
              className="w-full"
            >
              Save Template
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={() => console.log('Reset all')}
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Generation Statistics */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Generation Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-xs text-muted-foreground">Total Slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">142</div>
              <div className="text-xs text-muted-foreground">Filled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">8</div>
              <div className="text-xs text-muted-foreground">Conflicts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">6</div>
              <div className="text-xs text-muted-foreground">Empty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationControls;