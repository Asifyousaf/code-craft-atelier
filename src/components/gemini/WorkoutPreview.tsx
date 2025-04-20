
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface WorkoutPreviewProps {
  workoutData: any[];
  onAddWorkout?: (workout: any) => void;
}

const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({ workoutData, onAddWorkout }) => {
  if (!workoutData.length) return null;

  const workout = workoutData[0]; // Take the first workout suggestion

  return (
    <Card className="mt-2 bg-purple-50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Suggested Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">{workout.name}</p>
          <p className="text-sm text-gray-600">Target: {workout.target}</p>
          <p className="text-sm text-gray-600">Equipment: {workout.equipment}</p>
        </div>
      </CardContent>
      {onAddWorkout && (
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => onAddWorkout(workout)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Workouts
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WorkoutPreview;
