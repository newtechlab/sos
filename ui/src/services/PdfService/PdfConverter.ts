
import { FamilyMember, LedgerRow, UserInformation } from '../../App';
import { PdfFormat } from '../../components/Home';
import PdfHandler from './PdfService';

class PdfConverter {
   
    public static getAttachmentAsObject = async (data: string | ArrayBuffer | null): Promise<PdfFormat> => {
        let familyMembers: Array<FamilyMember> = [];
        let ledger: Array<LedgerRow> = []
        let userDetails: UserInformation | undefined = undefined
        const typedarray = new Uint8Array(data as ArrayBuffer);
        const pdfHandler = new PdfHandler(typedarray);
        const attachments = await pdfHandler.getAttachments();
        const attachmentsAsObject: any[] = attachments.map((a) => {
          const decoded = new TextDecoder().decode(a.data);
          const previousData: any = JSON.parse(decoded);
          return previousData;
        });
        // return attachmentsAsObject;

        // TODO: should we change this to not assume array, i.e. just get head
        attachmentsAsObject.map((attachment: any) => {
            if (attachment.history) {
              const a = attachment.history as Array<PdfFormat>;
              const mostRecentRecord = a.at(-1);
  
              if (mostRecentRecord) {
                if (mostRecentRecord.familyMembers) {
                    familyMembers = mostRecentRecord.familyMembers
                //   setFamilyMembers(mostRecentRecord.familyMembers);
                }
  
                if (mostRecentRecord.ledger) {
                    ledger = mostRecentRecord.ledger;
                //   setLedger(mostRecentRecord.ledger);
                }
  
                if (mostRecentRecord.userDetails) {
                    userDetails = mostRecentRecord.userDetails
                //   setUserDetails(mostRecentRecord.userDetails);
                }
              }
            }
          });

          return {
            familyMembers, 
            ledger,
            userDetails,
            previousData: attachmentsAsObject
          }

      } 
    
}

export default PdfConverter;