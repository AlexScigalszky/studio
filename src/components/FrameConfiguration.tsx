"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";

interface FrameConfigurationProps {
  setFrameDimensions: (dimensions: { width: number; height: number; depth: number }) => void;
  setHangerType: (type: string) => void;
}

export const FrameConfiguration: React.FC<FrameConfigurationProps> = ({
  setFrameDimensions,
  setHangerType,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  const [hanger, setHanger] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (width <= 0 || height <= 0 || depth <= 0) {
      toast({
        title: "Error!",
        description: "Please enter valid frame dimensions.",
        variant: "destructive",
      });
      return;
    }
    setFrameDimensions({width, height, depth});
    setHangerType(hanger);

    toast({
      title: "Success!",
      description: "Frame configuration saved.",
    });
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
        <Label htmlFor="hanger">Hanger Type</Label>
        <Input
          type="text"
          id="hanger"
          value={hanger}
          onChange={(e) => setHanger(e.target.value)}
        />
      </div>
      <Button type="submit">Save Frame Configuration</Button>
    </form>
  );
};

    