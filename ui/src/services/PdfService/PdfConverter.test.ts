import { CreatePdfProps } from "./PdfWriterService";
import { HouseSituation, Car } from "../../App";
import { AdjustmentAmountPercent, LedgerRowId } from "../../components/ResultatInteract";
global.TextEncoder= require("util").TextEncoder;


describe("The PdfConverter", ()=>{
    
    test("it should be able to read attachments from a valid array buffer", async ()=>{
        const props: CreatePdfProps = {
            pets: [{ 
                id: "id",
                name: "foo"
            }],
            ledger: [],
            familyMembers: [{
                id: "id",
                name: "name",
                age: "age"
              }],
            adjustments: new Map<LedgerRowId, AdjustmentAmountPercent>(),
            userDetails: {
                goal: {
                    name: "name",
                    amount: 123
                },
                car: Car.NOTOWN,
                house: HouseSituation.OWN,
                otherAssets: "",
              },
            previousData: [],
            addImage: false
        }

        // TODO: there seems to be an issue running this from jest, will come back to this
        // const blob = await PdfWriterService.createPdf(props);
        
        // const attachments = await PdfConverter.getAttachmentAsObject(await blob.arrayBuffer())

        // expect(attachments.familyMembers).toEqual("foo");
        // expect(attachments.ledger).toEqual("bar");
        // expect(attachments.userDetails).toEqual("userDetails");
        // expect(attachments.previousData).toEqual("previousData");        
    });

});
