import { Edge, NodeData, Position } from "../types/type";

// Helper function to check if a point is inside a rectangle
const isPointInNode = (
  point: Position,
  rectTopLeft: Position,
  rectBottomRight: Position
): boolean => {
  return (
    point.x >= rectTopLeft.x &&
    point.x <= rectBottomRight.x &&
    point.y >= rectTopLeft.y &&
    point.y <= rectBottomRight.y
  );
};

// Helper function to check if a line segment intersects with a rectangle
const doesLineIntersect = (
  lineStart: Position,
  lineEnd: Position,
  rectTopLeft: Position,
  rectBottomRight: Position
): boolean => {
  // Check if either end of the line is inside the rectangle
  if (
    isPointInNode(lineStart, rectTopLeft, rectBottomRight) ||
    isPointInNode(lineEnd, rectTopLeft, rectBottomRight)
  ) {
    return true;
  }

  // Check each edge of the rectangle for intersection with the line segment
  const rectEdges = [
    { start: rectTopLeft, end: { x: rectBottomRight.x, y: rectTopLeft.y } },
    { start: { x: rectBottomRight.x, y: rectTopLeft.y }, end: rectBottomRight },
    { start: rectBottomRight, end: { x: rectTopLeft.x, y: rectBottomRight.y } },
    { start: { x: rectTopLeft.x, y: rectBottomRight.y }, end: rectTopLeft },
  ];

  for (const edge of rectEdges) {
    if (doLineSegmentsIntersect(lineStart, lineEnd, edge.start, edge.end)) {
      return true;
    }
  }

  return false;
};

// Helper function to check if two line segments intersect
const doLineSegmentsIntersect = (
  line1Start: Position,
  line1End: Position,
  line2Start: Position,
  line2End: Position
): boolean => {
  const det =
    (line1End.x - line1Start.x) * (line2End.y - line2Start.y) -
    (line2End.x - line2Start.x) * (line1End.y - line1Start.y);
  if (det === 0) {
    return false; // Lines are parallel
  } else {
    const lambda =
      ((line2End.y - line2Start.y) * (line2End.x - line1Start.x) +
        (line2Start.x - line2End.x) * (line2End.y - line1Start.y)) /
      det;
    const gamma =
      ((line1Start.y - line1End.y) * (line2End.x - line1Start.x) +
        (line1End.x - line1Start.x) * (line2End.y - line1Start.y)) /
      det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
};

// Main function to check if an edge overlaps with any node
const isEdgeOverlappingNodes = (edge: Edge, nodes: NodeData[]): boolean => {
  const { source, target } = edge;
  const lineStart = source?.position ?? { x: 0, y: 0 };
  const lineEnd = target?.position ?? { x: 0, y: 0 };

  // Assuming each node is represented by a rectangle with width and height of 100
  const nodeSize = 100;

  for (const node of nodes) {
    if (node.id === source.id || node.id === target.id) {
      continue; // Skip source and target nodes
    }

    const nodeTopLeft = {
      x: (node.position?.x ?? 0) - nodeSize / 2,
      y: (node.position?.y ?? 0) - nodeSize / 2,
    };
    const nodeBottomRight = {
      x: (node.position?.x ?? 0) + nodeSize / 2,
      y: (node.position?.y ?? 0) + nodeSize / 2,
    };

    if (doesLineIntersect(lineStart, lineEnd, nodeTopLeft, nodeBottomRight)) {
      return true; // Edge overlaps with this node
    }
  }

  return false; // Edge doesn't overlap with any node
};

export { isEdgeOverlappingNodes };
