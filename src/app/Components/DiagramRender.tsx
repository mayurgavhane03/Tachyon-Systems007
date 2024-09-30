"use client"    
import React, { useState } from "react";
import FlexibleGraph from "./FlexibleGraph";
import { customeData2, customeData3, customeData4, customeData5, customeData6, customeData7, customJson } from "./Data/customeData";
import { jsondata1 } from "./Data/jsondata1";
import { jsondata2 } from "./Data/jsondata2";
import ZoomButtons from "./ZoomButtons";
import DataOptions from "./DataOptions";

const DiagramRender = () => {
    const [scale, setScale] = useState(1)
    const [selectedData, setSelectedData] = useState(jsondata1);


    const handleZoomIn = () => {
        if (scale < 1.1) {
          setScale(scale + 0.02);
        }
      };
    
      const handleZoomOut = () => {
        if (scale > 1) {
          setScale(scale - 0.02);
        }
      };
      const handleDataChange = (option:any) => {
        if (option === "Test-data-1") {
          setSelectedData(jsondata1);
        } else if (option === "Test-data-2") {
          setSelectedData(jsondata2);
        } else if (option === "Custome-data-1") {
          setSelectedData(customJson);
        } else if (option=== "Custome-data-2"){
            setSelectedData(customeData2)
        }else if (option=== "Custome-data-3"){
            setSelectedData(customeData3)
        }else if (option=== "Custome-data-4"){
          setSelectedData(customeData4)
        }else if (option=== "Custome-data-5"){
        setSelectedData(customeData5)
        }else if (option=== "Custome-data-6"){
          setSelectedData(customeData6)
          }else if (option=== "Custome-data-7"){
            setSelectedData(customeData7)
            }
      };
  return (
    <div>
      <FlexibleGraph data={{...selectedData[0],scale} } />
      <ZoomButtons onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <DataOptions onDataChange={handleDataChange}  />
    </div>
  );
};

export default DiagramRender;
