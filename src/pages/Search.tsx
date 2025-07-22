import { useState, useMemo } from "react";
import { Search as SearchIcon, Filter, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import { motion } from "framer-motion";

// Mock data
const restaurants = [
  {
    id: 1,
    name: "The Garden Table",
    cuisine: "Contemporary American",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 182,
    image: "/placeholder.svg",
    priceRange: "$$$"
  },
  {
    id: 2,
    name: "Sakura Sushi & Ramen",
    cuisine: "Japanese",
    location: "Los Angeles, CA",
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg",
    priceRange: "$$"
  },
  {
    id: 3,
    name: "Bella Napoli",
    cuisine: "Italian",
    location: "New York, NY",
    rating: 4.5,
    reviews: 137,
    image: "/placeholder.svg",
    priceRange: "$$"
  }
];

const menuItems = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    restaurant: "The Garden Table",
    restaurantId: 1,
    price: 27.99,
    rating: 4.9,
    reviews: 123,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Rainbow Roll Deluxe",
    restaurant: "Sakura Sushi & Ramen",
    restaurantId: 2,
    price: 22.50,
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    restaurant: "Bella Napoli",
    restaurantId: 3,
    price: 18.95,
    rating: 4.7,
    reviews: 143,
    image: "/placeholder.svg"
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("restaurants");

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">Discover Great Food</h1>
          <p className="text-muted-foreground text-lg mb-6">Find restaurants and dishes you'll love</p>
          
          <div className="max-w-2xl mx-auto relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search restaurants, dishes, or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-16 h-14 bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl text-lg"
            />
            <Button 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Search Results */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="restaurants">Restaurants ({filteredRestaurants.length})</TabsTrigger>
            <TabsTrigger value="dishes">Dishes ({filteredMenuItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRestaurants.map((restaurant) => (
                <motion.div key={restaurant.id} variants={itemVariants}>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <Card className="overflow-hidden hover-scale bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
                      <div className="h-48 bg-muted">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-foreground">{restaurant.name}</h3>
                          <span className="text-muted-foreground text-sm">{restaurant.priceRange}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{restaurant.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={restaurant.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {restaurant.rating} ({restaurant.reviews} reviews)
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="dishes">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredMenuItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link to={`/menu-item/${item.id}`}>
                    <Card className="overflow-hidden hover-scale bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
                      <div className="h-48 bg-muted relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-card px-2 py-1 rounded-full text-sm font-medium">
                          ${item.price}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                        <Link 
                          to={`/restaurant/${item.restaurantId}`}
                          className="text-primary hover:underline text-sm mb-3 block"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.restaurant}
                        </Link>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={item.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {item.rating} ({item.reviews} reviews)
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {searchQuery && filteredRestaurants.length === 0 && filteredMenuItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No results found</h3>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;