import type { NextApiRequest, NextApiResponse } from "next";
import { airtableBase } from "db/airtable";
import { productsIndex } from "db/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  airtableBase("Furniture")
    .select({
      pageSize: 10,
    })
    .eachPage(
      async function (records, fetchNextPage) {
        const objects = records.map((r) => {
          return {
            objectID: r.id,
            ...r.fields,
          };
        });
        productsIndex.saveObjects(objects).catch((err) => console.log(err));
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        res.send("terminó");
      }
    );
}
