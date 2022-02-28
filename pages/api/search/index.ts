import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromReq } from "middlewares/pagination";
import { airtableBase } from "db/airtable";
import { productsIndex } from "db/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getOffsetAndLimitFromReq(req, 100, 10000);

  const { hits, nbHits } = await productsIndex.search(
    req.query.search as string,
    {
      offset,
      length: limit,
    }
  );
  res.send({
    results: hits,
    pagination: {
      offset,
      limit,
      total: nbHits,
    },
  });
}
