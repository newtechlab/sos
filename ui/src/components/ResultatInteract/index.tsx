import { useEffect, useState } from "react";
import { Button, Container, Icon } from "semantic-ui-react";
import { Goal, LedgerRow, TransactionCategory } from "../../App";
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
import BackForwardControls from "../BackForwardControls";
import ResultSubSectionTab from "../ResultSubSectionTab";
import { StepsInitialState } from "../../data/StepsInitialState";

interface ResultatInteractProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void
  goal: Goal;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  setAdjustments: (_: Map<LedgerRowId, AdjustmentAmountPercent>) => void;
}

export type LedgerRowId = string;
export type AdjustmentAmountPercent = string;

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
  const { ledger, completeStep, activeStep, steps, goBack, adjustments, setAdjustments, goToStep } = props;

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
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  useEffect(() => {
    const debt = ledger.filter((i) => i.category != TransactionCategory.Debt && i.accountFrom === "user")
    const mOut = _.orderBy(debt, ["amount"], ["desc"]);
    setMoneyOut(mOut);
  }, [sortedLedger]);

  useEffect(() => {
    const data = {
      labels: moneyOut.map((i) => { 
        return i.accountTo 
      }),
      datasets: moneyOut.map((item, index) => { 
        const data = Array(moneyOut.length)
        data[index] = item.amount
        return {
          label: item.accountTo,
          data: data,
          backgroundColor: PengerUtColour,
        }
      }) 
    };
    setGraphData(data);
  }, [moneyOut]);


  useEffect(() => {
    computeInOutPercent();
  }, [adjustments]);

  const onUpdateSlider = (id: string, value: string) => {
    const newAdjustments = new Map(adjustments);
    newAdjustments.set(id, value);
    setAdjustments(newAdjustments);
  };

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
          <ResultSubSectionTab goToStep={goToStep} items={StepsInitialState.filter((i) => i.group === activeStep?.group)} selectedItem={activeStep} />

          <StyledBoxSection>
            <h1>Månedlige utgifter</h1>

            <StyledGraphContainer>
              <Bar options={chartOptions} data={graphData} />
            </StyledGraphContainer>

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
                    Tilbakestill
                  </Button>
                </ResetDialsDiv>
              ) : (
                <></>
              )}

              <StyledRow>
                <StyledColumn>
                  <h2>Løpende utgifter</h2>                  
                  <StyledParagraph>
                  Under kan du se dine månedlige utgifter. Du kan bruke tabellen til å tilpasse den økonomiske balansen for å sette et mål for neste måneds pengebruk. Prøve å justere utgiftene til et beløp som gir deg rom til å spare penger.
                  </StyledParagraph>
                  <MoneyOutList
                    moneyOut={moneyOut}
                    onUpdateValue={onUpdateSlider}
                    adjustments={adjustments}
                  />
                </StyledColumn>
              </StyledRow>
            </PaddedSection>
          </StyledBoxSection>

          <BackForwardControls
                goBack={() => goBack()}
                completeStep={completeStep}
              />        

        </StyledContainerSpace>
      </StyledContainer>

      <ComparisonGraph
        outTotal={outTotal}
        outPercent={outPercent}
        inTotal={inTotal}
        inPercent={inPercent}
        goal={props.goal}
      />
    </StyledBackgroundColour>
  );
}

const StyledContainer = styled(Container)`
  padding-bottom: 150px;
`;

const ResetDialsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenteredContentSection = styled.div`
  padding: 40px;
  margin-bottom: 40px;
  text-align: center;
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
  height: 150px;
`;

const StyledParagraph = styled.p`
  margin-bottom: 3em;
`;