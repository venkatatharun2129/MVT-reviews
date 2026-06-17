const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const connectDB = require("./config/db");
const actorRoute = require("./routes/actorRoute");
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
app.use("/api/movies", movieRoute);
app.use("/api/actors", actorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trailer", trailerRoute);
app.use("/api/poster", posterRoute);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/movie/:id", (req, res) => {
    res.render("movie");
});
app.get("/actors/:id/movies", (req, res) => {
    res.render("actorMovies");
});
app.get("/actors", (req, res) => {
    res.render("actors");
});
app.get("/top-rated", (req, res) => {
    res.render("top-rated");
});
app.get("/about-contact", (req, res) => {
    res.render("about-contact");
});
app.get("/filter", (req, res) => {
    res.render("filter");
});
app.get("/legal", (req, res) => {
    res.render("legal");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
