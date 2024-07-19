import { Response, Request } from "express";
import { DocumentService } from "../services/document.service";
import { RequestDocumentDto } from "../dtos/request/request-document-dto";

export class DocumentController {
  constructor(private documentService: DocumentService) {}

  async send(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as RequestDocumentDto;
      await this.documentService.sendDocuments(payload);
      res.json({ message: "Document sent successfully" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: (error as Error).message,
        errorCode: "INTERNAL_ERROR",
      });
    }
  }
}
