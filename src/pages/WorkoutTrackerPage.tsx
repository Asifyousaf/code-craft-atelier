
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Calendar, ArrowRight, LineChart, Dumbbell, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistoryList from '../components/WorkoutHistoryList';
import WorkoutStats from '../components/WorkoutStats';

const WorkoutTrackerPage = () => {
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState('summary');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user session
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

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the workout tracker.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [session, isLoading, navigate]);

  if (isLoading || !session) {
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
      <div className="pt-24 pb-16 bg-gradient-to-br from-purple-500 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Workout Tracker</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Log your workouts, track your progress, and achieve your fitness goals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap mb-8 space-x-2">
          <Button 
            variant={activeView === 'summary' ? 'default' : 'outline'}
            onClick={() => setActiveView('summary')}
            className="mb-2"
          >
            <LineChart className="mr-2 h-4 w-4" /> Summary
          </Button>
          <Button 
            variant={activeView === 'log' ? 'default' : 'outline'}
            onClick={() => setActiveView('log')}
            className="mb-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Log Workout
          </Button>
          <Button 
            variant={activeView === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveView('history')}
            className="mb-2"
          >
            <Calendar className="mr-2 h-4 w-4" /> Workout History
          </Button>
        </div>

        {activeView === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-purple-600" />
                  Quick Log Workout
                </CardTitle>
                <CardDescription>Record your latest workout session</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Keep track of your fitness journey by logging your workouts.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveView('log')} className="w-full">
                  Log Workout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                  View History
                </CardTitle>
                <CardDescription>Review your past workout sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">See your progress over time and stay motivated.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveView('history')} className="w-full">
                  View History <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5 text-purple-600" />
                  Workout Stats
                </CardTitle>
                <CardDescription>Analyze your fitness performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Gain insights from your workout data to optimize your routine.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveView('stats')} className="w-full">
                  View Stats <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeView === 'summary' && <WorkoutStats userId={session.user.id} />}
        {activeView === 'log' && <WorkoutForm userId={session.user.id} onSuccess={() => setActiveView('history')} />}
        {activeView === 'history' && <WorkoutHistoryList userId={session.user.id} />}
        {activeView === 'stats' && <WorkoutStats userId={session.user.id} />}
      </div>
    </Layout>
  );
};

export default WorkoutTrackerPage;
