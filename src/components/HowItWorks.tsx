
import { Search, Utensils, Star } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6 text-blue-500" />,
    title: "Discover",
    description: "Find restaurants and browse dish-specific ratings to discover exactly what to order."
  },
  {
    icon: <Utensils className="h-6 w-6 text-blue-500" />,
    title: "Dine",
    description: "Enjoy meals with confidence, knowing you've chosen the highest-rated dishes."
  },
  {
    icon: <Star className="h-6 w-6 text-blue-500" />,
    title: "Review",
    description: "Share your experience by rating and reviewing specific menu items to help others."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">How Reviewsbymenu Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
