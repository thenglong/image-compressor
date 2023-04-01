import crypto from "crypto";

export const getFileHash = (fileBuffer) => {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
};
