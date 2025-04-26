import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import MessageBubble from '../components/MessageBubble';
import { useLLMQuery } from '@/hooks/useLLMQuery'; // <- make sure path matches

interface Message {
  text: string;
  timestamp: string;
  isBot: boolean;
}

// Dummy utilizationData (replace with real data if available)
const utilizationData = [];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { queryLLM, isLoading, error } = useLLMQuery(utilizationData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      timestamp: userTimestamp,
      isBot: false,
    };
    setMessages(prev => [...prev, userMessage]);

    const query = inputValue;
    setInputValue('');

    try {
      const botReply = await queryLLM(query);

      if (botReply) {
        const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const botMessage: Message = {
          text: botReply, // The response from Ollama
          timestamp: botTimestamp,
          isBot: true,
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Error querying LLM:', err);

      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Show bot error message
      setMessages(prev => [...prev, {
        text: "⚠️ Sorry, nextgenBOT couldn't process the request.",
        timestamp: errorTimestamp,
        isBot: true,
      }]);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 py-6 space-y-4 px-4 overflow-y-auto">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message.text}
              timestamp={message.timestamp}
              isBot={message.isBot}
            />
          ))}
        </div>

        {/* Input Section */}
        <div className="border-t mt-auto">
          <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 bg-background rounded-lg border px-4">
                <button type="button" className="p-2 hover:bg-accent rounded-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground">
                    <path d="m18.4 2.6-2.1-2.1-12 12 2.1 2.1 12-12ZM16.3.5l3.7 3.7L4.7 19.5 1 15.8 16.3.5Z" />
                  </svg>
                </button>
                <Input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message nextgenBOT..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" size="icon" className="rounded-lg bg-primary" disabled={isLoading}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </form>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="text-xs text-center mt-2 text-muted-foreground">
                nextgenBOT is thinking...
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="text-xs text-center mt-2 text-red-500">
                {error}
              </div>
            )}

            <div className="text-xs text-center mt-4 text-muted-foreground">
              nextgenBOT can make mistakes. Check our Terms & Conditions.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
