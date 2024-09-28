"use client";
import React, { useState, useEffect } from "react";
import ToolTip from "./ToolTip";
import { Edge, GraphData, NodeData } from "./types/type";
import { Node } from "./Node";
import { CustomArrow } from "./CustomArrow";

 
const FlexibleGraph: React.FC<{ data: GraphData }> = ({ data }) => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  console.log(edges.length);
  useEffect(() => {
    // Process the nodes and edges from the graph data
    const processedNodes: NodeData[] = [];
    const processedEdges: Edge[] = [];

    const nodeLayers: NodeData[][] = [];
    const singleNodes: NodeData[] = [];
    const nodeSpacingX = 160;
    const nodeSpacingY = 200;

    data.nodes.forEach((node) => {
      if (node.prev || node.next) {
        const layerIndex = node.prev
          ? nodeLayers.findIndex((layer) =>
              layer.some((n) => n.id === node.prev)
            ) + 1
          : 0;
        if (!nodeLayers[layerIndex]) nodeLayers[layerIndex] = [];
        nodeLayers[layerIndex].push(node);
      } else {
        singleNodes.push(node);
      }
    });

    const maxNodesInLayer = Math.max(
      ...nodeLayers.map((layer) => layer.length),
      singleNodes.length
    );

    nodeLayers.forEach((layer, layerIndex) => {
      const layerHeight = (maxNodesInLayer - 1) * nodeSpacingX;
      layer.forEach((node, nodeIndex) => {
        if (node.type === "user") {
          processedNodes.push({
            ...node,
            position: {
              x: layerIndex * nodeSpacingY,
              y:
                layerHeight / 1.07 -
                ((layer.length - 1) * nodeSpacingX) / 2 +
                nodeIndex * nodeSpacingX,
            },
          });
        } else {
          processedNodes.push({
            ...node,
            position: {
              x: layerIndex * nodeSpacingY,
              y:
                layerHeight / 2 -
                ((layer.length - 1) * nodeSpacingX) / 200 +
                nodeIndex * nodeSpacingX,
            },
          });
        }
      });
    });

    const singleNodeColumnX = nodeLayers.length * nodeSpacingY;
    singleNodes.forEach((node, index) => {
      processedNodes.push({
        ...node,
        position: {
          x: singleNodeColumnX,
          y: index * nodeSpacingX,
        },
      });
    });

    setNodes(processedNodes);

    processedNodes.forEach((node) => {
      if (node.prev) {
        const source = processedNodes.find((n) => n.id === node.prev);
        if (source) {
          processedEdges.push({ source, target: node });
        }
      }
      if (node.next) {
        const target = processedNodes.find((n) => n.id === node.next);
        if (target) {
          processedEdges.push({ source: node, target });
        }
      }
    });
    setEdges(processedEdges);
  }, [data]);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node.id === selectedNode?.id ? null : node);
  };
  const getDynamicMarginTop = (edges: any) => {
    const nodeCount = edges.length;
    console.log(nodeCount);
    if (nodeCount >= 20) return "-mt-48";
    if (nodeCount > 10) return "-mt-16";
    if (nodeCount > 3) return " mt-14  ";
    // if (nodeCount > 10) return '-mt-18';
    // return '-mt-12';
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="absolute top-12 left-8  text-xl font-bold ">
        {data.title}
      </h1>
      <div
        className={`relative -ml-68    ${getDynamicMarginTop(edges)} `}
        style={{
          //   marginTop: `-${Math.min(Math.max(nodes.length * 1, 2), )}px`,
          width: `${Math.max(nodes.length, 1100)}px`,
          height: `${
            Math.max(...nodes.map((n) => n.position?.y || 0)) + 200
          }px`,
          transform: ` scale(${data.scale})`,
          transformOrigin: "center center",
        }}
      >
        {nodes.map((node) => (
          <Node
            key={node.id}
            data={node}
            position={node.position!}
            onClick={handleNodeClick}
          />
        ))}
        {edges.map((edge, index) => (
          <CustomArrow
            key={`edge-${index}`}
            start={edge.source.position!}
            end={edge.target.position!}
          />
        ))}
        {selectedNode && selectedNode.position && (
          <div
            style={{
              left: selectedNode.position.x + 100,
              top: selectedNode.position.y + 30,
              position: "absolute",
            }}
          >
            <ToolTip details={selectedNode.details} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlexibleGraph;
