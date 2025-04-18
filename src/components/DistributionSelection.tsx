"use client";

import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

interface DistributionSelectionProps {
  setSelectedDistribution: (distribution: string) => void;
}

const distributionImages: { [key: string]: string } = {
  "Vertical Stack": "https://picsum.photos/id/1015/50/50",
  "Horizontal Row": "https://picsum.photos/id/1016/50/50",
  "Square Grid": "https://picsum.photos/id/1018/50/50",
  "Diagonal Line": "https://picsum.photos/id/1019/50/50",
  "Triangular Arrangement": "https://picsum.photos/id/1020/50/50",
  "Staircase Pattern": "https://picsum.photos/id/1021/50/50",
  "Overlapping Frames": "https://picsum.photos/id/1022/50/50",
  "Top Cluster": "https://picsum.photos/id/1023/50/50",
  "Scattered Display": "https://picsum.photos/id/1024/50/50",
  "Centered Composition": "https://picsum.photos/id/1025/50/50",
  "Chaotic Cascade": "https://picsum.photos/id/1026/50/50",
  "Spiral Out": "https://picsum.photos/id/1027/50/50",
  "Random": "https://picsum.photos/id/1028/50/50",
};

export const DistributionSelection: React.FC<DistributionSelectionProps> = ({setSelectedDistribution}) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label>Select Distribution</Label>
        <RadioGroup onValueChange={setSelectedDistribution}>
          <div className="flex flex-col space-y-2">
            {Object.entries(distributionImages).map(([distribution, imageUrl]) => (
              <div className="flex items-center space-x-2" key={distribution}>
                <RadioGroupItem value={distribution} id={distribution} />
                <Label htmlFor={distribution} className="flex items-center space-x-2">
                  <span>{distribution}</span>
                  <img src={imageUrl} alt={distribution} className="w-6 h-6 rounded-full" />
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
