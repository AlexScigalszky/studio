"use client";

import {useEffect, useState} from "react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

import {Card, CardContent} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

const distributionLabels: { [key: string]: string } = {
    "Vertical Stack": "Vertical Stack",
    "Horizontal Row": "Horizontal Row",
    "Square Grid": "Square Grid",
    "Diagonal Line": "Diagonal Line",
    "Triangular Arrangement": "Triangular Arrangement",
    "Staircase Pattern": "Staircase Pattern",
    "Overlapping Frames": "Overlapping Frames",
    "Top Cluster": "Top Cluster",
    "Scattered Display": "Scattered Display",
    "Centered Composition": "Centered Composition",
    "Chaotic Cascade": "Chaotic Cascade",
    "Spiral Out": "Spiral Out",
    "Random": "Random"
};

// Function to check if two frames overlap
const doFramesOverlap = (
    frame1: { x: number; y: number; width: number; height: number },
    frame2: { x: number; y: number; width: number; height: number }
): boolean => {
    return !(
        frame1.x + frame1.width < frame2.x ||
        frame1.x > frame2.x + frame2.width ||
        frame1.y + frame1.height < frame2.y ||
        frame1.y > frame2.y + frame2.height
    );
};

// Function to adjust frame positions to avoid overlap
const adjustFramePositions = (
    positions: { x: number; y: number; id: number }[],
    frameDimensions: { width: number; height: number }
): { x: number; y: number; id: number }[] => {
    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
        for (let j = i + 1; j < adjustedPositions.length; j++) {
            let frame1 = { ...adjustedPositions[i], width: frameDimensions.width, height: frameDimensions.height };
            let frame2 = { ...adjustedPositions[j], width: frameDimensions.width, height: frameDimensions.height };

            if (doFramesOverlap(frame1, frame2)) {
                // Resolve overlap by moving the second frame
                adjustedPositions[j].x = adjustedPositions[i].x + frameDimensions.width + 5; // Add a small spacing
            }
        }
    }

    return adjustedPositions;
};

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
    {x: number; y: number, frameId: any, hangerIndex: number}[]
  >([]); // Renamed state variable

  useEffect(() => {
    // Calculate frame positions based on selected distribution and dimensions
    const calculatePositions = () => {
      const positions: {x: number; y: number; id: number}[] = [];

      const addFrame = (x: number, y: number, id: number) => {
        positions.push({x, y, id});
      };

      const frameWidth = frameDimensions.width;
      const frameHeight = frameDimensions.height;
      const wallWidth = wallDimensions.width;
      const wallHeight = wallDimensions.height;

        // Calculate maximum number of frames based on wall size
        const maxFrames = Math.floor((wallWidth * wallHeight) / (frameWidth * frameHeight));
        let numFrames = 0;

      if (selectedDistribution === "Vertical Stack") {
          // Example: Vertical distribution - frames stacked vertically in the center
          const frameSpacing = 10; // Space between frames
          numFrames = Math.min(2, maxFrames);

          const totalFramesHeight = frameHeight * numFrames + frameSpacing * (numFrames - 1);
          const startY = (wallHeight - totalFramesHeight) / 2;
          const startX = (wallWidth - frameWidth) / 2;

          for (let i = 0; i < numFrames; i++) {
              addFrame(startX, startY + i * (frameHeight + frameSpacing), i + 1);
          }

      } else if (selectedDistribution === "Horizontal Row") {
          // Example: Horizontal distribution - frames side by side in the center
          const frameSpacing = 10; // Space between frames
          numFrames = Math.min(2, maxFrames);

          const totalFramesWidth = frameWidth * numFrames + frameSpacing * (numFrames - 1);
          const startX = (wallWidth - totalFramesWidth) / 2;
          const startY = (wallHeight - frameHeight) / 2;

          for (let i = 0; i < numFrames; i++) {
              addFrame(startX + i * (frameWidth + frameSpacing), startY, i + 1);
          }


      } else if (selectedDistribution === "Square Grid") {
          numFrames = Math.min(4, maxFrames);
          const frameSpacing = 10;

          const startX = (wallWidth - (2 * frameWidth + frameSpacing)) / 2;
          const startY = (wallHeight - (2 * frameHeight + frameSpacing)) / 2;

          if(numFrames >= 1) addFrame(startX, startY, 1)
          if(numFrames >= 2) addFrame(startX + frameWidth + frameSpacing, startY, 2)
          if(numFrames >= 3) addFrame(startX, startY + frameHeight + frameSpacing, 3)
          if(numFrames >= 4) addFrame(startX + frameWidth + frameSpacing, startY + frameHeight + frameSpacing, 4)


      } else if (selectedDistribution === "Diagonal Line") {
          numFrames = Math.min(2, maxFrames);
          const frameSpacing = 10;

          const startX = (wallWidth - (2 * frameWidth + frameSpacing)) / 2;
          const startY = (wallHeight - (2 * frameHeight + frameSpacing)) / 2;

          // Diagonal distribution: Top-left to Bottom-right
          if(numFrames >= 1) addFrame(startX, startY, 1)
          if(numFrames >= 2) addFrame(startX + frameWidth + frameSpacing, startY + frameHeight + frameSpacing, 2)
      } else if (selectedDistribution === "Triangular Arrangement") {
          numFrames = Math.min(3, maxFrames);
          // Triangle distribution: One at the top, two at the bottom
          const frameSpacing = 10;

          const startX = wallWidth / 2 - frameWidth / 2;
          const startY = wallHeight * 0.2;
          if(numFrames >= 1) addFrame(startX, startY, 1) // Top frame

          const bottomStartY = wallHeight * 0.6;
          const bottomStartX = wallWidth / 4 - frameWidth / 2;
          const bottomEndX = wallWidth * 0.75 - frameWidth / 2;
          if(numFrames >= 2) addFrame(bottomStartX, bottomStartY, 2)
          if(numFrames >= 3) addFrame(bottomEndX, bottomStartY, 3) // Bottom right frame
      } else if (selectedDistribution === "Staircase Pattern") {
          numFrames = Math.min(3, maxFrames);
          // Staircase distribution: Frames diagonally increasing in height
          const frameSpacing = 10;

          let currentX = wallWidth * 0.2;
          let currentY = wallHeight * 0.2;

          if(numFrames >= 1) addFrame(currentX, currentY, 1)

          currentX += frameWidth + frameSpacing;
          currentY += frameHeight + frameSpacing;
          if(numFrames >= 2) addFrame(currentX, currentY, 2)

          currentX += frameWidth + frameSpacing;
          currentY += frameHeight + frameSpacing;
          if(numFrames >= 3) addFrame(currentX, currentY, 3)
      } else if (selectedDistribution === "Overlapping Frames") {
          numFrames = Math.min(2, maxFrames);
          // Fancy distribution 1: Overlapping frames
          const frameSpacing = -15; // Negative spacing for overlap

          const startX = wallWidth / 2 - frameWidth / 2;
          const startY = wallHeight / 2 - frameHeight / 2;

          if(numFrames >= 1) addFrame(startX, startY, 1)
          if(numFrames >= 2) addFrame(startX + frameSpacing, startY + frameSpacing, 2)
      } else if (selectedDistribution === "Top Cluster") {
          numFrames = Math.min(3, maxFrames);
          // Fancy distribution 2: Cluster at the top
          const frameSpacing = 5;

          const startX = wallWidth / 3 - frameWidth / 2;
          const startY = wallHeight * 0.1;
          if(numFrames >= 1) addFrame(startX, startY, 1)
          if(numFrames >= 2) addFrame(startX + frameWidth + frameSpacing, startY, 2)
          if(numFrames >= 3) addFrame(wallWidth / 2 - frameWidth / 2, startY + frameHeight + frameSpacing, 3)
      } else if (selectedDistribution === "Scattered Display") {
          // Scattered distribution: Random positions
          numFrames = Math.min(4, maxFrames);
          for (let i = 0; i < numFrames; i++) {
              let startX = Math.random() * (wallWidth - frameWidth);
              let startY = Math.random() * (wallHeight - frameHeight);
              addFrame(startX, startY, i + 1)
          }

      } else if (selectedDistribution === "Centered Composition") {
          numFrames = Math.min(4, maxFrames);
          // Centered distribution: Frames arranged around the center
          const frameSpacing = 10;

          const startX = wallWidth / 2 - frameWidth / 2;
          const startY = wallHeight / 2 - frameHeight / 2;
          if(numFrames >= 1) addFrame(startX, startY - frameHeight - frameSpacing, 1)
          if(numFrames >= 2) addFrame(startX, startY + frameHeight + frameSpacing, 2)
          if(numFrames >= 3) addFrame(startX - frameWidth - frameSpacing, startY, 3)
          if(numFrames >= 4) addFrame(startX + frameWidth + frameSpacing, startY, 4) // Right
      } else if (selectedDistribution === "Chaotic Cascade") {
          numFrames = Math.min(5, maxFrames);
          for (let i = 0; i < numFrames; i++) {
              const startX = Math.random() * (wallWidth - frameWidth);
              const startY = Math.random() * (wallHeight - frameHeight);
              const angle = Math.random() * 360; // Random angle for rotation
              addFrame(startX, startY, i + 1);
          }
      } else if (selectedDistribution === "Spiral Out") {
          numFrames = Math.min(6, maxFrames);
          const centerX = wallWidth / 2;
          const centerY = wallHeight / 2;
          for (let i = 0; i < numFrames; i++) {
              const angle = i * (360 / numFrames); // Angle for each frame
              const distance = Math.min(wallWidth, wallHeight) * 0.3 * (i / numFrames); // Distance from the center
              const startX = centerX + distance * Math.cos(angle * Math.PI / 180) - frameWidth / 2;
              const startY = centerY + distance * Math.sin(angle * Math.PI / 180) - frameHeight / 2;
              addFrame(startX, startY, i + 1);
          }
      }  else if (selectedDistribution === "Random") {
            // Scattered distribution: Random positions
            numFrames = Math.min(4, maxFrames);
            for (let i = 0; i < numFrames; i++) {
                let startX = Math.random() * (wallWidth - frameWidth);
                let startY = Math.random() * (wallHeight - frameHeight);
                addFrame(startX, startY, i + 1)
            }

        }

         // Adjust frame positions to prevent overlap
         const adjustedPositions = adjustFramePositions(positions, frameDimensions);
         setFramePositions(adjustedPositions);


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

    const distributionLabel = distributionLabels[selectedDistribution] || selectedDistribution;

  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full">
        {wallDimensions.width > 0 && wallDimensions.height > 0 ? (
          <>
            <TransformWrapper
              limitToBounds={false}
              minScale={0.5}
              maxScale={3}
              wheel={{disabled: false}}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
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
             
          </>
        ) : (
          <p>Please define wall dimensions to see the preview.</p>
        )}
      </div>

        <Card className="w-full" style={{height: "40%"}}>
            <CardContent>
                <p className="mb-2">
                    Visual Placement Preview:
                    <br/>
                    Frame Dimensions - Width: {frameDimensions.width}, Height: {frameDimensions.height}, Depth: {frameDimensions.depth}
                    <br/>
                    Wall Dimensions - Width: {wallDimensions.width}, Height: {wallDimensions.height}
                    <br/>
                    Distribution: {distributionLabel}
                </p>
                <div className="mt-4">
                    <Table>
                        <TableCaption>Hole Position Measurements</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Hole #</TableHead>
                                <TableHead>X (cm)</TableHead>
                                <TableHead>Y (cm)</TableHead>
                                <TableHead>Frame ID</TableHead>
                                <TableHead>Hanger Index</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holePositionsCalculated.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No hole positions available.</TableCell>
                                </TableRow>
                            ) : (
                                holePositionsCalculated.map((pos, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{pos.x.toFixed(1)}</TableCell>
                                        <TableCell>{pos.y.toFixed(1)}</TableCell>
                                        <TableCell>{pos.frameId}</TableCell>
                                        <TableCell>{pos.hangerIndex}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};
