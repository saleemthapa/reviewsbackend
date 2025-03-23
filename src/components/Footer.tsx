
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">PlateRate</h3>
            <p className="text-sm text-gray-600">
              Find the best dishes at any restaurant with honest reviews from real diners.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/restaurants" className="text-gray-600 hover:text-blue-500">Top Restaurants</Link></li>
              <li><Link to="/dishes" className="text-gray-600 hover:text-blue-500">Popular Dishes</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-blue-500">Recent Reviews</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-500">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-500">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-500">Terms of Service</Link></li>
              <li><Link to="/cookie" className="text-gray-600 hover:text-blue-500">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {currentYear} PlateRate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
