let animeDescription = document.querySelector(".animeDescription");
let searchBox = document.querySelector("#searchBox");
let searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (query === "") {
        animeDescription = "please enter the name of anime";
        return;
    }
    animeDescription.textContent = "";
    getAnimeDetails(query);
});


const getAnimeDetails = async (query) => {
    try {
        const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`
        const response = await fetch(url);

        if (!response.ok) {
            throw new error("Anime not found")
        }

        let data = await response.json();
        console.log(data);

        if (data.data.length === 0) {
            animeDescription.textContent = "Anime not found";
            return;
        }

        data.data.forEach((anime) => {
            animeDescription.innerHTML += `
        <div class='insideSearchAnime'>
        <center><img src='${anime.images.jpg.image_url}' class='searchAnimeImage'></center><br><br>
        <center><h2>${anime.title}</h2><br><center>
        <h3>${anime.status}</h3><br>
        <p>Rating: ${anime.rating}</p><br><br><br>
        <p>${anime.synopsis}</p>
        ${anime.trailer?.embed_url ? `<a href="${anime.trailer.embed_url}" target="_blank">Watch Trailer</a>` : '<p>No Trailer Available</p>'
        }
        </div>
        `;
        });
    } catch (error) {
        console.log("anime not found", error);
    }
};

//shows naruto details by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getAnimeDetails("Naruto");
});


searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
