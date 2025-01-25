import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import ImageViewer360 from "./ImageViewer360";
import ExerciseTimer from "./ExerciseTimer";

interface ExerciseCardProps {
  exercise?: {
    name: string;
    difficulty: "easy" | "medium" | "hard";
    duration: number;
    score: number;
    images: string[];
  };
  onComplete?: () => void;
  onShare?: () => void;
  onLike?: () => void;
}

const ExerciseCard = ({
  exercise = {
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
  onComplete = () => {},
  onShare = () => {},
  onLike = () => {},
}: ExerciseCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] bg-white p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {exercise.name}
            </h3>
            <div className="flex gap-2 mt-2">
              <Badge
                variant="secondary"
                className={difficultyColors[exercise.difficulty]}
              >
                {exercise.difficulty.charAt(0).toUpperCase() +
                  exercise.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline">{exercise.score} points</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={`${isLiked ? "text-red-500" : "text-gray-500"}`}
            >
              <Heart
                className="h-5 w-5"
                fill={isLiked ? "currentColor" : "none"}
              />
            </Button>
            <Button variant="ghost" size="icon" onClick={onShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <ImageViewer360
            images={exercise.images}
            currentIndex={currentImageIndex}
            onRotate={() => {
              setCurrentImageIndex((prev) =>
                prev === exercise.images.length - 1 ? 0 : prev + 1,
              );
            }}
          />
        </div>

        <div className="flex justify-center">
          <ExerciseTimer duration={exercise.duration} onComplete={onComplete} />
        </div>
      </Card>
    </motion.div>
  );
};

export default ExerciseCard;
