import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Container } from "semantic-ui-react";
import styled from "styled-components";
import PdfHandler from "../../services/PdfService/PdfService";
import { StyledBoxSection } from "../StyledBoxSection";


export default function Home() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        // alert("foobar");

        console.log('files', acceptedFiles);

        //Step 2: Read the file using file reader
        const fileReader = new FileReader();  
 
        fileReader.onload =  async (event) => {

            if (event?.target?.readyState === FileReader.DONE) {
                //Step 4:turn array buffer into typed array
                const typedarray = new Uint8Array(event.target.result as ArrayBuffer);

                //Step 5:pdfjs should be able to read this
                const pdfHandler = new PdfHandler(typedarray);
                const attachments = await pdfHandler.getAttachments();
                const attachmentsAsObject = attachments.map((a) => {
                    const decoded = new TextDecoder().decode(a.data);
                    return JSON.parse(decoded)
                })
                console.log("attachments", attachmentsAsObject);
            }                       
        };
        //Step 3:Read the file as ArrayBuffer
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