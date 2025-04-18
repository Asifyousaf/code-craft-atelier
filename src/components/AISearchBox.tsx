
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, Dumbbell, CalendarCheck, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  type: string;
}

const AISearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>('');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    setWorkoutPlan(null);
    
    try {
      // Here we simulate AI response - in a real app you would call your backend/API
      setTimeout(() => {
        // For workout related queries, generate a workout plan
        if (query.toLowerCase().includes('workout') || 
            query.toLowerCase().includes('exercise') ||
            query.toLowerCase().includes('routine')) {
          
          const generatedWorkout = {
            id: Math.random().toString(36).substring(7),
            name: "Personalized Strength Training",
            description: "A balanced full-body workout focused on building strength and endurance, tailored to your fitness level.",
            duration: "45 minutes",
            level: "Intermediate",
            type: "Strength"
          };
          
          setWorkoutPlan(generatedWorkout);
          setSearchResults("I've created a personalized workout plan based on your request. This full-body strength training routine can be done 3 times per week with rest days in between. Each session takes about 45 minutes to complete and targets all major muscle groups for balanced development. Would you like to save this workout to your profile?");
        } 
        // For nutrition related queries
        else if (query.toLowerCase().includes('food') || 
                query.toLowerCase().includes('diet') ||
                query.toLowerCase().includes('nutrition') ||
                query.toLowerCase().includes('meal')) {
          
          setSearchResults("For a balanced nutrition plan, focus on incorporating lean proteins, complex carbohydrates, and healthy fats into each meal. Aim for 5-6 small meals throughout the day including breakfast, lunch, dinner and 2-3 snacks. Stay hydrated by drinking at least 8 glasses of water daily. Consider meal prepping on weekends to save time and ensure you have healthy options available throughout the week. Would you like more specific meal suggestions?");
        }
        // For mindfulness related queries
        else if (query.toLowerCase().includes('stress') || 
                query.toLowerCase().includes('anxiety') ||
                query.toLowerCase().includes('meditation') ||
                query.toLowerCase().includes('mindful')) {
          
          setSearchResults("Incorporating mindfulness practices into your daily routine can significantly reduce stress and improve overall wellbeing. I recommend starting with just 5 minutes of meditation each morning. Find a quiet space, sit comfortably, and focus on your breathing. When your mind wanders (which is normal), gently bring your focus back to your breath. Our mindfulness section has guided sessions that can help you get started. Consistency is more important than duration when building a meditation practice.");
        }
        // Default response for other queries
        else {
          setSearchResults("Thank you for your question about wellness. Maintaining a balanced approach that includes regular physical activity, nutritious eating habits, quality sleep, stress management, and social connections is key to overall wellbeing. Our platform offers resources for all these areas. Would you like more specific information about any particular aspect of wellness?");
        }
        
        setIsSearching(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get results. Please try again.",
        variant: "destructive",
      });
      setIsSearching(false);
    }
  };

  const handleSaveWorkout = async () => {
    if (!workoutPlan) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, you would save this to your backend/database
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "Workout plan has been saved to your profile.",
          variant: "default",
        });
        setIsSaving(false);
        setShowWorkoutModal(false);
        
        // Redirect to workouts page
        navigate('/workouts');
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save workout plan. Please try again.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  return (
    <>
      <div 
        ref={searchRef}
        className={`relative mx-auto max-w-2xl transition-all duration-300 z-10 ${
          isExpanded ? 'w-full' : 'w-full sm:w-3/4'
        }`}
      >
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              placeholder="Ask about workouts, nutrition, or wellness..."
              className={`w-full pl-10 pr-12 py-3 border bg-white border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                isExpanded ? 'rounded-b-none shadow-xl' : ''
              }`}
              disabled={isSearching}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
        
        <AnimatePresence>
          {isExpanded && (isSearching || searchResults) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute w-full bg-white border border-t-0 border-gray-300 rounded-b-lg shadow-xl overflow-hidden"
            >
              <div className="max-h-96 overflow-y-auto p-4">
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 text-purple-600 animate-spin mb-3" />
                    <p className="text-gray-600">Searching for the best answer...</p>
                  </div>
                ) : searchResults ? (
                  <div className="space-y-4">
                    <div className="text-gray-700 leading-relaxed">{searchResults}</div>
                    
                    {workoutPlan && (
                      <div className="mt-4">
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="flex items-start">
                            <div className="bg-purple-100 rounded-full p-2 mr-3">
                              <Dumbbell className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{workoutPlan.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {workoutPlan.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                <div className="flex items-center bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-200">
                                  <CalendarCheck className="h-3 w-3 mr-1" />
                                  {workoutPlan.duration}
                                </div>
                                <div className="flex items-center bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-200">
                                  Level: {workoutPlan.level}
                                </div>
                                <div className="flex items-center bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-200">
                                  Type: {workoutPlan.type}
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <Button 
                                  className="bg-purple-600 hover:bg-purple-700 text-sm"
                                  onClick={() => setShowWorkoutModal(true)}
                                >
                                  <CircleCheck className="mr-1 h-4 w-4" />
                                  Save this workout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Workout Details Modal */}
      <Dialog open={showWorkoutModal} onOpenChange={setShowWorkoutModal}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-center text-center mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Dumbbell className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-center text-gray-800">Save Workout Plan</h2>
            
            <p className="text-sm text-gray-600 text-center">
              This workout plan will be saved to your profile and you can access it anytime from your workouts page.
            </p>
            
            {workoutPlan && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">{workoutPlan.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{workoutPlan.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="flex flex-col items-center bg-white p-2 rounded border border-gray-200">
                    <span className="text-xs text-gray-500">Duration</span>
                    <span className="font-medium text-sm">{workoutPlan.duration}</span>
                  </div>
                  <div className="flex flex-col items-center bg-white p-2 rounded border border-gray-200">
                    <span className="text-xs text-gray-500">Level</span>
                    <span className="font-medium text-sm">{workoutPlan.level}</span>
                  </div>
                  <div className="flex flex-col items-center bg-white p-2 rounded border border-gray-200">
                    <span className="text-xs text-gray-500">Type</span>
                    <span className="font-medium text-sm">{workoutPlan.type}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowWorkoutModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveWorkout}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Save Workout</>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AISearchBox;
