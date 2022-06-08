import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Goal, LedgerRow } from "../../App";
import styled from "styled-components";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  chartOptions,
  graphDataInitialState,
  PengerInnColour,
  PengerUtColour,
} from "../../chart/ChartSettings";
import {
  calculateMoneyIn,
  calculateMoneyOut,
  sortLedger,
} from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import _ from "lodash";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import {
  StyledBackgroundColour,
  StyledContainerSpace,
  StyledHeader,
} from "../UserDetails";
import ComparisonGraph from "../ComparisonGraph";
import BackForwardControls from "../BackForwardControls";
import ResultSubSectionTab from "../ResultSubSectionTab";
import { StepsInitialState } from "../../data/StepsInitialState";

interface ResultatBalanceProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goal: Goal;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  setAdjustments: (_: Map<LedgerRowId, AdjustmentAmountPercent>) => void;
}

export type LedgerRowId = string;
export type AdjustmentAmountPercent = string;

export default function ResultatBalance(props: ResultatBalanceProps) {
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [moneyOut, setMoneyOut] = useState<LedgerRow[]>([]);
  const [inTotal, setInTotal] = useState<number>(0);
  const [inPercent, setInPercent] = useState<number>(0);
  const [outTotal, setOutTotal] = useState<number>(0);
  const [outPercent, setOutPercent] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const { ledger, completeStep, activeStep, steps, goBack, adjustments, setAdjustments } = props;

  const labels = ["Penger Inn", "Penger Ut"];

  const computeInOutPercent = () => {
    const adjustedLedger = sortedLedger.map((row) => {
      if (adjustments.has(row.id)) {
        const adjustment = parseInt(adjustments.get(row.id) || "100");
        return {
          ...row,
          amount: Math.round((row.amount / 100) * adjustment),
        };
      } else {
        return row;
      }
    });

    const totalIn = calculateMoneyIn(adjustedLedger);
    setInTotal(totalIn);
    const totalOut = calculateMoneyOut(adjustedLedger);
    setOutTotal(totalOut);

    const newInPercent = (totalIn / (totalIn + totalOut)) * 100;
    const newOutPercent = (totalOut / (totalIn + totalOut)) * 100;
    setInPercent(newInPercent);
    setOutPercent(newOutPercent);
  };

  useEffect(() => {
    computeInOutPercent();
  }, [sortedLedger]);

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

  useEffect(() => {
    computeInOutPercent();
  }, [adjustments]);

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader activeStep={activeStep} steps={steps} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
          <CenteredContentSection>
            <ResultSubSectionTab items={StepsInitialState.filter((i) => i.group === activeStep?.group)} selectedItem={activeStep} />
          </CenteredContentSection>

          <StyledBoxSection>
            <h1>Pengebruk</h1>

            <StyledGraphContainer>
              <Bar options={chartOptions} data={graphData} />
            </StyledGraphContainer>
          </StyledBoxSection>

          <BackForwardControls
                goBack={() => goBack()}
                completeStep={completeStep}
              />        

        </StyledContainerSpace>
      </StyledContainer>
    </StyledBackgroundColour>
  );
}

const StyledContainer = styled(Container)`
  padding-bottom: 150px;
`;

const CenteredContentSection = styled.div`
  padding: 40px;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledGraphContainer = styled.div`
  height: 150px;
`;
