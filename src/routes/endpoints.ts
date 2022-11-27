import express from "express";
import controller from "../controller/product";

const router = express.Router();

router.get("/product/:id/:price_id", controller.getPrices);
router.post("/product/:id", controller.addPrice);
router.put("/product/:id", controller.changePrice);
router.delete("/product/:id", controller.removeProduct);

export = router;
