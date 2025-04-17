"use client";

import {useEffect, useState} from "react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {HolePositionMeasurement} from "@/components/HolePositionMeasurement";

interface VisualPlacementPreviewProps {
  frameDimensions: {
    width: number;
    height: number;
    depth: number;
    hangerDistance: number[];
  };
  wallDimensions: {width: number; height: number};
  selectedDistribution: string;
  holePositions: {x: number; y: number}[];
  setHolePositions: (positions: {x: number; y: number}[]) => void;
}

export const VisualPlacementPreview: React.FC<VisualPlacementPreviewProps> = ({
  frameDimensions,
  wallDimensions,
  selectedDistribution,
  holePositions,
  setHolePositions,
}) => {
  const [framePositions, setFramePositions] = useState<{x: number; y: number; id: number}[]>(
    []
  );
  const [holePositionsCalculated, setHolePositionsCalculated] = useState<
    {x: number; y: number}[]
  >([]); // Renamed state variable

  useEffect(() => {
    // Calculate frame positions based on selected distribution and dimensions
    const calculatePositions = () => {
      const positions: {x: number; y: number; id: number}[] = [];
      if (selectedDistribution === "vertical") {
        // Example: Vertical distribution - frames stacked vertically in the center
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.8);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
        const frameSpacing = 10; // Space between frames

        const totalFramesHeight = frameHeight * 2 + frameSpacing;
        const startY = (wallDimensions.height - totalFramesHeight) / 2;
        const startX = (wallDimensions.width - frameWidth) / 2;

        positions.push({x: startX, y: startY, id: 1});
        positions.push({x: startX, y: startY + frameHeight + frameSpacing, id: 2});
      } else if (selectedDistribution === "horizontal") {
        // Example: Horizontal distribution - frames side by side in the center
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.8);
        const frameSpacing = 10; // Space between frames

        const totalFramesWidth = frameWidth * 2 + frameSpacing;
        const startX = (wallDimensions.width - totalFramesWidth) / 2;
        const startY = (wallDimensions.height - frameHeight) / 2;

        positions.push({x: startX, y: startY, id: 1});
        positions.push({x: startX + frameWidth + frameSpacing, y: startY, id: 2});
      } else if (selectedDistribution === "grid") {
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
      } else if (selectedDistribution === "diagonal") {
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
        const frameSpacing = 10;

        const startX = (wallDimensions.width - (2 * frameWidth + frameSpacing)) / 2;
        const startY = (wallDimensions.height - (2 * frameHeight + frameSpacing)) / 2;

        // Diagonal distribution: Top-left to Bottom-right
        positions.push({x: startX, y: startY, id: 1});
        positions.push({
          x: startX + frameWidth + frameSpacing,
          y: startY + frameHeight + frameSpacing,
          id: 2,
        });
      } else if (selectedDistribution === "triangle") {
        // Triangle distribution: One at the top, two at the bottom
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.3);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.3);
        const frameSpacing = 10;

        const startX = wallDimensions.width / 2 - frameWidth / 2;
        const startY = wallDimensions.height * 0.2;

        positions.push({ x: startX, y: startY, id: 1 }); // Top frame

        const bottomStartY = wallDimensions.height * 0.6;
        const bottomStartX = wallDimensions.width / 4 - frameWidth / 2;
        positions.push({ x: bottomStartX, y: bottomStartY, id: 2 }); // Bottom left frame
        positions.push({ x: wallDimensions.width * 0.75 - frameWidth / 2, y: bottomStartY, id: 3 }); // Bottom right frame
      } else if (selectedDistribution === "staircase") {
        // Staircase distribution: Frames diagonally increasing in height
        const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.3);
        const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.3);
        const frameSpacing = 10;

        let currentX = wallDimensions.width * 0.2;
        let currentY = wallDimensions.height * 0.2;

        positions.push({ x: currentX, y: currentY, id: 1 });

        currentX += frameWidth + frameSpacing;
        currentY += frameHeight + frameSpacing;
        positions.push({ x: currentX, y: currentY, id: 2 });

        currentX += frameWidth + frameSpacing;
        currentY += frameHeight + frameSpacing;
        positions.push({ x: currentX, y: currentY, id: 3 });
      } else if (selectedDistribution === "fancy1") {
          // Fancy distribution 1: Overlapping frames
          const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
          const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
          const frameSpacing = -15; // Negative spacing for overlap

          const startX = wallDimensions.width / 2 - frameWidth / 2;
          const startY = wallDimensions.height / 2 - frameHeight / 2;

          positions.push({ x: startX, y: startY, id: 1 });
          positions.push({ x: startX + frameSpacing, y: startY + frameSpacing, id: 2 });
      } else if (selectedDistribution === "fancy2") {
          // Fancy distribution 2: Cluster at the top
          const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.3);
          const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.3);
          const frameSpacing = 5;

          const startX = wallDimensions.width / 3 - frameWidth / 2;
          const startY = wallDimensions.height * 0.1;

          positions.push({ x: startX, y: startY, id: 1 });
          positions.push({ x: startX + frameWidth + frameSpacing, y: startY, id: 2 });
          positions.push({ x: wallDimensions.width / 2 - frameWidth / 2, y: startY + frameHeight + frameSpacing, id: 3 });
      } else if (selectedDistribution === "scattered") {
        // Scattered distribution: Random positions
        const numFrames = 4;
        for (let i = 0; i < numFrames; i++) {
          const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.3);
          const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.3);
          const startX = Math.random() * (wallDimensions.width - frameWidth);
          const startY = Math.random() * (wallDimensions.height - frameHeight);
          positions.push({ x: startX, y: startY, id: i + 1 });
        }
      } else if (selectedDistribution === "centered") {
          // Centered distribution: Frames arranged around the center
          const frameWidth = Math.min(frameDimensions.width, wallDimensions.width * 0.4);
          const frameHeight = Math.min(frameDimensions.height, wallDimensions.height * 0.4);
          const frameSpacing = 10;

          const startX = wallDimensions.width / 2 - frameWidth / 2;
          const startY = wallDimensions.height / 2 - frameHeight / 2;

          positions.push({ x: startX, y: startY - frameHeight - frameSpacing, id: 1 }); // Top
          positions.push({ x: startX, y: startY + frameHeight + frameSpacing, id: 2 }); // Bottom
          positions.push({ x: startX - frameWidth - frameSpacing, y: startY, id: 3 }); // Left
          positions.push({ x: startX + frameWidth + frameSpacing, y: startY, id: 4 }); // Right
      }


      setFramePositions(positions);

      //Basic logic to derive hole positions
      interface HolePosition {
          x: number;
          y: number;
          frameId: any;
          hangerIndex: number;
      }
      const calculatedHolePositions: HolePosition[] = [];
        positions.forEach((frame) => {
            frameDimensions.hangerDistance.forEach((distance, index) => {
                calculatedHolePositions.push({
                    x: frame.x + frameDimensions.width / 2,
                    y: frame.y + distance,
                    frameId: frame.id,
                    hangerIndex: index + 1,
                });
            });
        });

      setHolePositionsCalculated(calculatedHolePositions);
      setHolePositions(calculatedHolePositions);
    };

    if (
      frameDimensions.width > 0 &&
      frameDimensions.height > 0 &&
      wallDimensions.width > 0 &&
      wallDimensions.height > 0 &&
      selectedDistribution
    ) {
      calculatePositions();
    }
  }, [frameDimensions, wallDimensions, selectedDistribution, setHolePositions]);

  return (
    <div className="w-full">
      <p className="mb-2">
        Visual Placement Preview: Frame Dimensions - Width:{frameDimensions.width}, Height:
        {frameDimensions.height}, Depth:{frameDimensions.depth}, Wall Dimensions - Width:
        {wallDimensions.width}, Height:{wallDimensions.height}, Distribution: {selectedDistribution}
      </p>
      {wallDimensions.width > 0 && wallDimensions.height > 0 ? (
        <>
          <TransformWrapper
              defaultScale={1}
              limitToBounds={false}
              minScale={0.5}
              maxScale={3}
              wheel={{disabled: false}}
              pan={{disabled: false}}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className="flex justify-center space-x-4 mb-2">
                  <button onClick={() => zoomIn()} className="px-4 py-2 bg-gray-200 rounded">
                    Zoom In
                  </button>
                  <button onClick={() => zoomOut()} className="px-4 py-2 bg-gray-200 rounded">
                    Zoom Out
                  </button>
                  <button onClick={() => resetTransform()} className="px-4 py-2 bg-gray-200 rounded">
                    Reset
                  </button>
                </div>
                <TransformComponent>
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
                         {frameDimensions.hangerDistance.map((distance, index) => (
                          // Display hole position
                          <text
                              key={`hole-text-${pos.id}-${index}`}
                              x={pos.x + frameDimensions.width / 2}
                              y={pos.y + distance}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="2"
                              fill="black"
                          >
                              Hole {index + 1} at ({(pos.x + frameDimensions.width / 2).toFixed(1)},
                              {(pos.y + distance).toFixed(1)}) cm
                          </text>
                          ))}
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
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          <HolePositionMeasurement holePositions={holePositionsCalculated} />
        </>
      ) : (
        <p>Please define wall dimensions to see the preview.</p>
      )}
    </div>
  );
};
