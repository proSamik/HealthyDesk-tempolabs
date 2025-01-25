import React, { useState } from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import ExerciseCard from "./ExerciseCard";
import DurationSelector from "./DurationSelector";
import StartButton from "./StartButton";
import LandingPage from "./LandingPage";
import { Button } from "./ui/button";
import { SkipForward } from "lucide-react";

interface HomeProps {
  onSessionComplete?: () => void;
  initialDuration?: number;
  isAuthenticated?: boolean;
}

const Home = ({
  onSessionComplete = () => {},
  initialDuration = 5,
  isAuthenticated = false,
}: HomeProps) => {
  const [showLanding, setShowLanding] = useState(!isAuthenticated);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Mock exercises data
  const exercises = [
    {
      name: "Desk Push-Ups",
      difficulty: "medium",
      duration: 60,
      score: 85,
      images: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=500&h=500&fit=crop",
      ],
    },
    {
      name: "Chair Squats",
      difficulty: "easy",
      duration: 45,
      score: 65,
      images: [
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574680088814-c9e8a9d8a8d1?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574680088913-f8e5c2e46b8c?w=500&h=500&fit=crop",
      ],
    },
  ];

  const handleStartSession = () => {
    setIsSessionActive(true);
  };

  const handleExerciseComplete = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setIsSessionActive(false);
      setCurrentExerciseIndex(0);
      onSessionComplete();
    }
  };

  const handleSkipExercise = () => {
    handleExerciseComplete();
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-4xl bg-white p-8 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Exercise Break Timer
        </h1>

        {!isSessionActive ? (
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DurationSelector
              selectedDuration={selectedDuration}
              onSelect={setSelectedDuration}
            />
            <StartButton
              onClick={handleStartSession}
              isActive={false}
              size="lg"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <ExerciseCard
                exercise={exercises[currentExerciseIndex]}
                onComplete={handleExerciseComplete}
                onShare={() => {}}
                onLike={() => {}}
              />
              <Button
                variant="outline"
                onClick={handleSkipExercise}
                className="w-full flex items-center justify-center gap-2"
              >
                <SkipForward className="w-4 h-4" />
                Skip Exercise
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default Home;
