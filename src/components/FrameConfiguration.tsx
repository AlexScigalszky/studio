'use client';

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";

type FrameDimensions = {
  width: number;
  height: number;
  depth: number;
  hangerDistance: number[];
};

interface FrameConfigurationProps {
  setFrameDimensions: (
    dimensions: ((prev: FrameDimensions) => FrameDimensions)
  ) => void;
  setHangerType: (type: string) => void;
}

export const FrameConfiguration: React.FC<FrameConfigurationProps> = ({
  setFrameDimensions,
  setHangerType,
}) => {
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(15);
  const [depth, setDepth] = useState<number>(2);
  const [hangerDistance, setHangerDistance] = useState<string>("2");
  const [hangerType, setHanger] = useState<string>("");

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    setFrameDimensions((prev: FrameDimensions) => ({ ...prev, width: newWidth }));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    setFrameDimensions((prev: FrameDimensions) => ({ ...prev, height: newHeight }));
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDepth = Number(e.target.value);
    setDepth(newDepth);
    setFrameDimensions((prev: FrameDimensions) => ({ ...prev, depth: newDepth }));
  };

  const handleHangerDistanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHangerDistance = e.target.value;
    setHangerDistance(newHangerDistance);
    const hangerDistances = e.target.value.split(',').map((str) => Number(str));
    setFrameDimensions((prev: FrameDimensions) => ({
      ...prev,
      hangerDistance: hangerDistances,
    }));
  };

  const handleHangerTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHanger(e.target.value);
    setHangerType(e.target.value);
  };

  return (
    <div className="grid gap-4">
      <div className="flex space-x-4">
        <div>
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            type="number"
            id="width"
            value={width}
            onChange={handleWidthChange}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="depth">Depth (cm)</Label>
        <Input
          type="number"
          id="depth"
          value={depth}
          onChange={handleDepthChange}
        />
      </div>
      <div>
        <Label htmlFor="hangerDistance">
          Hanger Distance(s) (cm) - Comma Separated
        </Label>
        <Input
          type="text"
          id="hangerDistance"
          value={hangerDistance}
          onChange={handleHangerDistanceChange}
        />
      </div>
      <div>
        <Label htmlFor="hanger">Hanger Type</Label>
        <Input
          type="text"
          id="hanger"
          value={hangerType}
          onChange={handleHangerTypeChange}
        />
      </div>
    </div>
  );
};
