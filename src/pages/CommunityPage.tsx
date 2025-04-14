
import { Users, MessageSquare, Trophy, Search, Heart } from 'lucide-react';
import Layout from '../components/Layout';

const CommunityPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Wellness Community</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Connect with like-minded individuals, share your progress, and get inspired by success stories.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center">
            <Users size={18} className="mr-2" />
            Join Community
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4 flex justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">10,000+</p>
              <p className="text-gray-600">Active Members</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4 flex justify-center">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">500+</p>
              <p className="text-gray-600">Daily Discussions</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4 flex justify-center">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">1,000+</p>
              <p className="text-gray-600">Success Stories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Forums */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Popular Discussion Forums</h2>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="w-full pl-10 pr-3 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Forum Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Category 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-purple-500">
              <h3 className="font-bold text-lg mb-3">Fitness Goals</h3>
              <p className="text-gray-600 text-sm mb-4">Share your fitness journey, goals, and progress with the community.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">245 threads</span>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View Forum →
                </button>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3">Nutrition & Diet</h3>
              <p className="text-gray-600 text-sm mb-4">Discuss meal plans, recipes, and dietary choices for optimal health.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">318 threads</span>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View Forum →
                </button>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-green-500">
              <h3 className="font-bold text-lg mb-3">Mental Wellness</h3>
              <p className="text-gray-600 text-sm mb-4">Exchange ideas on mindfulness, stress reduction, and mental health.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">192 threads</span>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View Forum →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Discussions */}
          <h3 className="font-bold text-xl mb-6">Recent Discussions</h3>
          <div className="space-y-4">
            {/* Discussion 1 */}
            <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Tips for morning workout motivation</h4>
                      <p className="text-xs text-gray-500">Posted by Sarah Johnson • 2 hours ago</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Fitness</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-3">I'm struggling to maintain my morning workout routine. Does anyone have tips for staying motivated when it's cold and dark outside?</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> 24 replies</span>
                      <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> 15 likes</span>
                    </div>
                    <button className="text-purple-600 text-sm font-medium">View Discussion</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion 2 */}
            <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Favorite plant-based protein sources</h4>
                      <p className="text-xs text-gray-500">Posted by Michael Chen • 5 hours ago</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Nutrition</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-3">I'm trying to incorporate more plant-based proteins into my diet. What are your go-to sources that are both delicious and nutritious?</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> 36 replies</span>
                      <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> 28 likes</span>
                    </div>
                    <button className="text-purple-600 text-sm font-medium">View Discussion</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion 3 */}
            <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emma Davis" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Meditation techniques for anxiety</h4>
                      <p className="text-xs text-gray-500">Posted by Emma Davis • 8 hours ago</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Mindfulness</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-3">I've been experiencing increased anxiety lately and want to try meditation. Can anyone recommend specific techniques or guided sessions that have helped them?</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> 42 replies</span>
                      <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> 31 likes</span>
                    </div>
                    <button className="text-purple-600 text-sm font-medium">View Discussion</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
              View All Discussions
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPage;
