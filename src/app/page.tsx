"use client";

import {useState} from "react";
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {LayoutSelection} from "@/components/LayoutSelection";
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {HolePositionMeasurement} from "@/components/HolePositionMeasurement";
import {Card} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Toaster} from "@/components/ui/toaster";

export default function Home() {
  const [frameDimensions, setFrameDimensions] = useState({width: 0, height: 0, depth: 0});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 0, height: 0});
  const [selectedLayout, setSelectedLayout] = useState("");
  const [holePositions, setHolePositions] = useState([]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">FrameIt</h1>
      <Tabs defaultValue="frame" className="w-full">
        <TabsList>
          <TabsTrigger value="frame">Frame</TabsTrigger>
          <TabsTrigger value="wall">Wall</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
        </TabsList>
        <TabsContent value="frame">
          <Card className="mb-4">
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
            />
          </Card>
        </TabsContent>
        <TabsContent value="wall">
          <Card className="mb-4">
            <WallAreaDefinition setWallDimensions={setWallDimensions} />
          </Card>
        </TabsContent>
        <TabsContent value="layout">
          <Card className="mb-4">
            <LayoutSelection setSelectedLayout={setSelectedLayout} />
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card className="mb-4">
            <VisualPlacementPreview
              frameDimensions={frameDimensions}
              wallDimensions={wallDimensions}
              selectedLayout={selectedLayout}
              setHolePositions={setHolePositions}
            />
          </Card>
        </TabsContent>
        <TabsContent value="measurements">
          <Card className="mb-4">
            <HolePositionMeasurement holePositions={holePositions} />
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
