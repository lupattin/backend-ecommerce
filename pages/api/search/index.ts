import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromReq } from "middlewares/pagination";
import { productsController } from "controllers/products";

export default async function (req: NextApiRequest, res: NextApiResponse) {
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
