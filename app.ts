// import express, { Application } from "express";
// import bodyParser from "body-parser";
// import compression from "compression";
// import cors from "cors";
// import "dotenv/config";
// import documentRouter from "./routes/document-router";

// const app: Application = express();

// // Express configuration
// app.use(compression());
// app.use(cors({ origin: "http://localhost:4200" }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Router
// app.use("/api/documents", documentRouter);

// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK" });
// });

// export default app;

// import { Express, Request, Response } from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { DocumentController } from "./controllers/document.controller";
// import { RouterConfiguration } from "./routes/router-config";
// import compression from "compression";

// export class AppConfigurationBuilder {
//   private app?: Express;
//   private documentController?: DocumentController;
//   private documentRouter?: RouterConfiguration;

//   withApp(app: Express): AppConfigurationBuilder {
//     this.app = app;
//     return this;
//   }

//   withDocumentController(
//     controller: DocumentController
//   ): AppConfigurationBuilder {
//     this.documentController = controller;
//     return this;
//   }

//   withDocumentRouter(router: RouterConfiguration): AppConfigurationBuilder {
//     this.documentRouter = router;
//     return this;
//   }

//   useMiddlewares(): AppConfigurationBuilder {
//     if (!this.app) {
//       throw new Error("Express app is not set.");
//     }

//     this.app
//       .use(compression())
//       .use(
//         cors({
//           origin: "http://localhost:4200",
//         })
//       )
//       .use(bodyParser.json())
//       .use(bodyParser.urlencoded({ extended: true }));

//     return this;
//   }

//   useRoutes(): AppConfigurationBuilder {
//     if (!this.app) {
//       throw new Error("Express app is not set.");
//     }
//     if (!this.documentRouter) {
//       throw new Error("Card router is not set.");
//     }

//     this.app
//       .use("/api/health", (req: Request, res: Response) =>
//         res.json({ message: "ok" })
//       )
//       .use("/api", this.documentRouter.router);

//     return this;
//   }

//   build(): Express {
//     if (!this.app) {
//       throw new Error("Express app is not configured.");
//     }

//     return this.app;
//   }
// }

import express, { Application } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import documentRouter from "./routes/document-router";

class AppBuilder {
  private app: Application;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    this.app.use(cors({ origin: "http://localhost:4200" }));
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.addRoutes();
  }

  private addRoutes(): void {
    this.app.use("/api", documentRouter);
    this.app.get("/api/health", (req, res) => {
      res.json({ message: "OK" });
    });
  }

  build(): Application {
    return this.app;
  }
}

export default AppBuilder;
