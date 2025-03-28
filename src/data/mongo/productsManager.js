import ProductModel from "../../models/products.model.js";

class ProductsManager {
  // 👉 Para la VISTA HTML (Handlebars)
  async getAll(filters = {}, options = {}) {
    const result = await ProductModel.paginate(filters, {
      ...options,
      lean: true
    });

    return result; // Esto se usa en el controller para Handlebars
  }

  // 👉 Para la API JSON
  async getAllRaw(query = {}) {
    const {
      category,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      sort,
      page = 1,
      limit = 10
    } = query;

    const filters = {};
    if (category) filters.category = category;
    if (minPrice) filters.price = { $gte: Number(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
    if (minStock) filters.stock = { $gte: Number(minStock) };
    if (maxStock) filters.stock = { ...filters.stock, $lte: Number(maxStock) };

    const sortOptions = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    const options = {
      page: Number(page),
      limit: Number(limit),
      lean: true,
      sort: sortOptions
    };

    const result = await ProductModel.paginate(filters, options);

    return {
      status: "success",
      payload: result.docs || [],
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      prevLink: result.hasPrevPage ? `/api/products/json?page=${result.prevPage}&limit=${limit}` : null,
      nextLink: result.hasNextPage ? `/api/products/json?page=${result.nextPage}&limit=${limit}` : null
    };
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async create(data) {
    if (!Array.isArray(data.thumbnails)) {
      data.thumbnails = data.thumbnails ? [data.thumbnails] : [];
    }
    return await ProductModel.create(data);
  }

  async update(id, newData) {
    if (newData.thumbnails && !Array.isArray(newData.thumbnails)) {
      newData.thumbnails = [newData.thumbnails];
    }
    return await ProductModel.findByIdAndUpdate(id, newData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductsManager();
