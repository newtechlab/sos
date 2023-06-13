import { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
import { Goal, LedgerRow, TransactionCategory } from "../../App";
import styled from "styled-components";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  chartOptions,
  graphDataInitialState,
  PengerUtColour,
} from "../../chart/ChartSettings";
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
import { DiffStyledDiv, StyledTotalDiv } from "../ResultatBalance";

interface ResultatDebtProps {
  ledger: Array<LedgerRow>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
  goal: Goal;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
}

export type LedgerRowId = string;
export type AdjustmentAmountPercent = string;

export default function ResultatDebt(props: ResultatDebtProps) {
  const [debt, setDebt] = useState<LedgerRow[]>([]);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const { ledger, completeStep, activeStep, steps, goBack, goToStep } = props;

  useEffect(() => {
    const debt = ledger.filter(
      (i) => i.category === TransactionCategory.Debt && i.accountFrom === "user"
    );
    const sortedDebt = _.orderBy(debt, ["amount"], ["desc"]);

    setDebt(sortedDebt);

    const totalDebt = _.sumBy(sortedDebt, "amount");
    setTotalDebt(totalDebt);
  }, [ledger]);

  useEffect(() => {
    const data = {
      labels: debt.map((i) => {
        return i.accountTo;
      }),
      datasets: debt.map((item, index) => {
        const data = Array(debt.length);
        data[index] = item.amount;
        return {
          label: item.accountTo,
          data: data,
          backgroundColor: PengerUtColour,
        };
      }),
    };
    setGraphData(data);
  }, [debt]);

  return (
    <StyledBackgroundColour>
      <StyledContainer>
        <StyledContainerSpace>
          <StyledBoxSection>
            <h1>Månedlig gjeldsoversikt</h1>
            <StyledGraphContainer>
              <Bar options={chartOptions} data={graphData} />
            </StyledGraphContainer>

            <DiffStyledDiv>
              <hr />
              <Grid>
                <Grid.Column textAlign="left" width={14}>
                  <StyledTotalDiv className="heading">Total</StyledTotalDiv>
                </Grid.Column>
                <Grid.Column textAlign="right" width={2}>
                  <StyledTotalDiv className="amountPositive">
                    {totalDebt} kr
                  </StyledTotalDiv>
                </Grid.Column>
              </Grid>
              <hr />
            </DiffStyledDiv>
          </StyledBoxSection>
        </StyledContainerSpace>
      </StyledContainer>
    </StyledBackgroundColour>
  );
}

const StyledContainer = styled(Container)`
  padding-bottom: 0px;
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
