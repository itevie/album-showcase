import express from "express";
import fs from "fs";
import cors from "cors";
import { resolve } from "path";

const BASE = __dirname + "/../album";

const app = express();
app.use(cors());

function isNotSafe(what: string): boolean {
  return !!what.match(/$([./])/);
}

app.get("/api/images", (req, res) => {
  const folders = fs.readdirSync(BASE);
  const images: Record<string, string[]> = {};

  for (const folder of folders) {
    if (!images[folder]) images[folder] = [];
    const imagesInFolder = fs.readdirSync(BASE + "/" + folder);
    images[folder].push(...imagesInFolder);
  }

  return res.status(200).send(images);
});

app.get("/api/image/:folder/:name", (req, res) => {
  if (isNotSafe(req.params.folder) || isNotSafe(req.params.name))
    return res.status(400).send({
      messsage: "Invalid request",
    });

  const path = BASE + "/" + req.params.folder + "/" + req.params.name;
  if (!fs.existsSync(path))
    return res.status(404).send({
      message: "File Not Found",
    });

  return res.status(200).sendFile(resolve(path));
});

app.get("/api/album/:folder", (req, res) => {
  if (isNotSafe(req.params.folder))
    return res.status(400).send({
      message: "Invalid Request",
    });

  const path = BASE + "/" + req.params.folder;
  if (!fs.existsSync(path))
    return res.status(404).send({
      message: "Album Not Found",
    });

  const files = fs.readdirSync(path);
  return res.status(200).send(files);
});

app.listen(3000);
