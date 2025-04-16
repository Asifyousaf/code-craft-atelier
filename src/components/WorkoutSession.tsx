
import { useState, useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Play, Pause, SkipForward, ChevronRight, Check, XCircle, Clock, Dumbbell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  duration: number; // in seconds
  restTime: number; // in seconds
  instructions: string[];
}

interface WorkoutPlan {
  id: string;
  title: string;
  type: string;
  description: string;
  level: string;
  duration: number; // in minutes
  caloriesBurn: number;
  exercises: Exercise[];
}

interface WorkoutSessionProps {
  workout: WorkoutPlan;
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const WorkoutSession = ({ workout, onComplete, onCancel }: WorkoutSessionProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);
  const timerRef = useRef<any>(null);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const progress = Math.round((completedExercises / totalExercises) * 100);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
        
        setTotalTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft === 0 && !isPaused) {
      if (isResting) {
        // Rest is over, move to next set or exercise
        setIsResting(false);
        
        if (currentSet < currentExercise.sets) {
          // Move to next set
          setCurrentSet(prev => prev + 1);
          setTimeLeft(currentExercise.duration);
        } else {
          // Move to next exercise
          handleNextExercise();
        }
      } else {
        // Exercise is over, start rest or move to next exercise
        if (currentSet < currentExercise.sets) {
          // Start rest between sets
          setIsResting(true);
          setTimeLeft(currentExercise.restTime);
        } else {
          // Move to next exercise
          handleNextExercise();
        }
      }
    }
  }, [timeLeft, isPaused]);

  useEffect(() => {
    // Initialize time for first exercise
    resetExerciseTimer();
  }, [currentExerciseIndex]);

  const resetExerciseTimer = () => {
    if (currentExerciseIndex < workout.exercises.length) {
      setTimeLeft(isResting ? currentExercise.restTime : currentExercise.duration);
    }
  };

  const handlePlayPause = () => {
    setIsPaused(prev => !prev);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      // Update completed exercises count
      setCompletedExercises(prev => prev + 1);
      
      // Move to next exercise
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsPaused(true);
    } else {
      // Workout complete
      handleComplete();
    }
  };

  const handleComplete = async () => {
    // Calculate calories based on time spent
    const minutesSpent = Math.round(totalTimeElapsed / 60);
    const estimatedCalories = Math.round(workout.caloriesBurn * (minutesSpent / workout.duration));
    
    const workoutData = {
      title: workout.title,
      type: workout.type,
      duration: minutesSpent,
      calories_burned: estimatedCalories,
    };
    
    onComplete(workoutData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-purple-600" />
            {workout.title}
          </div>
          <span className="text-sm font-normal bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {`${completedExercises}/${totalExercises} exercises`}
          </span>
        </CardTitle>
        <CardDescription>{workout.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Workout Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Current exercise */}
        {currentExerciseIndex < workout.exercises.length ? (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{currentExercise.name}</h3>
                <div className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Set {currentSet} of {currentExercise.sets}
                </div>
              </div>

              {/* Timer display */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">
                    {isResting ? "Rest Time" : "Exercise Time"}
                  </p>
                  <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={handlePlayPause} 
                      variant="outline" 
                      size="icon"
                      className="h-12 w-12 rounded-full"
                    >
                      {isPaused ? (
                        <Play className="h-6 w-6" />
                      ) : (
                        <Pause className="h-6 w-6" />
                      )}
                    </Button>
                    <Button 
                      onClick={() => {
                        if (isResting) {
                          setIsResting(false);
                          setTimeLeft(currentExercise.duration);
                        } else if (currentSet < currentExercise.sets) {
                          setIsResting(true);
                          setTimeLeft(currentExercise.restTime);
                          setCurrentSet(prev => prev + 1);
                        } else {
                          handleNextExercise();
                        }
                      }} 
                      variant="outline" 
                      size="icon"
                      className="h-12 w-12 rounded-full"
                    >
                      <SkipForward className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-medium">Instructions:</h4>
                <ul className="space-y-2">
                  {currentExercise.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-purple-600 shrink-0 mt-0.5 mr-2" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Total time: {formatTime(totalTimeElapsed)}</span>
              </div>
              <div>
                Estimated calories: ~{Math.round(workout.caloriesBurn * (totalTimeElapsed / 60) / workout.duration)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Workout Complete!</h3>
            <p className="text-gray-600 mb-4">Great job on finishing your workout!</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <XCircle className="mr-2 h-4 w-4" />
          Cancel Workout
        </Button>
        {currentExerciseIndex >= workout.exercises.length ? (
          <Button onClick={handleComplete}>
            <Check className="mr-2 h-4 w-4" />
            Complete Workout
          </Button>
        ) : (
          <Button onClick={handleNextExercise} variant="default">
            Skip Exercise
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkoutSession;
