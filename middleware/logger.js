import colors from "colors";

const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };

  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[methodColors[req.method] || "white"],
  );
  next();
};

export default logger;
