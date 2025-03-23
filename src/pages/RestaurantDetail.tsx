
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, Star, Clock } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock restaurant data - in a real app this would come from an API
const restaurants = [
  {
    id: 1,
    name: "The Garden Table",
    cuisine: "Contemporary American",
    location: "123 Market St, San Francisco, CA",
    phone: "(415) 555-1234",
    website: "gardentable.com",
    hours: "Mon-Sun: 11am-10pm",
    averageRating: 4.7,
    totalReviews: 182,
    image: "garden-table",
    description: "Farm-to-table restaurant featuring locally-sourced ingredients and seasonal menu items in a bright, airy space with garden views.",
    topDishes: ["Truffle Pasta", "Roasted Duck", "Hummus"],
    menuItems: [
      { id: 1, name: "Truffle Pasta", price: 24.99, rating: 4.9, reviews: 87, description: "Homemade fettuccine with wild mushrooms, black truffle, and parmesan cream sauce" },
      { id: 2, name: "Roasted Duck", price: 32.99, rating: 4.8, reviews: 62, description: "Half duck with cherry glaze, served with roasted vegetables and potato puree" },
      { id: 3, name: "Hummus Plate", price: 14.99, rating: 4.6, reviews: 45, description: "House-made hummus with warm pita, cucumber, olives, and roasted peppers" },
      { id: 4, name: "Seasonal Salad", price: 16.99, rating: 4.5, reviews: 33, description: "Fresh greens with seasonal fruits, goat cheese, candied nuts, and champagne vinaigrette" }
    ]
  },
  {
    id: 2,
    name: "Sakura Sushi & Ramen",
    cuisine: "Japanese",
    location: "456 Sunset Blvd, Los Angeles, CA",
    phone: "(213) 555-5678",
    website: "sakurasushi.com",
    hours: "Tue-Sun: 12pm-11pm, Mon: Closed",
    averageRating: 4.6,
    totalReviews: 156,
    image: "sushi-master",
    description: "Authentic Japanese cuisine specializing in meticulously prepared sushi and steaming bowls of traditional ramen in a modern setting.",
    topDishes: ["Spicy Tuna Roll", "Tonkotsu Ramen", "Gyoza"],
    menuItems: [
      { id: 1, name: "Spicy Tuna Roll", price: 18.99, rating: 4.8, reviews: 76, description: "Fresh tuna with spicy mayo, cucumber, and avocado" },
      { id: 2, name: "Tonkotsu Ramen", price: 17.99, rating: 4.9, reviews: 92, description: "Rich pork bone broth with char siu, soft-boiled egg, and green onions" },
      { id: 3, name: "Gyoza", price: 12.99, rating: 4.7, reviews: 53, description: "Pan-fried pork and vegetable dumplings served with citrus soy dipping sauce" },
      { id: 4, name: "Dragon Roll", price: 22.99, rating: 4.6, reviews: 41, description: "Eel and cucumber roll topped with avocado and eel sauce" }
    ]
  },
  {
    id: 3,
    name: "Bella Napoli",
    cuisine: "Italian",
    location: "789 5th Ave, New York, NY",
    phone: "(212) 555-9012",
    website: "bellanapoli.com",
    hours: "Mon-Sun: 11:30am-11pm",
    averageRating: 4.5,
    totalReviews: 137,
    image: "pasta-paradise",
    description: "Family-owned Italian trattoria serving wood-fired pizzas, homemade pastas, and traditional desserts with recipes passed down for generations.",
    topDishes: ["Margherita Pizza", "Lasagne", "Tiramisu"],
    menuItems: [
      { id: 1, name: "Margherita Pizza", price: 19.99, rating: 4.7, reviews: 89, description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil" },
      { id: 2, name: "Lasagne", price: 22.99, rating: 4.8, reviews: 74, description: "Layers of pasta with beef ragu, béchamel sauce, and Parmigiano-Reggiano" },
      { id: 3, name: "Tiramisu", price: 12.99, rating: 4.9, reviews: 62, description: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa" },
      { id: 4, name: "Carbonara", price: 23.99, rating: 4.6, reviews: 51, description: "Spaghetti with pancetta, eggs, Pecorino Romano, and black pepper" }
    ]
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    location: "321 Michigan Ave, Chicago, IL",
    phone: "(312) 555-3456",
    website: "spiceroute.com",
    hours: "Tue-Sun: 12pm-10pm, Mon: Closed",
    averageRating: 4.8,
    totalReviews: 117,
    image: "pasta-paradise",
    description: "Vibrant restaurant offering a culinary journey through regional Indian cuisines with fragrant curries, tandoori specialties, and fresh-baked breads.",
    topDishes: ["Butter Chicken", "Garlic Naan", "Biryani"],
    menuItems: [
      { id: 1, name: "Butter Chicken", price: 23.99, rating: 4.9, reviews: 86, description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices" },
      { id: 2, name: "Garlic Naan", price: 6.99, rating: 4.8, reviews: 71, description: "Freshly baked flatbread brushed with garlic butter and topped with cilantro" },
      { id: 3, name: "Lamb Biryani", price: 26.99, rating: 4.9, reviews: 64, description: "Fragrant basmati rice cooked with tender lamb, caramelized onions, and spices" },
      { id: 4, name: "Palak Paneer", price: 19.99, rating: 4.7, reviews: 48, description: "Homemade cheese cubes in a creamy spinach sauce with ginger and garlic" }
    ]
  }
];

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id || "1");
  
  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 sm:h-64 md:h-80 bg-gray-200 relative">
            <img src="/placeholder.svg" alt={restaurant.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
              {restaurant.cuisine}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center mb-4">
                  <RatingStars rating={restaurant.averageRating} />
                  <span className="ml-2 text-gray-700">
                    {restaurant.averageRating} ({restaurant.totalReviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 mb-6 max-w-3xl">{restaurant.description}</p>
              </div>
              
              <Button className="bg-blue-500 hover:bg-blue-600">Write a Review</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant.phone}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant.website}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">{restaurant.hours}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Popular Menu Items</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {restaurant.menuItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden shrink-0">
                  <img src="/placeholder.svg" alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="font-medium text-gray-900">${item.price}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center">
                    <RatingStars rating={item.rating} size="sm" />
                    <span className="ml-2 text-sm text-gray-500">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
