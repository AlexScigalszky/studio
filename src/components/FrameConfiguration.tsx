"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface FrameConfigurationProps {
  setFrameDimensions: (dimensions: {
    width: number;
    height: number;
    depth: number;
    hangerDistance: number[];
  }) => void;
  setHangerType: (type: string) => void;
}

export const FrameConfiguration: React.FC<FrameConfigurationProps> = ({
  setFrameDimensions,
  setHangerType,
}) => {
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(15);
  const [depth, setDepth] = useState<number>(2);
  const [hanger, setHanger] = useState<string>("");
  const [hangerDistances, setHangerDistances] = useState<string>("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      // Validate the input values
      if (width <= 0 || height <= 0 || depth <= 0) {
          alert("Please enter valid frame dimensions."); // Simple validation
          return;
      }

      // Parse hanger distances from comma-separated string to array of numbers
      const hangerDistanceArray = hangerDistances.split(',').map(Number);

    setFrameDimensions({width, height, depth, hangerDistance: hangerDistanceArray});
    setHangerType(hanger);
  };

  return (
    
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="depth">Depth (cm)</Label>
          <Input
            type="number"
            id="depth"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="hangerDistance">Hanger Distance(s) (cm) - Comma Separated</Label>
          <Input
            type="text"
            id="hangerDistance"
            value={hangerDistances}
            onChange={(e) => setHangerDistances(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hanger">Hanger Type</Label>
          <Input
            type="text"
            id="hanger"
            value={hanger}
            onChange={(e) => setHanger(e.target.value)}
          />
        </div>
        {/*<Button type="submit">Save Frame Configuration</Button>*/}
      </form>
    
  );
};
