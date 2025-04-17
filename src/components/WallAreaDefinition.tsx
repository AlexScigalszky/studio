"use client";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface WallAreaDefinitionProps {
  setWallDimensions: (dimensions: WallDimensions) => void;
}

interface WallDimensions {
  width: number;
  height: number;
}

export const WallAreaDefinition: React.FC<WallAreaDefinitionProps> = ({
  setWallDimensions,
}) => {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number(e.target.value);    setWallDimensions((prev: WallDimensions) => ({...prev, width}));
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    setWallDimensions(prev => ({...prev, height}));
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="wallWidth">Width (cm)</Label>
        <Input
          type="number"
          id="wallWidth"
          defaultValue={100}
          onChange={handleWidthChange}
        />
      </div>
      <div>
        <Label htmlFor="wallHeight">Height (cm)</Label>
        <Input
          type="number"
          id="wallHeight"
          defaultValue={100}
          onChange={handleHeightChange}
        />
      </div>
    </div>
  );
};
