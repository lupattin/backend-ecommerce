import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromReq } from "middlewares/pagination";
import { productsController } from "controllers/products";
import corsMiddleware from "middlewares/corsMiddleware";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getOffsetAndLimitFromReq(req, 100, 10000);
  const query = req.query.q as string;
  try {
    const results = await productsController.searchProducts(
      offset,
      limit,
      query
    );
    res.send(results);
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, handler);
};
