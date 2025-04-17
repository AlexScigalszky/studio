"use client";

import {useState} from "react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

interface DistributionSelectionProps {
  setSelectedDistribution: (distribution: string) => void;
  onValid: () => void;
}

export const DistributionSelection: React.FC<DistributionSelectionProps> = ({setSelectedDistribution, onValid}) => {
  const [distribution, setDistribution] = useState<string>("vertical");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distribution) {
      toast({
        title: "Error!",
        description: "Please select a distribution.",
        variant: "destructive",
      });
      return;
    }
    setSelectedDistribution(distribution);
    toast({
      title: "Success!",
      description: "Distribution selected.",
    });
    onValid();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label>Select Distribution</Label>
        <RadioGroup defaultValue={distribution} onValueChange={setDistribution}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical" id="vertical" />
              <Label htmlFor="vertical">Vertical Stack</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal Row</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Square Grid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diagonal" id="diagonal" />
              <Label htmlFor="diagonal">Diagonal Line</Label>
            </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triangle" id="triangle"/>
                  <Label htmlFor="triangle">Triangular Arrangement</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staircase" id="staircase"/>
                  <Label htmlFor="staircase">Staircase Pattern</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fancy1" id="fancy1"/>
                  <Label htmlFor="fancy1">Overlapping Frames</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fancy2" id="fancy2"/>
                  <Label htmlFor="fancy2">Top Cluster</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scattered" id="scattered"/>
                  <Label htmlFor="scattered">Scattered Display</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="centered" id="centered"/>
                  <Label htmlFor="centered">Centered Composition</Label>
              </div>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Select Distribution</Button>
    </form>
  );
};
