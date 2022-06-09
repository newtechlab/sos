import { useEffect, useState } from "react";
import { Button, Container, Grid, Icon, StepContent } from "semantic-ui-react";
import { LedgerRow } from "../../App";

import AddMoneyOutModal from "../AddMoneyOutModal";
import { calculateMoneyOut, sortLedger } from "../../data/Ledger";
import BackForwardControls from "../BackForwardControls";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledGrid, StyledGridRow, StyledGridRowBottom } from "../MoneyIn";
import { StepDefinition, StepsState } from "../Steps";
import StepHeader from "../StepHeader";
import styled from "styled-components";
import MoneyTotal from "../MoneyTotal";
import HelpTextModalDebt from "../HelpTextModalDebt";

interface MoneyOutProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  categories: Set<string>;
}

export default function MoneyOut(props: MoneyOutProps) {
  const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  const [moneyOut, setMoneyOut] = useState<number>(0);
  // const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
  const [addHelpTextDebtModalOpen, OpenHelpTextDebtModal] =
    useState<boolean>(false);
  const {
    ledger,
    addLedgerRow,
    removeLedgerRow,
    completeStep,
    goBack,
    goToStep,
    steps,
    categories,
  } = props;

  useEffect(() => {
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  useEffect(() => {
    setFilteredLedger(
      sortedLedger.filter((row) => {
        return row.accountFrom === "user" && categories.has(row.category);
      })
    );
  }, [sortedLedger]);

  useEffect(() => {
    setMoneyOut(calculateMoneyOut(filteredLedger));
  }, [filteredLedger]);

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <StyledContainer>
        <StyledContainerSpace>
          {addMoneyOutModalOpen && (
            <AddMoneyOutModal
              open={addMoneyOutModalOpen}
              setOpen={setAddMoneyOutModalOpen}
              addLedgerRow={addLedgerRow}
              categories={categories}
              header="gjeld"
              ingresstext="Penger du bruker hver måned på å betale på gjeld og/eller husleie"
            />
          )}
          <StyledDiv>
            <h1>Gjeld</h1>
            <HelpTextModalDebt
              open={addHelpTextDebtModalOpen}
              setOpen={OpenHelpTextDebtModal}
            />
          </StyledDiv>
          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.length > 0 && (
                <Grid.Row>
                  <Grid.Column width={6}>
                    <strong>Artikkel</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={4}>
                            Ordning
                        </Grid.Column> */}
                  <Grid.Column width={6}>
                    <strong>Kategori</strong>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <strong>Beløp</strong>
                  </Grid.Column>
                  {/* <Grid.Column width={3}>
                            <strong>Day of month</strong>
                        </Grid.Column> */}
                </Grid.Row>
              )}
              {filteredLedger.map((row) => {
                return (
                  <StyledGridRow key={row.id}>
                    <Grid.Column width={6}>{row.accountTo}</Grid.Column>
                    <Grid.Column width={6}>{row.category}</Grid.Column>
                    <Grid.Column width={3}>{row.amount}</Grid.Column>
                    {/* <Grid.Column width={3}>{row.dayOfMonth}</Grid.Column> */}
                    <Grid.Column width={1}>
                      <Icon
                        onClick={() => {
                          removeLedgerRow(row.id);
                        }}
                        name="trash alternate outline"
                        color="blue"
                      />
                    </Grid.Column>
                  </StyledGridRow>
                );
              })}
              <StyledGridRowBottom>
                <Grid.Column width={16}>
                  <Button
                    circular
                    color="blue"
                    onClick={() => {
                      setAddMoneyOutModalOpen(true);
                    }}
                  >
                    <Icon name="plus" />
                    Legg til gjeld
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Gjeld" total={moneyOut} />
            </StyledGrid>
          </StyledBoxSection>

          {/* <StyledGraphContainer>
            <Bar options={chartOptions} data={graphData} />
        </StyledGraphContainer> */}

          {/* <NextButton completeStep={() => completeStep()} /> */}

          <BackForwardControls
            goBack={() => goBack()}
            completeStep={completeStep}
          />
        </StyledContainerSpace>
      </StyledContainer>
    </StyledBackgroundColour>
  );
}

// const StyledGraphContainer = styled.div`
//     height: 100px;
// `
const StyledBackgroundColour = styled.div`
  background-color: #f1f8f8;
  width: 100%;
`;

const StyledContainerSpace = styled.div`
  padding-top: 3em;
  padding-bottom: 4em;
`;
const StyledHeader = styled.div`
  background-color: #ffffff;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  position: relative;
`;

const StyledDiv = styled.div`
  position: relative;
`;
