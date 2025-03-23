
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Restaurant Ratings Based on <span className="text-primary">Menu Items</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Discover and rate restaurants based on their actual menu items, not just overall experience. Find exactly what's worth ordering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/restaurants">
                <Button size="lg">Browse Restaurants</Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">How It Works</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Restaurant Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
