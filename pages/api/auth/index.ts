import type { NextApiRequest, NextApiResponse } from "next";
import { AuthController } from "controllers/auth";
const { send } = require("micro");
const methods = require("micro-method-router");
import * as yup from "yup";
import { validateBodySchema } from "middlewares/validateSchema";

const bodySchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  })
  .noUnknown(true)
  .strict();

const postHandler: Function = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email } = req.body;
  try {
    const auth: minimalAuthUserData = await AuthController.findOrCreateAuth(
      email
    );
    const sended: boolean = await AuthController.sendCode(email);
    if (!sended && !auth) send(res, 401);
    send(res, 201);
  } catch (error) {
    send(res, 400, { message: error });
  }
};

const handlers = methods({
  post: postHandler,
});

export default validateBodySchema(bodySchema, handlers);

//POST /auth - Recibe un body con un email. Utiliza este email para encontrar/crear un registro auth. En el caso de que tenga que crear el registro de la collection/tabla auth también crea el registro user correspondiente. Genera un código con fecha de vencimiento y le envía el código por email (usando sendgrid) al user que haya solicitado autenticarse.
