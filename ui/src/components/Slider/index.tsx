import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import minus from "./actions/remove_circled.svg";
import plus from "./actions/add_circled.svg";
import { Col, Row, Slider } from "antd";
import type { SliderMarks } from "antd/es/slider";

interface SliderProps {
  id: string;
  maxPercent: string;
  onUpdateValue: (id: string, value: string) => void;
  value: string;
  sifoValue: number;
  originalValue: number;
}

export const SliderComp = (props: SliderProps) => {
  const { id, onUpdateValue, maxPercent, sifoValue, value, originalValue } =
    props;
  const [slider, setSlider] = useState<string>(value.toString());

  const marks: SliderMarks = {
    [sifoValue]: {
      style: {
        color: "#000000",
      },
      label: <>Sifo</>,
    },
    0: {
      label: <>0 kr</>,
    },
  };
  const valueInt = parseInt(value);

  const max = (parseInt(maxPercent) * originalValue) / 100;

  return (
    <div className="slidecontainer">
      <Row justify={"center"} align={"stretch"}>
        <Col span={1}>
          <StyledButton>
            <StyledImage
              src={minus}
              alt="minus"
              onClick={() => {
                const newValue = (parseInt(value) - 1).toString();
                onUpdateValue(id, newValue);
                setSlider(newValue);
              }}
            />
          </StyledButton>
        </Col>
        <Col span={20}>
          {/* 
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
          */}

          <Slider
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            marks={marks}
            value={valueInt}
            onChange={(e) => {
              setSlider(e.toString());
              onUpdateValue(id, e.toString());
            }}
            min={0}
            max={Math.max(max, sifoValue)}
          />
        </Col>
        <Col span={1}>
          <StyledButton>
            <StyledImage
              src={plus}
              alt="plus"
              onClick={() => {
                const newValue = (parseInt(value) + 1).toString();
                onUpdateValue(id, newValue);
                setSlider(newValue);
              }}
            />
          </StyledButton>
        </Col>
      </Row>
    </div>
  );
};

const trackStyle: React.CSSProperties = {
  backgroundColor: "#3D8EB1",
};

const handleStyle: React.CSSProperties = {
  backgroundColor: "#ff",
  borderTopColor: "#3D8EB1",
};

const upperColor = "#3d8eb1";
const lowerColor = "#d5e7ee";

const FlexRow = styled.div`
  display: flex;
`;

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
  padding-top: 0.7rem;
`;

const StyledImage = styled.img`
  max-width: 1rem;
  height: auto;
`;
