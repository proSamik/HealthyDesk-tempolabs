import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

interface ExerciseTimerProps {
  duration?: number; // Duration in seconds
  onComplete?: () => void;
  isRunning?: boolean;
  onPauseResume?: (isRunning: boolean) => void;
}

const ExerciseTimer = ({
  duration = 60,
  onComplete = () => {},
  isRunning: externalIsRunning,
  onPauseResume = () => {},
}: ExerciseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(externalIsRunning ?? true);
  const progress = ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    onPauseResume(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    onPauseResume(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-[120px] h-[120px] bg-white rounded-full shadow-lg flex flex-col items-center justify-center relative">
      <div className="absolute inset-0">
        <Progress
          value={progress}
          className="w-[120px] h-[120px] rounded-full"
          indicatorClassName="h-full w-full transition-all bg-gradient-to-r from-blue-500 to-cyan-500"
        />
      </div>

      <div className="z-10 flex flex-col items-center gap-1">
        <span className="text-2xl font-bold text-gray-800">
          {formatTime(timeLeft)}
        </span>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={toggleTimer}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={resetTimer}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTimer;
