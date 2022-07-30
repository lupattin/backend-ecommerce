import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "middlewares/corsMiddleware";

async function test(req: NextApiRequest, res: NextApiResponse) {
  res.send({ ok: true });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await corsMiddleware(req, res, test);
}
