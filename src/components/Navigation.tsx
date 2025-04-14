
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-purple-600">WellnessAI</Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
          <Link to="/workouts" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Workouts</Link>
          <Link to="/nutrition" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Nutrition</Link>
          <Link to="/mindfulness" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Mindfulness</Link>
          <Link to="/community" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Community</Link>
          <Link to="/store" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Store</Link>
          <Link to="/profile" className="text-sm text-gray-700 hover:text-purple-600 transition-colors">Profile</Link>
          <Link to="/profile" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">Sign In</Link>
        </nav>
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
