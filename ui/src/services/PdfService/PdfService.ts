
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFHexString, PDFString, PDFStream, PDFRawStream, decodePDFRawStream } from 'pdf-lib';

export interface RawAttachment {
    filename: PDFHexString | PDFString,
    fileSpec: PDFDict
}
export interface Attachment {
    name: string,
    data: Uint8Array
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
    
    public async getAttachments(doc: PDFDocument): Promise<Attachment[]> {
        const raw = await this.getRawAttachments(doc);
        return raw.map((a) => {
            const stream = a.fileSpec
                .lookup(PDFName.of("EF"), PDFDict)
                .lookup(PDFName.of("F"), PDFStream) as PDFRawStream;
            return {
                name: a.filename.decodeText(),
                data: decodePDFRawStream(stream).decode()
            };
        });
    }
    public decodeAttachment(attachment: Attachment) : string {
        const decoder = new TextDecoder();
        return decoder.decode(attachment.data);
    }
}

export default PdfHandler;