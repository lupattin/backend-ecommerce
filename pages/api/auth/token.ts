import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { AuthController } from "controllers/auth";
import * as yup from "yup";
import { validateBodySchema } from "middlewares/validateSchema";

const bodySchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    code: yup.number().positive().required(),
  })
  .noUnknown(true)
  .strict();

const handler: Function = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, code } = req.body;
    const data: minimalAuthUserData =
      await AuthController.checkCodeAndExpiration(email, code);
    if (!data) res.status(401);
    const token: string = generate(data);
    res.send({ token });
  } catch (error) {
    res.status(401);
  }
};

export default validateBodySchema(bodySchema, handler);
