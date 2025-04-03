"use client";
import { TwitterPicker, ColorResult } from 'react-color';
import { Color } from "@/canvas/types";
import { colorToCssColor } from "@/lib/utils";

export const ColorPicker = ({
  onChange,
}: {
  onChange: (color: Color) => void;
}) => {
  return (
    <div className=" ">
      <ColorButton
        color={{
          r: 243,
          g: 82,
          b: 35,
        }}
        onChange={onChange}
      />
    </div>
  );
};

const ColorButton = ({
  color,
  onChange,
}: {
  onChange: (color: Color) => void;
  color: Color;
}) => {
  // Create a handler that converts ColorResult to your Color type
  const handleColorChange = (colorResult: ColorResult) => {
    // Extract rgb values from ColorResult and pass them to your onChange
    const { r, g, b } = colorResult.rgb;
    onChange({ r, g, b });
  };

  return (
    <TwitterPicker
    color={colorToCssColor(color)}
    onChange={handleColorChange}
    width="284px"
    triangle="hide"
    styles={{
      default: {
        card: {
          background: "transparent",
          boxShadow: "none",
        },
      },
    }}
  />
  
  );
};