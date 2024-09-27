import React from "react";
import { Position } from "./types/type";

const LINE_LENGTH_FACTOR = 1.7;

export const CustomArrow: React.FC<{ start: Position; end: Position }> = ({
  start,
  end,
}) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const nodeRadius = 36;
  const angle = Math.atan2(dy, dx);

  const adjustedStart = {
    x: start.x + nodeRadius * Math.cos(angle) * LINE_LENGTH_FACTOR + 62,
    y: start.y + nodeRadius * Math.sin(angle) * LINE_LENGTH_FACTOR + 40,
  };

  const adjustedEnd = {
    x: end.x - (nodeRadius + 6) * Math.cos(angle) * LINE_LENGTH_FACTOR + 80,
    y: end.y - (nodeRadius + 6) * Math.sin(angle) * LINE_LENGTH_FACTOR + 40,
  };

  const arrowHeadSize = 12; // Size of the arrowhead
  const path = `M${adjustedStart.x + 13},${adjustedStart.y + 12} L${
    adjustedEnd.x + 12
  },${adjustedEnd.y + 12}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <path d={path} stroke="gray" strokeWidth="2" fill="none" />
      <polygon
        points={`
            ${adjustedEnd.x + 12},${adjustedEnd.y + 12} 
            ${
              adjustedEnd.x + 12 - arrowHeadSize * Math.cos(angle - Math.PI / 6)
            },${
          adjustedEnd.y + 12 - arrowHeadSize * Math.sin(angle - Math.PI / 6)
        } 
            ${
              adjustedEnd.x + 12 - arrowHeadSize * Math.cos(angle + Math.PI / 6)
            },${
          adjustedEnd.y + 12 - arrowHeadSize * Math.sin(angle + Math.PI / 6)
        }
          `}
        fill="gray"
      />
    </svg>
  );
};
