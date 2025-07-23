
import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuItemReview {
  id: number;
  menuItemId: number;
  restaurantId: number;
  userName: string;
  userImage?: string;
  rating: number;
  detailedRatings: {
    taste: number;
    presentation: number;
    portion: number;
    value: number;
  };
  date: string;
  content: string;
  helpful?: number;
  type: 'menuItem';
}

interface RestaurantReview {
  id: number;
  restaurantId: number;
  userName: string;
  userImage?: string;
  rating: number;
  detailedRatings: {
    food: number;
    ambience: number;
    service: number;
    pricing: number;
  };
  date: string;
  content: string;
  helpful?: number;
  type: 'restaurant';
}

type Review = MenuItemReview | RestaurantReview;

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<MenuItemReview, 'id'> | Omit<RestaurantReview, 'id'>) => void;
  getMenuItemReviews: (menuItemId: number) => MenuItemReview[];
  getRestaurantReviews: (restaurantId: number) => RestaurantReview[];
  getMenuItemAverageRating: (menuItemId: number) => number;
  getMenuItemReviewCount: (menuItemId: number) => number;
}

const ReviewContext = createContext<ReviewStore | undefined>(undefined);

// Mock initial data
const initialReviews: Review[] = [
  {
    id: 1,
    menuItemId: 1,
    restaurantId: 1,
    userName: "Sarah Johnson",
    userImage: "/placeholder.svg",
    rating: 5,
    detailedRatings: {
      taste: 5,
      presentation: 4,
      portion: 4,
      value: 4
    },
    date: "September 15, 2023",
    content: "Absolutely divine! The truffle aroma hits you immediately and the pasta is cooked to perfection. Worth every penny!",
    helpful: 12,
    type: 'menuItem'
  },
  {
    id: 2,
    menuItemId: 1,
    restaurantId: 1,
    userName: "Michael Chen",
    rating: 4,
    detailedRatings: {
      taste: 4,
      presentation: 4,
      portion: 5,
      value: 3
    },
    date: "September 10, 2023",
    content: "Really enjoyed this dish. The mushrooms were perfectly seasoned and the sauce was rich without being too heavy.",
    helpful: 8,
    type: 'menuItem'
  },
  {
    id: 3,
    menuItemId: 1,
    restaurantId: 1,
    userName: "Emily Davis",
    userImage: "/placeholder.svg",
    rating: 5,
    detailedRatings: {
      taste: 5,
      presentation: 5,
      portion: 4,
      value: 4
    },
    date: "September 5, 2023",
    content: "Best pasta dish I've had in the city! The truffle flavor is incredible and the portion size is generous.",
    helpful: 15,
    type: 'menuItem'
  }
];

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Omit<MenuItemReview, 'id'> | Omit<RestaurantReview, 'id'>) => {
    const newReview = {
      ...review,
      id: Date.now(), // Simple ID generation
    } as Review;
    setReviews(prev => [...prev, newReview]);
  };

  const getMenuItemReviews = (menuItemId: number): MenuItemReview[] => {
    return reviews.filter(
      (review): review is MenuItemReview => 
        review.type === 'menuItem' && review.menuItemId === menuItemId
    );
  };

  const getRestaurantReviews = (restaurantId: number): RestaurantReview[] => {
    return reviews.filter(
      (review): review is RestaurantReview => 
        review.type === 'restaurant' && review.restaurantId === restaurantId
    );
  };

  const getMenuItemAverageRating = (menuItemId: number): number => {
    const menuItemReviews = getMenuItemReviews(menuItemId);
    if (menuItemReviews.length === 0) return 0;
    
    const totalRating = menuItemReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / menuItemReviews.length;
  };

  const getMenuItemReviewCount = (menuItemId: number): number => {
    return getMenuItemReviews(menuItemId).length;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getMenuItemReviews,
      getRestaurantReviews,
      getMenuItemAverageRating,
      getMenuItemReviewCount
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewStore = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewStore must be used within a ReviewProvider');
  }
  return context;
};
