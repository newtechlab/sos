import { useEffect, useState } from "react";
import { Button, Container, Progress, Table } from "semantic-ui-react";
import { Goal, LedgerRow } from "../../App";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  chartLabels,
  chartOptions,
  graphDataInitialState,
  PengerInnColour,
  PengerUtColour,
} from "../../chart/ChartSettings";
import {
  pengerInnTotal,
  pengerUtTotal,
  sortLedger,
} from "../../data/Ledger";
import { Slider } from "../Slider";
import { StyledBoxSection } from "../StyledBoxSection";
import NextButton from "../NextButton";
import { MoneyOutList } from "../MoneyOutList";
import _ from "lodash";

interface ResultatInteractProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goal: Goal | undefined;
}

interface Adjustments {
  ledgerRowId: string;
  adjustment: string;
}

type LedgerRowId = string;
export type AdjustmentAmountPercent = string;

export default function ResultatInteract(props: ResultatInteractProps) {
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [goalMonths, setGoalMonths] = useState<number>(0);
  const [adjustments, setAdjustments] = useState<Map<LedgerRowId, AdjustmentAmountPercent>>(new Map<LedgerRowId, AdjustmentAmountPercent>());
  const [moneyOut, setMoneyOut] = useState<LedgerRow[]>([]);
  const [inTotal, setInTotal] = useState<number>(0);
  const [inPercent, setInPercent] = useState<number>(0);
  const [outTotal, setOutTotal] = useState<number>(0);
  const [outPercent, setOutPercent] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const { ledger, completeStep } = props;

  const labels = ["Penger Inn", "Penger Ut"];

  const computeInOutPercent = () => {

    const adjustedLedger = sortedLedger.map((row) => {
      if (adjustments.has(row.id)) {
        const adjustment = parseInt(adjustments.get(row.id) || "100")
        return {
          ...row,
          amount: Math.round(row.amount / 100 * adjustment)
        }
      }else {
        return row
      }
    })

    const totalIn = pengerInnTotal(chartLabels, adjustedLedger);
    setInTotal(totalIn);
    const totalOut = pengerUtTotal(chartLabels, adjustedLedger);
    setOutTotal(totalOut);

    const inPercent = (totalIn / (totalIn + totalOut)) * 100;
    const outPercent = (totalOut / (totalIn + totalOut)) * 100;
    setInPercent(inPercent);
    setOutPercent(outPercent);
  }

  useEffect(() => {
    computeInOutPercent();
  }, [sortedLedger]);

  useEffect(() => {

    if (props.goal) {
      setGoalMonths(Math.round(props.goal.amount / (inTotal - outTotal)));
    }

  }, [inTotal, outTotal, props.goal]);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Penger Inn",
          data: [inTotal, 0],
          backgroundColor: PengerInnColour,
        },
        {
          label: "Penger Ut",
          data: [0, outTotal],
          backgroundColor: PengerUtColour,
        },
      ],
    };
    setGraphData(data);
  }, [inTotal, outTotal]);

  useEffect(() => {
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  useEffect(() => {
    const mOut = sortedLedger.filter((row) => {
      return row.accountFrom === "user";
    });
    setMoneyOut(mOut);
  }, [sortedLedger]);

  const onUpdateSlider = (id: string, value: string) => {    
    setAdjustments(adjustments.set(id, value))
    computeInOutPercent();
  }

  return (
    <Container>
      <StyledBoxSection>
        <h1>Balanseoversikt</h1>
      </StyledBoxSection>

      <StyledBoxSection>
        <h1>Pengebruk</h1>

        <StyledGraphContainer>
          <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer>

        <div>Over or under section</div>

        <PaddedSection>
          <StyledRow>
            <StyledColumn>
              <h2>Løpende utgifter</h2>
              <MoneyOutList moneyOut={moneyOut} onUpdateValue={onUpdateSlider} adjustments={adjustments} />
            </StyledColumn>
          </StyledRow>
        </PaddedSection>

        <StyledComparisonContainer>
            <div>
                <StyledBarTotal>outgoings: {outTotal}kr</StyledBarTotal>
                <h3>Spending Percentage</h3>
                <Progress size='small' percent={outPercent} color='red' />
            </div>
            <div>
                <StyledBarTotal>you are saving: {inTotal - outTotal}kr</StyledBarTotal>
                <h3>Income Percentage</h3>
                <Progress size='small' percent={inPercent} color='green' />
            </div>

            { props.goal ? <div>
                <h3>{props.goal.name}</h3>
                { goalMonths < 0 ? <p>You need to make more savings to achieve your goal</p> : <p>You will achieve your goal in {goalMonths} months</p> }
            </div> : <div>
              <h3>No goal has been added</h3>
            </div> }

            
        </StyledComparisonContainer>

        <NextButton
          completeStep={() => {
            completeStep();
          }}
        />
      </StyledBoxSection>
    </Container>
  );
}

const PaddedSection = styled.div`
  margin-top: 40px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 10px;
`;

const StyledBarTotal = styled.h3`
  position: relative;
  float: right;
`;

const StyledGraphContainer = styled.div`
  height: 100px;
`;

const StyledComparisonContainer = styled.div`
  padding: 50px;
  text-align: left;
`;
