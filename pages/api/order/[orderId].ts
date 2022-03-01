import { NextApiRequest, NextApiResponse } from "next";
const { send } = require("micro");
const methods = require("micro-method-router");
import * as yup from "yup";
import { validateQuerySchema } from "middlewares/validateSchema";
import authMiddleware from "middlewares/authMiddleware";
import { orderControllers } from "controllers/orders";

const querySchema = yup.object().shape({
  orderId: yup.string().required(),
});

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orderId = req.query.orderId as string;
    const data = await orderControllers.getOrder(orderId);
    await send(res, 200, data);
  } catch (error) {
    await send(res, 404, { error });
  }
}

const handlers = methods({
  get: getHandler,
});
const validation = validateQuerySchema(querySchema, handlers);

export default authMiddleware(validation);
