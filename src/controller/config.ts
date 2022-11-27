import { ProductPricingConsoleLogger } from "../models/consoleLogger";
import { ProductPricingService } from "../models/implementation";
import { ProductId, Product } from "../models/types";

export const getPricingService = (product_id: ProductId) => {
  let product_pricing: Product = new ProductPricingService(product_id);
  product_pricing = new ProductPricingConsoleLogger(
    product_id,
    product_pricing
  );

  return product_pricing;
};
