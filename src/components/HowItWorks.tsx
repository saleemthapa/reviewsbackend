
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: "search",
    title: "Find Restaurants",
    description: "Search for restaurants by location, cuisine, or specific dishes you're craving."
  },
  {
    icon: "menu",
    title: "Browse Menu Ratings",
    description: "See how each menu item is rated before you decide what to order."
  },
  {
    icon: "star",
    title: "Rate Menu Items",
    description: "After your meal, rate the specific dishes you tried, not just the overall experience."
  },
  {
    icon: "users",
    title: "Help Others Decide",
    description: "Your ratings help others discover great dishes and restaurants."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Reviews by Menu Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're changing how restaurants are rated by focusing on what matters most: the food.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border max-w-3xl mx-auto">
          <h3 className="font-bold text-xl mb-4 text-center">For Restaurant Owners</h3>
          <p className="text-gray-600 text-center mb-6">
            Join our platform to get detailed insights about your menu performance and connect with customers who love your food.
          </p>
          <div className="flex justify-center">
            <Link to="/restaurant-sign-up">
              <Button>Register Your Restaurant</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
