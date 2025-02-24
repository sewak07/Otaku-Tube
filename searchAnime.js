let animeDescription = document.querySelector(".animeDescription");
let searchBox = document.querySelector("#searchBox");
let searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (query === "") {
        animeDescription.textContent = "Please enter the name of an anime.";
        return;
    }
    animeDescription.textContent = "";
    fetchAnimeList(query);
});

const fetchAnimeList = async (query) => {
    try {
        const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Anime not found");
        }

        let data = await response.json();
        console.log(data);

        if (data.data.length === 0) {
            animeDescription.textContent = "Anime not found";
            return;
        }

        animeDescription.innerHTML = ""; // Clear previous results

        data.data.forEach((anime) => {
            animeDescription.innerHTML += `
            <div class='insideSearchAnime'>
                <center><img src='${anime.images.jpg.image_url}' class='searchAnimeImage'></center><br><br>
                <center><h2>${anime.title}</h2><br><center>
                <h3>${anime.status}</h3><br>
                <p>Rating: ${anime.rating}</p><br>
                <button class="readMore" data-id="${anime.mal_id}">Read More</button><br><br><br>
                ${anime.trailer?.embed_url ? `<a href="${anime.trailer.embed_url}" target="_blank">Watch Trailer</a>` : '<p>No Trailer Available</p>'}
            </div>
        `;
        });

        // Add event listener to Read More buttons
        document.querySelectorAll(".readMore").forEach(button => {
            button.addEventListener("click", (event) => {
                const animeId = event.target.getAttribute("data-id");
                if (animeId) {
                    window.location.href = `animeDetails.html?id=${animeId}`; // ✅ Pass anime ID correctly
                } else {
                    console.log("Error: animeId is missing.");
                }
            });
        });

    } catch (error) {
        console.log("Error:", error);
        animeDescription.textContent = "Error fetching anime details.";
    }
};

// Shows Naruto details by default when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchAnimeList("Naruto");
});

// Allow search by pressing Enter
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

