import { CreatePdfProps } from "./PdfWriterService";
import { HouseSituation } from "../../App";
global.TextEncoder= require("util").TextEncoder;


describe("The PdfConverter", ()=>{
    
    test("it should be able to read attachments from a valid array buffer", async ()=>{
        const props: CreatePdfProps = {
            ledger: [],
            familyMembers: [{
                id: "id",
                name: "name",
                age: "age"
              }],
            userDetails: {
                goal: {
                    name: "name",
                    amount: 123
                },
                car: {
                    own: false
                },
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