const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const movies = await Movie.find({}, "_id updatedAt").lean();
    const actors = await Actor.find({}, "_id updatedAt").lean();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const pages = [
      "",
      "/movies",
      "/series",
      "/filter",
      "/top-rated",
      "/actors",
      "/about-contact",
      "search",
      "/legal"
    ];

    pages.forEach(page => {
      xml += `
      <url>
        <loc>https://www.mvtreviews.free.je${page}</loc>
        <changefreq>daily</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
      </url>`;
    });

    movies.forEach(movie => {
      xml += `
      <url>
        <loc>https://www.mvtreviews.free.je/movie/${movie._id}</loc>
        <lastmod>${new Date(movie.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`;
    });

    actors.forEach(actor => {
      xml += `
      <url>
        <loc>https://www.mvtreviews.free.je/actor/${actor._id}</loc>
        <lastmod>${new Date(actor.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);

  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;