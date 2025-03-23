
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to discover the best dishes in your area?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of food lovers who are sharing and discovering the best menu items at restaurants everywhere.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/sign-up">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">Sign Up Free</Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
