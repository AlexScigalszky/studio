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
  const [frameTabComplete, setFrameTabComplete] = useState(false);
  const [wallTabComplete, setWallTabComplete] = useState(false);
  const [distributionTabComplete, setDistributionTabComplete] = useState(false);

  useEffect(() => {
    const tabFromParams = searchParams.get('tab');
    if (tabFromParams) {
      setActiveTab(tabFromParams);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', tab);
    router.push(`/?${newParams.toString()}`, { shallow: true });
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">FrameIt</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="frame" disabled={false}>Frame</TabsTrigger>
          <TabsTrigger value="wall" disabled={!frameTabComplete}>Wall</TabsTrigger>
          <TabsTrigger value="distribution" disabled={!wallTabComplete}>Distribution</TabsTrigger>
          <TabsTrigger value="preview" disabled={!distributionTabComplete}>Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="frame">
          <Card className="mb-4">
            <FrameConfiguration
              setFrameDimensions={setFrameDimensions}
              setHangerType={setHangerType}
              onValid={() => {
                setFrameTabComplete(true);
                handleTabChange("wall");
              }}
            />
          </Card>
        </TabsContent>
        <TabsContent value="wall">
          <Card className="mb-4">
            <WallAreaDefinition
              setWallDimensions={setWallDimensions}
              onValid={() => {
                setWallTabComplete(true);
                handleTabChange("distribution");
              }}
            />
          </Card>
        </TabsContent>
        <TabsContent value="distribution">
          <Card className="mb-4">
            <DistributionSelection
              setSelectedDistribution={setSelectedDistribution}
              onValid={() => {
                setDistributionTabComplete(true);
                handleTabChange("preview");
              }}
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
