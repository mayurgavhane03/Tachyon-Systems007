import React, { useMemo } from "react";
import { NodeData, Position } from "./types/type";

const NODE_WIDTH = 135;
const NODE_HEIGHT = 85;
const PADDING = 75;


const findPathPoints = (start: Position, end: Position, nodes: NodeData[]): Position[] => {
  const points: Position[] = [];
  
  // Start point
  points.push({ x: start.x + NODE_WIDTH, y: start.y + NODE_HEIGHT / 2 });
  
  // Determine if we need to go up or down
  const goingDown = end.y > start.y;
  
  // First bend
  let currentX = start.x + NODE_WIDTH + PADDING;

  let currentY = goingDown 
    ? Math.max(...nodes.map(n => (n.position?.y ?? 0) + NODE_HEIGHT)) + PADDING
    : Math.min(...nodes.map(n => (n.position?.y ?? 0))) - PADDING;

  points.push({ x: currentX, y: currentY });
  
  // Go towards end X
  currentX = end.x - PADDING;
  points.push({ x: currentX, y: currentY });
  
  // Final bend towards end node
  points.push({ x: currentX, y: end.y + NODE_HEIGHT / 2 });
  
  // End point
  points.push({ x: end.x, y: end.y + NODE_HEIGHT / 2 });
  
  return points;
};

export const CurveNonOverlappingArrows: React.FC<{ start: Position; end: Position; nodes: NodeData[] }> = ({
  start,
  end,
  nodes
}) => {
  const pathPoints = useMemo(() => findPathPoints(start, end, nodes), [start, end, nodes]);
  
  const pathData = useMemo(() => {
    return pathPoints.map((point, index) => 
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x+20} ${point.y-10}`
    ).join(' ');
  }, [pathPoints]);

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="6"
          refY="3.5 "
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="gray" />
        </marker>
      </defs>
      
      <path
        d={pathData}
        stroke="gray"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default CurveNonOverlappingArrows;