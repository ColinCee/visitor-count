import crypto from "crypto";
import secret from "./secret.json";

export default (time: number, hash: string) => {
  const data = secret.key + time;
  const producedHash = crypto
    .createHash("sha256")
    .update(data)
    .digest("base64");

  console.log(producedHash);
  return producedHash === hash;
};
