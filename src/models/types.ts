export type MarketId = {
  value: number;
};

export class PriceId {
  value: number;
  constructor(value: string) {
    this.value = parseInt(value);
  }
}

export class ProductId {
  value: number;
  constructor(value: string) {
    this.value = parseInt(value);
  }
}

export class Currency {
  id: "DKK" | "USD" | "NRP" | "PHP" | "EUR";
  constructor(value: any) {
    this.id = value;
  }
}

export type Market = {
  id: MarketId;
  name: string;
};

export type Price = {
  id: PriceId;
  market: Market;
  from_date: Date;
  until_date?: Date;
  price: number;
  currency: Currency;
};

export type AddPriceCommand = {
  type: "add_price";
  price_details: Price;
};

export type ChangePriceCommand = {
  type: "change_price";
  id: PriceId;
  price: number;
  currency: Currency;
};

export type RemovePriceCommand = {
  type: "remove_price";
  id: PriceId;
};

export type Result = {
  status: "success" | "error_price_missing";
};

export type Command = AddPriceCommand | ChangePriceCommand | RemovePriceCommand;

export interface Product {
  id: ProductId;
  query(query: (price: Price) => boolean): Price[];
  execute(command: Command): Result;
}
