import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";

interface ImageViewer360Props {
  images?: string[];
  currentIndex?: number;
  onRotate?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

const ImageViewer360 = ({
  images = [
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=500&h=500&fit=crop",
  ],
  currentIndex = 0,
  onRotate = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
}: ImageViewer360Props) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
    onRotate();
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
    onZoomIn();
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
    onZoomOut();
  };

  return (
    <Card className="w-[360px] h-[360px] bg-white p-4 relative">
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <motion.img
          src={images[currentIndex]}
          alt="Exercise demonstration"
          className="w-full h-full object-cover"
          animate={{
            rotate: rotation,
            scale: scale,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleRotate}
          className="rounded-full"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="rounded-full"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="rounded-full"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ImageViewer360;
