"use client";

import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

interface DistributionSelectionProps {
  setSelectedDistribution: (distribution: string) => void;
}

const distributionImages: { [key: string]: React.ReactNode } = {
  "Vertical Stack": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="5" y="15" width="14" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
  ),
  "Horizontal Row": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="7" height="14" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="15" y="5" width="7" height="14" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
  ),
  "Square Grid": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="15" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="2" y="15" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="15" y="15" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
  ),
  "Diagonal Line": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/>
      <rect x="2" y="2" width="5" height="5" fill="currentColor"/>
      <rect x="17" y="17" width="5" height="5" fill="currentColor"/>
    </svg>
  ),
  "Triangular Arrangement": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Staircase Pattern": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17H7L7 13H11L11 9H15L15 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Overlapping Frames": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="12" height="12" stroke="currentColor" strokeWidth="2"/>
      <rect x="9" y="9" width="12" height="12" stroke="currentColor" strokeWidth="2"/>
    </svg>

  ),
  "Top Cluster": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="15" y="2" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
      <rect x="8.5" y="15" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
  ),
  "Scattered Display": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="17" y="2" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="10" y="17" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="2" y="17" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  "Centered Composition": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.5" y="8.5" width="7" height="7" stroke="currentColor" strokeWidth="2" rx="1"/>
    </svg>
  ),
  "Chaotic Cascade": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="4" height="4" stroke="currentColor" strokeWidth="2"/>
          <rect x="10" y="7" width="4" height="4" stroke="currentColor" strokeWidth="2"/>
          <rect x="17" y="3" width="4" height="4" stroke="currentColor" strokeWidth="2"/>
          <rect x="6" y="17" width="4" height="4" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="17" width="4" height="4" stroke="currentColor" strokeWidth="2"/>
      </svg>
  ),
  "Spiral Out": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="6" r="1" fill="currentColor"/>
          <circle cx="12" cy="18" r="1" fill="currentColor"/>
          <circle cx="18" cy="12" r="1" fill="currentColor"/>
          <circle cx="6" cy="12" r="1" fill="currentColor"/>
      </svg>
  ),
  "Random": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="17" y="2" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="10" y="17" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
};

export const DistributionSelection: React.FC<DistributionSelectionProps> = ({setSelectedDistribution}) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label>Select Distribution</Label>
        <RadioGroup onValueChange={setSelectedDistribution}>
          <div className="flex flex-col space-y-2">
            {Object.entries(distributionImages).map(([distribution, image]) => (
              <div className="flex items-center space-x-2" key={distribution}>
                <RadioGroupItem value={distribution} id={distribution} />
                <Label htmlFor={distribution} className="flex items-center space-x-2">
                  <span>{distribution}</span>
                  {image}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
