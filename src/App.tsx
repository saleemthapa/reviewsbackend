
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { ReviewProvider } from "@/hooks/useReviewStore";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantDetail from "./pages/RestaurantDetail";
import MenuItemDetail from "./pages/MenuItemDetail";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import TestApi from "./pages/TestApi";
import TestMenu from "./pages/TestMenu";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReviewProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/menu-item/:id" element={<MenuItemDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/HowItWorks" element={<HowItWorks />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/test-api" element={<TestApi />} />
                <Route path="/test-menu/:id" element={<TestMenu />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ReviewProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
