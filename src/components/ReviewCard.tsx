
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MenuItemDetailedRatings {
  taste: number;
  presentation: number;
  portion: number;
  value: number;
}

interface RestaurantDetailedRatings {
  food: number;
  ambience: number;
  service: number;
  pricing: number;
}

interface BaseReview {
  id: number;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  content: string;
  helpful?: number;
}

interface MenuItemReview extends BaseReview {
  type: 'menuItem';
  detailedRatings?: MenuItemDetailedRatings;
}

interface RestaurantReview extends BaseReview {
  type: 'restaurant';
  detailedRatings?: RestaurantDetailedRatings;
}

interface ReviewCardProps {
  review: MenuItemReview | RestaurantReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const isMenuItemReview = 'type' in review && review.type === 'menuItem';
  const isRestaurantReview = 'type' in review && review.type === 'restaurant';
  
  const menuItemCategories = [
    { key: 'taste', label: 'Taste', icon: '🍽️' },
    { key: 'presentation', label: 'Presentation', icon: '🎨' },
    { key: 'portion', label: 'Portion', icon: '📏' },
    { key: 'value', label: 'Value', icon: '💰' }
  ];

  const restaurantCategories = [
    { key: 'food', label: 'Food', icon: '🍽️' },
    { key: 'ambience', label: 'Ambience', icon: '🏮' },
    { key: 'service', label: 'Service', icon: '👥' },
    { key: 'pricing', label: 'Value', icon: '💰' }
  ];

  const getCategories = () => {
    if (isMenuItemReview) return menuItemCategories;
    if (isRestaurantReview) return restaurantCategories;
    return restaurantCategories; // Default fallback
  };

  const categories = getCategories();

  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-elegant transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={review.userImage} alt={review.userName} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {review.userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">{review.userName}</h4>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          
          {/* Overall Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{review.rating}/5</span>
          </div>

          {/* Detailed Ratings */}
          {review.detailedRatings && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-2 bg-muted/30 rounded-xl mx-auto justify-items-start w-full min-w-0">
              {categories.map((category) => {
                const rating = review.detailedRatings?.[category.key as keyof typeof review.detailedRatings] || 0;
                return (
                  <div key={category.key} className="flex items-center gap-2">
                    <span className="text-sm">{category.icon}</span>
                    <span className="text-xs text-muted-foreground flex-1">{category.label}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={`${
                            i < rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground ml-1">{rating}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          <p className="text-muted-foreground leading-relaxed mb-4 text-left">{review.content}</p>
          
          {review.helpful && (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {review.helpful} helpful
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
