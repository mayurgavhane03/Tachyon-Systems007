import React, { useState, useEffect } from "react";
import { FaUserTie, FaDatabase } from "react-icons/fa";
import { MdFunctions } from "react-icons/md";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { LuFunctionSquare } from "react-icons/lu";
import { RiFunctionLine, RiBaseStationLine } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

export const IconFactory = (type: string) => {
    switch (type) {
      case "user":
        return <FaUserTie className="text-blue-600" />;
      case "api":
        return <PiPlugsConnectedBold className="text-green-600" />;
      case "function":
        return <MdFunctions className="text-purple-600" />;
      case "database":
        return <FaDatabase className="text-red-600" />;
      case "function2":
        return <LuFunctionSquare className="text-black" />;
      case "grid":
        return <RiFunctionLine className="text-blue-500" />;
      case "connecting":
        return <RiBaseStationLine className="text-pink-600" />;
      case "deleted":
        return <AiFillDelete className="text-red-500" />;
      default:
        return <IoSettings className="text-gray-600" />;
    }
  };