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
};
