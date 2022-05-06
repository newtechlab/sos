import { useEffect, useState } from "react";
import { Button, Container, Progress, Table } from "semantic-ui-react";
import { FamilyMember, Goal, LedgerRow } from "../../App"
import styled from "styled-components";

import {
    ChartData,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { chartLabels, chartOptions, graphDataInitialState, PengerInnColour, PengerUtColour } from "../../chart/ChartSettings";
import { pengerInn, pengerInnTotal, pengerUt, pengerUtTotal, sortLedger } from "../../data/Ledger";
import { StyledBoxSection } from "../StyledBoxSection";
import { PDFDocument } from "pdf-lib";
import PdfHandler from "../../services/PdfService/PdfService";

interface ResultatProps {
    ledger: Array<LedgerRow>
    familyMembers: Array<FamilyMember>
    removeLedgerRow: (id: string) => void 
    completeStep: () => void
    goal: Goal;
    previousData: any[];
}

interface CreatePdfProps {
    ledger: Array<LedgerRow>;
    familyMembers: Array<FamilyMember>;
    goal: Goal;
    previousData: any[];
}

const createPdf = async (props: CreatePdfProps) => {
    const pdfDoc = await PDFDocument.create()
    const objectToAttach = {
        version: "0.0.1",
        timestamp: Date.now(),
        familyMembers: props.familyMembers,
        ledger: props.ledger,
        goal: props.goal
    }
    props.previousData.push(objectToAttach)
    const history = {
        history: props.previousData
    }
    const uint8array = new TextEncoder().encode(JSON.stringify(history));
    pdfDoc.attach(uint8array, "sos_state")
    const page = pdfDoc.addPage()
    const FrontPageBytes = await fetch('frontpage.png').then(res => res.arrayBuffer())
    const FrontPageImage = await pdfDoc.embedPng(FrontPageBytes)
    const FrontPageDims = FrontPageImage.scale(0.5)
    page.drawImage(FrontPageImage, {
        x: 100,
        y: 300,
        width: FrontPageDims.width,
        height: FrontPageDims.height,
        // rotate: degrees(30),
        // opacity: 0.75,
      })

    page.drawText('Keep this document for next time')
    const pdfBytes = await pdfDoc.save()
    const blob=new Blob([pdfBytes], {type: "application/pdf"});// change resultByte to bytes

    const pdfHandler = new PdfHandler(pdfBytes);
    const attachments = await pdfHandler.getAttachments();
    // const attachmentsAsObject = attachments.map((a) => {
    //      const decoded = new TextDecoder().decode(a.data);
    //      return JSON.parse(decoded)
    // })

    const link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download="myFileName.pdf";
    link.click();
}

export default function Resultat(props: ResultatProps) {
    const [sortedLedger, setSortedLedger] = useState<LedgerRow[]>([]);
    const [inTotal, setInTotal] = useState<number>(0);
    const [inPercent, setInPercent] = useState<number>(0);
    const [outTotal, setOutTotal] = useState<number>(0);
    const [outPercent, setOutPercent] = useState<number>(0);
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], unknown>>(graphDataInitialState);
    const { ledger, familyMembers, goal, previousData, completeStep } = props;
    
    useEffect(() => {
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Penger Inn',
                data: pengerInn(chartLabels, sortedLedger),
                backgroundColor: PengerInnColour,
                },
              {
                label: 'Penger Ut',
                data: pengerUt(chartLabels, sortedLedger),
                backgroundColor: PengerUtColour,
              },
            ],
          };

          setGraphData(data);

          const totalIn = pengerInnTotal(chartLabels, sortedLedger)  
          setInTotal(totalIn);
          const totalOut = pengerUtTotal(chartLabels, sortedLedger)
          setOutTotal(totalOut)

          const inPercent = totalIn / (totalIn + totalOut) * 100;
          const outPercent = totalOut / (totalIn + totalOut) * 100;
          setInPercent(inPercent);
          setOutPercent(outPercent);
      }, [sortedLedger]);

    useEffect(() => {
        setSortedLedger(sortLedger(ledger));
      }, [ledger]);  

    return <Container>

        <StyledBoxSection> 
            <h1>Resultat</h1>

            <StyledGraphContainer>
                <Bar options={chartOptions} data={graphData} />
            </StyledGraphContainer>

            <StyledComparisonContainer>
                <div>
                    <StyledBarTotal>{inTotal}kr</StyledBarTotal>
                    <h3>Penger Inn</h3>
                    <Progress size='small' percent={inPercent} color='green' />
                </div>
                <div>
                    <StyledBarTotal>{outTotal}kr</StyledBarTotal>
                    <h3>Penger Ut</h3>
                    <Progress size='small' percent={outPercent} color='yellow' />
                </div>
            </StyledComparisonContainer>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Day of month</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                { sortedLedger.map( (row) => {
                    return <Table.Row key={row.id}>
                        <Table.Cell>{row.accountFrom}</Table.Cell>
                        <Table.Cell>{row.amount}</Table.Cell>
                        <Table.Cell>{row.dayOfMonth}</Table.Cell>
                        </Table.Row>
                })} 
                </Table.Body>
            </Table>

            <Button circular color="teal" onClick={() => {
                createPdf({ ledger, familyMembers, goal, previousData });
                completeStep();
            }}>Finish and download report</Button>    

        </StyledBoxSection>
    </Container>
}

const StyledBarTotal = styled.h3`
    position: relative;
    float: right;
`

const StyledGraphContainer = styled.div`
    height: 100px;
`

const StyledComparisonContainer = styled.div`
    padding: 50px;
    text-align: left;
`

