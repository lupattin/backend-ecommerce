import { createMPPreference, getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/order";
import { productsController } from "./products";
import { UsersController } from "./users";
import { sendPaymentApprovedByEmail } from "lib/sendgrid";

export const orderControllers = {
  async newOrder(
    ids: string[],
    details: any,
    user: minimalAuthUserData
  ): Promise<any> {
    try {
      const { results } = await productsController.getProductsByIds(ids);
      const newOrder = await Order.createNewOrder({
        details,
        products: results,
        user,
        state: "pending",
      });
      await newOrder.pull();
      await UsersController.assignOrder(newOrder.id, user.userId);
      const paymentURL = await createMPPreference(newOrder);
      return { paymentURL, orderId: newOrder.id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getOrder(id: string): Promise<any> {
    try {
      const order: Order = await new Order(id);
      await order.pull();
      return order.data;
    } catch (error) {
      throw error;
    }
  },
  async recordOrder(order) {
    Order.base("Client orders").create(
      [
        {
          fields: {
            Client: order.data.user.userId,
            "Order no.": order.id,
            Status: order.data.state,
            "Total order cost": order.data.payments.total_paid_amount,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        return records.map((record) => {
          return record.getId();
        });
      }
    );
  },
  async processMerchantOrder(id): Promise<void> {
    const merchantOrder = await getMerchantOrder(id);
    if (merchantOrder.order_status == "paid") {
      const orderId = merchantOrder.external_reference;
      const order = await new Order(orderId);
      await order.pull();
      order.data.payments = merchantOrder.payments[0];
      order.data.status = "closed";
      await order.push();
      await sendPaymentApprovedByEmail(order.data.user.email);
      await this.recordOrder(order);
    }
  },
};
