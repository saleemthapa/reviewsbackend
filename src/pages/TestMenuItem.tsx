import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuItemReviewForm from "@/components/MenuItemReviewForm";
import ReviewCard from "@/components/ReviewCard";
import { motion } from "framer-motion";

const getBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://reviewsbackend.onrender.com";

const TestMenuItem = () => {
  const { id } = useParams<{ id: string }>(); // menu item id
  const [menuItem, setMenuItem] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const BASE_URL = getBaseUrl();
    // 1. Fetch menu item by id
    fetch(`${BASE_URL}/api/menu-items/${id}`)
      .then(res => res.json())
      .then(menuItemData => {
        setMenuItem(menuItemData);
        // 2. Fetch restaurant by menuItem.restaurant_id
        return fetch(`${BASE_URL}/api/restaurants/${menuItemData.restaurant_id}`)
          .then(res => res.json())
          .then(restaurantData => {
            setRestaurant(restaurantData);
            return menuItemData;
          });
      })
      .then(menuItemData => {
        // 3. Fetch reviews for this menu item
        return fetch(`${BASE_URL}/api/menu-items/reviews/${menuItemData.id}`)
          .then(res => res.json())
          .then(reviewsData => {
            setReviews(reviewsData);
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // Refetch reviews after submission
    if (menuItem?.id) {
      const BASE_URL = getBaseUrl();
      fetch(`${BASE_URL}/api/menu-items/reviews/${menuItem.id}`)
        .then(res => res.json())
        .then(reviewsData => setReviews(reviewsData));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !menuItem || !restaurant) return <div className="p-8 text-center text-red-500">{error || "Menu item or restaurant not found"}</div>;

  // Calculate average rating and review count
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating_overall || 0), 0) / reviews.length
      : 0;
  const reviewCount = reviews.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Back Button */}
        <Link
          to={`/test-menu/${restaurant.id}`}
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
                src={menuItem.image_url || "/placeholder.svg"}
                alt={menuItem.name}
                className="w-full h-40 xs:h-48 sm:h-64 lg:h-96 object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 p-3 xs:p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <Link
                  to={`/test-menu/${restaurant.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {restaurant.name}
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
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary">₨{menuItem.price}</div>
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
              menuItemId={menuItem.id}
              restaurantId={restaurant.id}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </motion.div>
        )}

        {/* Ingredients & Allergens (if available) */}
        {/* You can add these fields if your API provides them */}

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
                <div key={review.id} className="border p-3 rounded mb-2 bg-white/80">
                  <div className="flex items-center gap-2 mb-1">
                    <RatingStars rating={review.rating_overall} size="sm" />
                    <span className="font-semibold text-sm">{review.rating_overall}</span>
                    <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-1">{review.comment}</div>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span>Taste: {review.rating_taste}</span>
                    <span>Value: {review.rating_value}</span>
                    <span>Appearance: {review.rating_appearance}</span>
                  </div>
                  {review.is_verified && <span className="text-green-600 text-xs font-semibold ml-2">Verified</span>}
                </div>
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

export default TestMenuItem;
