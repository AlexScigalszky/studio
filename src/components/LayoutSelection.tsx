"use client";

import {useState} from "react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

interface LayoutSelectionProps {
  setSelectedLayout: (layout: string) => void;
}

export const LayoutSelection: React.FC<LayoutSelectionProps> = ({setSelectedLayout}) => {
  const [layout, setLayout] = useState<string>("");
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
    router.push("/?tab=preview");
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
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Select Layout</Button>
    </form>
  );
};
