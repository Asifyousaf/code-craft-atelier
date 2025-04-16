import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Activity, Award, Heart, MessageSquare, Calendar, ChevronRight, Edit, Save, X, Ruler, Weight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from '../components/Layout';
import { supabase } from "@/integrations/supabase/client";

// Define a proper interface for profile data
interface ProfileData {
  id: string;
  full_name: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  fitness_level: string | null;
  fitness_goal: string | null;
  avatar_url: string | null;
  username: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData>({
    id: '',
    full_name: '',
    age: null,
    height: null,
    weight: null,
    fitness_level: '',
    fitness_goal: '',
    avatar_url: null,
    username: null,
    created_at: null,
    updated_at: null
  });
  
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<ProfileData>({
    id: '',
    full_name: '',
    age: null,
    height: null,
    weight: null,
    fitness_level: '',
    fitness_goal: '',
    avatar_url: null,
    username: null,
    created_at: null,
    updated_at: null
  });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate('/auth');
        return;
      }
      
      await fetchProfile(session.user.id);
      setLoading(false);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile({
          id: data.id,
          full_name: data.full_name || '',
          age: data.age,
          height: data.height,
          weight: data.weight,
          fitness_level: data.fitness_level || '',
          fitness_goal: data.fitness_goal || '',
          avatar_url: data.avatar_url,
          username: data.username,
          created_at: data.created_at,
          updated_at: data.updated_at
        });
        setTempProfile({
          id: data.id,
          full_name: data.full_name || '',
          age: data.age,
          height: data.height,
          weight: data.weight,
          fitness_level: data.fitness_level || '',
          fitness_goal: data.fitness_goal || '',
          avatar_url: data.avatar_url,
          username: data.username,
          created_at: data.created_at,
          updated_at: data.updated_at
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive"
      });
      console.error('Error fetching profile:', error);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Cancel editing
      setTempProfile({...profile});
      setEditMode(false);
    } else {
      // Start editing
      setEditMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!session?.user) return;

    setLoading(true);
    try {
      // Parse numeric values
      const updatedProfile = {
        ...tempProfile,
        age: tempProfile.age ? parseInt(String(tempProfile.age)) : null,
        height: tempProfile.height ? parseInt(String(tempProfile.height)) : null,
        weight: tempProfile.weight ? parseInt(String(tempProfile.weight)) : null
      };

      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', session.user.id);

      if (error) throw error;

      setProfile({...tempProfile});
      setEditMode(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-purple-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="w-32 h-32 rounded-full bg-purple-200 mb-4 md:mb-0 md:mr-6 overflow-hidden relative">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                <Edit size={14} className="text-purple-600" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              {editMode ? (
                <Input
                  name="full_name"
                  value={tempProfile.full_name || ""}
                  onChange={handleInputChange}
                  className="text-2xl font-bold mb-1"
                  placeholder="Full Name"
                />
              ) : (
                <h1 className="text-2xl font-bold mb-1">{profile.full_name}</h1>
              )}
              
              <p className="text-gray-600 mb-4">Fitness enthusiast • Joined March 2023</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                  {profile.fitness_level ? profile.fitness_level.charAt(0).toUpperCase() + profile.fitness_level.slice(1) : 'No level set'}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {profile.fitness_goal ? profile.fitness_goal.replace('_', ' ').charAt(0).toUpperCase() + profile.fitness_goal.replace('_', ' ').slice(1) : 'No goal set'}
                </span>
              </div>
              
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      name="age"
                      type="number"
                      value={tempProfile.age?.toString() || ""}
                      onChange={handleInputChange}
                      placeholder="Age"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height (cm)</label>
                    <Input
                      name="height"
                      type="number"
                      value={tempProfile.height?.toString() || ""}
                      onChange={handleInputChange}
                      placeholder="Height"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input
                      name="weight"
                      type="number"
                      value={tempProfile.weight?.toString() || ""}
                      onChange={handleInputChange}
                      placeholder="Weight"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fitness Level</label>
                    <Select 
                      value={tempProfile.fitness_level || ""}
                      onValueChange={(value) => handleSelectChange('fitness_level', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fitness Goal</label>
                    <Select 
                      value={tempProfile.fitness_goal || ""}
                      onValueChange={(value) => handleSelectChange('fitness_goal', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight_loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="general_fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  {profile.age && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                      <span>{profile.age} years</span>
                    </div>
                  )}
                  
                  {profile.height && (
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 mr-1 text-purple-600" />
                      <span>{profile.height} cm</span>
                    </div>
                  )}
                  
                  {profile.weight && (
                    <div className="flex items-center">
                      <Weight className="h-4 w-4 mr-1 text-purple-600" />
                      <span>{profile.weight} kg</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0">
              {editMode ? (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveProfile} 
                    className="flex items-center text-sm"
                    disabled={loading}
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleEditToggle}
                    className="flex items-center text-sm"
                    disabled={loading}
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleEditToggle}
                  className="flex items-center text-sm"
                >
                  <Settings size={16} className="mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 mb-1">
                <Activity size={24} className="inline" />
              </div>
              <p className="text-2xl font-bold">247</p>
              <p className="text-xs text-gray-500">Workouts Completed</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 mb-1">
                <Award size={24} className="inline" />
              </div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs text-gray-500">Achievements</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 mb-1">
                <Heart size={24} className="inline" />
              </div>
              <p className="text-2xl font-bold">87</p>
              <p className="text-xs text-gray-500">Favorites</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 mb-1">
                <MessageSquare size={24} className="inline" />
              </div>
              <p className="text-2xl font-bold">124</p>
              <p className="text-xs text-gray-500">Community Posts</p>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <Tabs defaultValue="activity" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="plans">My Plans</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Dumbbell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Completed a workout</h3>
                      <p className="text-sm text-gray-500">Full Body HIIT • Today, 9:30 AM</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+120 points</span>
                    </div>
                  </div>
                </div>
                
                {/* Keep existing activity items */}
                {/* Activity Item 2 */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Earned achievement</h3>
                      <p className="text-sm text-gray-500">Early Bird • Yesterday, 6:15 AM</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Achievement</span>
                    </div>
                  </div>
                </div>
                
                {/* Activity Item 3 */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Utensils className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Meal plan updated</h3>
                      <p className="text-sm text-gray-500">Added Mediterranean meal plan • 2 days ago</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Nutrition</span>
                    </div>
                  </div>
                </div>
                
                {/* View All Button */}
                <button className="w-full py-3 text-center text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View All Activity
                </button>
              </div>
            </TabsContent>
            
            {/* Keep existing tabs content */}
            <TabsContent value="progress" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              
              {/* Progress Charts Would Go Here */}
              <div className="bg-white rounded-lg border p-6 mb-4">
                <h3 className="text-lg font-medium mb-4">Weekly Activity</h3>
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Progress Chart Placeholder</p>
                </div>
              </div>
              
              {/* Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Fitness Goals</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Workouts</span>
                        <span className="font-medium">3/4 completed</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Step Goal</span>
                        <span className="font-medium">8,540/10,000 steps</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mindfulness Minutes</span>
                        <span className="font-medium">45/60 minutes</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Current Streaks</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                        <span>Workout Streak</span>
                      </div>
                      <span className="font-medium">14 days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-purple-600 mr-2" />
                        <span>Meditation Streak</span>
                      </div>
                      <span className="font-medium">7 days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 text-purple-600 mr-2" />
                        <span>Meal Logging</span>
                      </div>
                      <span className="font-medium">21 days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="plans" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Wellness Plans</h2>
              
              <div className="space-y-4">
                {/* Active Plans */}
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Active Plans</h3>
                  
                  <div className="space-y-3">
                    {/* Plan 1 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <Dumbbell className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">12-Week Strength Training</h4>
                          <p className="text-xs text-gray-500">Week 6 of 12 • 50% Complete</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    {/* Plan 2 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Utensils className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mediterranean Diet Plan</h4>
                          <p className="text-xs text-gray-500">Week 2 of 8 • 25% Complete</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Recommended Plans */}
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Recommended for You</h3>
                  
                  <div className="space-y-3">
                    {/* Recommendation 1 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Heart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">30-Day Mindfulness Challenge</h4>
                          <p className="text-xs text-gray-500">Based on your meditation interests</p>
                        </div>
                      </div>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                        Start
                      </button>
                    </div>
                    
                    {/* Recommendation 2 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                          <Activity className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">HIIT Cardio Program</h4>
                          <p className="text-xs text-gray-500">Perfect complement to your strength training</p>
                        </div>
                      </div>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-3 text-center text-purple-600 hover:text-purple-800 text-sm font-medium">
                  Browse All Plans
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Achievement 1 */}
                <div className="bg-white border rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-sm">Early Bird</h3>
                  <p className="text-xs text-gray-500 mt-1">Complete 10 workouts before 8 AM</p>
                </div>
                
                {/* Achievement 2 */}
                <div className="bg-white border rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm">Zen Master</h3>
                  <p className="text-xs text-gray-500 mt-1">Complete 30 meditation sessions</p>
                </div>
                
                {/* Achievement 3 */}
                <div className="bg-white border rounded-lg p-4 text-center bg-gray-50">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-400">Marathon Ready</h3>
                  <p className="text-xs text-gray-400 mt-1">Run your first 26.2 miles</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                      <div className="bg-purple-600 h-1 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">45% complete</p>
                  </div>
                </div>
                
                {/* Achievement 4 */}
                <div className="bg-white border rounded-lg p-4 text-center bg-gray-50">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-400">Meal Prep Pro</h3>
                  <p className="text-xs text-gray-400 mt-1">Log 50 homemade meals</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                      <div className="bg-purple-600 h-1 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">70% complete</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
                  View All Achievements
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// Import these icons at the top of the file
import { Dumbbell, Utensils } from 'lucide-react';

export default ProfilePage;
