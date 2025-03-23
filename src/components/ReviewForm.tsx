
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ReviewFormProps {
  restaurantId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ restaurantId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would submit to an API
    setTimeout(() => {
      setIsSubmitting(false);
      setContent("");
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      onReviewSubmitted();
    }, 1000);
  };

  const handleStarHover = (index: number) => {
    setHoveredRating(index);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
      <motion.div
        key={index}
        className="cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(index)}
      >
        <Star
          size={28}
          className={`${
            index <= (hoveredRating || rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } transition-colors duration-200`}
        />
      </motion.div>
    ));
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="block text-sm font-medium mb-3 text-gray-700">Your Rating</label>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          {renderStars()}
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-700">Your Experience</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this restaurant..."
          rows={4}
          required
          className="resize-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </motion.form>
  );
};

export default ReviewForm;
