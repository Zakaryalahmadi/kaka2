// import { Router } from "express";
// import { RouterConfiguration } from "./router-config";
// import { DocumentController } from "../controllers/document.controller";

// export class DocumentRouter implements RouterConfiguration {
//   private readonly _router = Router();
//   private readonly _documentController: DocumentController;

//   constructor(documentController: DocumentController) {
//     this._documentController = documentController;

//     this.initRoutes();
//   }

//   get router(): Router {
//     return this._router;
//   }

//   initRoutes(): void {
//     this._router.post("/sendDocument", (req, res) =>
//       this._documentController.send(req, res)
//     );
//   }
// }
import { Router } from "express";
import { DocumentController } from "../controllers/document.controller";
import { DocumentService } from "../services/document.service";

const router = Router();
const documentService = new DocumentService();
const documentController = new DocumentController(documentService);

router.post("/sendDocument", documentController.send.bind(documentController));

export default router;
