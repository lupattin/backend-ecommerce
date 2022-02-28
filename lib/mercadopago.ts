import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

export async function getMerchantOrder(id) {
  const res = await mercadopago.merchant_orders.get(id);
  return res.response;
}

export async function createOrder(obj) {
  const preference = {
    items: obj.data.products.map((item) => {
      return {
        id: item.objectID,
        title: item.Name,
        description: item.Description,
        picture_url: item.Images[0].url,
        category_id: "cat123",
        quantity: 1,
        currency_id: "ARS",
        unit_price: item["Unit cost"],
      };
    }),
    back_urls: {
      success: "https://apx.school",
      failure: "https://google.com",
      pending: "https://apx.school/dwf",
    },
    external_reference: obj.id,
    notification_url:
      "https://webhook.site/3f695934-e3ca-4e3d-acd2-cb2c66b6db0a",
  };
  // const order = await mercadopago.preference.createOrder(preference);

  const order = await mercadopago.preferences.create(preference);
  // await (
  //   await fetch("https://api.mercadopago.com/checkout/preferences", {
  //     headers: {
  //       authorization: "Bearer " + process.env.MP_TOKEN,
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(preference),
  //   })
  // ).json();
  return order;
}
