/**
 * @author Farhin Damania
 * @email fr454807@dal.ca
 */
import express from "express";
import {addPaymentForm} from "../controllers/paymentController.js"
const router = express.Router();


router.post("/addPaymentForm", addPaymentForm);

export default router;