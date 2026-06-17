

const searchTrailer = async (req, res) => {
  try {
    const movie = req.query.movie;

    const url =
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movie)}+trailer&type=video&maxResults=1&videoEmbeddable=true&key=${process.env.YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (!data.items || data.items.length === 0) {
      return res.json({
        success: false,
        message: "Trailer not found"
      });
    }

    const videoId = data.items[0].id.videoId;

    res.json({
      success: true,
      trailerUrl: `https://www.youtube.com/embed/${videoId}`
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
module.exports={searchTrailer}