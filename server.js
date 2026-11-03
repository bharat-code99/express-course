import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/posts.js";

const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", router);

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// app.get("/api/", (req, res) => {
//   res.send({ message: "Home Page" });
// });

// app.get("/api/about", (req, res) => {
//   res.send({ message: "About Page" });
// });

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
