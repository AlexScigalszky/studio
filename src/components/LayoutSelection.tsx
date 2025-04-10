"use client";

import {useState} from "react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

interface LayoutSelectionProps {
  setSelectedLayout: (layout: string) => void;
  onNext: () => void;
}

export const LayoutSelection: React.FC<LayoutSelectionProps> = ({setSelectedLayout, onNext}) => {
  const [layout, setLayout] = useState<string>("vertical");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!layout) {
      toast({
        title: "Error!",
        description: "Please select a layout.",
        variant: "destructive",
      });
      return;
    }
    setSelectedLayout(layout);
    toast({
      title: "Success!",
      description: "Layout selected.",
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label>Select Layout</Label>
        <RadioGroup defaultValue={layout} onValueChange={setLayout}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical" id="vertical" />
              <Label htmlFor="vertical">Vertical</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Grid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diagonal" id="diagonal" />
              <Label htmlFor="diagonal">Diagonal</Label>
            </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triangle" id="triangle"/>
                  <Label htmlFor="triangle">Triangle</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staircase" id="staircase"/>
                  <Label htmlFor="staircase">Staircase</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fancy1" id="fancy1"/>
                  <Label htmlFor="fancy1">Fancy 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fancy2" id="fancy2"/>
                  <Label htmlFor="fancy2">Fancy 2</Label>
              </div>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Select Layout</Button>
    </form>
  );
};
