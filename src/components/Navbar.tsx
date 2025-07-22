
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="border-b border-border/50 sticky top-0 bg-card/80 backdrop-blur-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-bold text-foreground flex items-center group">
            <motion.span 
              className="text-primary group-hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Reviewsbymenu
            </motion.span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Search</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden py-4 px-4 bg-card border-t border-border/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Search</Link>
            <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
