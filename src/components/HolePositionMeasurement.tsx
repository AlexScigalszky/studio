"use client";

interface HolePositionMeasurementProps {
  holePositions: { x: number; y: number }[];
}

export const HolePositionMeasurement: React.FC<HolePositionMeasurementProps> = ({
  holePositions,
}) => {
  return (
    <div>
      <p>Hole Position Measurements:</p>
      {holePositions.length === 0 ? (
        <p>No hole positions available.</p>
      ) : (
        <ul>
          {holePositions.map((pos, index) => (
            <li key={index}>
              Hole {index + 1}: X = {pos.x} cm, Y = {pos.y} cm
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
