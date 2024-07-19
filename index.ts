import http from "http";
import AppBuilder from "./app";

const app = new AppBuilder().build();

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

// import express from "express";
// import dotenv from "dotenv";
// import { DocumentService } from "./services/document.service";
// import { DocumentController } from "./controllers/document.controller";
// import { RouterConfiguration } from "./routes/router-config";
// import { DocumentRouter } from "./routes/document-router";
// import { AppConfigurationBuilder } from "./app";

// dotenv.config();

// const HOST = process.env.HOST || "localhost";
// const PORT: number = Number(process.env.PORT) || 8080;

// const documentService = new DocumentService();
// const documentController = new DocumentController(documentService);
// const documentRouter: RouterConfiguration = new DocumentRouter(
//   documentController
// );

// try {
//   const app = new AppConfigurationBuilder()
//     .withApp(express())
//     .useMiddlewares()
//     .withDocumentController(documentController)
//     .withDocumentRouter(documentRouter)
//     .useRoutes()
//     .build();

//   app.listen(PORT, () => {
//     console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
//   });
// } catch (e) {
//   console.error(e);
// }
