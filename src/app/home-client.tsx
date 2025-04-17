"use client";

import {useState} from "react";
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {DistributionSelection} from "@/components/DistributionSelection";
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {Card} from "@/components/ui/card";
import {Toaster} from "@/components/ui/toaster";

export default function HomeClient() {
  const [frameDimensions, setFrameDimensions] = useState({width: 10, height: 15, depth: 2, hangerDistance: [2]});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 100, height: 100});
  const [selectedDistribution, setSelectedDistribution] = useState("Vertical Stack");
  const [holePositions, setHolePositions] = useState<{x: number; y: number;}[]>([]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">FrameIt</h1>
      <div className="flex h-screen bg-background">
        <div className="w-1/4 p-4 border-r">
          <Card className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Frame Configuration</h2>
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
            />
          </Card>
          <Card className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Wall Dimensions</h2>
            <WallAreaDefinition
              setWallDimensions={setWallDimensions}
            />
          </Card>
          <Card className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Distribution</h2>
            <DistributionSelection
              setSelectedDistribution={setSelectedDistribution}
            />
          </Card>
        </div>
        <div className="flex-1 p-4 md:p-8">
          <VisualPlacementPreview
            frameDimensions={frameDimensions}
            wallDimensions={wallDimensions}
            selectedDistribution={selectedDistribution}
            holePositions={holePositions}
            setHolePositions={setHolePositions}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
