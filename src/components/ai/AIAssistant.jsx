import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Loader2, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { getBasicChatCompletion, getStreamingChatCompletion, moderateContent } from '../../services/openaiService';

const AIAssistant = ({ isOpen, onToggle, context = 'general' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I\'m your AI assistant for timetable management. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const contextPrompts = {
    timetable: 'You are an expert timetable management assistant. Help users with scheduling, conflict resolution, and optimization.',
    courses: 'You are a course management assistant. Help users with course planning, scheduling, and academic requirements.',
    students: 'You are a student management assistant. Help users with student data, enrollment, and academic tracking.',
    general: 'You are a helpful assistant for academic management tasks.'
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue?.trim() || isLoading) return;

    const userMessage = inputValue?.trim();
    setInputValue('');
    setIsLoading(true);

    // Check content moderation first
    try {
      const moderation = await moderateContent(userMessage);
      if (moderation?.flagged) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            type: 'user',
            content: userMessage,
            timestamp: new Date()
          },
          {
            id: Date.now() + 1,
            type: 'assistant',
            content: "I can't process that message as it violates content policies. Please rephrase your question in a respectful manner.",
            timestamp: new Date()
          }
        ]);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.warn('Moderation check failed, proceeding with message:', error);
    }

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Create assistant message placeholder for streaming
      const assistantMessageId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      setIsStreaming(true);

      // Use streaming response for better UX
      await getStreamingChatCompletion(
        userMessage,
        (chunk) => {
          setMessages(prev => prev?.map(msg => 
            msg?.id === assistantMessageId 
              ? { ...msg, content: msg?.content + chunk }
              : msg
          ));
        },
        contextPrompts?.[context] || contextPrompts?.general
      );

      // Mark streaming as complete
      setMessages(prev => prev?.map(msg => 
        msg?.id === assistantMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to basic completion
      try {
        const response = await getBasicChatCompletion(
          userMessage, 
          contextPrompts?.[context] || contextPrompts?.general
        );

        setMessages(prev => [...prev?.slice(0, -1), {
          id: Date.now() + 1,
          type: 'assistant',
          content: response,
          timestamp: new Date()
        }]);
      } catch (fallbackError) {
        setMessages(prev => [...prev?.slice(0, -1), {
          id: Date.now() + 1,
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please check your API key configuration and try again.',
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: "Chat cleared! How can I help you with your timetable management?",
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={onToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-96 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-600 capitalize">{context} Support</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message?.type === 'user' ?'bg-blue-600 text-white' :'bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              {message?.type === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">AI Assistant</span>
                  {message?.isStreaming && (
                    <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                  )}
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
              <p className={`text-xs mt-1 opacity-70 ${
                message?.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message?.timestamp?.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about timetables, courses, or students..."
            className="flex-1 bg-white"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue?.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {import.meta.env?.VITE_OPENAI_API_KEY === 'your-openai-api-key-here' && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
            ⚠️ Please set your OpenAI API key in the environment variables to use this feature.
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;