"use client";

import {useState} from "react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

interface DistributionSelectionProps {
  setSelectedDistribution: (distribution: string) => void;
}

export const DistributionSelection: React.FC<DistributionSelectionProps> = ({setSelectedDistribution}) => {
  const [distribution, setDistribution] = useState<string>("Vertical Stack");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distribution) {
        alert("Please select a distribution.");
        return;
    }
    setSelectedDistribution(distribution);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label>Select Distribution</Label>
        <RadioGroup defaultValue={distribution} onValueChange={setDistribution}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Vertical Stack" id="vertical" />
              <Label htmlFor="vertical">Vertical Stack</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Horizontal Row" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal Row</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Square Grid" id="grid" />
              <Label htmlFor="grid">Square Grid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Diagonal Line" id="diagonal" />
              <Label htmlFor="diagonal">Diagonal Line</Label>
            </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Triangular Arrangement" id="triangle"/>
                  <Label htmlFor="triangle">Triangular Arrangement</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Staircase Pattern" id="staircase"/>
                  <Label htmlFor="staircase">Staircase Pattern</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Overlapping Frames" id="fancy1"/>
                  <Label htmlFor="fancy1">Overlapping Frames</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Top Cluster" id="fancy2"/>
                  <Label htmlFor="fancy2">Top Cluster</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Scattered Display" id="scattered"/>
                  <Label htmlFor="scattered">Scattered Display</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Centered Composition" id="centered"/>
                  <Label htmlFor="centered">Centered Composition</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chaotic Cascade" id="chaotic"/>
                  <Label htmlFor="chaotic">Chaotic Cascade</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Spiral Out" id="spiral"/>
                  <Label htmlFor="spiral">Spiral Out</Label>
              </div>
          </div>
        </RadioGroup>
      </div>
      {/*<Button type="submit">Select Distribution</Button>*/}
    </form>
  );
};
