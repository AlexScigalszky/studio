"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

interface WallAreaDefinitionProps {
  setWallDimensions: (dimensions: { width: number; height: number }) => void;
    onValid: () => void;
}

export const WallAreaDefinition: React.FC<WallAreaDefinitionProps> = ({
  setWallDimensions,
    onValid,
}) => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      if (width <= 0 || height <= 0) {
          alert("Please enter valid wall dimensions.");
          return;
      }

    setWallDimensions({width, height});
      onValid();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="wallWidth">Width (cm)</Label>
        <Input
          type="number"
          id="wallWidth"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="wallHeight">Height (cm)</Label>
        <Input
          type="number"
          id="wallHeight"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
        <Button type="submit">Save Wall Dimensions</Button>
    </form>
  );
};
