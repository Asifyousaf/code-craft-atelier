
import { Utensils, Search, ChevronDown, Clock, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';

const NutritionPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Nutrition Planning</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            AI-powered meal plans and nutrition advice tailored to your goals, preferences, and dietary restrictions.
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center">
            <Utensils size={18} className="mr-2" />
            Create Your Meal Plan
          </button>
        </div>
      </div>

      {/* Meal Plans Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Your Personalized Meal Plan</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select className="appearance-none bg-white border px-4 py-2 pr-8 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>This Week</option>
                  <option>Next Week</option>
                  <option>Custom Range</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
              <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors">
                <BookOpen size={16} className="mr-1 inline" /> Shopping List
              </button>
            </div>
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className={`text-center p-3 rounded-lg cursor-pointer ${index === 1 ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <p className="text-xs font-medium mb-1">{day}</p>
                <p className="text-sm font-bold">{index + 10}</p>
              </div>
            ))}
          </div>

          {/* Meals for the day */}
          <div className="space-y-6">
            {/* Breakfast */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold">Breakfast</h3>
                    <p className="text-xs text-gray-500">8:00 AM • 450 calories</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-800">Swap</button>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Breakfast" 
                    className="rounded-lg w-full h-36 object-cover" 
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h4 className="font-semibold text-lg mb-2">Avocado Toast with Poached Egg</h4>
                  <p className="text-gray-600 text-sm mb-3">Whole grain toast topped with mashed avocado, poached eggs, and a sprinkle of red pepper flakes.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">High Protein</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Whole Grains</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Healthy Fats</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>10 min preparation time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold">Lunch</h3>
                    <p className="text-xs text-gray-500">12:30 PM • 550 calories</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-800">Swap</button>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Lunch" 
                    className="rounded-lg w-full h-36 object-cover" 
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h4 className="font-semibold text-lg mb-2">Mediterranean Quinoa Bowl</h4>
                  <p className="text-gray-600 text-sm mb-3">Protein-rich quinoa topped with roasted vegetables, feta cheese, olives, and lemon herb dressing.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Plant Protein</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Gluten-Free</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Mediterranean</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>15 min preparation time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold">Dinner</h3>
                    <p className="text-xs text-gray-500">7:00 PM • 600 calories</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-800">Swap</button>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Dinner" 
                    className="rounded-lg w-full h-36 object-cover" 
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h4 className="font-semibold text-lg mb-2">Baked Salmon with Roasted Vegetables</h4>
                  <p className="text-gray-600 text-sm mb-3">Herb-crusted salmon fillet with a side of seasonal roasted vegetables and wild rice.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Omega-3 Rich</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Low Carb</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">High Protein</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>25 min preparation time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NutritionPage;
