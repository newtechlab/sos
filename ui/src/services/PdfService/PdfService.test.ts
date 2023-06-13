import PdfHandler, { DecodableAttachment } from "./PdfService";
import {PDFDocument, PDFPage, rgb} from "pdf-lib";
global.TextDecoder = require("util").TextDecoder;

const attachmentName = "data.json";
const testData = {
    id: "something",
    index: 42,
    height: 1.337,
    complex: {
        i: -3.14,
        r: 1.618
    }
};

describe("The PdfHandler", ()=>{
    
    test("it should load", async()=>{
        const handler = await setupHandler();
        expect(handler).not.toBeNull();
    }); 
    test("it should decode attachments", async ()=>{
        const attachments = await setupAttachment();
        expect(attachments.length).toBe(1);
    });
    test("it should decode the correct attachment name", async ()=>{
        const attachment = await getAttachment(0);
        
        expect(attachment.name).toBe(attachmentName);
    });
    test("it should read attachments correctly", async ()=>{
        const attachment = await getAttachment(0);
        expect(attachment.decodeAttachment()).toBe(JSON.stringify(testData));
    });
});

function encodeData(data:any){
    const dataStr = JSON.stringify(data);
    return Buffer.from(dataStr).toString("base64");
}
async function setupDoc():Promise<Uint8Array>{
    const doc = await PDFDocument.create().then();
    const page = PDFPage.create(doc);
    page.drawText("Hello, PDF");
    page.drawCircle({x:200, y:150, size: 100, borderWidth: 5, borderColor: rgb(1,0,1)});
    await doc.attach(encodeData(testData), attachmentName);
    return doc.save();
}
async function setupHandler():Promise<PdfHandler>{
    const data = await setupDoc();
    return new PdfHandler(data.buffer);
}
async function setupAttachment():Promise<DecodableAttachment[]>{
    const handler = await setupHandler();
    return handler.getAttachments();
}
async function getAttachment(idx:number):Promise<DecodableAttachment>{
    return (await setupAttachment())[idx];
}