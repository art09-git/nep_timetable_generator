import React, { useState } from 'react';
import { Brain, Lightbulb, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import { generateTimetableOptimization, analyzeConflicts } from '../../services/openaiService';

const TimetableOptimizer = ({ courses = [], constraints = [], conflicts = [], onOptimizationResult }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState(null);
  const [activeTab, setActiveTab] = useState('suggestions');

  const handleOptimize = async () => {
    if (!courses?.length) return;
    
    setIsOptimizing(true);
    try {
      const result = await generateTimetableOptimization(courses, constraints);
      setOptimization(result);
      onOptimizationResult?.(result);
    } catch (error) {
      console.error('Error optimizing timetable:', error);
      setOptimization({
        suggestions: ['Unable to generate optimization suggestions. Please check your API configuration.'],
        conflicts: [],
        confidence: 0
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleAnalyzeConflicts = async () => {
    if (!conflicts?.length) return;

    setIsOptimizing(true);
    try {
      const result = await analyzeConflicts(conflicts);
      setOptimization(result);
      onOptimizationResult?.(result);
    } catch (error) {
      console.error('Error analyzing conflicts:', error);
      setOptimization({
        analysis: 'Unable to analyze conflicts. Please check your API configuration.',
        resolutions: [],
        recommendations: []
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Timetable Optimizer</h2>
              <p className="text-sm text-gray-600">Get intelligent suggestions for better scheduling</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleOptimize}
              disabled={isOptimizing || !courses?.length}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isOptimizing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <TrendingUp className="w-4 h-4 mr-2" />
              )}
              Optimize Schedule
            </Button>
            {conflicts?.length > 0 && (
              <Button 
                onClick={handleAnalyzeConflicts}
                disabled={isOptimizing}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Analyze Conflicts
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {!optimization && !isOptimizing && (
          <div className="text-center py-12 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Ready to Optimize</p>
            <p className="text-sm">Click "Optimize Schedule" to get AI-powered suggestions for your timetable.</p>
            {courses?.length === 0 && (
              <p className="text-xs text-red-500 mt-2">Please add courses first to enable optimization.</p>
            )}
          </div>
        )}

        {isOptimizing && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg font-medium text-gray-900 mb-2">Analyzing Your Timetable</p>
            <p className="text-sm text-gray-600">AI is processing your courses and constraints...</p>
          </div>
        )}

        {optimization && (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {optimization?.suggestions && (
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'suggestions' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 inline-block mr-2" />
                  Suggestions ({optimization?.suggestions?.length || 0})
                </button>
              )}
              {optimization?.conflicts && (
                <button
                  onClick={() => setActiveTab('conflicts')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'conflicts' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                  Conflicts ({optimization?.conflicts?.length || 0})
                </button>
              )}
              {optimization?.resolutions && (
                <button
                  onClick={() => setActiveTab('resolutions')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'resolutions' ?'bg-white text-gray-900 shadow-sm' :'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline-block mr-2" />
                  Resolutions ({optimization?.resolutions?.length || 0})
                </button>
              )}
            </div>

            {/* Content */}
            {activeTab === 'suggestions' && optimization?.suggestions && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Optimization Suggestions</h3>
                  {optimization?.confidence !== undefined && (
                    <div className="text-sm text-gray-600">
                      Confidence: <span className="font-medium">{Math.round(optimization?.confidence * 100)}%</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {optimization?.suggestions?.map((suggestion, index) => (
                    <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-1 rounded">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-900 flex-1">{suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'conflicts' && optimization?.conflicts && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Identified Conflicts</h3>
                <div className="space-y-3">
                  {optimization?.conflicts?.map((conflict, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(conflict?.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase">{conflict?.severity}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">{conflict?.description}</p>
                          {conflict?.solution && (
                            <p className="text-xs opacity-75">{conflict?.solution}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resolutions' && optimization?.resolutions && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Conflict Resolutions</h3>
                {optimization?.analysis && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-900">{optimization?.analysis}</p>
                  </div>
                )}
                <div className="space-y-3">
                  {optimization?.resolutions?.map((resolution, index) => (
                    <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-1 rounded">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs font-medium text-green-600 uppercase">
                              {resolution?.priority} Priority
                            </span>
                          </div>
                          <div className="space-y-2">
                            {resolution?.solutions?.map((solution, solIndex) => (
                              <p key={solIndex} className="text-sm text-gray-900">• {solution}</p>
                            ))}
                          </div>
                          {resolution?.impact && (
                            <p className="text-xs text-gray-600 mt-2 italic">Impact: {resolution?.impact}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {optimization?.recommendations && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Additional Recommendations:</h4>
                    {optimization?.recommendations?.map((rec, index) => (
                      <p key={index} className="text-sm text-gray-700">• {rec}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* API Key Warning */}
      {import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here' && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-200">
          <p className="text-sm text-yellow-800">
            ⚠️ To use AI optimization features, please set your OpenAI API key in the environment variables.
          </p>
        </div>
      )}
    </div>
  );
};

export default TimetableOptimizer;