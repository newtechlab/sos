import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Icon
} from "semantic-ui-react";
import { Goal, LedgerRow } from "../../App";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  chartOptions,
  graphDataInitialState,
  PengerInnColour,
  PengerUtColour,
} from "../../chart/ChartSettings";
import { calculateMoneyIn, calculateMoneyOut, sortLedger } from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import NextButton from "../NextButton";
import { MoneyOutList } from "../MoneyOutList";
import _ from "lodash";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import {
  StyledBackgroundColour,
  StyledContainerSpace,
  StyledHeader,
} from "../UserDetails";
import ComparisonGraph from "../ComparisonGraph";

interface ResultatInteractProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goal: Goal;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
}

interface Adjustments {
  ledgerRowId: string;
  adjustment: string;
}

type LedgerRowId = string;
export type AdjustmentAmountPercent = string;

export default function ResultatInteract(props: ResultatInteractProps) {
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [adjustments, setAdjustments] = useState<
    Map<LedgerRowId, AdjustmentAmountPercent>
  >(new Map<LedgerRowId, AdjustmentAmountPercent>());
  const [moneyOut, setMoneyOut] = useState<LedgerRow[]>([]);
  const [inTotal, setInTotal] = useState<number>(0);
  const [inPercent, setInPercent] = useState<number>(0);
  const [outTotal, setOutTotal] = useState<number>(0);
  const [outPercent, setOutPercent] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const { ledger, completeStep, activeStep, steps } = props;

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

  const onUpdateSlider = (id: string, value: string) => {
    const newAdjustments = new Map(adjustments)
    newAdjustments.set(id, value);
    setAdjustments(newAdjustments);
  };

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader activeStep={activeStep} steps={steps} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
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
              {moneyOut.length > 0 ? (
                <ResetDialsDiv>
                  <Button
                    circular
                    basic
                    onClick={() =>
                      setAdjustments(
                        new Map<LedgerRowId, AdjustmentAmountPercent>()
                      )
                    }
                  >
                    <Icon name="undo" />
                    Reset
                  </Button>
                </ResetDialsDiv>
              ) : (
                <></>
              )}

              <StyledRow>
                <StyledColumn>
                  <h2>Løpende utgifter</h2>
                  <MoneyOutList
                    moneyOut={moneyOut}
                    onUpdateValue={onUpdateSlider}
                    adjustments={adjustments}
                  />
                </StyledColumn>
              </StyledRow>
            </PaddedSection>

            <NextButton
              completeStep={() => {
                completeStep();
              }}
            />
          </StyledBoxSection>
        </StyledContainerSpace>
      </StyledContainer>
        
      <ComparisonGraph outTotal={outTotal} outPercent={outPercent} inTotal={inTotal} inPercent={inPercent} goal={props.goal} />        

    </StyledBackgroundColour>
  );
}

const StyledContainer = styled(Container)`
  margin-bottom: 200px;
`;

const ResetDialsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const StyledGraphContainer = styled.div`
  height: 100px;
`;
