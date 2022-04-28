import { useState } from "react";
import styled from "styled-components";

export const Slider = () => {
  const [slider, setSlider] = useState<string>("0");

  return (
    <div className="slidecontainer">
      <StyledSlider
        type="range"
        min="1"
        max="100"
        value={slider}
        className="slider"
        id="myRange"
        onChange={(e) => {
          console.log("e", e);
          setSlider(e.target.value);
        }}
      />
    </div>
  );
};

const StyledSlider = styled.input`
  width: 100%;
`;
