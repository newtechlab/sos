import { PDFDocument } from "pdf-lib";
import { FamilyMember, LedgerRow, UserInformation } from "../../App";
import Pd from 'frontpage.png'


export interface CreatePdfProps {
    ledger: Array<LedgerRow>;
    familyMembers: Array<FamilyMember>;
    userDetails: UserInformation;
    previousData: any[];
    addImage: boolean;
}

export class PdfWriterService {

    public static async createPdf(props: CreatePdfProps): Promise<Blob> {
        const pdfDoc = await PDFDocument.create()
        const objectToAttach = {
            version: "0.0.1",
            timestamp: Date.now(),
            familyMembers: props.familyMembers,
            ledger: props.ledger,
            userDetails: props.userDetails
        }
        props.previousData.push(objectToAttach)
        const history = {
            history: props.previousData
        }
        const uint8array: Uint8Array = new TextEncoder().encode(JSON.stringify(history));
        pdfDoc.attach(uint8array, "sos_state")
        const page = pdfDoc.addPage()
        
        if (props.addImage) {
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
        }
    
        page.drawText('Keep this document for next time')
        const pdfBytes = await pdfDoc.save()
        const blob=new Blob([pdfBytes], {type: "application/pdf"});// change resultByte to bytes
    
        return blob;
        // const pdfHandler = new PdfHandler(pdfBytes);
        // const attachments = await pdfHandler.getAttachments();
        // // const attachmentsAsObject = attachments.map((a) => {
        // //      const decoded = new TextDecoder().decode(a.data);
        // //      return JSON.parse(decoded)
        // // })
    
        // const link=document.createElement('a');
        // link.href=window.URL.createObjectURL(blob);
        // link.download="myFileName.pdf";
        // link.click();
    }
    
}

export default PdfWriterService;