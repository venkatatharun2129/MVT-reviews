const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const connectDB = require("./config/db");
const actorRoute = require("./routes/actorRoute");
const renderRoute = require("./routes/renderRoute");
const movieRoute = require("./routes/movieRoute");
const adminRoute = require("./routes/adminRoute");
const trailerRoute = require("./routes/trailerRoute");
const posterRoute = require("./routes/posterRoute");

connectDB();
const app = express();
// Security middlewares
//app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");

// CORS (important)
app.use(
    cors({
        origin: "http://localhost:5000", // change in production
        credentials: true
    })
);
app.use(express.urlencoded({ extended: true }));
app.use("/", renderRoute)
app.use("/api/movies", movieRoute);
app.use("/api/actors", actorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trailer", trailerRoute);
app.use("/api/poster", posterRoute);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
