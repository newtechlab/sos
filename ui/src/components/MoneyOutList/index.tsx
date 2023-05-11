import styled from "styled-components";
import { SliderComp } from "../Slider";
import { LedgerRow } from "../../App";
import { AdjustmentAmountPercent } from "../ResultatInteract";
import { Label } from "semantic-ui-react";

export interface MoneyOutListProps {
  moneyOut: LedgerRow[];
  adjustments: Map<string, AdjustmentAmountPercent>;
  onUpdateValue: (id: string, value: string) => void;
}

export function MoneyOutList(props: MoneyOutListProps) {
  const { moneyOut, onUpdateValue, adjustments } = props;

  if (moneyOut.length === 0) {
    return <div>Vennligst legg til noen utgifter</div>;
  }

  return (
    <OuterBox>
      {moneyOut.map((row) => {
        const adhustmentStr = adjustments.get(row.id) || "100";
        const adjustment = parseInt(adhustmentStr);

        return (
          <div key={`moneyout_${row.id}`}>
            <MoneyOutItemBox>
              <AmountDiv>
                {Math.round((row.amount / 100) * adjustment)}{" "}
                <Label size="mini">KR.</Label>
              </AmountDiv>
              <TitleDiv>{row.accountTo}</TitleDiv>
              <SliderDiv>
                <SliderComp
                  id={row.id}
                  onUpdateValue={onUpdateValue}
                  maxPercent={"120"}
                  value={adhustmentStr}
                />
              </SliderDiv>
            </MoneyOutItemBox>
          </div>
        );
      })}
    </OuterBox>
  );
}

const OuterBox = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #cfe3e3;
`;

const MoneyOutItemBox = styled.div`
  height: 8rem;
  margin: 5px;
  background: #f1f8f8;
  border: 1px dashed #cfe3e3;
`;

const AmountDiv = styled.div`
  float: right;
  position: relative;
  margin: 5px;
`;

const TitleDiv = styled.div`
  float: left;
  position: relative;
  margin: 5px;
`;

const SliderDiv = styled.div`
  float: left;
  position: relative;
  padding: 10px;
  clear: left;
  width: 100%;
`;
