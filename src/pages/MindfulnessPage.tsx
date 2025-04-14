
import { Moon, Heart, Sun, Clock, Play, Volume2, Bookmark } from 'lucide-react';
import Layout from '../components/Layout';

const MindfulnessPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mindfulness & Meditation</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Reduce stress, improve focus, and enhance your overall well-being through guided meditation and mindfulness exercises.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center">
            <Heart size={18} className="mr-2" />
            Start Your Mindfulness Journey
          </button>
        </div>
      </div>

      {/* Daily Recommendation */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Today's Recommendation</h2>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 md:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="text-sm text-purple-600 font-semibold mb-2">FEATURED SESSION</div>
                <h3 className="text-2xl font-bold mb-3">Morning Clarity Meditation</h3>
                <p className="text-gray-600 mb-6">Start your day with this 10-minute guided meditation designed to bring clarity and set positive intentions for the day ahead.</p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" /> 10 mins
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Sun size={16} className="mr-1" /> Morning
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Volume2 size={16} className="mr-1" /> Guided
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                    <Play size={16} className="mr-2" />
                    Begin Session
                  </button>
                  <button className="border border-purple-600 text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Morning meditation" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Explore Mindfulness Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Moon size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Sleep</h3>
              <p className="text-gray-600 text-sm mb-4">Improve your sleep quality with guided meditations and calming sounds.</p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                Explore Sleep →
              </button>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Sun size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Focus</h3>
              <p className="text-gray-600 text-sm mb-4">Enhance your concentration and productivity with focus exercises.</p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                Explore Focus →
              </button>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Stress Relief</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce anxiety and manage stress with calming meditations.</p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                Explore Stress Relief →
              </button>
            </div>

            {/* Category 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Sun size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Daily Calm</h3>
              <p className="text-gray-600 text-sm mb-4">Short daily practices to center yourself and find balance.</p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                Explore Daily Calm →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Sessions */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Popular Meditation Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Session Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1474418397713-b1dca2a7b4b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sleep Well" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <button className="bg-white rounded-full p-3 shadow-lg">
                    <Play size={18} className="text-purple-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Moon size={14} className="mr-1" />
                  SLEEP
                </div>
                <h3 className="font-bold text-lg mb-1">Deep Sleep Meditation</h3>
                <p className="text-gray-600 text-sm mb-3">Drift into restful sleep with this calming meditation.</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  20 minutes
                </div>
              </div>
            </div>

            {/* Session Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Morning Ritual" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <button className="bg-white rounded-full p-3 shadow-lg">
                    <Play size={18} className="text-purple-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Sun size={14} className="mr-1" />
                  MORNING
                </div>
                <h3 className="font-bold text-lg mb-1">Morning Energy Boost</h3>
                <p className="text-gray-600 text-sm mb-3">Start your day with energy and positive intentions.</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  10 minutes
                </div>
              </div>
            </div>

            {/* Session Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Stress Relief" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <button className="bg-white rounded-full p-3 shadow-lg">
                    <Play size={18} className="text-purple-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                  <Heart size={14} className="mr-1" />
                  ANXIETY
                </div>
                <h3 className="font-bold text-lg mb-1">Anxiety Relief</h3>
                <p className="text-gray-600 text-sm mb-3">Calm your mind and reduce anxiety with this guided practice.</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  15 minutes
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
              View All Sessions
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MindfulnessPage;
