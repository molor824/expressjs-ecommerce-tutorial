import express from "express";
import * as ProductController from "../controllers/product-controller.js";
import authenticate from "../middleware/authenticate.js";
import checkAdmin from "../middleware/check-admin.js";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(authenticate, checkAdmin, ProductController.create);

router.route("/top").get(ProductController.getTop);
router
  .route("/:id/reviews")
  .get(ProductController.reviews)
  .post(authenticate, ProductController.createReview);

router
  .route("/:id")
  .get(ProductController.getById)
  .put(authenticate, checkAdmin, ProductController.update)
  .delete(authenticate, checkAdmin, ProductController.$delete);

export default router;
