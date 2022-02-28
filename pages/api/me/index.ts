import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "middlewares/authMiddleware";
const { send } = require("micro");
const methods = require("micro-method-router");
import {} from "controllers/users";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  decodedToken: tokenData
) {}
async function patchHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  decodedToken: tokenData
) {}

const handlers = methods({
  get: getHandler,
  patch: patchHandler,
});
export default authMiddleware(handlers);

//GET /me
//Es un endpoint seguro (o sea que verifica que el request tenga token y que sea correcto) y en base al token debe devolver la información de ese user. En el caso de un token incorrecto debe devolver 401.

//PATCH /me
//Permite modificar algunos datos del usuario al que pertenezca el token.
