import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendCodeByEmail(to: string, code: number) {
  return await sgMail.send({
    to, // Change to your recipient
    from: "marcosreuquendiaz@gmail.com", // Change to your verified sender
    subject: `Tu código de ingreso`,
    html: `
    <div>
      <h2>Tu código de ingreso a X página es: </h2>
      <h1><b>${code}</b></h1>
    </div>
    `,
  });
}
