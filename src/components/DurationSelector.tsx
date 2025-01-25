import React from "react";
import { Button } from "./ui/button";

interface DurationSelectorProps {
  onSelect?: (duration: number) => void;
  selectedDuration?: number;
}

const DurationSelector = ({
  onSelect = () => {},
  selectedDuration = 5,
}: DurationSelectorProps) => {
  const durations = [5, 10, 30];

  return (
    <div className="w-[300px] h-[60px] bg-white p-2 rounded-lg flex items-center justify-center gap-4 shadow-sm">
      {durations.map((duration) => (
        <Button
          key={duration}
          variant={selectedDuration === duration ? "default" : "outline"}
          onClick={() => onSelect(duration)}
          className={`flex-1 ${selectedDuration === duration ? "bg-primary text-primary-foreground" : ""}`}
        >
          {duration} min
        </Button>
      ))}
    </div>
  );
};

export default DurationSelector;
