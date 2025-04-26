import React from 'react';

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isBot?: boolean;
  isLoading?: boolean;
}

const MessageBubble = ({ message, timestamp, isBot = false, isLoading = false }: MessageBubbleProps) => {
  // Helper: Check if it's an error message
  const isError = isBot && message.startsWith('**Error:**');


  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start gap-3 max-w-md ${isBot ? '' : 'flex-row-reverse'}`}>

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

          {/* Message Bubble */}
          <div
            className={`mt-1 text-sm p-3 rounded-lg 
            ${isBot ? 'bg-blue-50 text-left' : 'bg-gray-100'}
            ${isError ? 'text-red-500' : ''}`} 
          >
            {isLoading ? (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
              </div>
            ) : (
              message
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;
