import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Heart, Timer, Users } from "lucide-react";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage = ({ onGetStarted = () => {} }: LandingPageProps) => {
  const features = [
    {
      icon: <Timer className="w-6 h-6 text-blue-500" />,
      title: "Flexible Breaks",
      description: "Choose from 5, 10, or 30-minute exercise breaks",
    },
    {
      icon: <Brain className="w-6 h-6 text-green-500" />,
      title: "Smart Exercises",
      description: "AI-powered exercise selection based on your needs",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Health Focus",
      description: "Combat back, neck, and shoulder pain effectively",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "IT Community",
      description: "Join other professionals in staying healthy",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stay Healthy While Coding
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Smart exercise breaks designed specifically for IT professionals to
            prevent desk-related health issues.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full"
          >
            Start Your Health Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          {[
            { value: "89%", label: "Report Less Pain" },
            { value: "15k+", label: "Active Users" },
            { value: "30min", label: "Daily Goal" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
