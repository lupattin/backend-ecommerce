import { createOrder, getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/order";
import { productsController } from "./products";
import { UsersController } from "./users";

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
      const order = await createOrder(newOrder);
      return order;
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
};
