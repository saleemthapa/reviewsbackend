
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import RatingStars from "./RatingStars";
import { useReviewStore } from "@/hooks/useReviewStore";

// Mock data for featured restaurants
const topDishes = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    restaurant: "The Garden Grill",
    restaurantId: 1,
    price: 27.99,
    description: "Homemade fettuccine with wild mushrooms, black truffle, and parmesan cream sauce",
    image: "pasta"
  },
  {
    id: 2,
    name: "Rainbow Roll Deluxe",
    restaurant: "Sakura Sushi & Ramen",
    restaurantId: 2,
    price: 22.50,
    description: "Cut rolls ice loaded with fresh salmon, tuna, yellowtail, and avocado",
    image: "sushi"
  },
  {
    id: 3,
    name: "Neapolitan Margherita",
    restaurant: "Bella Napoli",
    restaurantId: 3,
    price: 18.95,
    description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil",
    image: "pizza"
  },
  {
    id: 4,
    name: "Butter Chicken",
    restaurant: "Spice House",
    restaurantId: 4,
    price: 19.95,
    description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
    image: "curry"
  },
];

const TopRatedDishes = () => {
  const { getMenuItemAverageRating, getMenuItemReviewCount } = useReviewStore();

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📈 Top Rated Dishes
          </h2>
          <Link to="/dishes" className="text-blue-500 flex items-center text-sm">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDishes.map((dish) => {
            const rating = getMenuItemAverageRating(dish.id);
            const reviewCount = getMenuItemReviewCount(dish.id);
            
            return (
              <Card key={dish.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-48 relative overflow-hidden">
                  <img src={`/placeholder.svg`} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                    ${dish.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/menu-item/${dish.id}`} className="font-medium hover:underline">
                      {dish.name}
                    </Link>
                  </div>
                  <div className="text-sm text-primary text-left hover:underline mb-2 block">
                    {dish.restaurant}
                  </div>
                  <div className="flex items-center mb-2">
                    <RatingStars rating={rating} size="sm" />
                    <span className="ml-2 text-sm">
                      {rating > 0 ? `${rating.toFixed(1)} (${reviewCount})` : 'No reviews yet'}
                    </span>
                  </div>
                  <p className="text-sm text-left text-gray-600 line-clamp-2">{dish.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDishes;
