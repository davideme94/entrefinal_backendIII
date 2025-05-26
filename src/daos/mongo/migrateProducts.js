import mongoose from "mongoose";
import fs from "fs-extra";
import ProductModel from "../../models/products.model.js";

const filePath = "./src/data/fs/products.json";

const migrateProducts = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

        console.log("🟢 Conectado a MongoDB");

        // Leer los productos del archivo JSON
        const products = await fs.readJSON(filePath);

        // Transformar los datos para que cumplan con el esquema de MongoDB
        const sanitizedProducts = products.map(({ _id, thumbnails, ...rest }) => ({
            ...rest,
            thumbnails: Array.isArray(thumbnails) ? thumbnails[0] : thumbnails, // Toma el primer elemento si es array
        }));

        // Limpiar la base de datos antes de insertar nuevos productos
        await ProductModel.deleteMany({});
        console.log("🗑️ Se eliminaron todos los productos previos.");

        // Insertar productos en la base de datos
        await ProductModel.insertMany(sanitizedProducts);
        console.log("✅ Productos migrados correctamente.");
    } catch (error) {
        console.error("🔴 Error al migrar productos:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Ejecutar la migración
migrateProducts();
