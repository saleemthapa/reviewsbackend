
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-bold text-primary flex items-center">
            <span className="text-blue-500">Reviews by Menu</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-500">Home</Link>
            <Link to="/restaurants" className="text-sm font-medium hover:text-blue-500">Restaurants</Link>
            <Link to="/trending" className="text-sm font-medium hover:text-blue-500">Trending</Link>
            <Link to="/about" className="text-sm font-medium hover:text-blue-500">About</Link>
            <Link to="/restaurant-sign-up" className="text-sm font-medium hover:text-blue-500">Restaurant Signup</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-500">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/sign-in">
            <Button variant="ghost" size="sm" className="text-blue-500">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
