
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, PlusCircle, Info, Volume2, VolumeX, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import useSounds, { SoundType } from '@/hooks/useSounds';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  workoutPlan?: any;
  mealPlan?: any;
  additionalData?: any[];
  dataSource?: 'exercise' | 'recipe' | null;
}

const AISupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: '0',
      content: "Hi! I'm your wellness buddy. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  
  const { play, isLoaded } = useSounds();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile for personalized recommendations
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setUserProfile(profile);
      }
    };
    
    getUser();
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [conversation, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Play notification sound when opening chat
    if (!isOpen && isLoaded.notification && isSoundEnabled) {
      play('notification', { volume: volume / 100 });
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
    setIsLoading(true);
    
    // Play sound when sending message
    playSoundEffect('beep');

    try {
      // Call our Edge Function
      const { data, error } = await supabase.functions.invoke('wellness-chatbot', {
        body: { 
          message: message,
          history: conversation,
          userProfile: userProfile
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
        additionalData: data.additionalData || [],
        dataSource: data.dataSource || null
      };
      
      // Add workout or meal plan if provided
      if (data.parsedPlan) {
        if (data.parsedPlan.type === 'workout') {
          aiMessage.workoutPlan = {
            title: data.parsedPlan.title,
            type: data.parsedPlan.workoutType,
            description: data.parsedPlan.description,
            level: data.parsedPlan.level,
            exercises: data.parsedPlan.exercises
          };
        } else if (data.parsedPlan.type === 'meal') {
          aiMessage.mealPlan = {
            title: data.parsedPlan.title,
            diet: data.parsedPlan.diet,
            calories: data.parsedPlan.calories,
            description: data.parsedPlan.description
          };
        }
      }

      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Play error sound on failure
      playSoundEffect('failure');
      
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async (workoutPlan: any) => {
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
        title: workoutPlan.title,
        type: workoutPlan.type,
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
        description: "The workout plan has been added to your routines",
      });
    } catch (error) {
      // Play error sound
      playSoundEffect('failure');
      
      toast({
        title: "Error",
        description: "Failed to add workout plan",
        variant: "destructive"
      });
      console.error('Error saving workout:', error);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const renderExerciseData = (data: any[]) => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className="mt-3 bg-purple-50 p-3 rounded-md">
        <h4 className="text-xs font-semibold text-purple-800 mb-2">Suggested Exercises:</h4>
        <div className="space-y-2 max-h-60 overflow-auto">
          {data.slice(0, 3).map((exercise, idx) => (
            <div key={idx} className="bg-white p-2 rounded shadow-sm">
              <div className="flex space-x-2">
                {exercise.gifUrl && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={exercise.gifUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">{exercise.name}</p>
                  <p className="text-xs text-gray-500">Target: {exercise.target}</p>
                  <p className="text-xs text-gray-500">Equipment: {exercise.equipment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecipeData = (data: any[]) => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className="mt-3 bg-green-50 p-3 rounded-md">
        <h4 className="text-xs font-semibold text-green-800 mb-2">Recommended Recipes:</h4>
        <div className="space-y-2 max-h-60 overflow-auto">
          {data.slice(0, 3).map((recipe, idx) => (
            <div key={idx} className="bg-white p-2 rounded shadow-sm">
              <div className="flex space-x-2">
                {recipe.image && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">{recipe.title}</p>
                  {recipe.nutrition && (
                    <p className="text-xs text-gray-500">Calories: {recipe.nutrition.calories}</p>
                  )}
                  {recipe.diets && recipe.diets.length > 0 && (
                    <p className="text-xs text-gray-500">Diet: {recipe.diets.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all hover:shadow-xl"
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
                          <li>Nutrition advice and recipes</li>
                          <li>Fitness equipment recommendations</li>
                          <li>Exercise modifications</li>
                          <li>Wellness tips</li>
                        </ul>
                        <div className="pt-2 border-t mt-2">
                          <p className="text-xs text-gray-500">Powered by OpenAI GPT-4, ExerciseDB, and Spoonacular APIs</p>
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
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
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
                    <Volume2 className="h-4 w-4 text-gray-500 mr-2" />
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
                      
                      {/* Workout Plan Recommendation */}
                      {msg.workoutPlan && (
                        <div className="mt-2 p-3 bg-purple-50 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-medium text-purple-700">{msg.workoutPlan.title}</p>
                              <p className="text-xs text-purple-600 mt-1">{msg.workoutPlan.description}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 rounded-full p-0 text-purple-700"
                              onClick={() => handleAddWorkout(msg.workoutPlan)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 text-xs w-full bg-white"
                            onClick={() => handleAddWorkout(msg.workoutPlan)}
                          >
                            Add to My Workouts
                          </Button>
                        </div>
                      )}
                      
                      {/* Meal Plan Recommendation */}
                      {msg.mealPlan && (
                        <div className="mt-2 p-3 bg-green-50 rounded-md">
                          <p className="text-xs font-medium text-green-700">{msg.mealPlan.title}</p>
                          <p className="text-xs text-green-600 mt-1">{msg.mealPlan.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                              {msg.mealPlan.diet}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                              {msg.mealPlan.calories} calories
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Display Exercise Data */}
                      {msg.dataSource === 'exercise' && renderExerciseData(msg.additionalData)}
                      
                      {/* Display Recipe Data */}
                      {msg.dataSource === 'recipe' && renderRecipeData(msg.additionalData)}
                      
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
              <div className="px-4 py-3 border-t border-gray-100 bg-white">
                <Tabs defaultValue="fitness" className="w-full">
                  <TabsList className="w-full mb-2">
                    <TabsTrigger value="fitness" className="text-xs flex-1">Fitness</TabsTrigger>
                    <TabsTrigger value="nutrition" className="text-xs flex-1">Nutrition</TabsTrigger>
                    <TabsTrigger value="wellness" className="text-xs flex-1">Wellness</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="fitness" className="mt-0">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "I want to get in shape, where should I start?",
                        "Can you suggest exercises for back pain?",
                        "I need a beginner workout routine",
                        "What's a good home workout without equipment?",
                        "Help me build muscle in my arms"
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
                  </TabsContent>
                  
                  <TabsContent value="nutrition" className="mt-0">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "I need a high protein meal idea",
                        "What's a good vegan breakfast?",
                        "Suggest a 500 calorie lunch",
                        "What should I eat before a workout?",
                        "Help me meal prep for the week"
                      ].map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 px-2 h-auto border-green-200 text-green-700 hover:bg-green-50"
                          onClick={() => setMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wellness" className="mt-0">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "How can I improve my sleep?",
                        "Give me a simple meditation technique",
                        "I need help with workout motivation",
                        "What fitness tracker do you recommend?",
                        "How to reduce stress after work?"
                      ].map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 px-2 h-auto border-blue-200 text-blue-700 hover:bg-blue-50"
                          onClick={() => setMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
                    ref={inputRef}
                  />
                  {!message && (
                    <PlusCircle className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={!message.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full p-2 h-10 w-10"
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
