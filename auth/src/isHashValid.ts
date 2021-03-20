import crypto from "crypto";
import secret from "./secret.json";

export default (time: string, hash: string) => {
  const data = secret.key + time;
  const producedHash = crypto
    .createHash("sha256")
    .update(data)
    .digest("base64");

  console.log(`Produced hash: ${producedHash}`);
  return producedHash === hash;
};
