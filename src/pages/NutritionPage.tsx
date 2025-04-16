
import { Utensils, Search, ChevronDown, Clock, BookOpen, Heart, Share2, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Recipe interfaces
interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  calories: number;
  image: string;
  tags: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const recipes: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast with Poached Egg",
    description: "Whole grain toast topped with mashed avocado, poached eggs, and a sprinkle of red pepper flakes.",
    prepTime: 10,
    calories: 450,
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["High Protein", "Whole Grains", "Healthy Fats"],
    mealType: "breakfast"
  },
  {
    id: "2",
    name: "Mediterranean Quinoa Bowl",
    description: "Protein-rich quinoa topped with roasted vegetables, feta cheese, olives, and lemon herb dressing.",
    prepTime: 15,
    calories: 550,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Plant Protein", "Gluten-Free", "Mediterranean"],
    mealType: "lunch"
  },
  {
    id: "3",
    name: "Baked Salmon with Roasted Vegetables",
    description: "Herb-crusted salmon fillet with a side of seasonal roasted vegetables and wild rice.",
    prepTime: 25,
    calories: 600,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Omega-3 Rich", "Low Carb", "High Protein"],
    mealType: "dinner"
  },
  {
    id: "4",
    name: "Greek Yogurt Parfait",
    description: "Layers of Greek yogurt, fresh berries, honey, and homemade granola.",
    prepTime: 5,
    calories: 300,
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["High Protein", "Quick", "Probiotics"],
    mealType: "breakfast"
  },
  {
    id: "5",
    name: "Chickpea & Vegetable Curry",
    description: "Hearty chickpea curry with mixed vegetables and aromatic spices. Served with brown rice.",
    prepTime: 20,
    calories: 520,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Plant-Based", "High Fiber", "Vegan"],
    mealType: "dinner"
  },
  {
    id: "6",
    name: "Spinach & Berry Smoothie",
    description: "Nutrient-dense smoothie with spinach, mixed berries, banana, and plant-based protein powder.",
    prepTime: 5,
    calories: 280,
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Antioxidants", "Quick", "Vegetarian"],
    mealType: "snack"
  }
];

const NutritionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('meal-plan');
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSaveRecipe = (recipeId: string) => {
    if (savedRecipes.includes(recipeId)) {
      setSavedRecipes(savedRecipes.filter(id => id !== recipeId));
      toast({
        title: "Recipe removed",
        description: "Recipe has been removed from your saved collection",
      });
    } else {
      setSavedRecipes([...savedRecipes, recipeId]);
      toast({
        title: "Recipe saved",
        description: "Recipe has been added to your saved collection",
      });
    }
  };
  
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

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="meal-plan" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <TabsList className="mb-6 md:mb-0">
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-64">
              <Input 
                type="text" 
                placeholder="Search recipes..." 
                className="w-full pl-10 pr-3 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <TabsContent value="meal-plan" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer" onClick={() => handleSaveRecipe(recipe.id)}>
                      <Heart 
                        size={18} 
                        className={savedRecipes.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-500"} 
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.map((tag, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{recipe.prepTime} min</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {recipe.calories} cal
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200">
                      <Share2 size={14} className="mr-1" />
                      Share
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus size={14} className="mr-1" />
                      Add to Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredRecipes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No recipes found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-6">
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes
                  .filter(recipe => savedRecipes.includes(recipe.id))
                  .map((recipe) => (
                    <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={recipe.image} 
                          alt={recipe.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer" onClick={() => handleSaveRecipe(recipe.id)}>
                          <Heart size={18} className="fill-red-500 text-red-500" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {recipe.tags.map((tag, idx) => (
                            <span key={idx} className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            <span>{recipe.prepTime} min</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {recipe.calories} cal
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200">
                          <Share2 size={14} className="mr-1" />
                          Share
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <Plus size={14} className="mr-1" />
                          Add to Plan
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">You haven't saved any recipes yet.</p>
                <Button onClick={() => setActiveTab('recipes')} className="bg-emerald-600 hover:bg-emerald-700">
                  Browse Recipes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NutritionPage;
