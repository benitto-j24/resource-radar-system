import { useState } from 'react';
import { employeesData } from '@/data/employees';
import { calculateUtilization } from '@/utils/utilizationUtils';
import { UtilizationData } from '@/types/employee';

// Calculate utilizationData once from employeesData
const utilizationData: UtilizationData[] = employeesData.map(calculateUtilization);

// Generate the system prompt for LLM context
const generateSystemPrompt = (utilizationData: UtilizationData[]) => {
    return `You are a helpful assistant specializing in resource utilization. 
  You have access to the following utilization data for reference:
  
  ${utilizationData.map(d =>
      `${d.employee.Name} (${d.employee.Role}): ${d.utilizationRate.toFixed(1)}% utilization (${d.status})`
    ).join('\n')}
  
  ONLY refer to this data if the user asks specifically about:
  - resource utilization
  - employee workloads
  - optimization
  - staffing
  
  If the user says greetings like "hi", "hello", "hey", or small talk, respond politely without mentioning the data.
  Stay concise, factual, and do not give unnecessary information.`;
  };
  

export const useLLMQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryLLM = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await queryOllama(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const queryOllama = async (query: string) => {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        stream: false,
        messages: [
          {
            role: 'system',
            content: generateSystemPrompt(utilizationData),
          },
          {
            role: 'user',
            content: query,
          }
        ],
        options: {
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama server error: ${response.status}`);
    }

    const data = await response.json();
    
    const message = data?.message?.content || data?.response;
    if (!message) {
      throw new Error('No response from Ollama');
    }

    return message;
  };

  return { queryLLM, isLoading, error };
};
