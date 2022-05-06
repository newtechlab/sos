import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember, Goal, LedgerRow } from "../../App";
import PdfHandler from "../../services/PdfService/PdfService";
import { StyledBoxSection } from "../StyledBoxSection";

export interface HomProps {
    setPreviousData: (data: any[]) => void
    setFamilyMembers: (_: Array<FamilyMember>) => void
    setLedger: (_: Array<LedgerRow>) => void
    setGoal: (_: Goal) => void
}

export const firstStep = "/family";

interface PdfFormat {
    familyMembers: Array<FamilyMember>;
    ledger: Array<LedgerRow>;
    goal: Goal;
}

export default function Home(props: HomProps) {
    const navigate = useNavigate();
    const { setFamilyMembers, setLedger, setGoal, setPreviousData } = props; 
    const onDrop = useCallback(acceptedFiles => {
        const fileReader = new FileReader();  
        fileReader.onload =  async (event) => {

            if (event?.target?.readyState === FileReader.DONE) {
                const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
                const pdfHandler = new PdfHandler(typedarray);
                const attachments = await pdfHandler.getAttachments();
                const attachmentsAsObject: any[] = attachments.map((a) => {
                    const decoded = new TextDecoder().decode(a.data);
                    const previousData: any = JSON.parse(decoded);
                    return previousData
                })
                setPreviousData(attachmentsAsObject);

                attachmentsAsObject.map((attachment: any) => {
                    if (attachment.history) {
                        const a = attachment.history as Array<PdfFormat>
                        const mostRecentRecord = a.at(-1)

                        if (mostRecentRecord) {
                            if (mostRecentRecord.familyMembers) {
                                setFamilyMembers(mostRecentRecord.familyMembers);
                            }
        
                            if (mostRecentRecord.ledger) {
                                setLedger(mostRecentRecord.ledger)
                            }
        
                            if (mostRecentRecord.goal) {                        
                                setGoal(mostRecentRecord.goal)
                            }
                        }
                    }                    
                })
            }   
            navigate(firstStep);                    
        };
        fileReader.readAsArrayBuffer(acceptedFiles[0]);

      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return <Container>
        <StyledBoxSection>
            
            <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <StyledDragParagraph>Drag a previous session here ...</StyledDragParagraph> :
                <StyledDragParagraph>Drag 'n' drop some files here, or click to select files</StyledDragParagraph>
            }
            </div>
            
            <Button onClick={() => {navigate(firstStep)}}>Start new</Button>
            
        </StyledBoxSection>
    </Container>
}

const StyledDragParagraph = styled.p`
    background-color: #F1F8F8;
    height: 40px;
`