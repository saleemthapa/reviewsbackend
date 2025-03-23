
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RatingStars = ({ rating, size = "md", className }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  
  const sizeClass = starSizes[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className={cn(sizeClass, "text-yellow-400 fill-yellow-400")} />;
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className={cn(sizeClass, "text-yellow-400 fill-yellow-400")} />;
        } else {
          return <Star key={i} className={cn(sizeClass, "text-gray-300")} />;
        }
      })}
    </div>
  );
};

export default RatingStars;
