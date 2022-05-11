import { Button, Container, Dropdown, Grid, Input, Modal } from "semantic-ui-react";
import { LedgerRow, StyledOverridesDiv, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import DaySelector from "../DaySelector";
import styled from "styled-components";

interface AddMoneyInModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  addLedgerRow: (_: LedgerRow) => void;
}

interface MoneyInAndCategory {
  name: string;
  category: TransactionCategory;
}

interface DropDownItem {
  key: string;
  text: string;
  value: string;
}

const convertDropdownItem = (item: MoneyInAndCategory): DropDownItem => {
  return {
    key: item.name,
    text: item.name,
    value: item.name,
  };
};

export default function AddMoneyInModal(props: AddMoneyInModalProps) {
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [moneyInItems, setMoneyInItems] = useState<
    Map<string, MoneyInAndCategory>
  >(new Map<string, MoneyInAndCategory>());  
  const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);
  const { open, setOpen, addLedgerRow } = props;

  useEffect(() => {
    const items = new Map<string, MoneyInAndCategory>();
    items.set("Lönn", {
      name: "Lönn",
      category: TransactionCategory.Income,
    });
    items.set("Pension", {
      name: "Pension",
      category: TransactionCategory.Income,
    });
    items.set("Benefit", {
      name: "Benefit",
      category: TransactionCategory.Income,
    });       
    setMoneyInItems(items);
  }, []);

  useEffect(() => {
    const dropDownItems: DropDownItem[] = [];
    moneyInItems.forEach((value) => {
      const i = convertDropdownItem(value);
      dropDownItems.push(i);
    });
    setDropDownItems(dropDownItems);
  }, [moneyInItems]);  

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <StyledModalContent>
        <StyledOverridesDiv>
          <Container>
            <StyledContainerSpace>
              <h1> Ny inntekt </h1>

              <StyledModalBody>
                <StyledIngress>
                  Penger du får inn på konto jevnlig. Det kan være lønn,
                  barnebidrag, trygd eller annen støtte. Det man ikke bør legge
                  inn er gaver eller lignende, fordi man ikke kan regne med at
                  det kommer inn jevnlig og derfor ikke bør regnes med i et
                  budsjett.
                </StyledIngress>
                <Grid columns={2}>
                  <Grid.Column width={2}>Type</Grid.Column>
                  <Grid.Column width={14}>
                    <Dropdown
                      placeholder="f.eks. Lønn"
                      options={dropDownItems}
                      onChange={(_, data) => {
                        setFrom(data.value?.toString());
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={2}>Beløp</Grid.Column>
                  <Grid.Column width={14}>
                    <Input
                      placeholder="f.eks 10 000"
                      onChange={(_, data) => {
                        setAmount(parseInt(data.value?.toString() || "0", 10));
                      }}
                    />
                  </Grid.Column>
                </Grid>
                <br />
                <DaySelector
                  itemSelected={(day) => {
                    setDay(day);
                  }}
                />
                <br />
                <Grid columns={2}>
                  <Grid.Column>
                    <Button
                      circular
                      basic
                      color="blue"
                      onClick={() => setOpen(false)}
                    >
                      Avbryt
                    </Button>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Button
                      content="Legg til"
                      color="blue"
                      onClick={() => {
                        if (from && amount && day) {
                          addLedgerRow({
                            id: uuidv4(),
                            dayOfMonth: day,
                            amount: amount,
                            accountFrom: from,
                            accountTo: "user",
                            category: TransactionCategory.Income,
                          });
                          setOpen(false);
                        } else {
                          console.log("missing var", from);
                          console.log("missing var", amount);
                          console.log("missing var", day);
                        }
                      }}
                    />
                  </Grid.Column>
                </Grid>
              </StyledModalBody>
            </StyledContainerSpace>
          </Container>
        </StyledOverridesDiv>
      </StyledModalContent>

      {/* <Modal.Actions> */}

      {/* <Dropdown
                placeholder='Day of Month'
                selection
                options={getDaysOfMonthDropdown()}
                onChange={ (_, data) => { 
                    setDay(parseInt(data.value?.toString() || "1", 10)) 
                }}
            /> */}

      {/* </Modal.Actions> */}
    </Modal>
  );
}

export const StyledModalContent = styled(Modal.Content)`
  padding: 0 !important;
`;

export const StyledModalBody = styled.div`
  background-color: #ffffff;
  padding: 20px;
`;

const StyledContainerSpace = styled.div`
  padding: 3em;
`;
const StyledIngress = styled.div`
  padding-bottom: 2em;
`;
