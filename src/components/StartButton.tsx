import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface StartButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

const StartButton = ({
  onClick = () => {},
  isActive = false,
  size = "lg",
}: StartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  useEffect(() => {
    // Disable pulse animation when button becomes active
    if (isActive) {
      setPulseAnimation(false);
    }
  }, [isActive]);

  const sizeClasses = {
    sm: "w-[100px] h-[100px]",
    md: "w-[150px] h-[150px]",
    lg: "w-[200px] h-[200px]",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {pulseAnimation && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className={`w-full h-full rounded-full transition-colors duration-300 ${isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
          onClick={onClick}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isActive ? 360 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Play className="w-12 h-12 text-white" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default StartButton;
