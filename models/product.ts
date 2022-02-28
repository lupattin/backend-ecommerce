import { productsIndex } from "db/algolia";
import { airtableBase } from "db/airtable";

export class Product {
  index = productsIndex;
  base = airtableBase;
  id: string;
  data: any;
  constructor(id) {
    this.id = id;
    this.data = this.index.getObject(this.id);
  }
}
