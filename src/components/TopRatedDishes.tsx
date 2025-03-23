
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const topDishes = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    restaurant: "The Garden Grill",
    price: 27.99,
    rating: 4.9,
    reviews: 123,
    description: "Homemade fettuccine with wild mushrooms, black truffle, and parmesan cream sauce",
    image: "pasta"
  },
  {
    id: 2,
    name: "Rainbow Roll Deluxe",
    restaurant: "Sakura Sushi & Ramen",
    price: 22.50,
    rating: 4.8,
    reviews: 95,
    description: "Cut rolls ice loaded with fresh salmon, tuna, yellowtail, and avocado",
    image: "sushi"
  },
  {
    id: 3,
    name: "Neapolitan Margherita",
    restaurant: "Bella Napoli",
    price: 18.95,
    rating: 4.7,
    reviews: 143,
    description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil",
    image: "pizza"
  },
  {
    id: 4,
    name: "Butter Chicken",
    restaurant: "Spice House",
    price: 19.95,
    rating: 4.8,
    reviews: 167,
    description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
    image: "curry"
  },
];

const TopRatedDishes = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDishes.map((dish) => (
            <Card key={dish.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-gray-200 h-48 relative overflow-hidden">
                <img src={`/placeholder.svg`} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                  ${dish.price}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{dish.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{dish.restaurant}</p>
                <div className="flex items-center mb-2">
                  <RatingStars rating={dish.rating} size="sm" />
                  <span className="ml-2 text-sm">
                    {dish.rating} ({dish.reviews})
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDishes;
