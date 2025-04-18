"use client";

import {Input} from "@/components/ui/input";
import { useState } from "react";
import {Label} from "@/components/ui/label";

interface WallAreaDefinitionProps {
  setWallDimensions: (dimensions: { width: number; height: number }) => void;
}

interface WallDimensions {
  width: number;
  height: number;
}

export const WallAreaDefinition: React.FC<WallAreaDefinitionProps> = ({
  setWallDimensions,
}) => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    setWallDimensions({width:newWidth, height: height});

  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    setWallDimensions({width: width, height: newHeight});
  };
  


  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="wallWidth">Width (cm)</Label>
        <Input
          type="number"
          id="wallWidth"
          value={width}
          onChange={handleWidthChange}
        />
      </div>
      <div>
        <Label htmlFor="wallHeight">Height (cm)</Label>
        <Input
          type="number"
          id="wallHeight"
          value={height}
          onChange={handleHeightChange}
        />
      </div>
    </div>
  );
};
