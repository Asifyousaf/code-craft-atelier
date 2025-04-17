
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Heart, Sun, Clock, Play, Volume2, Bookmark, Pause, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MindfulnessPage = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();

  // Check for user session
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };
    
    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // Handle progress update
  useEffect(() => {
    if (isPlaying && activeSession) {
      const totalDuration = activeSession.duration * 60; // Convert minutes to seconds
      
      setTimer(setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1;
          const newProgress = Math.min(100, (newTime / totalDuration) * 100);
          setProgress(newProgress);
          
          if (newTime >= totalDuration) {
            handleSessionComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000));
    } else {
      if (timer) clearInterval(timer);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, activeSession]);

  const handleStartSession = (session: any) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start a meditation session",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    setActiveSession(session);
    setElapsedTime(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(prevState => !prevState);
  };

  const handleSessionComplete = async () => {
    if (timer) clearInterval(timer);
    setIsPlaying(false);
    
    if (session) {
      toast({
        title: "Meditation Complete",
        description: `Congratulations! You've completed your ${activeSession?.title} session.`,
        variant: "default"
      });
      
      // In a real app, you might save this to the database
      // For now we're just simulating the completion
    }
  };

  const handleCloseSession = () => {
    if (timer) clearInterval(timer);
    setIsPlaying(false);
    setActiveSession(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Meditation sessions data
  const meditationSessions = [
    {
      id: '1',
      title: 'Morning Clarity Meditation',
      description: 'Start your day with this 10-minute guided meditation designed to bring clarity and set positive intentions for the day ahead.',
      category: 'morning',
      duration: 10, // minutes
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: <Sun className="mr-1" size={14} />
    },
    {
      id: '2',
      title: 'Deep Sleep Meditation',
      description: 'Drift into restful sleep with this calming meditation.',
      category: 'sleep',
      duration: 20,
      image: 'https://images.unsplash.com/photo-1474418397713-b1dca2a7b4b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: <Moon className="mr-1" size={14} />
    },
    {
      id: '3',
      title: 'Morning Energy Boost',
      description: 'Start your day with energy and positive intentions.',
      category: 'morning',
      duration: 10,
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: <Sun className="mr-1" size={14} />
    },
    {
      id: '4',
      title: 'Anxiety Relief',
      description: 'Calm your mind and reduce anxiety with this guided practice.',
      category: 'anxiety',
      duration: 15,
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: <Heart className="mr-1" size={14} />
    }
  ];

  if (isLoading) {
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
      <div className="pt-24 pb-16 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mindfulness & Meditation</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Reduce stress, improve focus, and enhance your overall well-being through guided meditation and mindfulness exercises.
          </p>
          <button 
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center"
            onClick={() => handleStartSession(meditationSessions[0])}
          >
            <Heart size={18} className="mr-2" />
            Start Your Mindfulness Journey
          </button>
        </div>
      </div>

      {!activeSession ? (
        <>
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
                      <Button 
                        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                        onClick={() => handleStartSession(meditationSessions[0])}
                      >
                        <Play size={16} className="mr-2" />
                        Begin Session
                      </Button>
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
                  <Button 
                    variant="link" 
                    className="text-purple-600 text-sm font-medium hover:text-purple-800 p-0"
                    onClick={() => handleStartSession(meditationSessions[1])}
                  >
                    Explore Sleep →
                  </Button>
                </div>

                {/* Category 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                    <Sun size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Focus</h3>
                  <p className="text-gray-600 text-sm mb-4">Enhance your concentration and productivity with focus exercises.</p>
                  <Button 
                    variant="link" 
                    className="text-purple-600 text-sm font-medium hover:text-purple-800 p-0"
                    onClick={() => handleStartSession(meditationSessions[2])}
                  >
                    Explore Focus →
                  </Button>
                </div>

                {/* Category 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <Heart size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Stress Relief</h3>
                  <p className="text-gray-600 text-sm mb-4">Reduce anxiety and manage stress with calming meditations.</p>
                  <Button 
                    variant="link" 
                    className="text-purple-600 text-sm font-medium hover:text-purple-800 p-0"
                    onClick={() => handleStartSession(meditationSessions[3])}
                  >
                    Explore Stress Relief →
                  </Button>
                </div>

                {/* Category 4 */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Sun size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Daily Calm</h3>
                  <p className="text-gray-600 text-sm mb-4">Short daily practices to center yourself and find balance.</p>
                  <Button 
                    variant="link" 
                    className="text-purple-600 text-sm font-medium hover:text-purple-800 p-0"
                    onClick={() => handleStartSession(meditationSessions[0])}
                  >
                    Explore Daily Calm →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Sessions */}
          <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Popular Meditation Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Session Cards */}
                {meditationSessions.map(session => (
                  <div key={session.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={session.image} 
                        alt={session.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <button 
                          className="bg-white rounded-full p-3 shadow-lg"
                          onClick={() => handleStartSession(session)}
                        >
                          <Play size={18} className="text-purple-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-xs text-purple-600 font-semibold mb-1">
                        {session.icon}
                        {session.category.toUpperCase()}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {session.duration} minutes
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
                  View All Sessions
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Active session view
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{activeSession.title}</h2>
                <Button variant="outline" onClick={handleCloseSession}>
                  Close
                </Button>
              </div>
              
              <div className="relative mb-6">
                <img 
                  src={activeSession.image}
                  alt={activeSession.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">{formatTime(elapsedTime)}</span>
                  <span className="text-gray-500">{formatTime(activeSession.duration * 60)}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="flex justify-center space-x-4 mb-8">
                <Button 
                  onClick={handleTogglePlay}
                  variant="outline" 
                  size="lg"
                  className="h-16 w-16 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-purple-700" />
                  ) : (
                    <Play className="h-8 w-8 text-purple-700" />
                  )}
                </Button>
              </div>
              
              <div className="text-center mb-4">
                <Button 
                  onClick={handleSessionComplete}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Meditation
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Meditation Guide</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">1.</span>
                    Find a comfortable position, seated or lying down.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">2.</span>
                    Close your eyes and take a deep breath in through your nose.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">3.</span>
                    Exhale slowly through your mouth, releasing all tension.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">4.</span>
                    Focus on your breath, noticing each inhale and exhale.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">5.</span>
                    When your mind wanders, gently bring your focus back to your breath.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MindfulnessPage;
