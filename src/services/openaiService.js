import openai from './openaiClient';

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @param {string} systemPrompt - Custom system prompt for context.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getBasicChatCompletion(userMessage, systemPrompt = 'You are a helpful assistant for academic timetable generation.') {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error in basic chat completion:', error);
    throw error;
  }
}

/**
 * Streams a chat completion response chunk by chunk.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 * @param {string} systemPrompt - Custom system prompt for context.
 */
export async function getStreamingChatCompletion(userMessage, onChunk, systemPrompt = 'You are a helpful assistant for academic timetable generation.') {
  try {
    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      max_tokens: 2000,
      temperature: 0.7
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    throw error;
  }
}

/**
 * Generates a structured response for timetable optimization suggestions.
 * @param {string} userMessage - The user's input message.
 * @param {Object} customSchema - Custom JSON schema for the response.
 * @returns {Promise<Object>} Structured response object.
 */
export async function getTimetableStructuredResponse(userMessage, customSchema = null) {
  const defaultSchema = {
    type: 'object',
    properties: {
      suggestions: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'List of timetable optimization suggestions'
      },
      conflicts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            severity: { type: 'string', enum: ['low', 'medium', 'high'] },
            solution: { type: 'string' }
          },
          required: ['description', 'severity', 'solution']
        }
      },
      confidence: { 
        type: 'number', 
        minimum: 0, 
        maximum: 1,
        description: 'Confidence level in the suggestions (0-1)'
      }
    },
    required: ['suggestions', 'conflicts', 'confidence'],
    additionalProperties: false,
  };

  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a timetable optimization expert. Analyze the provided timetable data and provide structured suggestions for improvements and conflict resolutions.' 
        },
        { role: 'user', content: userMessage },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'timetable_optimization',
          schema: customSchema || defaultSchema,
        },
      },
      temperature: 0.3
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error in structured timetable response:', error);
    throw error;
  }
}

/**
 * Generates timetable optimization suggestions based on course data.
 * @param {Array} courses - Array of course objects.
 * @param {Array} constraints - Array of constraint objects.
 * @returns {Promise<Object>} Optimization suggestions.
 */
export async function generateTimetableOptimization(courses, constraints = []) {
  const systemPrompt = `You are an expert timetable optimization assistant for academic institutions. 
  Analyze the provided course data and constraints to suggest optimal scheduling solutions. 
  Consider factors like room capacity, time conflicts, instructor availability, and student preferences.`;

  const userMessage = `Please analyze this timetable data and provide optimization suggestions:
  
  Courses: ${JSON.stringify(courses, null, 2)}
  Constraints: ${JSON.stringify(constraints, null, 2)}
  
  Focus on identifying conflicts, suggesting better time slots, and optimizing resource utilization.`;

  return await getTimetableStructuredResponse(userMessage);
}

/**
 * Generates course scheduling suggestions based on program requirements.
 * @param {Object} programData - Program and semester information.
 * @param {Array} availableSlots - Available time slots.
 * @returns {Promise<string>} Scheduling suggestions.
 */
export async function generateCourseScheduling(programData, availableSlots) {
  const systemPrompt = `You are an academic scheduling expert. Help generate optimal course schedules based on program requirements, available time slots, and best practices for student learning.`;

  const userMessage = `Generate course scheduling suggestions for:
  Program: ${programData?.program || 'Not specified'}
  Semester: ${programData?.semester || 'Not specified'}
  Available Time Slots: ${JSON.stringify(availableSlots, null, 2)}
  
  Provide specific recommendations for course placement and timing optimization.`;

  return await getBasicChatCompletion(userMessage, systemPrompt);
}

/**
 * Analyzes timetable conflicts and suggests resolutions.
 * @param {Array} conflicts - Array of detected conflicts.
 * @returns {Promise<Object>} Conflict resolution suggestions.
 */
export async function analyzeConflicts(conflicts) {
  const conflictSchema = {
    type: 'object',
    properties: {
      analysis: { type: 'string', description: 'Overall conflict analysis' },
      resolutions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            conflictId: { type: 'string' },
            priority: { type: 'string', enum: ['high', 'medium', 'low'] },
            solutions: { type: 'array', items: { type: 'string' } },
            impact: { type: 'string' }
          },
          required: ['conflictId', 'priority', 'solutions']
        }
      },
      recommendations: { type: 'array', items: { type: 'string' } }
    },
    required: ['analysis', 'resolutions', 'recommendations'],
    additionalProperties: false
  };

  const userMessage = `Analyze these timetable conflicts and provide resolution strategies:
  ${JSON.stringify(conflicts, null, 2)}`;

  return await getTimetableStructuredResponse(userMessage, conflictSchema);
}

/**
 * Moderates user input content for safety.
 * @param {string} text - The text to moderate.
 * @returns {Promise<object>} Moderation results.
 */
export async function moderateContent(text) {
  try {
    const response = await openai?.moderations?.create({
      model: 'text-moderation-latest',
      input: text,
    });

    return response?.results?.[0];
  } catch (error) {
    console.error('Error moderating content:', error);
    throw error;
  }
}