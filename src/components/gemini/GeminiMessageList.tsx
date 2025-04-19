
import React from 'react';
import { Message } from './GeminiChat';
import GeminiMessageItem from './GeminiMessageItem';

interface GeminiMessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const GeminiMessageList: React.FC<GeminiMessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <GeminiMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default GeminiMessageList;
