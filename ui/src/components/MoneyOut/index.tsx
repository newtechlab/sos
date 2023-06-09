import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Icon,
  Input,
} from "semantic-ui-react";
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
import TrashIcon from "../TrashIcon";
import ErrorBar from "../ErrorBar";

interface MoneyOutProps {
  ledger: Array<LedgerRow>;
  addLedgerRow: (_: LedgerRow) => void;
  editLedgerRow: (_: LedgerRow) => void;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goToStep: (step: StepDefinition) => void;
  activeStep: StepDefinition | undefined;
  steps: StepsState;
  categories: Set<string>;
}

export default function MoneyOut(props: MoneyOutProps) {
  const [belopEndError, setBelopEndError] = useState<boolean>(false);
  const [addMoneyOutModalOpen, setAddMoneyOutModalOpen] =
    useState<boolean>(false);
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [filteredLedger, setFilteredLedger] = useState<LedgerRow[]>([]);
  const [moneyOut, setMoneyOut] = useState<number>(0);
  const {
    ledger,
    addLedgerRow,
    removeLedgerRow,
    editLedgerRow,
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

  let belopError = false;
  const validateInput = (inputvalue: string) => {
    const validNumber = RegExp(/^[0-9\b]+$/);
    validNumber.test(inputvalue) ? (belopError = false) : (belopError = true);
  };

  return (
    <StyledBackgroundColour>
      <StyledHeader>
        <StepHeader steps={steps} goToStep={goToStep} />
      </StyledHeader>
      <Container>
        <StyledContainerSpace>
          {addMoneyOutModalOpen && (
            <AddMoneyOutModal
              open={addMoneyOutModalOpen}
              setOpen={setAddMoneyOutModalOpen}
              addLedgerRow={addLedgerRow}
              categories={categories}
              header="utgift"
              ingresstext="Penger du bruker hver måned på utgifter som varierer fra måned til måned. For eksempel regninger, matvarer, restaurantbesøk osv."
            />
          )}

          <h1>Utgifter</h1>
          <StyledBoxSection>
            <StyledGrid>
              {filteredLedger.length > 0 && (
                <Grid.Row>
                  <Grid.Column width={6}>
                    <strong>Artikkel</strong>
                  </Grid.Column>
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
                if (row.accountFrom === "user") {
                  return (
                    <StyledGridRow key={row.id}>
                      <Grid.Column width={6}>
                        {/*
                        <Dropdown
                          search
                          selection
                          placeholder="Kategori"
                          options={Categories}
                          onChange={(_, data) => {
                            setCategory(data.value?.toString(), row);
                          }}
                        />
                        */}
                      </Grid.Column>
                      <Grid.Column width={6}>{row.category}</Grid.Column>
                      <Grid.Column width={3}>
                        <Input
                          placeholder="f.eks 10 000"
                          onChange={(_, data) => {
                            validateInput(data.value);
                            editLedgerRow({
                              ...row,
                              amount: parseInt(
                                data.value?.toString() || "0",
                                10
                              ),
                            });
                          }}
                          label={{ basic: true, content: "kr" }}
                          labelPosition="right"
                        />
                        {belopError || belopEndError ? (
                          <ErrorBar msg="Vennligst skriv inn et nummer" />
                        ) : (
                          ""
                        )}
                      </Grid.Column>
                      <Grid.Column width={1}>
                        <TrashIcon
                          onClick={removeLedgerRow}
                          color="blue"
                          itemId={row.id}
                        />
                      </Grid.Column>
                    </StyledGridRow>
                  );
                } else {
                  return null;
                }
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
                    Legg til utgifter
                  </Button>
                </Grid.Column>
              </StyledGridRowBottom>

              <MoneyTotal text="Utgifter" total={moneyOut} />
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
      </Container>
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
