
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="container mx-auto max-w-4xl glass rounded-2xl p-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-medium tracking-tight mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Discover the best dishes in your area
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join thousands of food lovers who are sharing and discovering the best menu items at restaurants everywhere.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/sign-up" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-300"
            >
              Sign Up Free
            </Button>
          </Link>
          <Link to="/HowItWorks" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-black text-black hover:bg-black/5 rounded-md transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
