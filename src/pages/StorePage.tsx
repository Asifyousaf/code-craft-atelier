
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Premium Yoga Mat",
    description: "Eco-friendly non-slip yoga mat for optimal comfort and stability.",
    price: 49.99,
    rating: 4.8,
    category: "equipment",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Resistance Bands Set",
    description: "5-level resistance bands for strength training and rehabilitation.",
    price: 29.99,
    rating: 4.5,
    category: "equipment",
    image: "https://images.unsplash.com/photo-1598550480917-1c485268676e?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Plant Protein Powder",
    description: "Organic plant-based protein powder with 25g protein per serving.",
    price: 39.99,
    rating: 4.6,
    category: "supplements",
    image: "https://images.unsplash.com/photo-1607011116802-300b5b224bbd?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Smart Water Bottle",
    description: "Tracks your water intake and reminds you to stay hydrated.",
    price: 35.99,
    rating: 4.2,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?q=80&w=1364&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Meditation Cushion Set",
    description: "Ergonomic meditation cushion and mat for daily practice.",
    price: 59.99,
    rating: 4.9,
    category: "mindfulness",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Fitness Tracker Watch",
    description: "Advanced fitness tracking with heart rate, sleep analysis and workout modes.",
    price: 89.99,
    rating: 4.7,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1476&auto=format&fit=crop"
  }
];

// Recommended products (would be personalized in a real app)
const recommendedProducts = [
  {
    id: 7,
    name: "Wireless Earbuds",
    description: "Sweat-resistant wireless earbuds perfect for intense workouts.",
    price: 79.99,
    rating: 4.6,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Recovery Massage Gun",
    description: "Professional-grade percussion massage device for faster recovery.",
    price: 129.99,
    rating: 4.9,
    category: "recovery",
    image: "https://images.unsplash.com/photo-1623880840102-7df0a9f3545b?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Sleep Aid Supplement",
    description: "Natural supplement to improve sleep quality and recovery.",
    price: 24.99,
    rating: 4.5,
    category: "supplements",
    image: "https://images.unsplash.com/photo-1626903257791-c8c4c97238bd?q=80&w=1364&auto=format&fit=crop"
  }
];

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleSaveToWishlist = () => {
    toast({
      title: "Saved to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        <CardDescription className="text-xs uppercase tracking-wide">
          {product.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <p className="font-bold">${product.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSaveToWishlist}
            className="h-9 w-9 p-0"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="flex gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Wellness Store</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated products to support your wellness journey. All recommendations are personalized based on your profile and goals.
          </p>
        </div>

        {/* Recommended Products Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* All Products Section with Tabs */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Shop All Products</h2>
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="supplements">Supplements</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
              <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
            </TabsList>
            <TabsContent value={activeCategory} className="mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Disclaimer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Affiliate Disclosure: Some links on this page are affiliated with partner stores. We may earn a commission on qualifying purchases.</p>
        </div>
      </div>
    </Layout>
  );
};

export default StorePage;
