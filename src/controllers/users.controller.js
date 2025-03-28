import productsManager from "../data/mongo/productsManager.js";

class ProductsController {
    async create(req, res, next) {
        try {
            let { title, category, thumbnails, price, stock } = req.body;

            if (!title) return res.status(400).json({ error: 'Title is required' });

            // ✅ Convertir thumbnails en un ARRAY si es un string o no está definido
            if (!thumbnails) {
                thumbnails = [];
            } else if (typeof thumbnails === "string") {
                thumbnails = [thumbnails];
            }

            const newProduct = await productsManager.create({ title, category, thumbnails, price, stock });
            res.status(201).json({ id: newProduct._id, message: "Product created successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const { category, minPrice, maxPrice, minStock, maxStock, sort, page = 1, limit = 15 } = req.query;
    
            const productsData = await productsManager.getAll({
                category,
                minPrice,
                maxPrice,
                minStock,
                maxStock,
                sort,
                page,
                limit,
            });
    
            const products = productsData.docs || productsData;
    
            res.render("products", {
                title: "Product List",
                products,
                pagination: {
                    totalPages: productsData.totalPages,
                    currentPage: productsData.page,
                    hasNextPage: productsData.hasNextPage,
                    hasPrevPage: productsData.hasPrevPage,
                    nextPage: productsData.nextPage,
                    prevPage: productsData.prevPage,
                    limit, // ✅ Enviar el límite a la vista
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await productsManager.getById(req.params.pid);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            let { thumbnails } = req.body;

            // ✅ Convertir thumbnails en un array si es necesario
            if (typeof thumbnails === "string") {
                thumbnails = [thumbnails];
            }

            const updatedProduct = await productsManager.update(req.params.pid, { ...req.body, thumbnails });
            if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

            res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const deletedProduct = await productsManager.delete(req.params.pid);
            if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

            res.status(200).json({ message: "Product deleted successfully", id: deletedProduct._id });
        } catch (error) {
            next(error);
        }
    }
}

// ✅ Exportación para ES Modules

export default new ProductsController();