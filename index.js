import express from "express";
import multer from "multer";
import mime from "mime-types";
import { compressFile } from "./compress-file.js";

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 Server up and running on port ${port}`);
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/v1/compress-one", upload.single("file"), async (req, res) => {
  let min = 20;
  let max = 60;
  try {
    if (req.query?.min) {
      min = parseInt(req.query.min);
    }
    if (req.query?.max) {
      max = parseInt(req.query.max);
    }
  } catch (error) {
    res.status(400).send("min and max value not valid");
  }

  const compressedBuffer = await compressFile(req.file.buffer, { min, max });

  res.format({
    "image/*": function () {
      res.contentType(mime.lookup(req.file.originalname));
      res.send(compressedBuffer);
    },
    "application/json": function () {
      res.send({
        base64: `data:${mime.lookup(
          req.file.originalname
        )};base64,${compressedBuffer.toString("base64")}`,
      });
    },
    default: function () {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
});

app.post("/api/v1/compress-many", upload.array("files", 12), (req, res) => {
  console.log(req.files);
});
