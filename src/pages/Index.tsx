import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import MessageBubble from '../components/MessageBubble';
import { useLLMQuery } from '@/hooks/useLLMQuery';
import { useEmployeesData } from '@/data/employees'; // ✅ Import this

interface Message {
  text: string;
  timestamp: string;
  isBot: boolean;
  isLoading?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { queryLLM } = useLLMQuery();
  const { loading: employeesLoading } = useEmployeesData('https://nextgenbots.s3.us-east-1.amazonaws.com/employee_data.xlsx'); // ✅ Load XLSX at start
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (employeesLoading) {
      alert('Employee data is still loading. Please wait a few seconds!');
      return;
    }

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      text: inputValue,
      timestamp: userTimestamp,
      isBot: false,
    };
    setMessages(prev => [...prev, userMessage]);

    const loadingBotMessage: Message = {
      text: '',
      timestamp: userTimestamp,
      isBot: true,
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingBotMessage]);

    const query = inputValue;
    setInputValue('');

    try {
      const botReply = await queryLLM(query);

      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (botReply) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            text: botReply,
            timestamp: botTimestamp,
            isBot: true,
            isLoading: false,
          },
        ]);
      } else {
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            text: "**Error:** nextgenBOT couldn't generate a reply. Please try again later.",
            timestamp: botTimestamp,
            isBot: true,
            isLoading: false,
          },
        ]);
      }
    } catch (err) {
      console.error('Error querying LLM:', err);
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: "⚠️ Sorry, nextgenBOT couldn't process your request. Please try again.",
          timestamp: errorTimestamp,
          isBot: true,
          isLoading: false,
        },
      ]);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 py-6 space-y-4 px-4 overflow-y-auto">
          {employeesLoading && (
            <div className="text-center text-muted-foreground">Loading employee data...</div>
          )}
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message.text}
              timestamp={message.timestamp}
              isBot={message.isBot}
              isLoading={message.isLoading}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Section */}
        <div className="border-t mt-auto">
          <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 bg-background rounded-lg border px-4">
                <button type="button" className="p-2 hover:bg-accent rounded-md" disabled>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground">
                    <path d="m18.4 2.6-2.1-2.1-12 12 2.1 2.1 12-12ZM16.3.5l3.7 3.7L4.7 19.5 1 15.8 16.3.5Z" />
                  </svg>
                </button>
                <Input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={employeesLoading ? "Loading employees..." : "Message nextgenBOT..."}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  disabled={employeesLoading}
                />
              </div>
              <Button type="submit" size="icon" className="rounded-lg bg-primary" disabled={employeesLoading}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </form>

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
