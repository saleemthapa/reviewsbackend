
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Discover Restaurants",
    description:
      "Browse top-rated restaurants and trending spots in your area. See what’s popular and filter by cuisine, rating, or location.",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#FBBF24" />
        <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "2. Rate & Review Dishes",
    description:
      "Share your experience by rating dishes and leaving detailed reviews. Help others find the best menu items.",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#34D399" />
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff"/>
      </svg>
    ),
  },
  {
    title: "3. Find the Best Dishes",
    description:
      "See what others recommend and discover the most loved dishes at every restaurant. Never order a disappointing meal again.",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#60A5FA" />
        <path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-gray-600 mb-10">
            Discover, rate, and share the best dishes at restaurants near you. Here’s how to get started:
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{step.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-16 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Why Rate Dishes?</h3>
          <p className="text-gray-700 mb-6">
            Your reviews help others make better dining decisions and highlight the best menu items at every restaurant.
          </p>
          <div className="flex justify-center gap-2 mb-4">
            <RatingStars rating={5} />
            <span className="text-yellow-500 font-semibold">5.0</span>
          </div>
          <p className="text-gray-500 text-sm">
            Join our community and start sharing your food experiences today!
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;