import { useState } from "react";
import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

interface SliderProps {
  id: string;
  maxPercent: string;
  onUpdateValue: (id: string, value: string) => void
  value: string;
}

export const Slider = (props: SliderProps) => {
  const { id, onUpdateValue, value, maxPercent } = props
  const [slider, setSlider] = useState<string>("100");

  return (
    <div className="slidecontainer">
      <Grid>
        <Grid.Column width={1}>
          <Icon name="minus circle" onClick={() => {
            const newValue = (parseInt(slider) - 1).toString()
            onUpdateValue(id, newValue);
            setSlider(newValue);
          }}/>  
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
              onUpdateValue(id, e.target.value)
            }}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Icon name="plus circle" onClick={() => {
            const newValue = (parseInt(slider) + 1).toString()
            onUpdateValue(id, newValue);
            setSlider(newValue);
          }}/>
        </Grid.Column>
      
      </Grid>

      
    </div>
  );
};

const StyledSlider = styled.input`
  width: 100%;
`;
