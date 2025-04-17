"use client";

import {useState, useEffect} from "react";
import {FrameConfiguration} from "@/components/FrameConfiguration";
import {WallAreaDefinition} from "@/components/WallAreaDefinition";
import {DistributionSelection} from "@/components/DistributionSelection";
import {VisualPlacementPreview} from "@/components/VisualPlacementPreview";
import {Card} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Toaster} from "@/components/ui/toaster";
import {useSearchParams, useRouter} from 'next/navigation';

export default function HomeClient() {
  const [frameDimensions, setFrameDimensions] = useState({width: 10, height: 15, depth: 2, hangerDistance: [2]});
  const [hangerType, setHangerType] = useState("");
  const [wallDimensions, setWallDimensions] = useState({width: 100, height: 100});
  const [selectedDistribution, setSelectedDistribution] = useState("vertical");
  const [holePositions, setHolePositions] = useState<{x: number; y: number;}[]>([]);
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<string>(tab || "frame");
    const router = useRouter();

    useEffect(() => {
        // Update activeTab state when the 'tab' search parameter changes
        const tabFromParams = searchParams.get('tab');
        if (tabFromParams) {
            setActiveTab(tabFromParams);
        }
    }, [searchParams]);

    const handleTabChange = (tab: string) => {
        // Update the URL and activeTab state
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('tab', tab);
        router.push(`/?${newParams.toString()}`, { shallow: true }); // Use shallow routing to avoid full page reload
        setActiveTab(tab);
    };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">FrameIt</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="frame">Frame</TabsTrigger>
          <TabsTrigger value="wall">Wall</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="frame">
          <Card className="mb-4">
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
              onNext={() => handleTabChange("wall")}
            />
          </Card>
        </TabsContent>
        <TabsContent value="wall">
          <Card className="mb-4">
            <WallAreaDefinition
                setWallDimensions={setWallDimensions}
                onNext={() => handleTabChange("distribution")}
            />
          </Card>
        </TabsContent>
        <TabsContent value="distribution">
          <Card className="mb-4">
            <DistributionSelection
              setSelectedDistribution={setSelectedDistribution}
              onNext={() => handleTabChange("preview")}
            />
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card className="mb-4">
            <VisualPlacementPreview
              frameDimensions={frameDimensions}
              wallDimensions={wallDimensions}
              selectedDistribution={selectedDistribution}
              holePositions={holePositions}
              setHolePositions={setHolePositions}
            />
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
