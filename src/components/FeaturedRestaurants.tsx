
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

// Mock data for featured restaurants
const featuredRestaurants = [
  {
    id: 1,
    name: "The Garden Table",
    cuisine: "Mediterranean",
    averageRating: 4.7,
    totalReviews: 128,
    topDish: "Grilled Octopus",
    topDishRating: 4.9,
    image: "garden-table"
  },
  {
    id: 2,
    name: "Sushi Master",
    cuisine: "Japanese",
    averageRating: 4.5,
    totalReviews: 94,
    topDish: "Dragon Roll",
    topDishRating: 4.8,
    image: "sushi-master"
  },
  {
    id: 3,
    name: "Pasta Paradise",
    cuisine: "Italian",
    averageRating: 4.3,
    totalReviews: 156,
    topDish: "Truffle Linguine",
    topDishRating: 4.7,
    image: "pasta-paradise"
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Restaurants</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated restaurants based on their menu items. Our unique rating system helps you find the best dishes at each restaurant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">{restaurant.name} Image</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.cuisine} Cuisine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <RatingStars rating={restaurant.averageRating} />
                  <span className="ml-2 text-sm text-gray-600">
                    {restaurant.averageRating} ({restaurant.totalReviews} reviews)
                  </span>
                </div>
                <div className="mt-4 text-sm">
                  <p className="text-gray-600">Top Dish:</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{restaurant.topDish}</p>
                    <div className="flex items-center">
                      <RatingStars rating={restaurant.topDishRating} size="sm" />
                      <span className="ml-1 text-sm text-gray-600">
                        {restaurant.topDishRating}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/restaurant/${restaurant.id}`} className="w-full">
                  <Button variant="outline" className="w-full">View Menu & Reviews</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/restaurants">
            <Button variant="outline" size="lg">See All Restaurants</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
