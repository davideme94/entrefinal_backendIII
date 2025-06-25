import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend III",
      version: "1.0.0",
      description: "Documentación de la API para el proyecto final de Backend III"
    }
  },
  apis: ["./src/routers/api/*.js"]
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUiExpress };
