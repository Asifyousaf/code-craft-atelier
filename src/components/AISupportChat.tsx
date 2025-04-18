
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AISupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: '0',
      content: "Hi there! I'm your WellnessAI assistant. How can I help you today with your wellness journey?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getUser();
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [conversation, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setConversation([...conversation, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response (in a real app, this would call your AI endpoint)
      setTimeout(() => {
        const responses = [
          "That's a great question about wellness! Regular exercise, balanced nutrition, and mindfulness practices form the foundation of good health.",
          "I recommend starting with 20-30 minutes of moderate exercise at least 3 times per week. Our workouts section has great beginner-friendly options!",
          "For nutrition, focus on whole foods, plenty of vegetables, lean proteins, and staying hydrated. Check out our meal plans for more guidance.",
          "Mindfulness meditation can help reduce stress and improve focus. Even 5 minutes a day can make a difference. Have you tried our guided sessions?",
          "Remember that consistency is key in any wellness journey. Small, sustainable changes often lead to the best long-term results."
        ];

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: 'ai',
          timestamp: new Date()
        };

        setConversation(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const suggestedQuestions = [
    "How can I improve my workout routine?",
    "What are some healthy meal prep ideas?",
    "How do I track my fitness progress?",
    "Can you suggest mindfulness exercises?"
  ];

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Open chat support"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 bg-white rounded-xl shadow-2xl w-[90vw] sm:w-[400px] max-h-[600px] flex flex-col z-50"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-purple-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 bg-white">
                  <AvatarImage src="https://img.freepik.com/free-vector/cute-robot-cartoon-character_138676-2745.jpg?size=338&ext=jpg&uid=R106622016&ga=GA1.1.678848138.1713037223" />
                  <AvatarFallback className="bg-purple-200 text-purple-800">AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">WellnessAI Assistant</h3>
                  <p className="text-xs text-purple-200">Online</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat} 
                className="text-white hover:bg-purple-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === 'user' 
                          ? 'bg-purple-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] px-4 py-2">
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600 mr-2" />
                        <span className="text-sm">WellnessAI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested Questions */}
            {conversation.length < 3 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-100 p-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    disabled={isLoading}
                  />
                  {!message && (
                    <PlusCircle className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={!message.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700 rounded-full p-2 h-10 w-10"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              {!user && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  <a href="/auth" className="text-purple-600 hover:underline">Sign in</a> to save your conversation history
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISupportChat;
