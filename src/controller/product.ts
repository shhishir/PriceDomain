import { Request, Response } from "express";
import { ProductPricingConsoleLogger } from "../models/consoleLogger";
import { ProductPricingService } from "../models/implementation";
import {
  ProductId,
  Product,
  PriceId,
  Price,
  AddPriceCommand,
  ChangePriceCommand,
  Currency,
  RemovePriceCommand,
} from "../models/types";

const cache: { [key: number]: Product } = {};

export const getPricingService = (product_id: ProductId) => {
  if (cache[product_id.value]) {
    return cache[product_id.value];
  }
  let product_pricing: Product = new ProductPricingService(product_id);
  product_pricing = new ProductPricingConsoleLogger(
    product_id,
    product_pricing
  );
  cache[product_id.value] = product_pricing;
  return product_pricing;
};

const getPrices = async (req: Request, res: Response) => {
  let productId = new ProductId(req.params.id);
  let priceId = new PriceId(req.params.price_id);
  let svc = getPricingService(productId);
  let prices = svc.query((x) => x.id.value === priceId.value);

  return res.status(200).json({
    prices,
  });
};

const addPrice = async (req: Request, res: Response) => {
  let productId = new ProductId(req.params.id);
  let priceDetails = req.body as Price;
  let cmd: AddPriceCommand = { type: "add_price", price_details: priceDetails };
  let svc = getPricingService(productId);
  let result = svc.execute(cmd);

  return res.status(200).json({
    result,
  });
};

const changePrice = async (req: Request, res: Response) => {
  let productId = new ProductId(req.params.id);
  const { currency, price_id, price } = req.body;

  let cmd: ChangePriceCommand = {
    type: "change_price",
    id: new PriceId(price_id),
    currency: new Currency(currency),
    price: price,
  };
  let svc = getPricingService(productId);
  let result = svc.execute(cmd);

  return res.status(200).json({
    result,
  });
};

//delete a product
const removeProduct = async (req: Request, res: Response) => {
  let productId = new ProductId(req.params.id);
  const { price_id } = req.body;

  let cmd: RemovePriceCommand = {
    type: "remove_price",
    id: new PriceId(price_id),
  };
  let svc = getPricingService(productId);
  let result = svc.execute(cmd);

  return res.status(200).json({
    result,
  });
};

export default {
  getPrices,
  addPrice,
  changePrice,
  removeProduct,
};
