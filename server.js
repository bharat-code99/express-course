import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/api/", (req, res) => {
  res.send({ message: "Home Page" });
});

app.get("/api/about", (req, res) => {
  res.send({ message: "About Page" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.listen(8000, () => console.log(`Server running on port: ${8000}`));
