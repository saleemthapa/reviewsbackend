import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TestMenu = () => {
  const { id } = useParams<{ id: string }>();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:5001/api/restaurants/${id}`
          : `https://reviewsbackend.onrender.com/api/restaurants/${id}`
      ).then(res => res.json()),
      fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:5001/api/menu-items/restaurant/${id}`
          : `https://reviewsbackend.onrender.com/api/menu-items/restaurant/${id}`
      ).then(res => res.json())
    ])
      .then(([restaurantData, menuItemsData]) => {
        setRestaurant(restaurantData);
        setMenuItems(menuItemsData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 sm:h-64 md:h-80 bg-gray-200 relative">
            <img 
              src={restaurant.restaurant_image || "/placeholder.svg"}
              alt={restaurant?.name || "Restaurant"} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
              {restaurant?.cuisine_types?.join(", ")}
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{restaurant?.name || "Restaurant"}</h1>
                <div className="flex items-center mb-4">
                  <RatingStars rating={restaurant?.average_rating || 0} />
                  <span className="ml-2 text-gray-700">
                    {restaurant?.average_rating ?? "-"} ({restaurant?.total_reviews ?? 0} reviews)
                  </span>
                </div>
                <p className="text-gray-600 mb-6 max-w-3xl">{restaurant?.address || "No address available"}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant?.location?.city || "-"}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant?.contact_phone || "-"}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant?.website || "-"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant?.created_at?.slice(0, 10) || "-"}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Menu Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Menu Items</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {menuItems.length > 0 ? menuItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden shrink-0">
                  <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="font-medium text-gray-900">₨{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-left mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center mb-2">
                    <span className="ml-2 text-sm text-gray-500">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/menu-item/${item.id}`}
                      className="inline-block text-blue-500 hover:underline text-sm font-medium"
                    >
                      See details
                    </Link>
                  </div>
                </div>
              </div>
            )) : <div className="text-gray-500">No menu items found.</div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestMenu; 