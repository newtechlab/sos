import PdfHandler from "./PdfService";
import {PDFDocument, PDFPage, rgb} from "pdf-lib";

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
describe("The PdfHandler", ()=>{
    
    test("it should load", async()=>{
        const data = await setupDoc();
        const handler = new PdfHandler(data.buffer);
        expect(handler).not.toBeNull();
    }); 
    test("it should decode attachments", async ()=>{
        const data = await setupDoc();
        const handler = new PdfHandler(data.buffer);
        const attachments = await handler.getAttachments();
        expect(attachments.length).toBe(1);
    });
    test("it should decode the correct attachment name", async ()=>{
        const data = await setupDoc();
        const handler = new PdfHandler(data.buffer);
        const attachments = await handler.getAttachments();
        const attachment = attachments[0];
        expect(attachment.name).toBe(attachmentName);
    });
    test("it should read attachments correctly", async ()=>{
        const data = await setupDoc();
        const handler = new PdfHandler(data.buffer);
        const attachments = await handler.getAttachments();
        const attachment = attachments[0];
        expect(attachment.decodeAttachment()).toBe(JSON.stringify(testData));
    });
});