
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "@/components/RatingStars";

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
    <div className="border border-gray-100 rounded-lg p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          {review.userImage ? (
            <AvatarImage src={review.userImage} alt={review.userName} />
          ) : (
            <AvatarFallback>{review.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h4 className="font-medium">{review.userName}</h4>
          <div className="flex items-center space-x-2">
            <RatingStars rating={review.rating} size="sm" />
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
