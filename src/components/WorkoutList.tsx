
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Flame } from 'lucide-react';

interface WorkoutListProps {
  onSelectWorkout: (workout: WorkoutPlan) => void;
}

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

const WorkoutList: React.FC<WorkoutListProps> = ({ onSelectWorkout }) => {
  // Pre-defined workout plans
  const workouts: WorkoutPlan[] = [
    {
      id: '1',
      title: 'Full Body HIIT',
      type: 'HIIT',
      description: 'High intensity interval training to burn calories and improve cardiovascular health.',
      level: 'intermediate',
      duration: 30,
      caloriesBurn: 320,
      exercises: [
        {
          name: 'Jumping Jacks',
          sets: 3,
          reps: 20,
          duration: 60,
          restTime: 30,
          instructions: [
            'Stand upright with your legs together and arms at your sides',
            'Jump up and spread your feet beyond shoulder width while bringing arms above head',
            'Return to starting position and repeat'
          ]
        },
        {
          name: 'Push-ups',
          sets: 3,
          reps: 10,
          duration: 60,
          restTime: 30,
          instructions: [
            'Start in a plank position with hands shoulder-width apart',
            'Lower your body until chest nearly touches the floor',
            'Push back up and repeat'
          ]
        },
        {
          name: 'Mountain Climbers',
          sets: 3,
          reps: 20,
          duration: 60,
          restTime: 30,
          instructions: [
            'Start in a plank position',
            'Drive one knee toward your chest, then quickly switch legs',
            'Continue alternating legs at a rapid pace'
          ]
        },
        {
          name: 'Bodyweight Squats',
          sets: 3,
          reps: 15,
          duration: 60,
          restTime: 30,
          instructions: [
            'Stand with feet shoulder-width apart',
            'Lower your body by bending knees and pushing hips back',
            'Return to standing position and repeat'
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Core Crusher',
      type: 'Strength Training',
      description: 'Focus on your core with this targeted ab workout.',
      level: 'beginner',
      duration: 20,
      caloriesBurn: 180,
      exercises: [
        {
          name: 'Plank',
          sets: 3,
          reps: 1,
          duration: 30,
          restTime: 20,
          instructions: [
            'Start in a forearm plank position, elbows under shoulders',
            'Engage your core and keep your body in a straight line',
            'Hold the position for the duration'
          ]
        },
        {
          name: 'Crunches',
          sets: 3,
          reps: 15,
          duration: 45,
          restTime: 30,
          instructions: [
            'Lie on your back with knees bent',
            'Place hands behind your head or across chest',
            'Lift shoulders off the ground and engage core',
            'Lower back down with control and repeat'
          ]
        },
        {
          name: 'Russian Twists',
          sets: 3,
          reps: 20,
          duration: 45,
          restTime: 30,
          instructions: [
            'Sit on the floor with knees bent',
            'Lean back slightly, keeping back straight',
            'Twist torso to right, then to left (counts as one rep)',
            'Keep feet slightly off the ground for added challenge'
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Upper Body Blast',
      type: 'Strength Training',
      description: 'Build strength in your chest, shoulders, and arms.',
      level: 'intermediate',
      duration: 35,
      caloriesBurn: 250,
      exercises: [
        {
          name: 'Push-ups',
          sets: 4,
          reps: 12,
          duration: 60,
          restTime: 45,
          instructions: [
            'Start in a plank position with hands shoulder-width apart',
            'Lower your body until chest nearly touches the floor',
            'Push back up and repeat'
          ]
        },
        {
          name: 'Dips',
          sets: 3,
          reps: 10,
          duration: 60,
          restTime: 45,
          instructions: [
            'Use a chair or bench behind you',
            'Place hands on edge with fingers facing forward',
            'Lower your body by bending elbows',
            'Push back up and repeat'
          ]
        },
        {
          name: 'Arm Circles',
          sets: 3,
          reps: 20,
          duration: 45,
          restTime: 30,
          instructions: [
            'Stand with feet shoulder-width apart',
            'Extend arms out to sides at shoulder height',
            'Make small circles forward, then backward'
          ]
        },
        {
          name: 'Plank to Push-up',
          sets: 3,
          reps: 8,
          duration: 60,
          restTime: 45,
          instructions: [
            'Start in a forearm plank position',
            'Push up to a hand plank, one arm at a time',
            'Lower back to forearm plank, one arm at a time',
            'Repeat, alternating which arm moves first'
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select a Workout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle>{workout.title}</CardTitle>
              <CardDescription>{workout.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-purple-600" />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Flame className="h-4 w-4 mr-1 text-orange-500" />
                  <span>~{workout.caloriesBurn} cal</span>
                </div>
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                  {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {workout.exercises.length} exercises
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <Button
                className="w-full"
                onClick={() => onSelectWorkout(workout)}
              >
                <Dumbbell className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
