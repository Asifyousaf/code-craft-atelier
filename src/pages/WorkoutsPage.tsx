
import { Dumbbell, Play, Filter, Search, Clock } from 'lucide-react';
import Layout from '../components/Layout';

const WorkoutsPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Personalized Workout Plans</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            AI-powered workouts tailored to your fitness level, goals, and preferences.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center">
            <Play size={18} className="mr-2" />
            Start Your First Workout
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white py-6 border-b">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <button className="flex items-center text-sm text-gray-700 mr-4">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
            <div className="flex border rounded-lg overflow-hidden">
              <button className="px-4 py-2 text-sm bg-purple-600 text-white">All</button>
              <button className="px-4 py-2 text-sm">Beginner</button>
              <button className="px-4 py-2 text-sm">Intermediate</button>
              <button className="px-4 py-2 text-sm">Advanced</button>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search workouts..." 
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recommended Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Workout Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Full Body HIIT" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full px-3 py-1 text-xs flex items-center">
                  <Clock size={12} className="mr-1" />
                  30 min
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Dumbbell size={14} className="mr-1" />
                  HIIT
                </div>
                <h3 className="font-bold text-lg mb-1">Full Body HIIT Challenge</h3>
                <p className="text-gray-600 text-sm mb-3">High intensity interval training to build strength and endurance.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Beginner</div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Start →
                  </button>
                </div>
              </div>
            </div>

            {/* Workout Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300">
                <img 
                  src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Core Focus" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full px-3 py-1 text-xs flex items-center">
                  <Clock size={12} className="mr-1" />
                  25 min
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Dumbbell size={14} className="mr-1" />
                  CORE
                </div>
                <h3 className="font-bold text-lg mb-1">Core Focus & Strength</h3>
                <p className="text-gray-600 text-sm mb-3">Build a strong core with this targeted workout routine.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Intermediate</div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Start →
                  </button>
                </div>
              </div>
            </div>

            {/* Workout Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300">
                <img 
                  src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Yoga Flow" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full px-3 py-1 text-xs flex items-center">
                  <Clock size={12} className="mr-1" />
                  45 min
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Dumbbell size={14} className="mr-1" />
                  YOGA
                </div>
                <h3 className="font-bold text-lg mb-1">Energizing Yoga Flow</h3>
                <p className="text-gray-600 text-sm mb-3">Increase flexibility and mindfulness with this yoga routine.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">All Levels</div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Start →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
              View All Workouts
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutsPage;
