import React from "react";
import { IconFactory } from "./IconFactory";
import { NodeData, Position } from "./types/type";
 


const getNodeStyle = (NodeType: string | undefined) => {
 
  if (NodeType === "Square") {
    return " w-24 h-24";
  } else {
    return "rounded-full w-28 h-28";
  }
};

export const Node: React.FC<{
  data: NodeData;
  position: Position;
  onClick: (data: NodeData) => void;
}> = ({ data, position, onClick }) => {
  return (
    <div
      className={`absolute   flex items-center  justify-center cursor-pointer`}
      style={{ left: position.x + 25, top: position.y + 5 }}
      onClick={() => onClick(data)}
    >
      <div
        className={`flex flex-col items-center  ${getNodeStyle(
          data?.nodeType
        )}  justify-center  shadow-lg bg-white border-2 transition-all duration-300 hover:shadow-xl hover:scale-105`}
      >
        <span className="text-3xl truncate mb-1">{IconFactory(data.type)}</span>
        <span className="font-semibold text-center text-xs px-1 truncate text-gray-700">
          {data.name}
        </span>
      </div>
    </div>
  );
};
