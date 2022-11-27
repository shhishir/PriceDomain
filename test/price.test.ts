import { describe, expect, test } from '@jest/globals';
import { ProductPricingConsoleLogger } from '../src/models/consoleLogger';
import { ProductPricingService } from '../src/models/implementation';
import { PriceId, Product, ProductId } from '../src/models/types';

describe('pricing service', () => {
    const product_id = new ProductId("1")
    let product_pricing: Product = new ProductPricingService(product_id)
    product_pricing = new ProductPricingConsoleLogger(product_id, product_pricing)

    test('testing query without prices', () => {
        let prices = product_pricing.query(x => x.market.name == "Denmark")

        expect(prices.length).toBe(0);
    });

    test('testing with prices', () => {
        product_pricing.execute({
            type: "add_price", price_details: {
                market: { id: { value: 1 }, name: 'Denmark' },
                id: new PriceId("1"),
                from_date: new Date(2022, 10, 10),
                until_date: new Date(2022, 10, 10),
                price: 1000,
                currency: { id: "DKK" },
            }
        })
        let prices = product_pricing.query(x => x.market.name == "Denmark")

        expect(prices.length).toBe(1);
        expect(prices[0].price).toBe(1000);
    });
});