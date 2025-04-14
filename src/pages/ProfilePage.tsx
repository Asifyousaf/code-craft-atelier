
import { User, Settings, Activity, Award, Heart, MessageSquare, Calendar, ChevronRight, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from '../components/Layout';

const ProfilePage = () => {
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
              <h1 className="text-2xl font-bold mb-1">Sarah Johnson</h1>
              <p className="text-gray-600 mb-4">Fitness enthusiast • Joined March 2023</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Runner</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Yogi</span>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Plant-based</span>
              </div>
              <p className="text-gray-600 text-sm max-w-lg mb-4">
                Passionate about living a balanced lifestyle. When I'm not at the gym, you'll find me hiking or experimenting with new healthy recipes.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button className="flex items-center text-sm text-gray-600 hover:text-purple-600">
                <Settings size={16} className="mr-1" />
                Edit Profile
              </button>
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
