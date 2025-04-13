
import { Play, Utensils, Dumbbell, Activity, MessageSquare, Trophy, Check, Users, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-lg font-bold text-purple-600">WellnessAI</a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Home</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">AI Planner</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Workouts</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Nutrition</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Community</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Store</a>
            <a href="#" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Profile</a>
            <a href="#" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">Sign In</a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Transform Your Life</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Your personalized journey to wellness starts here. AI-powered health coaching, customized meal plans, and mindful living.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center mx-auto">
            <Play size={18} className="mr-2" />
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-emerald-400 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <Utensils className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Meal Plans</h3>
              <p className="mb-4">AI-powered nutrition plans tailored to your goals</p>
              <button className="bg-white text-emerald-500 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-blue-400 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <Dumbbell className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Workouts</h3>
              <p className="mb-4">Personalized fitness routines that adapt to you</p>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-purple-400 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <Dumbbell className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Workouts</h3>
              <p className="mb-4">Personalized fitness routines that adapt to you</p>
              <button className="bg-white text-purple-500 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Wellness Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard Widget 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm text-gray-600">Steps Today</h3>
              </div>
              <p className="text-2xl font-bold">8,432</p>
              <p className="text-sm text-gray-500">Target: 10,000</p>
              <div className="mt-3 bg-gray-200 h-2 rounded-full">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>

            {/* Dashboard Widget 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm text-gray-600">Calories Burned</h3>
              </div>
              <p className="text-2xl font-bold">487</p>
              <p className="text-sm text-gray-500">Target: 600</p>
              <div className="mt-3 bg-gray-200 h-2 rounded-full">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '81%' }}></div>
              </div>
            </div>

            {/* Dashboard Widget 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm text-gray-600">Calories Burned</h3>
              </div>
              <p className="text-2xl font-bold">487</p>
              <p className="text-sm text-gray-500">Target: 600</p>
              <div className="mt-3 bg-gray-200 h-2 rounded-full">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '81%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customize Dashboard Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Customize Your Dashboard</h2>
          <p className="text-center text-gray-600 mb-8">Drag and drop widgets to personalize your wellness journey</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Daily Stats</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>

            {/* Widget 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Calories</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>

            {/* Widget 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Mindfulness</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>

            {/* Widget 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Utensils className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Nutrition</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>

            {/* Widget 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Dumbbell className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Workout</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>

            {/* Widget 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium">Health</h3>
              </div>
              <div className="text-center text-gray-400 py-8">
                Widget Content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Join Our Thriving Community</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with like-minded individuals, share your progress, and get inspired by success stories.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">10,000+</p>
              <p className="text-gray-600">Active Members</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">500+</p>
              <p className="text-gray-600">Daily Discussions</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">1,000+</p>
              <p className="text-gray-600">Success Stories</p>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                WellnessAI transformed my approach to fitness. The AI-powered recommendations are spot-on!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">Michael Chen</p>
                  <p className="text-sm text-gray-600">Marathon Runner</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                The personalized workout plans have helped me achieve my fitness goals faster than ever.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emma Davis" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">Emma Davis</p>
                  <p className="text-sm text-gray-600">Yoga Instructor</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                The mindfulness features have become an essential part of my daily wellness routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold mb-4">WellnessAI</h3>
              <p className="text-sm text-gray-600 mb-4">Transform your life with AI-powered wellness solutions.</p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Blog</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Safety Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Community Guidelines</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Made with <span className="text-red-500">❤</span> by WellnessAI Team
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-colors">
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Index;
