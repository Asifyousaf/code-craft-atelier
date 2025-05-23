
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Loader2, X, Volume2, VolumeX, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import useSounds from '@/hooks/useSounds';
import { SoundType } from '@/types/sound';
import { useNavigate } from 'react-router-dom';
import GeminiMessageList from './GeminiMessageList';
import GeminiChatInput from './GeminiChatInput';
import GeminiSuggestions from './GeminiSuggestions';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  workoutData?: any[];
  recipeData?: any[];
  dataType?: 'exercise' | 'recipe' | null;
}

interface GeminiChatProps {
  visible?: boolean;
  onClose?: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ visible = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(visible);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: '0',
      content: "Hi there! I'm your wellness assistant. How can I help you with workouts, nutrition, or mindfulness today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  
  const { play, isLoaded } = useSounds();

  // Update isOpen when visible prop changes
  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);
  
  // Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
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
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Play notification sound when opening chat
    if (newIsOpen && isLoaded.notification && isSoundEnabled) {
      play('notification', { volume: volume / 100 });
    }
    
    // Call onClose when closing chat if provided
    if (!newIsOpen && onClose) {
      onClose();
    }
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  // Handle incoming message from search box
  const handleIncomingMessage = (query: string) => {
    if (query.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: query,
        sender: 'user',
        timestamp: new Date()
      };
      setConversation(prev => [...prev, userMessage]);
      setIsOpen(true);
      handleGeminiResponse(query);
    }
  };

  const playSoundEffect = (type: SoundType) => {
    if (isLoaded[type] && isSoundEnabled) {
      play(type, { volume: volume / 100 });
    }
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
    
    // Play sound when sending message
    playSoundEffect('beep');
    
    handleGeminiResponse(message);
  };

  const handleGeminiResponse = async (userMessage: string) => {
    setIsLoading(true);

    try {
      // Call our Edge Function
      const { data, error } = await supabase.functions.invoke('gemini-wellness-chatbot', {
        body: { 
          message: userMessage,
          history: conversation.slice(-5).map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: msg.content }))
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Play success sound on successful response
      playSoundEffect('success');
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: 'ai',
        timestamp: new Date(),
        workoutData: data.workoutData || [],
        recipeData: data.recipeData || [],
        dataType: data.dataType || null
      };
      
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      // Play error sound on failure
      playSoundEffect('failure');
      
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to Gemini. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async (workout: any) => {
    try {
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to save workout plans",
          variant: "default",
        });
        return;
      }

      // Extract workout details
      const workoutData = {
        user_id: user.id,
        title: workout.name || "Custom Workout",
        type: workout.target || "General",
        duration: 30, // Default duration
        calories_burned: 300, // Default calories
        date: new Date().toISOString().split('T')[0]
      };

      // Save to Supabase
      const { error } = await supabase.from('workouts').insert(workoutData);

      if (error) throw error;
      
      // Play success sound
      playSoundEffect('success');
      
      toast({
        title: "Workout Added",
        description: "The workout has been added to your workout plan",
      });
      
      // Navigate to the workouts page
      navigate('/workouts');
    } catch (error) {
      // Play error sound
      playSoundEffect('failure');
      
      toast({
        title: "Error",
        description: "Failed to add workout",
        variant: "destructive"
      });
      console.error('Error saving workout:', error);
    }
  };

  const handleSaveRecipe = async (recipe: any) => {
    try {
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to save recipes",
          variant: "default",
        });
        return;
      }

      // Extract recipe details - we'll create a custom table for recipes
      // First check if recipes table exists
      const { data: tableExists } = await supabase
        .from('nutrition_logs')
        .select('id')
        .limit(1);

      if (tableExists) {
        // Save as nutrition log since we don't have a recipes table
        const nutritionData = {
          user_id: user.id,
          food_name: recipe.title || "Custom Recipe",
          calories: recipe.nutrition?.calories || 300,
          protein: 25, // Default values
          carbs: 40,
          fat: 15,
          meal_type: "recipe",
          date: new Date().toISOString().split('T')[0]
        };

        const { error } = await supabase.from('nutrition_logs').insert(nutritionData);
        
        if (error) throw error;
        
        // Play success sound
        playSoundEffect('success');
        
        toast({
          title: "Recipe Saved",
          description: "The recipe has been saved to your nutrition logs",
        });
        
        // Navigate to the nutrition page
        navigate('/nutrition');
      } else {
        throw new Error("Nutrition logs table not available");
      }
    } catch (error) {
      // Play error sound
      playSoundEffect('failure');
      
      toast({
        title: "Error",
        description: "Failed to save recipe. Please try again.",
        variant: "destructive"
      });
      console.error('Error saving recipe:', error);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  // Expose the handleIncomingMessage method
  React.useEffect(() => {
    if (window) {
      (window as any).geminiChatRef = {
        handleIncomingMessage
      };
    }
    return () => {
      if (window) {
        delete (window as any).geminiChatRef;
      }
    };
  }, [conversation]);

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all hover:shadow-xl z-50"
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
            className="fixed bottom-20 right-6 bg-white rounded-xl shadow-2xl w-[90vw] sm:w-[400px] max-h-[600px] flex flex-col z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 bg-white">
                  <AvatarImage src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_256px.webp" />
                  <AvatarFallback className="bg-purple-200 text-purple-800">AI</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <h3 className="font-medium">Gemini Wellness</h3>
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
                          <li>Nutrition advice and recipes</li>
                          <li>Fitness equipment recommendations</li>
                          <li>Exercise modifications</li>
                          <li>Wellness tips</li>
                        </ul>
                        <div className="pt-2 border-t mt-2">
                          <p className="text-xs text-gray-500">Powered by Google Gemini AI with ExerciseDB and Spoonacular APIs</p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSound}
                  className="text-white hover:bg-purple-700 mr-1"
                  title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
                >
                  {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleChat} 
                  className="text-white hover:bg-purple-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Sound settings panel */}
            <AnimatePresence>
              {isSoundEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 border-b overflow-hidden"
                >
                  <div className="p-3 flex items-center">
                    <Slider
                      value={[volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 ml-2 w-8">{volume}%</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                <GeminiMessageList 
                  messages={conversation} 
                  isLoading={isLoading}
                  onAddWorkout={handleAddWorkout}
                  onSaveRecipe={handleSaveRecipe} 
                />
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-lg rounded-bl-none max-w-[80%] px-4 py-2 shadow-sm">
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600 mr-2" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested Questions */}
            {conversation.length < 3 && (
              <GeminiSuggestions onSelectSuggestion={handleSelectSuggestion} />
            )}
            
            {/* Chat Input */}
            <GeminiChatInput 
              message={message}
              setMessage={setMessage}
              onSubmit={handleSendMessage}
              isLoading={isLoading}
              userSignedIn={!!user}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeminiChat;
