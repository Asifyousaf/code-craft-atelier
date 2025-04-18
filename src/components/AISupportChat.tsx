
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, PlusCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  workoutPlan?: any; // For workout recommendations
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
      // Here we would typically call our AI endpoint
      // For now, using conditional responses based on keywords
      const userQuery = message.toLowerCase();
      let aiResponse = '';
      let workoutPlan = null;

      if (userQuery.includes('skinny') || userQuery.includes('lose weight')) {
        aiResponse = "Based on your goal to get lean, here's a recommended workout plan that focuses on cardio and high-intensity training. Would you like me to add this to your workout routines?";
        workoutPlan = {
          title: "Weight Loss Focused Workout",
          type: "CARDIO_STRENGTH",
          description: "A balanced plan combining cardio and strength training for optimal fat loss",
          level: "beginner",
          exercises: [
            {
              name: "HIIT Cardio Circuit",
              duration: 20,
              instructions: ["30 seconds high intensity", "30 seconds rest", "Repeat 10 times"]
            }
          ]
        };
      } else if (userQuery.includes('back pain') || userQuery.includes('back')) {
        aiResponse = "I understand you're looking for exercises that won't strain your back. Here's a low-impact workout plan focusing on core strength and gentle movements. Always consult your doctor before starting any new exercise routine.";
      } else if (userQuery.includes('watch') || userQuery.includes('device')) {
        aiResponse = "For fitness tracking, I recommend checking out our store section where we have a curated selection of fitness watches. Would you like me to show you our top recommendations?";
      }

      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse || "I'm here to help with any fitness, nutrition, or wellness questions you have. Feel free to ask about specific workout plans, nutrition advice, or general wellness tips!",
          sender: 'ai',
          timestamp: new Date(),
          workoutPlan: workoutPlan
        };

        setConversation(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async (workoutPlan: any) => {
    try {
      if (!session?.user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to save workout plans",
          variant: "default",
        });
        return;
      }

      // Here we would typically save the workout to the user's profile
      toast({
        title: "Workout Added",
        description: "The workout plan has been added to your routines",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add workout plan",
        variant: "destructive",
      });
    }
  };

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
                <div className="flex items-center">
                  <h3 className="font-medium">WellnessAI Assistant</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-2 text-white hover:bg-purple-700">
                        <Info className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">How can I help you?</h4>
                        <p className="text-sm text-gray-500">Ask me about:</p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          <li>Personalized workout plans</li>
                          <li>Nutrition advice</li>
                          <li>Fitness equipment recommendations</li>
                          <li>Exercise modifications</li>
                          <li>Wellness tips</li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
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
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.workoutPlan && (
                        <div className="mt-2 p-2 bg-purple-50 rounded-md">
                          <p className="text-xs font-medium text-purple-700">{msg.workoutPlan.title}</p>
                          <p className="text-xs text-purple-600 mt-1">{msg.workoutPlan.description}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 text-xs w-full"
                            onClick={() => handleAddWorkout(msg.workoutPlan)}
                          >
                            Add to My Workouts
                          </Button>
                        </div>
                      )}
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-lg rounded-bl-none max-w-[80%] px-4 py-2 shadow-sm">
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
              <div className="px-4 py-2 border-t border-gray-100 bg-white">
                <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "I want to get in shape, where should I start?",
                    "Can you suggest exercises for back pain?",
                    "What's a good beginner workout routine?",
                    "How can I improve my nutrition?",
                    "Recommend a fitness tracker"
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => setMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-100 p-4 bg-white">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything about fitness & wellness..."
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
