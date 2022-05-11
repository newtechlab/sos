import { useEffect, useState } from "react";
import { Button, Container, Image } from "semantic-ui-react";
import { FamilyMember, Goal, LedgerRow } from "../../App";
import congratulations from "./congratulations.png";

import { ChartData } from "chart.js";
import {
  chartLabels,
  graphDataInitialState,
  PengerInnColour,
  PengerUtColour,
} from "../../chart/ChartSettings";
import {
  pengerInn,
  pengerInnTotal,
  pengerUt,
  pengerUtTotal,
  sortLedger,
} from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import {
  CreatePdfProps,
  PdfWriterService,
} from "../../services/PdfService/PdfWriterService";

interface ResultatProps {
  ledger: Array<LedgerRow>;
  familyMembers: Array<FamilyMember>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  goal: Goal;
  previousData: any[];
}

const createPdf = async (props: CreatePdfProps) => {
  const blob = await PdfWriterService.createPdf(props);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "myFileName.pdf";
  link.click();
};

export default function Resultat(props: ResultatProps) {
  const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
  const [inTotal, setInTotal] = useState<number>(0);
  const [inPercent, setInPercent] = useState<number>(0);
  const [outTotal, setOutTotal] = useState<number>(0);
  const [outPercent, setOutPercent] = useState<number>(0);
  const [graphData, setGraphData] = useState<
    ChartData<"bar", number[], unknown>
  >(graphDataInitialState);
  const { ledger, familyMembers, goal, previousData, completeStep } = props;

  useEffect(() => {
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Penger Inn",
          data: pengerInn(chartLabels, sortedLedger),
          backgroundColor: PengerInnColour,
        },
        {
          label: "Penger Ut",
          data: pengerUt(chartLabels, sortedLedger),
          backgroundColor: PengerUtColour,
        },
      ],
    };

    setGraphData(data);

    const totalIn = pengerInnTotal(chartLabels, sortedLedger);
    setInTotal(totalIn);
    const totalOut = pengerUtTotal(chartLabels, sortedLedger);
    setOutTotal(totalOut);

    const inPercent = (totalIn / (totalIn + totalOut)) * 100;
    const outPercent = (totalOut / (totalIn + totalOut)) * 100;
    setInPercent(inPercent);
    setOutPercent(outPercent);
  }, [sortedLedger]);

  useEffect(() => {
    setSortedLedger(sortLedger(ledger));
  }, [ledger]);

  return (
    <Container>
      <StyledBoxSection>
        <h1>Resultat</h1>
          <div>
          <Image size="big" src={congratulations} wrapped />
          </div>

        <Button
          circular
          color="blue"
          onClick={() => {
            createPdf({ ledger, familyMembers, goal, previousData });
            completeStep();
          }}
        >
          Fullfør og last ned rapport
        </Button>
      </StyledBoxSection>
    </Container>
  );
}
