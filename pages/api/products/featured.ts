import { NextApiRequest, NextApiResponse } from "next";
import { productsController } from "controllers/products";
const { send } = require("micro");
const methods = require("micro-method-router");
import corsMiddleware from "middlewares/corsMiddleware";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await productsController.getFeaturedProducts();
    await send(res, 200, data);
  } catch (error) {
    await send(res, 404, {
      status: error.status,
      message: error.message,
    });
  }
}

const handlers = methods({
  get: getHandler,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, handlers);
};
