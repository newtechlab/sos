import styled from "styled-components";
import { Slider } from "../Slider";
import { LedgerRow } from "../../App";

export interface MoneyOutListProps {
  moneyOut: LedgerRow[];
  onUpdateValue: (id: string, value: string) => void
}

export function MoneyOutList(props: MoneyOutListProps) {
  const { moneyOut, onUpdateValue } = props;

  if (moneyOut.length === 0) {
    return <div>Please add some items to you expenses first</div>;
  }

  return (
    <OuterBox>
      {moneyOut.map((row) => {
        return (
          <div>
            <MoneyOutItemBox>
              <AmountDiv>{row.amount}</AmountDiv>
              <TitleDiv>{row.accountTo}</TitleDiv>
              <SliderDiv>
                <Slider id={row.id} onUpdateValue={onUpdateValue} />
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
  height: 80px;
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
