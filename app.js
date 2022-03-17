const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");

// Routes
const productRoutes = require("./apis/products/routes");
const shopRoutes = require("./apis/shops/shops.routes");
const orderRoutes = require("./apis/orders/routes");
const userRoutes = require("./apis/users/users.routes");

// DB
const connectDB = require("./db/database");

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Save the images in media folder
// In the db, we will save the url of this folder

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// http://localhost:8000/media/image_name
// Routes
app.use("/api/products", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

console.log(path.join(__dirname, "media"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
