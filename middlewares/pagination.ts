import type { NextApiRequest, NextApiResponse } from "next";

export function getOffsetAndLimitFromReq(
  req: NextApiRequest,
  maxLimit: number,
  maxOffset: number
) {
  const queryLimit: number = parseInt((req.query.limit as string) || "0");
  const queryOffset: number = parseInt((req.query.offset as string) || "0");
  const limit: number = queryLimit
    ? queryLimit <= maxLimit
      ? queryLimit
      : maxLimit
    : 10;
  const offset: number = queryOffset < maxOffset ? queryOffset : 0;
  return {
    limit,
    offset,
  };
}
