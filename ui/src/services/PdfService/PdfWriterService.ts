import { PDFDocument, PDFPage, StandardFonts, rgb } from "pdf-lib";
import {
  Car,
  FamilyMember,
  HouseSituation,
  LedgerRow,
  Pet,
  TransactionCategory,
  UserInformation,
} from "../../App";
import Pd from "frontpage.png";
import {
  AdjustmentAmountPercent,
  LedgerRowId,
} from "../../components/ResultatInteract";
import { calculateMoneyIn } from "../../data/Ledger";
import { calculateMoneyOut } from "../../data/Ledger";

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
    let page = pdfDoc.addPage();

    const Savingspotential = (): number => {
      const moneyOut = calculateMoneyOut(props.ledger);
      const moneyIn = calculateMoneyIn(props.ledger);
      const res = moneyIn - moneyOut;
      return res;
    };

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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { height } = page.getSize();
    let y = 80;

    const checkY = (y: number) => {
      if (y > 700) {
        return true;
      } else {
        return false;
      }
    };

    const adjustedLedger = props.ledger.map((row) => {
      if (props.adjustments.has(row.id)) {
        const adjustment = parseInt(
          props.adjustments.get(row.id) || row.amount.toString()
        );
        return {
          ...row,
          amount: adjustment,
        };
      } else {
        return row;
      }
    });

    //TODO Create textfunction, and replace the drawtext
    page.drawText(
      "Denne PDFen inneholder oppsummeringen din. Derfor er det lurt å lagre den et sted du husker.",
      {
        x: 50,
        y: 254,
        size: 12,
        font: font,
      }
    );
    page.drawText(
      "Neste gang du skal inn og bruke nettsiden, kan du bruke PDFen til å laste inn dine data.",
      {
        x: 50,
        y: 230,
        size: 12,
        font: font,
      }
    );
    page.drawText(
      "Da henter vi inn alt du har kartlagt, slik at du slipper å gjøre alt på nytt.",
      {
        x: 50,
        y: 206,
        size: 12,
        font: font,
      }
    );
    page.drawText(
      "Instruksjoner om hvordan du gjør dette, finner du på forsiden til nettstedet.",
      {
        x: 50,
        y: 182,
        size: 12,
        font: font,
      }
    );

    page = pdfDoc.addPage();

    page.drawText("1. Familie", {
      x: 50,
      y: height - y,
      size: 20,
      font: fontBold,
    });
    y = y + 26;

    page.drawText("Familiemedlemmer", {
      x: 50,
      y: height - y,
      size: 12,
      font: fontBold,
    });
    y = y + 22;

    props.familyMembers.forEach((member) => {
      page.drawText(member.name + " " + member.age + "år", {
        x: 50,
        y: height - y,
        size: 12,
        font: font,
      });
      y = y + 22;
    });

    page.drawText("Kjøretøy:", {
      x: 50,
      y: height - y,
      size: 12,
      font: fontBold,
    });
    y = y + 22;

    page.drawText("Antall elbil: " + props.userDetails.car.electric, {
      x: 50,
      y: height - y,
      size: 12,
      font: font,
    });
    y = y + 22;

    page.drawText("Antall fossilbil: " + props.userDetails.car.fossil, {
      x: 50,
      y: height - y,
      size: 12,
      font: font,
    });
    y = y + 22;

    page.drawText("Boligsituasjon", {
      x: 50,
      y: height - y,
      size: 12,
      font: fontBold,
    });
    y = y + 22;

    const hasHouse = () => {
      if (props.userDetails.house === HouseSituation.OWN) {
        return "Eier";
      } else if (props.userDetails.house === HouseSituation.RENT) {
        return "Leier";
      } else {
        return "Nei";
      }
    };
    page.drawText(hasHouse(), {
      x: 50,
      y: height - y,
      size: 12,
      font: font,
    });
    y = y + 22;

    page.drawText("Eier du noen dyr?", {
      x: 50,
      y: height - y,
      size: 12,
      font: fontBold,
    });
    y = y + 22;

    props.pets.forEach((pet) => {
      page.drawText(pet.name + " - " + pet.type, {
        x: 50,
        y: height - y,
        size: 12,
        font: font,
      });
      y = y + 22;
    });

    page.drawText("Har familien et sparemål?", {
      x: 50,
      y: height - y,
      size: 12,
      font: fontBold,
    });
    y = y + 22;

    page.drawText(
      props.userDetails.goal.name +
        " - " +
        props.userDetails.goal.amount +
        "kr",
      {
        x: 50,
        y: height - y,
        size: 12,
        font: font,
      }
    );
    y = y + 44;

    page.drawLine({
      start: { x: 80, y: height - y },
      end: { x: 520, y: height - y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
      opacity: 0.75,
    });
    y = y + 44;

    page.drawText("2. Penger inn", {
      x: 50,
      y: height - y,
      size: 20,
      font: fontBold,
    });
    y = y + 26;

    page.drawText("Inntekt og annen støtte", {
      x: 50,
      y: height - y,
      size: 14,
      font: fontBold,
    });
    y = y + 24;

    props.ledger
      .filter((item) => item.accountTo === "user")
      .forEach((income) => {
        page.drawText("Kategori: " + income.accountFrom, {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Ordning: " + income.accountFrom, {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Beløp: " + income.amount + "kr", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Dato for utbetaling: " + income.dayOfMonth + ".", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 26;
        if (checkY(y)) {
          page = pdfDoc.addPage();
          y = 80;
        }
      });

    page.drawText(
      "Totalt inntekter: " + calculateMoneyIn(props.ledger) + "kr pr. måned",
      {
        x: 50,
        y: height - y,
        size: 14,
        font: fontBold,
      }
    );

    y = y + 44;

    page.drawLine({
      start: { x: 80, y: height - y },
      end: { x: 520, y: height - y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
      opacity: 0.75,
    });
    y = y + 44;

    page = pdfDoc.addPage();
    y = 80;

    page.drawText("3. Penger ut", {
      x: 50,
      y: height - y,
      size: 20,
      font: fontBold,
    });
    y = y + 26;

    page.drawText("Gjeld", {
      x: 50,
      y: height - y,
      size: 14,
      font: fontBold,
    });
    y = y + 24;

    props.ledger
      .filter((item) => item.category === TransactionCategory.Debt)
      .forEach((debt) => {
        page.drawText("Kategori: " + debt.accountTo, {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Beløp: " + debt.amount + "kr", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Dato for utbetaling: " + debt.dayOfMonth + ".", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 26;
      });
    y = y + 22;
    page.drawText(
      "Totalt gjeld: " +
        calculateMoneyOut(
          props.ledger.filter(
            (item) => item.category === TransactionCategory.Debt
          )
        ) +
        "kr pr. måned",
      {
        x: 50,
        y: height - y,
        size: 14,
        font: fontBold,
      }
    );
    y = y + 24;

    page.drawText("Utgifter", {
      x: 50,
      y: height - y,
      size: 14,
      font: fontBold,
    });
    y = y + 24;

    props.ledger
      .filter(
        (item) =>
          item.accountFrom === "user" &&
          item.category !== TransactionCategory.Debt
      )
      .forEach((expense) => {
        page.drawText("Kategori: " + expense.accountTo, {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Beløp: " + expense.amount + "kr", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 26;
        if (checkY(y)) {
          page = pdfDoc.addPage();
          y = 80;
        }
      });

    page.drawText(
      "Totalt utgifter: " +
        calculateMoneyOut(
          props.ledger.filter(
            (item) =>
              item.accountFrom === "user" &&
              item.category != TransactionCategory.Debt
          )
        ) +
        "kr pr. måned",
      {
        x: 50,
        y: height - y,
        size: 14,
        font: fontBold,
      }
    );

    y = y + 44;

    page.drawLine({
      start: { x: 80, y: height - y },
      end: { x: 520, y: height - y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
      opacity: 0.75,
    });
    y = y + 44;

    page = pdfDoc.addPage();
    y = 80;

    page.drawText("4. Resultat", {
      x: 50,
      y: height - y,
      size: 20,
      font: fontBold,
    });
    y = y + 26;

    page.drawText("Balanse", {
      x: 50,
      y: height - y,
      size: 14,
      font: fontBold,
    });
    y = y + 24;

    page.drawText("Penger ut: " + calculateMoneyOut(props.ledger) + " kr", {
      x: 50,
      y: height - y,
      size: 12,
      font: font,
    });

    y = y + 22;

    page.drawText("Penger inn: " + calculateMoneyIn(props.ledger) + " kr", {
      x: 50,
      y: height - y,
      size: 12,
      font: font,
    });

    y = y + 24;

    {
      if (Savingspotential() > 0) {
        page.drawText("Potensiell sparing: " + Savingspotential(), {
          x: 50,
          y: height - y,
          size: 14,
          font: fontBold,
        });
      }
    }
    {
      if (Savingspotential() < 0) {
        page.drawText("Underskudd: " + Savingspotential(), {
          x: 50,
          y: height - y,
          size: 14,
          font: fontBold,
        });
      }
    }

    y = y + 44;

    page.drawLine({
      start: { x: 80, y: height - y },
      end: { x: 520, y: height - y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
      opacity: 0.75,
    });
    y = y + 44;

    page.drawText("5. Budsjett", {
      x: 50,
      y: height - y,
      size: 20,
      font: fontBold,
    });
    y = y + 26;

    page.drawText("Justerte utgifter", {
      x: 50,
      y: height - y,
      size: 14,
      font: fontBold,
    });
    y = y + 24;

    adjustedLedger
      .filter(
        (item) =>
          item.accountFrom === "user" &&
          item.category !== TransactionCategory.Debt
      )
      .forEach((expense) => {
        page.drawText("Kategori: " + expense.accountTo, {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 22;
        page.drawText("Beløp: " + expense.amount + "kr", {
          x: 50,
          y: height - y,
          size: 12,
          font: font,
        });
        y = y + 26;

        if (checkY(y)) {
          page = pdfDoc.addPage();
          y = 80;
        }
      });

    y = y + 24;

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
