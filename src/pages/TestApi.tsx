import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TestApi = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    //fetch("http://localhost:5001/api/restaurants")
    fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:5001/api/restaurants"
        : "https://reviewsbackend.onrender.com/api/restaurants"
    )
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch restaurants");
        setLoading(false);
      });
  }, []);

  return (
    
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
      <Button
    variant="ghost"
    size="sm"
    onClick={() => navigate('/')}
    className="absolute top-4 left-4"
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Home
  </Button>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Test API: Restaurants</h2>
          <Link to="/restaurants" className="text-blue-500 flex items-center text-sm">
            View all <ChevronRight className="h-3 w-3 ml-1 sm:h-4 sm:w-4" />
          </Link>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant: any) => (
              <Card key={restaurant.id} className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <Link to={`/test-menu/${restaurant.id}`}>
                  <div className="relative">
                    <div className="bg-gray-200 h-48 relative overflow-hidden">
                      <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded-md">
                        {restaurant.cuisine_types?.join(", ")}
                      </span>
                      <img
                        src={restaurant.restaurant_image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center">
                      <div className="bg-white px-2 py-1 rounded-md shadow flex items-center text-sm">
                        <RatingStars rating={restaurant.average_rating} size="sm" />
                        <span className="ml-1 font-medium">{restaurant.average_rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({restaurant.total_reviews})</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1 text-left">{restaurant.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {restaurant.location?.city}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.cuisine_types?.map((type: string, index: number) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestApi; 