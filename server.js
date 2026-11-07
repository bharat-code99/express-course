import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Routes
app.use("/api/posts", router);

// HTML Pages
app.use(express.static(path.join(__dirname, "public")));

app.use(notFound);

app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
