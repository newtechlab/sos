import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { FamilyMember, LedgerRow, Pet, UserInformation } from "../../App";
import Pd from "frontpage.png";
import {
  AdjustmentAmountPercent,
  LedgerRowId,
} from "../../components/ResultatInteract";

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
    const pdfDoc = await PDFDocument.create();
    const objectToAttach = {
      version: "0.0.1",
      timestamp: Date.now(),
      familyMembers: props.familyMembers,
      ledger: props.ledger,
      userDetails: props.userDetails,
      adjustments: Array.from(props.adjustments.entries()),
      pets: props.pets,
    };
    const previous = props.previousData || [];
    console.log("objectToAttach", objectToAttach);
    previous.push(objectToAttach);
    const history = {
      history: previous,
    };
    const uint8array: Uint8Array = new TextEncoder().encode(
      JSON.stringify(history)
    );
    pdfDoc.attach(uint8array, "sos_state");
    const page = pdfDoc.addPage();

    if (props.addImage) {
      const FrontPageBytes = await fetch("frontpage.png").then((res) =>
        res.arrayBuffer()
      );
      const FrontPageImage = await pdfDoc.embedPng(FrontPageBytes);
      const FrontPageDims = FrontPageImage.scale(0.5);
      page.drawImage(FrontPageImage, {
        x: 100,
        y: 300,
        width: FrontPageDims.width,
        height: FrontPageDims.height,
        // rotate: degrees(30),
        // opacity: 0.75,
      });
    }

    //TODO Create textfunction, and replace the drawtext
    page.drawText(
      "Denne PDFen inneholder oppsummeringen din. Derfor er det lurt å lagre den et sted du husker.",
      {
        x: 50,
        y: 254,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      }
    );
    page.drawText(
      "Neste gang du skal inn og bruke nettsiden, kan du bruke PDFen til å laste inn dine data.",
      {
        x: 50,
        y: 230,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      }
    );
    page.drawText(
      "Da henter vi inn alt du har kartlagt, slik at du slipper å gjøre alt på nytt.",
      {
        x: 50,
        y: 206,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      }
    );
    page.drawText(
      "Instruksjoner om hvordan du gjør dette, finner du på forsiden til nettstedet.",
      {
        x: 50,
        y: 182,
        size: 12,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      }
    );
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" }); // change resultByte to bytes

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
