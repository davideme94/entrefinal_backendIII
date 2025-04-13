import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./src/auth/passport.js";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import productsManager from "./src/data/mongo/productsManager.js";

// 📌 Middlewares propios
import pathHandler from "./src/middlewares/pathHandler.js";
import errorHandler from "./src/middlewares/errorHandler.js";

// 📌 Routers
import indexRouter from "./src/routers/index.router.js";
import cartsRouter from "./src/routers/api/carts.router.js";
import productsRouter from "./src/routers/api/products.router.js";
import usersRouter from "./src/routers/api/users.router.js";
import sessionsRouter from "./src/routers/api/sessions.router.js";

// 📌 Configuración de servidor
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// 📌 Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

// 📌 Configuración de Handlebars con helpers
app.engine("hbs", exphbs.engine({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "src", "views", "layouts"),
  partialsDir: path.join(__dirname, "src", "views", "partials"),
  helpers: {
    eq: (a, b) => a === b,
    multiply: (a, b) => a * b
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));

// 📌 Middlewares generales
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// 📌 Passport
initializePassport();
app.use(passport.initialize());

// 📌 Rutas
app.use("/", indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

// 📌 WebSockets para productos en tiempo real
io.on("connection", async (socket) => {
  console.log(`📡 Cliente conectado: ${socket.id}`);
  const products = await productsManager.getAll();
  socket.emit("products", products);

  socket.on("newProduct", async (productData) => {
    await productsManager.create(productData);
    const updatedProducts = await productsManager.getAll();
    io.emit("products", updatedProducts);
  });
});

// 📌 Manejadores de errores
app.use(pathHandler);
app.use(errorHandler);

// 📌 Iniciar servidor
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
