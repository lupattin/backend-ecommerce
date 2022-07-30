import { productsIndex } from "db/algolia";
import { airtableBase } from "db/airtable";

export class Product {
  static index = productsIndex;
  static base = airtableBase;
  id: string;
  data: any;
  constructor(id: string) {
    this.id = id;
    // this.data = Product.index.getObject(this.id);
  }

  /**
   * getData
   */
  public async getData() {
    if (!this.data) {
      this.data = await Product.index.getObject(this.id);
    }
    return this.data;
  }
}
