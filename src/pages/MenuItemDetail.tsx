
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
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Back Button */}
        <Link 
          to={`/restaurant/${menuItem.restaurantId}`}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Back to Restaurant
        </Link>

        {/* Menu Item Header */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-elegant overflow-hidden mb-4 sm:mb-6 md:mb-8 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img 
                src={menuItem.image} 
                alt={menuItem.name}
                className="w-full h-40 xs:h-48 sm:h-64 lg:h-96 object-cover"
              />
            </div>
            
            <div className="w-full lg:w-1/2 p-3 xs:p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <Link 
                  to={`/restaurant/${menuItem.restaurantId}`}
                  className="hover:text-primary transition-colors"
                >
                  {menuItem.restaurant}
                </Link>
              </div>
              
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">{menuItem.name}</h1>
              
              <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <RatingStars rating={averageRating} size="lg" />
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-medium text-foreground">{averageRating.toFixed(1)}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">({reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary">${menuItem.price}</div>
              </div>
              
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-xs xs:text-sm sm:text-base">{menuItem.description}</p>
              
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base py-2.5 sm:py-3"
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div 
            className="mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg xs:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Write Your Review</h3>
            <MenuItemReviewForm 
              menuItemId={itemId} 
              restaurantId={menuItem.restaurantId} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
          </motion.div>
        )}

        {/* Ingredients & Allergens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-border/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-base xs:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Ingredients</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {menuItem.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground text-xs xs:text-sm sm:text-base">{ingredient}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-border/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-base xs:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Allergens</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {menuItem.allergens.map((allergen, index) => (
                <span 
                  key={index}
                  className="bg-destructive/10 text-destructive px-2.5 xs:px-3 py-1 rounded-full text-xs sm:text-sm border border-destructive/20"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-foreground">Customer Reviews</h3>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6 sm:py-8 text-xs xs:text-sm sm:text-base">No reviews yet. Be the first to review this dish!</p>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MenuItemDetail;
