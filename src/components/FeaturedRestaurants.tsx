
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
    image: "garden-table",
    topDishes: ["Truffle Pasta", "Roasted Duck", "Hummus"]
  },
  {
    id: 2,
    name: "Sakura Sushi & Ramen",
    cuisine: "Japanese",
    location: "Los Angeles, CA",
    averageRating: 4.6,
    totalReviews: 156,
    image: "sushi-master",
    topDishes: ["Spicy Tuna Roll", "Tonkotsu Ramen", "Gyoza"]
  },
  {
    id: 3,
    name: "Bella Napoli",
    cuisine: "Italian",
    location: "New York, NY",
    averageRating: 4.5,
    totalReviews: 137,
    image: "pasta-paradise",
    topDishes: ["Margherita Pizza", "Lasagne", "Tiramisu"]
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    location: "Chicago, IL",
    averageRating: 4.8,
    totalReviews: 117,
    image: "pasta-paradise",
    topDishes: ["Butter Chicken", "Garlic Naan", "Biryani"]
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Restaurants</h2>
          <Link to="/restaurants" className="text-blue-500 flex items-center text-sm">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="bg-gray-200 h-48 relative overflow-hidden">
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded-md">
                    {restaurant.cuisine}
                  </span>
                  <img src={`/placeholder.svg`} alt={restaurant.name} className="w-full h-full object-cover" />
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
                  <h3 className="font-semibold mb-1">{restaurant.name}</h3>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
