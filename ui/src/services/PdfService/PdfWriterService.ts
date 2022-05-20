import { PDFDocument } from "pdf-lib";
import { FamilyMember, LedgerRow, Pet, UserInformation } from "../../App";
import Pd from 'frontpage.png'
import { AdjustmentAmountPercent, LedgerRowId } from "../../components/ResultatInteract";


export interface CreatePdfProps {
    ledger: Array<LedgerRow>;
    familyMembers: Array<FamilyMember>;
    userDetails: UserInformation;
    adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
    previousData: any[];
    addImage: boolean;
    pets: Array<Pet>;
}

export class PdfWriterService {

    public static async createPdf(props: CreatePdfProps): Promise<Blob> {
        const pdfDoc = await PDFDocument.create()
        const objectToAttach = {
            version: "0.0.1",
            timestamp: Date.now(),
            familyMembers: props.familyMembers,
            ledger: props.ledger,
            userDetails: props.userDetails,
            adjustments: Array.from(props.adjustments.entries()),
            pets: props.pets
        }
        const previous = props.previousData || []
        console.log("objectToAttach", objectToAttach);
        previous.push(objectToAttach)
        const history = {
            history: previous
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