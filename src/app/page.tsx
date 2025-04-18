"use client";

import React, {useState, useEffect} from 'react';
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {Toaster} from "@/components/ui/toaster";
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {Sidebar } from "@/components/ui/sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import {DistributionSelection} from "@/components/DistributionSelection";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Home() {
  const [frameDimensions, setFrameDimensions] = useState({width: 10, height: 15, depth: 2, hangerDistance: [2]});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 100, height: 100});
  const [selectedDistribution, setSelectedDistribution] = useState("Vertical Stack");
  const [holePositions, setHolePositions] = useState<{x: number; y: number;}[]>([]);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar side="right" className="w-1/4 border-l">
            <ScrollArea className="h-screen">
          <div className="m-4">
            <h2 className="text-lg font-semibold mb-2">Frame Configuration</h2>
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
            />
          </div>
          <div className="m-4">
            <h2 className="text-lg font-semibold mb-2">Wall Dimensions</h2>
            <WallAreaDefinition
              setWallDimensions={setWallDimensions}
            />
          </div>
          <div className="m-4">
            <h2 className="text-lg font-semibold mb-2">Distribution</h2>
            <DistributionSelection
              setSelectedDistribution={setSelectedDistribution}
            />
          </div>
            </ScrollArea>
        </Sidebar>
        <div className="flex-1 p-4 md:p-8 w-3/4">
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
    </SidebarProvider>
  );
}
