
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuItemReviewForm from "@/components/MenuItemReviewForm";
import ReviewCard from "@/components/ReviewCard";
import { motion } from "framer-motion";
import { useReviewStore } from "@/hooks/useReviewStore";

// Mock menu item data
const menuItems = [
  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    restaurant: "The Garden Grill",
    restaurantId: 1,
    price: 27.99,
    description: "Homemade fettuccine with wild mushrooms, black truffle shavings, and parmesan cream sauce. Served with garlic bread and a side of mixed greens.",
    ingredients: ["Fettuccine pasta", "Wild mushrooms", "Black truffle", "Parmesan cheese", "Heavy cream", "Garlic", "Fresh herbs"],
    allergens: ["Gluten", "Dairy"],
    image: "/placeholder.svg"
  }
];

const MenuItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const itemId = parseInt(id || "1");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { getMenuItemReviews, getMenuItemAverageRating, getMenuItemReviewCount } = useReviewStore();
  
  const menuItem = menuItems.find(item => item.id === itemId) || menuItems[0];
  const reviews = getMenuItemReviews(itemId);
  const averageRating = getMenuItemAverageRating(itemId);
  const reviewCount = getMenuItemReviewCount(itemId);
  
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to={`/restaurant/${menuItem.restaurantId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Restaurant
        </Link>

        {/* Menu Item Header */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant overflow-hidden mb-8 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={menuItem.image} 
                alt={menuItem.name}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <Link 
                  to={`/restaurant/${menuItem.restaurantId}`}
                  className="hover:text-primary transition-colors"
                >
                  {menuItem.restaurant}
                </Link>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-foreground">{menuItem.name}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <RatingStars rating={averageRating} size="lg" />
                  <span className="text-lg font-medium text-foreground">{averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviewCount} reviews)</span>
                </div>
                <div className="text-3xl font-bold text-primary">${menuItem.price}</div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">{menuItem.description}</p>
              
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">Write Your Review</h3>
            <MenuItemReviewForm 
              menuItemId={itemId} 
              restaurantId={menuItem.restaurantId} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
          </motion.div>
        )}

        {/* Ingredients & Allergens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Ingredients</h3>
            <ul className="space-y-2">
              {menuItem.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">{ingredient}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Allergens</h3>
            <div className="flex flex-wrap gap-2">
              {menuItem.allergens.map((allergen, index) => (
                <span 
                  key={index}
                  className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm border border-destructive/20"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-foreground">Customer Reviews</h3>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review this dish!</p>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MenuItemDetail;
