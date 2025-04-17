"use client";

import React, {useState, useEffect} from 'react';
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {DistributionSelection} from "@/components/DistributionSelection";
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {Card} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Toaster} from "@/components/ui/toaster";
import {useSearchParams, useRouter} from 'next/navigation';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {Label} from "@/components/ui/label";

export default function Home() {
  const [frameDimensions, setFrameDimensions] = useState({width: 10, height: 15, depth: 2, hangerDistance: [2]});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 100, height: 100});
  const [selectedDistribution, setSelectedDistribution] = useState("Vertical Stack");
  const [holePositions, setHolePositions] = useState<{x: number; y: number;}[]>([]);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-80 border-r flex-none p-4">
          <SidebarHeader>
            <Label>Frame Configuration</Label>
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
            />
          </SidebarHeader>
          <SidebarHeader>
            <Label>Wall Dimensions</Label>
            <WallAreaDefinition setWallDimensions={setWallDimensions} />
          </SidebarHeader>
          <SidebarHeader>
            <Label>Distribution</Label>
            <DistributionSelection setSelectedDistribution={setSelectedDistribution} />
          </SidebarHeader>
        </Sidebar>

        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Preview</h1>
          <VisualPlacementPreview
            frameDimensions={frameDimensions}
            wallDimensions={wallDimensions}
            selectedDistribution={selectedDistribution}
            holePositions={holePositions}
            setHolePositions={setHolePositions}
          />
          {/*<Toaster />*/}
        </div>
      </div>
    </SidebarProvider>
  );
}
