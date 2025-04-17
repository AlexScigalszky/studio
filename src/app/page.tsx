"use client";

import React, {useState, useEffect} from 'react';
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {Toaster} from "@/components/ui/toaster";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {DistributionSelection} from "@/components/DistributionSelection";

export default function Home() {
  const [frameDimensions, setFrameDimensions] = useState({width: 10, height: 15, depth: 2, hangerDistance: [2]});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 100, height: 100});
  const [selectedDistribution, setSelectedDistribution] = useState("Vertical Stack");
  const [holePositions, setHolePositions] = useState<{x: number; y: number;}[]>([]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="w-80 border-r flex-shrink-0">
          <SidebarHeader>
            <h2>Frame Configuration</h2>
          </SidebarHeader>
          <SidebarContent>
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
            />
            <WallAreaDefinition
              setWallDimensions={setWallDimensions}
            />
            <DistributionSelection
              setSelectedDistribution={setSelectedDistribution}
            />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4">
          <VisualPlacementPreview
            frameDimensions={frameDimensions}
            wallDimensions={wallDimensions}
            selectedDistribution={selectedDistribution}
            holePositions={holePositions}
            setHolePositions={setHolePositions}
          />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
