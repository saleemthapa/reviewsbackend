
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "Reviewsbymenu has completely changed how I choose what to eat. I used to waste money on disappointing dishes, but now I can see exactly what's worth ordering.",
    author: "Emma W.",
    title: "Food Enthusiast"
  },
  {
    id: 2,
    text: "As a restaurant owner, the dish-specific feedback helps us improve our menu and highlight our best items. It's been great for business!",
    author: "Michael R.",
    title: "Restaurant Owner"
  },
  {
    id: 3,
    text: "I love being able to see ratings for specific dishes. It's so much more useful than general restaurant reviews.",
    author: "Sarah L.",
    title: "Food Blogger"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700 italic mb-6">
            "{testimonials[currentIndex].text}"
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="text-left">
              <div className="font-medium">{testimonials[currentIndex].author}</div>
              <div className="text-sm text-gray-500">{testimonials[currentIndex].title}</div>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 p-0 rounded-full ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
