import { useState } from "react";
import styled from "styled-components";

interface SliderProps {
  id: string;
  onUpdateValue: (id: string, value: string) => void
}

export const Slider = (props: SliderProps) => {
  const { id, onUpdateValue } = props
  const [slider, setSlider] = useState<string>("100");

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
          setSlider(e.target.value);
          onUpdateValue(id, e.target.value)
        }}
      />
    </div>
  );
};

const StyledSlider = styled.input`
  width: 100%;
`;
