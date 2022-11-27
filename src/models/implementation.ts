import {
  ChangePriceCommand,
  Command,
  Price,
  Product,
  ProductId,
  RemovePriceCommand,
  Result,
} from "./types";

export class ProductPricingService implements Product {
  id: ProductId;
  constructor(id: ProductId) {
    this.id = id;
  }
  all_prices: Price[] = [];

  query(query: (price: Price) => boolean): Price[] {
    return this.all_prices.filter(query);
  }

  execute(command: Command): Result {
    const success: Result = { status: "success" };
    switch (command.type) {
      case "add_price":
        this.all_prices.push(command.price_details);
        return success;
      case "change_price":
        const input = command as ChangePriceCommand;
        let price = this.all_prices.find((x) => x.id.value === input.id.value);
        if (price) {
          price.price = input.price;
          price.currency = input.currency;

          return success;
        } else {
          return { status: "error_price_missing" };
        }
      case "remove_price":
        const i = command as RemovePriceCommand;
        this.all_prices = this.all_prices.filter(
          (x) => x.id.value !== i.id.value
        );
        return success;
      default:
        return success;
    }
  }
}
