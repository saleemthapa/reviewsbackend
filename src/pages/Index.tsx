
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Reviews by Menu</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/restaurants" className="text-sm font-medium hover:text-primary">Restaurants</Link>
            <Link to="/how-it-works" className="text-sm font-medium hover:text-primary">How it Works</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/sign-in">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        <HeroSection />
        <FeaturedRestaurants />
        <HowItWorks />
      </main>
      
      <footer className="bg-gray-50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Reviews by Menu</h3>
              <p className="text-gray-600 text-sm">
                The platform where restaurant ratings are based on their menu items.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Diners</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/sign-up" className="text-gray-600 hover:text-primary">Sign Up</Link></li>
                <li><Link to="/restaurants" className="text-gray-600 hover:text-primary">Discover Restaurants</Link></li>
                <li><Link to="/how-it-works" className="text-gray-600 hover:text-primary">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/restaurant-sign-up" className="text-gray-600 hover:text-primary">Join as Restaurant</Link></li>
                <li><Link to="/restaurant-dashboard" className="text-gray-600 hover:text-primary">Restaurant Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Reviews by Menu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
