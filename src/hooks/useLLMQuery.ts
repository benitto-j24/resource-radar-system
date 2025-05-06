import { useState } from 'react';
import { employeesData } from '@/data/employees';
import { calculateUtilization } from '@/utils/utilizationUtils';
import { UtilizationData } from '@/types/employee';

// System prompt generation
const generateSystemPrompt = (utilizationData: UtilizationData[]) => {
  return `You are a helpful assistant specializing in employee resource utilization.
You have access to the following employee data:

${utilizationData.map(d =>
  `EmployeeID: ${d.employee.EmployeeID}, Name: ${d.employee.Name}, Role: ${d.employee.Role}, AvailableHours: ${d.employee.AvailableHours}, ProductiveHours: ${d.employee.ProductiveHours}, Utilization: ${d.utilizationRate.toFixed(1)}% (${d.status})`
).join('\n')}

Use this data to answer any questions about employees, including:
- listing employees
- resource utilization
- workloads
- availability
- productivity
- staffing or optimization

If the user greets ("hi", "hello", etc.), reply politely without using the data.
Be concise and factual in your answers.`;
};


export const useLLMQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryLLM = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const utilizationData: UtilizationData[] = employeesData.map(calculateUtilization);
      return await queryGemini(query, utilizationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const queryGemini = async (query: string, utilizationData: UtilizationData[]) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${generateSystemPrompt(utilizationData)}\n\nUser: ${query}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      throw new Error('No response from Gemini');
    }

    return message;
  };

  return { queryLLM, isLoading, error };
};
