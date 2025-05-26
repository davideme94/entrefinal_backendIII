// ✅ RUTA CORREGIDA
import productsManager from "../daos/mongo/productsManager.js";

class ProductsController {
  async create(req, res, next) {
    try {
      let { title, category, thumbnails, price, stock } = req.body;

      if (!title) return res.status(400).json({ error: "Title is required" });

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
      const {
        query,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        sort,
        page = 1,
        limit = 10
      } = req.query;

      const filters = {};
      if (query) filters.category = query;
      if (minPrice) filters.price = { $gte: Number(minPrice) };
      if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
      if (minStock) filters.stock = { $gte: Number(minStock) };
      if (maxStock) filters.stock = { ...filters.stock, $lte: Number(maxStock) };

      const options = {
        page: Number(page),
        limit: Number(limit),
        lean: true,
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
      };

      const productsData = await productsManager.getAll(filters, options);

      const queryParams = new URLSearchParams({
        query: query || "",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
        minStock: minStock || "",
        maxStock: maxStock || "",
        sort: sort || "",
        limit: limit || ""
      }).toString();

      res.render("products", {
        title: "Product List",
        products: productsData.docs || [],
        pagination: {
          totalPages: productsData.totalPages,
          currentPage: productsData.page,
          hasNextPage: productsData.hasNextPage,
          hasPrevPage: productsData.hasPrevPage,
          nextPage: productsData.nextPage,
          prevPage: productsData.prevPage,
          limit
        },
        query,
        minPrice,
        maxPrice,
        minStock,
        maxStock,
        sort,
        limit,
        queryString: `&${queryParams}`
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const product = await productsManager.getById(req.params.pid);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      let { thumbnails } = req.body;
      if (typeof thumbnails === "string") {
        thumbnails = [thumbnails];
      }

      const updatedProduct = await productsManager.update(req.params.pid, {
        ...req.body,
        thumbnails
      });
      if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedProduct = await productsManager.delete(req.params.pid);
      if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

      res.status(200).json({ message: "Product deleted successfully", id: deletedProduct._id });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
