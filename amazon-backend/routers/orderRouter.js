import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import * as axios from "axios";
const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({
        message: "Cart is empty",
      });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      //TODO:add api to calculate greenCredits earned by user
      //greenCredits = calculateCredits(req.body.orderItems);
      axios.default.post("http://localhost:8989/api/users/updateGreenCredits", {
        _id: req.user._id,
        greenCredits: greenCredits, //calculate from the greenCredits api yet to add
        action: "add", //on order they might earn some credits. While ordering they might use greenCredits to pay so add that logic
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({
          message: "New order created.",
          order: createdOrder,
          user: updateUser,
        }); //updatedUser fetched by the greenCredits updating api
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updateOrder = await order.save();
      res.send({
        message: "Order paid.",
        order: updateOrder,
      });
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  })
);

export default orderRouter;
