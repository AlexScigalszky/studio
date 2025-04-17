"use client";

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
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number(e.target.value);
    setFrameDimensions(prev => ({...prev, width}));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    setFrameDimensions(prev => ({...prev, height}));
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth = Number(e.target.value);
    setFrameDimensions(prev => ({...prev, depth}));
  };

  const handleHangerDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hangerDistances = e.target.value.split(',').map(Number);
    setFrameDimensions(prev => ({...prev, hangerDistance: hangerDistances}));
  };

  const handleHangerTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHangerType(e.target.value);
  };

  return (
    
      <div className="grid gap-4">
        <div>
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            type="number"
            id="width"
            defaultValue={10}
            onChange={handleWidthChange}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            type="number"
            id="height"
            defaultValue={15}
            onChange={handleHeightChange}
          />
        </div>
        <div>
          <Label htmlFor="depth">Depth (cm)</Label>
          <Input
            type="number"
            id="depth"
            defaultValue={2}
            onChange={handleDepthChange}
          />
        </div>
        <div>
          <Label htmlFor="hangerDistance">Hanger Distance(s) (cm) - Comma Separated</Label>
          <Input
            type="text"
            id="hangerDistance"
            defaultValue="2"
            onChange={handleHangerDistanceChange}
          />
        </div>
        <div>
          <Label htmlFor="hanger">Hanger Type</Label>
          <Input
            type="text"
            id="hanger"
            defaultValue=""
            onChange={handleHangerTypeChange}
          />
        </div>
      </div>
    
  );
};
