
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import RatingStars from "./RatingStars";

// Mock data for featured restaurants
const featuredRestaurants = [
  {
    id: 1,
    name: "The Garden Table",
    cuisine: "Contemporary American",
    location: "San Francisco, CA",
    averageRating: 4.7,
    totalReviews: 182,
    image: "https://images.pexels.com/photos/3475617/pexels-photo-3475617.jpeg",
    topDishes: ["Truffle Pasta", "Roasted Duck", "Hummus"],
    description: "Farm-to-table restaurant featuring locally-sourced ingredients and seasonal menu items in a bright, airy space with garden views."
  },
  {
    id: 2,
    name: "Sakura Sushi & Ramen",
    cuisine: "Japanese",
    location: "Los Angeles, CA",
    averageRating: 4.6,
    totalReviews: 156,
    image: "https://images.pexels.com/photos/3421920/pexels-photo-3421920.jpeg",
    topDishes: ["Spicy Tuna Roll", "Tonkotsu Ramen", "Gyoza"],
    description: "Authentic Japanese cuisine specializing in meticulously prepared sushi and steaming bowls of traditional ramen in a modern setting."
  },
  {
    id: 3,
    name: "Bella Napoli",
    cuisine: "Italian",
    location: "New York, NY",
    averageRating: 4.5,
    totalReviews: 137,
    image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
    topDishes: ["Margherita Pizza", "Lasagne", "Tiramisu"],
    description: "Family-owned Italian trattoria serving wood-fired pizzas, homemade pastas, and traditional desserts with recipes passed down for generations."
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    location: "Chicago, IL",
    averageRating: 4.8,
    totalReviews: 117,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    topDishes: ["Butter Chicken", "Garlic Naan", "Biryani"],
    description: "Vibrant restaurant offering a culinary journey through regional Indian cuisines with fragrant curries, tandoori specialties, and fresh-baked breads."
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Featured Restaurants</h2>
          <Link to="/restaurants" className="text-blue-500 flex items-center text-sm">
          View all <ChevronRight className="h-3 w-3 ml-1 sm:h-4 sm:w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Link to={`/restaurant/${restaurant.id}`}>
                <div className="relative">
                  <div className="bg-gray-200 h-48 relative overflow-hidden">
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded-md">
                      {restaurant.cuisine}
                    </span>
                    <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <div className="bg-white px-2 py-1 rounded-md shadow flex items-center text-sm">
                      <RatingStars rating={restaurant.averageRating} size="sm" />
                      <span className="ml-1 font-medium">{restaurant.averageRating}</span>
                      <span className="text-xs text-gray-500 ml-1">({restaurant.totalReviews})</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                  <h3 className="font-semibold mb-1 text-left">{restaurant.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {restaurant.location}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.topDishes.map((dish, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {dish}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
