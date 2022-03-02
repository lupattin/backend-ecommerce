import { decode } from "lib/jwt";
import parseToken from "parse-bearer-token";
import { NextApiRequest, NextApiResponse } from "next";

export default function authMiddleware(cb: Function) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "there's no token" });
    } else {
      const decodedToken: tokenData = decode(token);
      if (decodedToken) {
        cb(req, res, decodedToken);
      } else {
        res.status(401).send({ message: "token not signed" });
      }
    }
  };
}
