import { Product } from "models/product";

export const productsController = {
  async searchProducts(offset: number, limit: number, query: string) {
    const { hits, nbHits } = await Product.index.search(query, {
      offset,
      length: limit,
    });
    return {
      results: hits,
      pagination: {
        offset,
        limit,
        total: nbHits,
      },
    };
  },
  async getProduct(id) {
    const product = await new Product(id);
    if (product.data.status == 404) {
      return {
        status: product.data.status,
        message: product.data.message,
      };
    } else {
      return product.data;
    }
  },
  async getProductsByIds(queries: string[]) {
    return Product.index.getObjects(queries);
  },
};
