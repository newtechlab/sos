import { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
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
import BackForwardControls from "../BackForwardControls";
import ResultSubSectionTab from "../ResultSubSectionTab";
import { StepsInitialState } from "../../data/StepsInitialState";
import ResultatDebt from "../ResultatDebt";
import ResultatInteract from "../ResultatInteract";

interface ResultatBalanceProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
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
  const [inTotal, setInTotal] = useState<number>(0);
  const [outTotal, setOutTotal] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const {
    ledger,
    completeStep,
    activeStep,
    steps,
    goBack,
    adjustments,
    setAdjustments,
    goToStep,
    removeLedgerRow,
    goal,
  } = props;

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
    computeInOutPercent();
  }, [adjustments]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const overspending = inTotal - outTotal;

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
          <StyledBoxSection>
            <h1>Balanse</h1>

            <StyledGraphContainer>
              <Bar options={chartOptions} data={graphData} />
            </StyledGraphContainer>

            <DiffStyledDiv>
              <hr />
              <Grid>
                <Grid.Column textAlign="left" width={14}>
                  <StyledTotalDiv className="heading">
                    {overspending < 0 ? "Overforbruk" : "Potensiell sparing"}
                  </StyledTotalDiv>
                </Grid.Column>
                <Grid.Column textAlign="right" width={2}>
                  <StyledTotalDiv
                    className={
                      overspending < 0 ? "amountNegative" : "amountPositive"
                    }
                  >
                    {inTotal - outTotal} kr
                  </StyledTotalDiv>
                </Grid.Column>
              </Grid>
              <hr />
            </DiffStyledDiv>
          </StyledBoxSection>
        </StyledContainerSpace>
      </StyledContainer>
      <ResultatDebt
        ledger={ledger}
        removeLedgerRow={removeLedgerRow}
        completeStep={completeStep}
        goBack={goBack}
        goToStep={goToStep}
        goal={goal}
        activeStep={activeStep}
        steps={steps}
      />

      <ResultatInteract
        ledger={ledger}
        removeLedgerRow={removeLedgerRow}
        completeStep={completeStep}
        goBack={goBack}
        goToStep={goToStep}
        goal={goal}
        activeStep={activeStep}
        steps={steps}
        adjustments={adjustments}
        setAdjustments={setAdjustments}
      />
    </StyledBackgroundColour>
  );
}

const StyledContainer = styled(Container)`
  padding-top: 9.375rem;
`;

export const StyledTotalDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bold !important;
`;

export const DiffStyledDiv = styled.div`
  padding-top: 30px;

  .amountNegative {
    color: red !important;
  }

  hr {
    border-top: 1px solid #ccc;
  }
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
