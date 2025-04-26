import React from 'react';

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isBot?: boolean;
}

const MessageBubble = ({ message, timestamp, isBot = false }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}> {/* Dynamic alignment */}
      <div className={`flex items-start gap-3 max-w-md ${isBot ? '' : 'flex-row-reverse'}`}> {/* Reverse order for user */}
        
        {/* Avatar */}
        <div className="flex items-center justify-center">
          {isBot ? (
            <img
              src="/assets/nextGenBot.png"
              alt="botImage"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-semibold">You</span>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="flex-1">
          <div className={`flex items-center gap-2 ${isBot ? '' : 'justify-end'}`}>
            <span className="font-medium">{isBot ? 'nextgenBOT' : 'You'}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <div className={`mt-1 text-sm p-3 rounded-lg ${isBot ? 'bg-blue-50 text-left' : ' bg-gray-100'}`}>
            {message}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;
