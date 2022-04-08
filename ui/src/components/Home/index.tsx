import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember, LedgerRow } from "../../App";
import PdfHandler from "../../services/PdfService/PdfService";
import { StyledBoxSection } from "../StyledBoxSection";

export interface HomProps {
    setFamilyMembers: (_: Array<FamilyMember>) => void
    setLedger: (_: Array<LedgerRow>) => void
}

export default function Home(props: HomProps) {
    const navigate = useNavigate();
    const { setFamilyMembers, setLedger } = props; 
    const onDrop = useCallback(acceptedFiles => {
        const fileReader = new FileReader();  
        fileReader.onload =  async (event) => {

            if (event?.target?.readyState === FileReader.DONE) {
                const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
                const pdfHandler = new PdfHandler(typedarray);
                const attachments = await pdfHandler.getAttachments();
                const attachmentsAsObject = attachments.map((a) => {
                    const decoded = new TextDecoder().decode(a.data);
                    return JSON.parse(decoded)
                })
                
                attachmentsAsObject.map((attachment) => {
                    if (attachment.familyMembers) {
                        const fm = attachment.familyMembers as Array<FamilyMember>
                        setFamilyMembers(fm);
                    }

                    if (attachment.ledger) {
                        const ledger = attachment.ledger as Array<LedgerRow>
                        setLedger(ledger)
                    }
                })
            }   
            navigate("/family");                    
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
            
            <Button>Start new</Button>
            
        </StyledBoxSection>
    </Container>
}

const StyledDragParagraph = styled.p`
    background-color: #F1F8F8;
    height: 40px;
`