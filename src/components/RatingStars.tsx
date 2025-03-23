
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars = ({ 
  rating, 
  size = "md", 
  className,
  interactive = false,
  onRatingChange 
}: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  
  const sizeClass = starSizes[size];

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <motion.div
              key={i}
              whileHover={interactive ? { scale: 1.2 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
              onClick={() => handleClick(i)}
              className={interactive ? "cursor-pointer" : ""}
            >
              <Star key={i} className={cn(sizeClass, "text-yellow-400 fill-yellow-400 transition-colors")} />
            </motion.div>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <motion.div
              key={i}
              whileHover={interactive ? { scale: 1.2 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
              onClick={() => handleClick(i)}
              className={interactive ? "cursor-pointer" : ""}
            >
              <StarHalf key={i} className={cn(sizeClass, "text-yellow-400 fill-yellow-400 transition-colors")} />
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={i}
              whileHover={interactive ? { scale: 1.2 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
              onClick={() => handleClick(i)}
              className={interactive ? "cursor-pointer" : ""}
            >
              <Star key={i} className={cn(sizeClass, "text-gray-200 transition-colors")} />
            </motion.div>
          );
        }
      })}
    </div>
  );
};

export default RatingStars;
