"use client";

import {useEffect, useState} from "react";

interface VisualPlacementPreviewProps {
  frameDimensions: {
    width: number;
    height: number;
    depth: number;
    hangerDistance: number;
  };
  wallDimensions: {width: number; height: number};
  selectedLayout: string;
  setHolePositions: (positions: {x: number; y: number}[]) => void;
}

export const VisualPlacementPreview: React.FC<VisualPlacementPreviewProps> = ({
  frameDimensions,
  wallDimensions,
  selectedLayout,
  setHolePositions,
}) => {
  const [framePositions, setFramePositions] = useState<{x: number; y: number; id: number}[]>(
    []
  );
  const [holePositionsCalculated, setHolePositionsCalculated] = useState<
    {x: number; y: number}[]
  >([]); // Renamed state variable

  useEffect(() => {
    // Calculate frame positions based on selected layout and dimensions
    const calculatePositions = () => {
      const positions: {x: number; y: number; id: number}[] = [];
      if (selectedLayout === "vertical") {
        // Example: Vertical layout - frames stacked vertically in the center
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.8);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
        const frameSpacing = 10; // Space between frames

        const totalFramesHeight = frameHeight * 2 + frameSpacing;
        const startY = (wallDimensions.height - totalFramesHeight) / 2;
        const startX = (wallDimensions.width - frameWidth) / 2;

        positions.push({x: startX, y: startY, id: 1});
        positions.push({x: startX, y: startY + frameHeight + frameSpacing, id: 2});
      } else if (selectedLayout === "horizontal") {
        // Example: Horizontal layout - frames side by side in the center
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.8);
        const frameSpacing = 10; // Space between frames

        const totalFramesWidth = frameWidth * 2 + frameSpacing;
        const startX = (wallDimensions.width - totalFramesWidth) / 2;
        const startY = (wallDimensions.height - frameHeight) / 2;

        positions.push({x: startX, y: startY, id: 1});
        positions.push({x: startX + frameWidth + frameSpacing, y: startY, id: 2});
      } else if (selectedLayout === "grid") {
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
        const frameSpacing = 10;

        const startX = (wallDimensions.width - (2 * frameWidth + frameSpacing)) / 2;
        const startY = (wallDimensions.height - (2 * frameHeight + frameSpacing)) / 2;

        positions.push({x: startX, y: startY, id: 1});
        positions.push({x: startX + frameWidth + frameSpacing, y: startY, id: 2});
        positions.push({x: startX, y: startY + frameHeight + frameSpacing, id: 3});
        positions.push({
          x: startX + frameWidth + frameSpacing,
          y: startY + frameHeight + frameSpacing,
          id: 4,
        });
      } else if (selectedLayout === "diagonal") {
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
        const frameSpacing = 10;

        const startX = (wallDimensions.width - (2 * frameWidth + frameSpacing)) / 2;
        const startY = (wallDimensions.height - (2 * frameHeight + frameSpacing)) / 2;

        // Diagonal layout: Top-left to Bottom-right
        positions.push({x: startX, y: startY, id: 1});
        positions.push({
          x: startX + frameWidth + frameSpacing,
          y: startY + frameHeight + frameSpacing,
          id: 2,
        });
      }

      setFramePositions(positions);

      //Basic logic to derive hole positions
      const calculatedHolePositions = positions.map((frame) => ({
        x: frame.x + frameDimensions.width / 2, // Example: Center of the frame
        y: frame.y + frameDimensions.hangerDistance, // Use hangerDistance
      }));

      setHolePositionsCalculated(calculatedHolePositions);
      setHolePositions(calculatedHolePositions);
    };

    if (
      frameDimensions.width > 0 &&
      frameDimensions.height > 0 &&
      wallDimensions.width > 0 &&
      wallDimensions.height > 0 &&
      selectedLayout
    ) {
      calculatePositions();
    }
  }, [frameDimensions, wallDimensions, selectedLayout, setHolePositions]);

  return (
    <div className="w-full">
      <p className="mb-2">
        Visual Placement Preview: Frame Dimensions - Width:{frameDimensions.width}, Height:
        {frameDimensions.height}, Depth:{frameDimensions.depth}, Wall Dimensions - Width:
        {wallDimensions.width}, Height:{wallDimensions.height}, Layout: {selectedLayout}
      </p>
      {wallDimensions.width > 0 && wallDimensions.height > 0 ? (
        <svg
          width="100%"
          height="300px" // Reduced height for smaller preview
          viewBox={`0 0 ${wallDimensions.width} ${wallDimensions.height}`}
          style={{border: "1px solid #000", margin: "10px auto", display: "block"}}
        >
          {/* Wall Area */}
          <rect width={wallDimensions.width} height={wallDimensions.height} fill="#f0f0f0" />
          {/* Frames */}
          {framePositions.map((pos) => (
            <g key={pos.id}>
              <rect
                x={pos.x}
                y={pos.y}
                width={frameDimensions.width}
                height={frameDimensions.height}
                fill="lightblue"
                stroke="blue"
              />

              {/* Display hole position */}
              <text
                x={pos.x + frameDimensions.width / 2}
                y={pos.y + frameDimensions.hangerDistance}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="2"
                fill="black"
              >
                Hole at ({(pos.x + frameDimensions.width / 2).toFixed(1)},
                {(pos.y + frameDimensions.hangerDistance).toFixed(1)}) cm
              </text>
            </g>
          ))}
          {/* Draw lines from hole positions to wall edges */}
          {holePositionsCalculated.map((hole, index) => (
            <g key={`hole-lines-${index}`}>
              {/* Line to left edge */}
              <line
                x1={hole.x}
                y1={hole.y}
                x2={0}
                y2={hole.y}
                stroke="gray"
                strokeDasharray="2,2"
              />
              <text x={hole.x / 2} y={hole.y - 1} fontSize="2" textAnchor="middle">
                {(hole.x).toFixed(1)} cm
              </text>
              {/* Line to top edge */}
              <line
                x1={hole.x}
                y1={hole.y}
                x2={hole.x}
                y2={0}
                stroke="gray"
                strokeDasharray="2,2"
              />
              <text x={hole.x} y={hole.y / 2} fontSize="2" textAnchor="middle" transform={`rotate(-90 ${hole.x},${hole.y / 2})`}>
                {(hole.y).toFixed(1)} cm
              </text>
            </g>
          ))}
        </svg>
      ) : (
        <p>Please define wall dimensions to see the preview.</p>
      )}
    </div>
  );
};
