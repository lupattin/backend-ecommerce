import type { NextApiRequest, NextApiResponse } from "next";
import { orderControllers } from "controllers/orders";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    orderControllers.processMerchantOrder(id);
  }
  res.status(200).send({ ok: true });
}
