
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "@/components/RatingStars";
import { motion } from "framer-motion";

interface ReviewCardProps {
  review: {
    id: number;
    userName: string;
    userImage?: string;
    rating: number;
    date: string;
    content: string;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-5 flex flex-col space-y-4 shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 border border-gray-100">
          {review.userImage ? (
            <AvatarImage src={review.userImage} alt={review.userName} />
          ) : (
            <AvatarFallback className="bg-gray-100 text-gray-500">{review.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h4 className="font-medium text-gray-900">{review.userName}</h4>
          <div className="flex items-center space-x-2">
            <RatingStars rating={review.rating} size="sm" />
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
    </motion.div>
  );
};

export default ReviewCard;
