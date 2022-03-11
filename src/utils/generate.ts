import crypto from "crypto";

export const generate = () => {
  return crypto.randomBytes(20).toString("hex");
};
