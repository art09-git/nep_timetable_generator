import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import Button from '../../../components/ui/Button';
import AIAssistant from '../../../components/ai/AIAssistant';
import TimetableOptimizer from '../../../components/ai/TimetableOptimizer';
import { generateCourseScheduling } from '../../../services/openaiService';

const AIIntegration = ({ 
  courses = [], 
  constraints = [], 
  conflicts = [],
  programData = {},
  availableSlots = [],
  onSchedulingSuggestion,
  onOptimizationResult 
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [schedulingSuggestion, setSchedulingSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const hasContent = courses?.length > 0 || conflicts?.length > 0;

  const handleGenerateSchedulingSuggestion = async () => {
    if (!programData?.program && !availableSlots?.length) return;

    setIsGenerating(true);
    try {
      const suggestion = await generateCourseScheduling(programData, availableSlots);
      setSchedulingSuggestion(suggestion);
      onSchedulingSuggestion?.(suggestion);
    } catch (error) {
      console.error('Error generating scheduling suggestion:', error);
      setSchedulingSuggestion('Unable to generate scheduling suggestion. Please check your API configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI-Powered Features</h2>
            <p className="text-sm text-gray-600">Enhance your timetable with intelligent automation</p>
          </div>
        </div>
        <Button
          onClick={() => setIsAssistantOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat with AI
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">AI Assistant</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Get help with timetable questions and guidance</p>
          <Button 
            size="sm" 
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
            onClick={() => setIsAssistantOpen(true)}
          >
            Open Chat
          </Button>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Smart Optimization</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Optimize schedules and resolve conflicts automatically</p>
          <Button 
            size="sm" 
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
            onClick={() => setShowOptimizer(!showOptimizer)}
            disabled={!hasContent}
          >
            {showOptimizer ? 'Hide Optimizer' : 'Show Optimizer'}
          </Button>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-gray-900">Course Scheduling</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Get suggestions for optimal course placement</p>
          <Button 
            size="sm" 
            variant="outline"
            className="border-green-300 text-green-600 hover:bg-green-50"
            onClick={handleGenerateSchedulingSuggestion}
            disabled={isGenerating || (!programData?.program && !availableSlots?.length)}
          >
            {isGenerating ? 'Generating...' : 'Get Suggestions'}
          </Button>
        </div>
      </div>

      {/* Scheduling Suggestion */}
      {schedulingSuggestion && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">AI Scheduling Suggestion</h3>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">{schedulingSuggestion}</div>
        </div>
      )}

      {/* Optimizer */}
      {showOptimizer && (
        <TimetableOptimizer
          courses={courses}
          constraints={constraints}
          conflicts={conflicts}
          onOptimizationResult={onOptimizationResult}
        />
      )}

      {/* AI Assistant */}
      <AIAssistant
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
        context="timetable"
      />

      {/* Status Messages */}
      {!hasContent && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium mb-2">AI Features Ready</p>
          <p className="text-sm">Add courses or generate a timetable to unlock AI-powered optimization features.</p>
        </div>
      )}
    </div>
  );
};

export default AIIntegration;