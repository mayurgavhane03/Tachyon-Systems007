import React from "react";
import { NodeDetails } from "./types/type";

interface ToolTipProps {
  details: NodeDetails;
}
const ToolTip: React.FC<ToolTipProps> = ({ details }) => {
  return (
    <div className="absolute z-50   p-4 w-80 bg-gray-200 rounded-lg h-auto w text-white text-sm   shadow-lg">
      <ul className="m-0 p-0 list-none">
        {Object.entries(details).map(([key, value]) => (
          <li key={key} className="mb-1 text-black">
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolTip;
