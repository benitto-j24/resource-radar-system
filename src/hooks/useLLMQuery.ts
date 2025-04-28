import { useState } from 'react';
import { employeesData } from '@/data/employees';
import { calculateUtilization } from '@/utils/utilizationUtils';
import { UtilizationData } from '@/types/employee';

// Generate the system prompt for LLM context
const generateSystemPrompt = (utilizationData: UtilizationData[]) => {
  return `You are a helpful assistant specializing in resource utilization. 
You have access to the following employee data for reference:

${utilizationData.map(d =>
    `EmployeeID: ${d.employee.EmployeeID}, Name: ${d.employee.Name}, Role: ${d.employee.Role}, AvailableHours: ${d.employee.AvailableHours}, ProductiveHours: ${d.employee.ProductiveHours}, Utilization: ${d.utilizationRate.toFixed(1)}% (${d.status})`
  ).join('\n')}

ONLY use this data if the user asks about:
- resource utilization
- employee workloads
- available hours
- productive hours
- optimization
- staffing

If the user greets ("hi", "hello", etc.), reply politely without using the data.
Keep your replies concise and factual.
`;
};


export const useLLMQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryLLM = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      //  Recalculate utilizationData fresh every query
      const utilizationData: UtilizationData[] = employeesData.map(calculateUtilization);

      return await queryOllama(query, utilizationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const queryOllama = async (query: string, utilizationData: UtilizationData[]) => {
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
