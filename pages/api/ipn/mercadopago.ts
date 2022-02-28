import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { sendEmail } from "lib/sendgrid";
import { Order } from "models/order";
//POST /webhooks/mercadopago
//Recibe la notificación sobre el pago, chequea el pago usando la API de MercadoPago y actualiza el estado de nuestra orden en la DB.

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const merchantOrder = await getMerchantOrder(id);

    if (merchantOrder.order_status == "paid") {
      const orderId = merchantOrder.external_reference;
      const order = await new Order(orderId);
      await order.pull();
      order.data.payments = merchantOrder.payments;
      await order.push();
      res.send(order);
      //sendEmail(orderId, order.id);
    }
  }
  // res.status(200).send("ok");
}
