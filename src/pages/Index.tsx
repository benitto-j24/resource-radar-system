
import React from 'react';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-1 max-w-4xl mx-auto py-6 space-y-4 px-4">
          <div className="flex items-start gap-4 p-4">
            <div className="flex-1 space-y-4">
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm">
                  Let's work together to analyze and optimize resource utilization across your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Input */}
        <div className="border-t mt-auto">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 bg-background rounded-lg border px-4">
                <button className="p-2 hover:bg-accent rounded-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground">
                    <path d="m18.4 2.6-2.1-2.1-12 12 2.1 2.1 12-12ZM16.3.5l3.7 3.7L4.7 19.5 1 15.8 16.3.5Z" />
                  </svg>
                </button>
                <Input 
                  type="text" 
                  placeholder="Message nextgenBOT..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                />
              </div>
              <Button size="icon" className="rounded-lg bg-primary">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-center mt-2 text-muted-foreground">
              nextgenBOT can make mistakes. Check our Terms & Conditions.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
