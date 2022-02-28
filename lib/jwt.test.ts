import { generate, decode } from "./jwt";
import jwt from "jsonwebtoken";
import test from "ava";

test("Testing generate/decode token.", (t) => {
  const payload = {
    userId: "nfidj34565434",
    email: "mockingjayTestingQA12354@mockingjayTestingQA12354.io",
  };
  const token = generate(payload);
  const decodedToken = decode(token);
  delete decodedToken.iat;

  t.deepEqual(payload, decodedToken);
});

test("Testing sign token.", (t) => {
  const payload = {
    userId: "nfidj34565434",
    email: "mockingjayTestingQA12354@mockingjayTestingQA12354.io",
  };
  const token = generate(payload);
  let wrong;
  let real;

  jwt.verify(token, "wrongSecretToForceError", function (err, decoded) {
    // err
    if (err && decoded == undefined) wrong = true;
  });
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    // err
    if (decoded && err == undefined) real = true;
  });

  t.true(wrong && real);
});
