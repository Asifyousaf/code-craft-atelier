
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface RecipePreviewProps {
  recipeData: any[];
  onSaveRecipe?: (recipe: any) => void;
}

const RecipePreview: React.FC<RecipePreviewProps> = ({ recipeData, onSaveRecipe }) => {
  if (!recipeData.length) return null;

  const recipe = recipeData[0]; // Take the first recipe suggestion

  return (
    <Card className="mt-2 bg-green-50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Suggested Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">{recipe.title}</p>
          {recipe.image && (
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-32 object-cover rounded-md"
            />
          )}
          <p className="text-sm text-gray-600">
            Calories: {recipe.nutrition?.calories || 'N/A'}
          </p>
        </div>
      </CardContent>
      {onSaveRecipe && (
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => onSaveRecipe(recipe)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Save Recipe
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RecipePreview;
