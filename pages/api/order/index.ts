/**
  POST /order?productId={id}
Este un endpoint seguro, chequea el token y recupera la data del user de la db. Recibe por query param el id del producto a comprar (productId) y adicionalmente toda la data extra sobre esta compra en el body. Por ejemplo: detalles del envío, modificaciones sobre el producto como tamaño, color etc.
Genera la orden en nuestra base de datos (un registro en la collection orders) y a continuación la preferencia en MercadoPago. Para poder reconocer esta orden más adelante vamos a utilizar el campo external_reference para indicarle el id de la orden de nuestra DB. Además vamos a setear la URL de nuestro hook en el campo notification_url.

Este endpoint debe responder con la URL a donde debemos redirigir al user.
*/

import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "middlewares/authMiddleware";
import { orderControllers } from "controllers/orders";
const { send } = require("micro");
const methods = require("micro-method-router");

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  decodedToken
) => {
  try {
    if (!req.query.productId) res.send(404);
    const { details } = req.body;
    const queries = Array.isArray(req.query.productId)
      ? req.query.productId
      : [req.query.productId];
    const newOrder = await orderControllers.newOrder(
      queries,
      details,
      decodedToken
    );
    send(res, 201, { newOrder });
  } catch (error) {
    send(res, 402, { error });
  }
};
const handlers = methods({
  post: handler,
});
export default authMiddleware(handlers);
