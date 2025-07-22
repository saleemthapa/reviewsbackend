import { useState } from "react";
import { User, Star, Heart, MessageSquare, Settings, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import { motion } from "framer-motion";

// Mock user data
const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg",
  joinDate: "January 2023",
  totalReviews: 47,
  averageRating: 4.3,
  helpfulVotes: 156,
  badges: ["Foodie", "Top Reviewer", "Local Guide"]
};

const userReviews = [
  {
    id: 1,
    restaurantName: "The Garden Table",
    restaurantId: 1,
    userName: "John Doe",
    userImage: "/placeholder.svg",
    rating: 5,
    date: "September 15, 2023",
    content: "Absolutely amazing experience! The truffle pasta was divine and the ambiance was perfect.",
    helpful: 12
  },
  {
    id: 2,
    restaurantName: "Sakura Sushi & Ramen",
    restaurantId: 2,
    userName: "John Doe",
    userImage: "/placeholder.svg",
    rating: 4,
    date: "September 10, 2023",
    content: "Great sushi and excellent service. The dragon roll was particularly impressive.",
    helpful: 8
  }
];

const favoriteRestaurants = [
  {
    id: 1,
    name: "The Garden Table",
    cuisine: "Contemporary American",
    rating: 4.7,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Bella Napoli",
    cuisine: "Italian",
    rating: 4.5,
    image: "/placeholder.svg"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("reviews");

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
        {/* Profile Header */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border/50 shadow-elegant"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2 text-foreground">{user.name}</h1>
              <p className="text-muted-foreground mb-4">Member since {user.joinDate}</p>
              
              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {user.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Award className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.totalReviews}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-foreground">{user.averageRating}</span>
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.helpfulVotes}</div>
                  <div className="text-sm text-muted-foreground">Helpful</div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="border-border/50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="reviews">
              <MessageSquare className="w-4 h-4 mr-2" />
              My Reviews
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {userReviews.map((review) => (
                <motion.div key={review.id} variants={itemVariants}>
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/restaurant/${review.restaurantId}`}
                          className="text-lg font-semibold text-primary hover:underline"
                        >
                          {review.restaurantName}
                        </Link>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Heart className="w-4 h-4 mr-1" />
                          {review.helpful} helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="favorites">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favoriteRestaurants.map((restaurant) => (
                <motion.div key={restaurant.id} variants={itemVariants}>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <Card className="overflow-hidden hover-scale bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
                      <div className="h-48 bg-muted relative">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{restaurant.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={restaurant.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">{restaurant.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;