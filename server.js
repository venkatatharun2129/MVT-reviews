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

connectDB();
const app = express();
// Security middlewares
//app.use(helmet());
app.use(express.json());
app.use(cookieParser());

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

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get("/movie/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "movie.html"));
});
app.get("/actors/:id/movies", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "actorMovies.html"));
});
app.get("/actors", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "actors.html"));
});
app.get("/filter", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "filter.html"));
});
app.get("/top-rated", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "top-rated.html"));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
