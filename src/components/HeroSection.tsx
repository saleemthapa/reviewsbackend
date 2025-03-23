
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const cuisines = ["Italian", "Japanese", "Mexican", "Indian", "Chinese"];

const HeroSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover the best <span className="text-blue-500">dishes</span>, not just restaurants
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Find exactly what to order with dish-specific reviews from real diners. Know before you go.
        </p>
        
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="flex">
            <Input 
              placeholder="Find restaurants or dishes..." 
              className="pr-10 h-12 w-full rounded-l-md" 
            />
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-l-none h-12">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <div className="text-sm text-gray-500 mr-2 mt-1">Popular cuisines:</div>
          {cuisines.map((cuisine) => (
            <Button 
              key={cuisine} 
              variant="outline" 
              size="sm" 
              className="text-xs border-gray-200"
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
