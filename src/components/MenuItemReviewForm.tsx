
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useReviewStore } from "@/hooks/useReviewStore";

interface MenuItemReviewFormProps {
  menuItemId: number;
  restaurantId: number;
  onReviewSubmitted: () => void;
}

const MenuItemReviewForm = ({ menuItemId, restaurantId, onReviewSubmitted }: MenuItemReviewFormProps) => {
  const [ratings, setRatings] = useState({
    taste: 5,
    presentation: 5,
    portion: 5,
    value: 5
  });
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const { toast } = useToast();
  const { addReview } = useReviewStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        menuItemId,
        restaurantId,
        userName: "You", // In a real app, this would come from user auth
        rating: Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 4,
        detailedRatings: ratings,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        content,
        type: 'menuItem' as const
      };
      
      addReview(newReview);
      
      setIsSubmitting(false);
      setContent("");
      setRatings({
        taste: 5,
        presentation: 5,
        portion: 5,
        value: 5
      });
      
      toast({
        title: "Review submitted",
        description: "Thank you for your detailed feedback about this dish!",
      });
      
      onReviewSubmitted();
    }, 1000);
  };

  const handleStarHover = (category: string, index: number) => {
    setHoveredCategory(category);
    setHoveredRating(index);
  };

  const handleStarLeave = () => {
    setHoveredCategory(null);
    setHoveredRating(null);
  };

  const handleStarClick = (category: string, index: number) => {
    setRatings(prev => ({ ...prev, [category]: index }));
  };

  const renderStars = (category: string, currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
      <motion.div
        key={index}
        className="cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => handleStarHover(category, index)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(category, index)}
      >
        <Star
          size={20}
          className={`xs:w-5 xs:h-5 sm:w-6 sm:h-6 ${
            index <= (hoveredCategory === category && hoveredRating ? hoveredRating : currentRating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } transition-colors duration-200`}
        />
      </motion.div>
    ));
  };

  const ratingCategories = [
    { key: 'taste', label: 'Taste & Flavor', icon: '🍽️' },
    { key: 'presentation', label: 'Presentation', icon: '🎨' },
    { key: 'portion', label: 'Portion Size', icon: '📏' },
    { key: 'value', label: 'Value for Money', icon: '💰' }
  ];

  const overallRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 4;

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-3 xs:space-y-4 sm:space-y-6 bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 lg:p-8 border border-border/50 shadow-elegant"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Overall Rating Display */}
      <div className="text-center pb-3 xs:pb-4 sm:pb-6 border-b border-border/50">
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">Overall Rating</h3>
        <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary">{overallRating.toFixed(1)}</div>
        <p className="text-xs sm:text-sm text-muted-foreground">Based on your detailed ratings below</p>
      </div>

      {/* Individual Rating Categories */}
      <div className="space-y-3 xs:space-y-4 sm:space-y-6">
        {ratingCategories.map((category) => (
          <div key={category.key}>
            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 md:mb-3 text-foreground flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm xs:text-base sm:text-lg">{category.icon}</span>
              <span className="text-xs xs:text-sm sm:text-base">{category.label}</span>
            </label>
            <div className="flex items-center gap-1 sm:gap-2 justify-start">
              {renderStars(category.key, ratings[category.key as keyof typeof ratings])}
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-muted-foreground font-medium">
                {ratings[category.key as keyof typeof ratings]}/5
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <label htmlFor="content" className="block text-xs xs:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">Your Experience</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this dish... How did it taste? Was the presentation appealing? Was the portion size appropriate?"
          rows={3}
          required
          className="resize-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-background/50 text-xs xs:text-sm sm:text-base"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 text-sm sm:text-base py-2.5 sm:py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Dish Review"}
      </Button>
    </motion.form>
  );
};

export default MenuItemReviewForm;
