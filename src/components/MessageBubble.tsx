
import React from 'react';

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isBot?: boolean;
}

const MessageBubble = ({ message, timestamp, isBot = false }: MessageBubbleProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center ${isBot ? 'bg-blue-100' : 'bg-primary'}`}>
        {isBot ? (
          <span className="text-primary text-sm">AI</span>
        ) : (
          <span className="text-primary-foreground text-sm">You</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{isBot ? 'nextgenBOT' : 'You'}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="mt-1 text-sm">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
