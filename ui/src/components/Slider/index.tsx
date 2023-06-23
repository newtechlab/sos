import { useState } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import minus from "./minus.png";
import plus from "./plus.png";

interface SliderProps {
  id: string;
  maxPercent: string;
  onUpdateValue: (id: string, value: string) => void;
  value: string;
}

export const Slider = (props: SliderProps) => {
  const { id, onUpdateValue, value, maxPercent } = props;
  const [slider, setSlider] = useState<string>("100");

  return (
    <div className="slidecontainer">
      <Grid>
        <Grid.Column width={1} verticalAlign="middle" textAlign="center">
          <StyledButton>
            <StyledImage
              src={minus}
              alt="minus"
              onClick={() => {
                const newValue = (parseInt(slider) - 1).toString();
                onUpdateValue(id, newValue);
                setSlider(newValue);
              }}
            />
          </StyledButton>
        </Grid.Column>
        <Grid.Column width={14}>
          <StyledSlider
            type="range"
            min="1"
            max={maxPercent}
            value={value}
            className="slider"
            id="myRange"
            onChange={(e) => {
              setSlider(e.target.value);
              onUpdateValue(id, e.target.value);
            }}
            style={{
              background: `linear-gradient(to right, #3D8EB1 ${
                ((parseInt(value) - 1) * 100) / (parseInt(maxPercent) - 1)
              }%, #CEE0E0 0px`,
            }}
          />
        </Grid.Column>
        <Grid.Column width={1} verticalAlign="middle" textAlign="center">
          <StyledButton>
            <StyledImage
              src={plus}
              alt="plus"
              onClick={() => {
                const newValue = (parseInt(slider) + 1).toString();
                onUpdateValue(id, newValue);
                setSlider(newValue);
              }}
            />
          </StyledButton>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const upperColor = "#3d8eb1";
const lowerColor = "#d5e7ee";

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  margin-right: 10px;
  border-radius: 6px;
  outline: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 3px;
    background: white;
    border-radius: 50%;
    border: solid #3d8eb1 1.5px;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 3px;
    background: #3d8eb1;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    height: 18px;
    width: 18px;
    border-radius: 3px;
    background: #3d8eb1;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const StyledImage = styled.img`
  max-width: 1rem;
  height: auto;
`;
