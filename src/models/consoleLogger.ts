import {
  ChangePriceCommand,
  Command,
  Price,
  Product,
  ProductId,
  Result,
} from "./types";

export class ProductPricingConsoleLogger implements Product {
  id: ProductId;
  next: Product;
  constructor(id: ProductId, next: Product) {
    this.id = id;
    this.next = next;
  }
  query(query: (price: Price) => boolean): Price[] {
    console.warn("executing query", query.toString(), this.next);
    const result = this.next.query(query);
    console.warn("query executed", { input: query.toString(), output: result });
    return result;
  }
  execute(command: Command): Result {
    console.warn("executing command", command);
    const result = this.next.execute(command);
    console.warn("command executed", { input: command, output: result });
    return result;
  }
}
