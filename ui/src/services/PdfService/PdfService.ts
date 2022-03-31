
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFHexString, PDFString, PDFStream, PDFRawStream, decodePDFRawStream } from 'pdf-lib';
import { TextDecoder } from 'util';
export interface RawAttachment {
    filename: PDFHexString | PDFString,
    fileSpec: PDFDict
}
interface Attachment {
    name: string,
    data: Uint8Array
}
export class DecodableAttachment implements Attachment {
    name: string;
    data: Uint8Array;

    constructor(attachment: Attachment) {
            this.name = attachment.name;
            this.data = attachment.data;
    }
    public decodeAttachment() : string {
        const decoder = new TextDecoder();
        return decoder.decode(this.data);
    }

}
class PdfHandler {
    buffer: ArrayBuffer;

    constructor(buffer: ArrayBuffer) {
        this.buffer = buffer;
    }

    private async getRawAttachments(doc: PDFDocument): Promise<RawAttachment[]> {
        const names = doc.catalog.lookup(PDFName.of("Names"), PDFDict);
        const embeddedFiles = names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);
        const efnames = embeddedFiles.lookup(PDFName.of("Names"), PDFArray);
        const raw: RawAttachment[] = [];
        for (let idx = 0, len = efnames.size(); idx < len; idx += 2) {
            const filename = efnames.lookup(idx) as PDFHexString | PDFString;
            const fileSpec = efnames.lookup(idx + 1, PDFDict);
            raw.push({ filename, fileSpec });
        }
        return raw;
    }
    
    public async getAttachments(): Promise<DecodableAttachment[]> {
        const doc = await PDFDocument.load(this.buffer);
        const raw = await this.getRawAttachments(doc);
        return raw.map((a) => {
            const stream = a.fileSpec
                .lookup(PDFName.of("EF"), PDFDict)
                .lookup(PDFName.of("F"), PDFStream) as PDFRawStream;
            return new DecodableAttachment({
                name: a.filename.decodeText(),
                data: decodePDFRawStream(stream).decode()
            });
        });
    }
    
}

export default PdfHandler;