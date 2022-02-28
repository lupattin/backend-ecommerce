import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "middlewares/authMiddleware";
const { send } = require("micro");
const methods = require("micro-method-router");
import { UsersController } from "controllers/users";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  decodedToken: tokenData
) {
  try {
    const { address, newValue } = req.body;
    if (!address || !newValue)
      send(res, 400, { message: "address and newValue is required" });
    const data = await UsersController.updateAdressUserData(
      decodedToken.userId,
      address,
      newValue
    );
    await send(res, 200, data);
  } catch (error) {
    await send(res, 404, error);
  }
}

const handlers = methods({
  patch: getHandler,
});

export default authMiddleware(handlers);
