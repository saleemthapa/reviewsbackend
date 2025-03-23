
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RatingStars from "@/components/RatingStars";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  restaurantId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ restaurantId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex items-center gap-2">
          <div 
            className="flex cursor-pointer"
            onClick={() => setRating(1)}
          >
            <RatingStars rating={1} size="lg" className={rating >= 1 ? "opacity-100" : "opacity-50"} />
          </div>
          <div 
            className="flex cursor-pointer"
            onClick={() => setRating(2)}
          >
            <RatingStars rating={1} size="lg" className={rating >= 2 ? "opacity-100" : "opacity-50"} />
          </div>
          <div 
            className="flex cursor-pointer"
            onClick={() => setRating(3)}
          >
            <RatingStars rating={1} size="lg" className={rating >= 3 ? "opacity-100" : "opacity-50"} />
          </div>
          <div 
            className="flex cursor-pointer"
            onClick={() => setRating(4)}
          >
            <RatingStars rating={1} size="lg" className={rating >= 4 ? "opacity-100" : "opacity-50"} />
          </div>
          <div 
            className="flex cursor-pointer"
            onClick={() => setRating(5)}
          >
            <RatingStars rating={1} size="lg" className={rating >= 5 ? "opacity-100" : "opacity-50"} />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">Your Review</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with this restaurant..."
          rows={4}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
