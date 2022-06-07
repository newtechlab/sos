import {
  Button,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  Input,
  Modal,
} from "semantic-ui-react";
import { LedgerRow, TransactionCategory } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { StyledGrid, StyledGridRowBottom } from "../MoneyIn";
import ErrorBar from "../ErrorBar";

let belopError = false;
const validateInput = (inputvalue: string) => {
  const validNumber = RegExp(/^[0-9\b]+$/);
  validNumber.test(inputvalue) ? (belopError = false) : (belopError = true);
};
interface AddMoneyOutModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
  addLedgerRow: (_: LedgerRow) => void;
  categories: Set<string>;
  header: string;
  ingresstext: string;
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

export default function AddMoneyOutModal(props: AddMoneyOutModalProps) {
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
    items.set("Abonnement (Netflix, HBO, Spill m.m)", {
      name: "Abonnement (Netflix, HBO, Spill m.m)",
      category: TransactionCategory.Media_and_Subscriptions,
    });
    items.set("Sport, trening og fritid", {
      name: "Sport, trening og fritid",
      category: TransactionCategory.Recreation,
    });
    items.set("Transport (trikk, tog, buss)", {
      name: "Transport (trikk, tog, buss)",
      category: TransactionCategory.Travel_Expenses,
    });
    items.set("Huslån", {
      name: "Huslån",
      category: TransactionCategory.Debt,
    });
    items.set("Husleie", {
      name: "Husleie",
      category: TransactionCategory.Debt,
    });
    items.set("Reise (Fly, hotell)", {
      name: "Reise (Fly, hotell)",
      category: TransactionCategory.Travel_Expenses,
    });
    items.set("Mat og drikke", {
      name: "Mat og drikke",
      category: TransactionCategory.Food_and_Beverages,
    });
    items.set("Strøm", {
      name: "Strøm",
      category: TransactionCategory.Electricity,
    });
    items.set("Klær og sko", {
      name: "Klær og sko",
      category: TransactionCategory.Clothing_and_Footwear,
    });
    items.set("Personlig pleie", {
      name: "Personlig pleie",
      category: TransactionCategory.Personal_Care,
    });
    items.set("Forsikring", {
      name: "Forsikring",
      category: TransactionCategory.Insurance,
    });
    items.set("Andre bokostnader (kommunale avgifter m.m.)", {
      name: "Andre bokostnader (kommunale avgifter m.m.)",
      category: TransactionCategory.Household_Items,
    });
    items.set("Husholdningsartikler", {
      name: "Husholdningsartikler",
      category: TransactionCategory.Household_Items,
    });
    items.set("Annen gjeld", {
      name: "Annen gjeld",
      category: TransactionCategory.Debt,
    });
    items.set("Billån", {
      name: "Billån",
      category: TransactionCategory.Debt,
    });
    items.set("Faste donasjoner", {
      name: "Faste donasjoner",
      category: TransactionCategory.Personal_Care,
    });
    setMoneyOutItems(items);
  }, []);

  useEffect(() => {
    const dropDownItems: DropDownItem[] = [];
    moneyOutItems.forEach((value) => {
      if (props.categories.has(value.category)) {
        const i = convertDropdownItem(value);
        dropDownItems.push(i);
      }
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
      <Modal.Header>Legg til ny {props.header}</Modal.Header>
      <Modal.Content>{props.ingresstext}</Modal.Content>
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
                  validateInput(data.value);
                }}
              />
              {belopError ? (
                <ErrorBar msg="Vennligst skriv inn et nummer" />
              ) : (
                ""
              )}
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
