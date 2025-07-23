import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, Star, Clock, MessageSquare } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";

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
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    description: "Farm-to-table restaurant featuring locally-sourced ingredients and seasonal menu items in a bright, airy space with garden views.",
    topDishes: ["Truffle Pasta", "Roasted Duck", "Hummus"],
    menuItems: [
      { id: 1, name: "Truffle Pasta", price: 24.99, rating: 4.9, reviews: 87, image: "/placeholder.svg", description: "Homemade fettuccine with wild mushrooms, black truffle, and parmesan cream sauce" },
      { id: 2, name: "Roasted Duck", price: 32.99, rating: 4.8, reviews: 62, image: "/placeholder.svg", description: "Half duck with cherry glaze, served with roasted vegetables and potato puree" },
      { id: 3, name: "Hummus Plate", price: 14.99, rating: 4.6, reviews: 45, image: "/placeholder.svg", description: "House-made hummus with warm pita, cucumber, olives, and roasted peppers" },
      { id: 4, name: "Seasonal Salad", price: 16.99, rating: 4.5, reviews: 33, image: "/placeholder.svg", description: "Fresh greens with seasonal fruits, goat cheese, candied nuts, and champagne vinaigrette" }
    ],
    reviews: [
      {
        id: 1,
        userName: "Emily Johnson",
        userImage: "/placeholder.svg",
        rating: 5,
        detailedRatings: {
          food: 5,
          ambience: 4,
          service: 5,
          pricing: 4
        },
        date: "August 12, 2023",
        content: "Absolutely amazing experience! The truffle pasta was divine and the ambiance was perfect for our anniversary dinner. Service was attentive without being intrusive. Will definitely be coming back!",
        helpful: 12,
        type: 'restaurant' as const
      },
      {
        id: 2,
        userName: "Michael Chen",
        userImage: "/placeholder.svg",
        rating: 4,
        detailedRatings: {
          food: 4,
          ambience: 4,
          service: 3,
          pricing: 4
        },
        date: "July 28, 2023",
        content: "Great food and atmosphere. The seasonal salad was fresh and flavorful. Only giving 4 stars because we had to wait a bit longer than expected for our table despite having a reservation.",
        helpful: 8,
        type: 'restaurant' as const
      },
      {
        id: 3,
        userName: "Sarah Williams",
        rating: 5,
        detailedRatings: {
          food: 5,
          ambience: 5,
          service: 5,
          pricing: 3
        },
        date: "June 15, 2023",
        content: "The roasted duck is to die for! Perfectly cooked and the cherry glaze complemented it so well. The service was impeccable and the wine selection is extensive. Highly recommend!",
        helpful: 15,
        type: 'restaurant' as const
      }
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
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    description: "Authentic Japanese cuisine specializing in meticulously prepared sushi and steaming bowls of traditional ramen in a modern setting.",
    topDishes: ["Spicy Tuna Roll", "Tonkotsu Ramen", "Gyoza"],
    menuItems: [
      { id: 1, name: "Spicy Tuna Roll", price: 18.99, rating: 4.8, reviews: 76, image: "/placeholder.svg", description: "Fresh tuna with spicy mayo, cucumber, and avocado" },
      { id: 2, name: "Tonkotsu Ramen", price: 17.99, rating: 4.9, reviews: 92, image: "/placeholder.svg", description: "Rich pork bone broth with char siu, soft-boiled egg, and green onions" },
      { id: 3, name: "Gyoza", price: 12.99, rating: 4.7, reviews: 53, image: "/placeholder.svg", description: "Pan-fried pork and vegetable dumplings served with citrus soy dipping sauce" },
      { id: 4, name: "Dragon Roll", price: 22.99, rating: 4.6, reviews: 41, image: "/placeholder.svg", description: "Eel and cucumber roll topped with avocado and eel sauce" }
    ],
    reviews: [
      {
        id: 1,
        userName: "David Kim",
        userImage: "/placeholder.svg",
        rating: 5,
        detailedRatings: {
          food: 5,
          ambience: 4,
          service: 5,
          pricing: 5
        },
        date: "September 5, 2023",
        content: "Best ramen in town! The broth is so rich and flavorful. The noodles had the perfect texture and the char siu was melt-in-your-mouth tender.",
        helpful: 9,
        type: 'restaurant' as const
      },
      {
        id: 2,
        userName: "Jessica Tanaka",
        rating: 4,
        detailedRatings: {
          food: 4,
          ambience: 4,
          service: 4,
          pricing: 4
        },
        date: "August 19, 2023",
        content: "Really enjoyed the Dragon Roll and the Gyoza. Everything tasted fresh and authentic. Would definitely recommend!",
        helpful: 6,
        type: 'restaurant' as const
      },
      {
        id: 3,
        userName: "Robert Chen",
        userImage: "/placeholder.svg",
        rating: 5,
        detailedRatings: {
          food: 5,
          ambience: 3,
          service: 4,
          pricing: 5
        },
        date: "July 12, 2023",
        content: "Excellent service and amazing food. The spicy tuna roll is a must-try. Will be coming back soon!",
        helpful: 11,
        type: 'restaurant' as const
      }
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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
  
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // In a real app, we would refresh the reviews from the API
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 sm:h-64 md:h-80 bg-gray-200 relative">
            <img 
              src={restaurant.images?.[activeImageIndex] || "/placeholder.svg"} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
              {restaurant.cuisine}
            </div>
          </div>
          
          {/* Image thumbnails */}
          {restaurant.images && restaurant.images.length > 1 && (
            <div className="flex gap-2 p-2 bg-white border-t">
              {restaurant.images.map((image, index) => (
                <div 
                  key={index}
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                    index === activeImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          
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
              
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>
            
            {showReviewForm && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
                <ReviewForm restaurantId={restaurantId} onReviewSubmitted={handleReviewSubmitted} />
              </div>
            )}
            
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
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
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
        
        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Customer Reviews
            </h2>
            <Button 
              variant="outline" 
              className="text-blue-500 border-blue-500"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Add Review
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurant.reviews && restaurant.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
            {(!restaurant.reviews || restaurant.reviews.length === 0) && (
              <p className="text-gray-500 col-span-2 text-center py-8">No reviews yet. Be the first to share your experience!</p>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
