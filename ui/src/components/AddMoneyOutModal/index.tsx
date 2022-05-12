import { Button, Dropdown, Grid, Icon, Input, Modal } from "semantic-ui-react";
import { LedgerRow, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getDaysOfMonthDropdown } from "../../data/DaysOfMonth";
import { StyledGrid, StyledGridRowBottom } from "../MoneyIn";

interface AddMoneyOutModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  addLedgerRow: (_: LedgerRow) => void;
}

interface MoneyOutAndCategory {
  name: string;
  category: TransactionCategory;
}

interface DropDownItem {
  key: string;
  text: string;
  value: string;
}

const convertDropdownItem = (item: MoneyOutAndCategory): DropDownItem => {
  return {
    key: item.name,
    text: item.name,
    value: item.name,
  };
};

export default function AddMoneyInModal(props: AddMoneyOutModalProps) {
  const [to, setTo] = useState<string | undefined>(undefined);
  const [moneyOutItems, setMoneyOutItems] = useState<
    Map<string, MoneyOutAndCategory>
  >(new Map<string, MoneyOutAndCategory>());
  const [dropDownItems, setDropDownItems] = useState<DropDownItem[]>([]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [day] = useState<number | undefined>(1);
  const { open, setOpen, addLedgerRow } = props;

  useEffect(() => {
    const items = new Map<string, MoneyOutAndCategory>();
    items.set("Streaming service's", {
      name: "Abonnement (Netflix, HBO, Spill m.m)",
      category: TransactionCategory.Media_and_Subscriptions,
    });
    items.set("Gym/Exercise", {
      name: "Sport, trening og fritid",
      category: TransactionCategory.Debt,
    });
    items.set("Transport", {
      name: "Transport (trikk, tog, buss)",
      category: TransactionCategory.Travel_Expenses,
    });    
    items.set("Mortgage", {
      name: "Huslån",
      category: TransactionCategory.Debt,
    });
    items.set("Rent", {
      name: "Husleie",
      category: TransactionCategory.Debt,
    });    
    items.set("Travel", {
      name: "Reise (Fly, hotell)",
      category: TransactionCategory.Travel_Expenses,
    });
    items.set("Food", {
      name: "Mat og drikke",
      category: TransactionCategory.Food_and_Beverages,
    });
    items.set("El", {
      name: "Strøm",
      category: TransactionCategory.Electricity,
    });
    items.set("Clothes", {
      name: "Klær og sko",
      category: TransactionCategory.Clothing_and_Footwear,
    });
    items.set("Healthcare", {
      name: "Personlig pleie",
      category: TransactionCategory.Personal_Care,
    });
    items.set("Insurance", {
      name: "Forsikring",
      category: TransactionCategory.Insurance,
    });
    items.set("Utility bills", {
      name: "Andre bokostnader (kommunale avgifter m.m.)",
      category: TransactionCategory.Household_Items,
    });
    items.set("Household shopping", {
      name: "Husholdningsartikler",
      category: TransactionCategory.Household_Items,
    });
    items.set("Loans", {
      name: "Annen gjeld",
      category: TransactionCategory.Debt,
    });
    items.set("Car Loan", {
      name: "Billån",
      category: TransactionCategory.Debt,
    });    
    items.set("Gifts/Donations", {
      name: "Faste donasjoner",
      category: TransactionCategory.Personal_Care,
    });
    setMoneyOutItems(items);
  }, []);

  useEffect(() => {
    const dropDownItems: DropDownItem[] = [];
    moneyOutItems.forEach((value) => {
      const i = convertDropdownItem(value);
      dropDownItems.push(i);
    });
    setDropDownItems(dropDownItems);
  }, [moneyOutItems]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Legg til ny utgift</Modal.Header>
      <Modal.Content>
        Penger du bruker hver måned på utgifter. For eksempel gjeld, regninger,
        matvarer, restaurantbesøk osv.
      </Modal.Content>
      <Modal.Actions>
        <StyledGrid>
          <StyledGridRowBottom>
            {/* <Input 
                placeholder="Coffee" 
                onChange={ (_, data) => { setTo(data.value?.toString()) }} /> */}
            <Grid.Column width={2}>
              <Button
                circular
                basic
                color="blue"
                onClick={() => setOpen(false)}
              >
                Avbryt
              </Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Dropdown
                placeholder="for eksempel Husleie"
                selection
                options={dropDownItems}
                onChange={(_, data) => {
                  setTo(data.value?.toString());
                }}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Input
                placeholder="Beløp"
                onChange={(_, data) => {
                  setAmount(parseInt(data.value?.toString() || "0", 10));
                }}
              />
            </Grid.Column>
            {/* <Dropdown
                placeholder='Day of Month'
                selection
                options={getDaysOfMonthDropdown()}
                onChange={ (_, data) => { 
                    setDay(parseInt(data.value?.toString() || "1", 10)) 
                }}
            /> */}
            <Grid.Column width={3}>
              <Button
                circular
                color="blue"
                onClick={() => {
                  if (to && amount && day) {
                    addLedgerRow({
                      id: uuidv4(),
                      dayOfMonth: day,
                      amount: amount,
                      accountFrom: "user",
                      accountTo: to,
                      category:
                        moneyOutItems.get(to)?.category ||
                        TransactionCategory.Undefined,
                    });
                    setOpen(false);
                  } else {
                    console.log("missing var", to);
                    console.log("missing var", amount);
                    console.log("missing var", day);
                  }
                }}
              >
                <Icon name="plus" />
                Legg til
              </Button>
            </Grid.Column>
          </StyledGridRowBottom>
        </StyledGrid>
      </Modal.Actions>
    </Modal>
  );
}
