
import React from 'react';
import { Message } from './GeminiChat';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeminiMessageItemProps {
  message: Message;
}

const GeminiMessageItem: React.FC<GeminiMessageItemProps> = ({ message }) => {
  const renderExerciseData = (data: any[]) => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className="mt-3 bg-purple-50 p-3 rounded-md">
        <h4 className="text-xs font-semibold text-purple-800 mb-2">Suggested Exercises:</h4>
        <div className="grid gap-2 max-h-60 overflow-auto">
          {data.slice(0, 3).map((exercise, idx) => (
            <div key={idx} className="bg-white p-2 rounded shadow-sm">
              <div className="flex space-x-2">
                {exercise.gifUrl && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={exercise.gifUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">{exercise.name}</p>
                  <p className="text-xs text-gray-500">Target: {exercise.target}</p>
                  <p className="text-xs text-gray-500">Equipment: {exercise.equipment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecipeData = (data: any[]) => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className="mt-3 bg-green-50 p-3 rounded-md">
        <h4 className="text-xs font-semibold text-green-800 mb-2">Recommended Recipes:</h4>
        <div className="grid gap-2 max-h-60 overflow-auto">
          {data.slice(0, 3).map((recipe, idx) => (
            <div key={idx} className="bg-white p-2 rounded shadow-sm">
              <div className="flex space-x-2">
                {recipe.image && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">{recipe.title}</p>
                  {recipe.nutrition && (
                    <p className="text-xs text-gray-500">Calories: {recipe.nutrition.calories}</p>
                  )}
                  {recipe.diets && recipe.diets.length > 0 && (
                    <p className="text-xs text-gray-500">Diet: {recipe.diets.join(', ')}</p>
                  )}
                  {recipe.sourceUrl && (
                    <a 
                      href={recipe.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 flex items-center mt-1 hover:underline"
                    >
                      View Recipe <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.sender === 'user' 
            ? 'bg-purple-600 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        
        {/* Display Exercise Data */}
        {message.dataType === 'exercise' && renderExerciseData(message.workoutData || [])}
        
        {/* Display Recipe Data */}
        {message.dataType === 'recipe' && renderRecipeData(message.recipeData || [])}
        
        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default GeminiMessageItem;
