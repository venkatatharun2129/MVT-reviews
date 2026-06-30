const moviePlatformId = window.location.pathname.split("/").pop();

const platformLinks = {
    Youtube: "https://www.youtube.com",
    Netflix: "https://www.netflix.com",
    "Amazon Prime Video": "https://www.primevideo.com",
    JioHotstar: "https://www.jiohotstar.com",
    Aha: "https://www.aha.video",
    ZEE5: "https://www.zee5.com",
    SonyLIV: "https://www.sonyliv.com",
    JioTv: "https://www.jiotv.com",
    "Sun NXT": "https://www.sunnxt.com",
    "ETV Win": "https://www.etvwin.com"
};

const platformLogos = {
    Youtube:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcN_KrTCWQoYXe5ewMCX3h5E9V2ANGbKvgwEl5JB5bA&s=10",
    Netflix:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/960px-Netflix_2015_logo.svg.png",
    "Amazon Prime Video":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Amazon_Prime_logo_%282024%29.svg/330px-Amazon_Prime_logo_%282024%29.svg.png",
    JioHotstar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JioHotstar_2025.png/500px-JioHotstar_2025.png",
    Aha: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Aha_%28streaming_service.svg/500px-Aha_%28streaming_service.svg.png",
    ZEE5: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/ZEE5_2025.svg/330px-ZEE5_2025.svg.png",
    SonyLIV:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/SonyLIV_2020.png/250px-SonyLIV_2020.png",
    JioTv: "https://www.jiotv.com/favicon.ico",
    "Sun NXT":
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Sun_NXT_logo_small.png",
    "ETV Win": "https://upload.wikimedia.org/wikipedia/en/4/49/ETV_Win.png"
};
const platforms = document.querySelector(".platforms");

async function fetchPlatforms() {
    try {
        const response = await fetch(`/api/movies/${moviePlatformId}`);
        const movie = await response.json();

        platforms.innerHTML = movie.watchOn?.length
            ? movie.watchOn
                  .map(
                      platform => `
      <a href="${platformLinks[platform] || "#"}" target="_blank">
        <img
          src="${platformLogos[platform]}"
          alt="${platform}"
          title="${platform}"
          class="platform-logo"
          referrerpolicy="no-referrer"
        >
      </a>
    `
                  )
                  .join("")
            : "<p>Not available on OTT platforms</p>";
    } catch (err) {
        console.log(err);
    }
}

fetchPlatforms();
