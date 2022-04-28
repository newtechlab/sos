import { useEffect, useState } from "react";
import { Button, Container, Progress, Table } from "semantic-ui-react";
import { LedgerRow } from "../../App";
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
  pengerInn,
  pengerInnTotal,
  pengerUt,
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
}

export default function ResultatInteract(props: ResultatInteractProps) {
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
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

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Penger Inn",
          data: [inTotal],
          backgroundColor: PengerInnColour,
        },
        {
          label: "Penger Ut",
          data: [outTotal],
          backgroundColor: PengerUtColour,
        },
      ],
    };

    setGraphData(data);

    const totalIn = pengerInnTotal(chartLabels, sortedLedger);
    setInTotal(totalIn);
    const totalOut = pengerUtTotal(chartLabels, sortedLedger);
    setOutTotal(totalOut);

    const inPercent = (totalIn / (totalIn + totalOut)) * 100;
    const outPercent = (totalOut / (totalIn + totalOut)) * 100;
    setInPercent(inPercent);
    setOutPercent(outPercent);
  }, [sortedLedger]);

  useEffect(() => {
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  useEffect(() => {
    const mOut = sortedLedger.filter((row) => {
      return row.accountFrom === "user";
    });
    setMoneyOut(mOut);
  }, [sortedLedger]);

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
              <MoneyOutList moneyOut={moneyOut} />
            </StyledColumn>
          </StyledRow>
        </PaddedSection>

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
  height: 500px;
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
