import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1478737270239-2f02b77fc618)',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="relative container h-full flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Thank You Podcast
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Join us for insightful conversations, compelling stories, and thoughtful discussions
            that will leave you saying "Thank You" for listening.
          </p>
          <div className="flex gap-4">
            <Button size="lg">
              Latest Episode
            </Button>
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div 
          className="h-32 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
