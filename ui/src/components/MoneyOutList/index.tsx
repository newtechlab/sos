import styled from "styled-components";
import { SliderComp } from "../Slider";
import { LedgerRow, SifoCategories, TransactionCategory } from "../../App";
import { AdjustmentAmountPercent } from "../ResultatInteract";
import { Label } from "semantic-ui-react";

export interface MoneyOutListProps {
  moneyOut: LedgerRow[];
  adjustments: Map<string, AdjustmentAmountPercent>;
  onUpdateValue: (id: string, value: string) => void;
  sifoNumbers: SifoCategories;
}

const getSifoValue = (accountTo: string, sifoNumbers: SifoCategories) => {
  if (accountTo === "Klær og sko") {
    return sifoNumbers["Klær og sko"];
  } else if (accountTo === "AKS/SFO") {
    return sifoNumbers["AKS/SFO"];
  } else if (accountTo === "Mat og drikke") {
    return sifoNumbers["Mat og drikke"];
  } else if (accountTo === "Personlig pleie") {
    return sifoNumbers["Personlig pleie"];
  } else if (accountTo === "Lek, sport og mediebruk") {
    return sifoNumbers["Lek, sport og mediebruk"];
  } else if (accountTo === "Reisekostnader") {
    return sifoNumbers["Reisekostnader"];
  } else if (accountTo === "Spedbarnsutstyr") {
    return sifoNumbers["Spedbarnsutstyr"];
  } else if (accountTo === "Andre dagligvarer") {
    return sifoNumbers["Andre dagligvarer"];
  } else if (accountTo === "Husholdningsartikler") {
    return sifoNumbers["Husholdningsartikler"];
  } else if (accountTo === "Møbler") {
    return sifoNumbers["Møbler"];
  } else if (accountTo === "Mediebruk og fritid") {
    return sifoNumbers["Mediebruk og fritid"];
  } else if (accountTo === "Bilkostnader") {
    return sifoNumbers["Bilkostnader"];
  } else if (accountTo === "Barnehage") {
    return sifoNumbers["Barnehage"];
  } else {
    return 0;
  }
};

export function MoneyOutList(props: MoneyOutListProps) {
  const { moneyOut, onUpdateValue, adjustments, sifoNumbers } = props;

  if (moneyOut.length === 0) {
    return <div>Vennligst legg til noen utgifter</div>;
  }

  return (
    <OuterBox>
      {moneyOut.map((row) => {
        const adhustmentStr = adjustments.get(row.id) || row.amount.toString();
        const adjustment = parseInt(adhustmentStr);

        return (
          <div key={`moneyout_${row.id}`}>
            <MoneyOutItemBox>
              <AmountDiv>{adjustment} kr</AmountDiv>
              <TitleDiv>{row.accountTo}</TitleDiv>
              <SliderDiv>
                <SliderComp
                  id={row.id}
                  onUpdateValue={onUpdateValue}
                  maxPercent={"120"}
                  originalValue={row.amount}
                  value={adhustmentStr}
                  sifoValue={getSifoValue(row.accountTo, sifoNumbers)}
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
  padding-right: 0.5rem;
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
