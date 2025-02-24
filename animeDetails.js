const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get("id");

console.log("Anime ID:", animeId); // Debugging: Check if animeId is null

const animeInfoDiv = document.querySelector("#animeInfo");

// If animeId is missing, show an error message
if (!animeId) {
    animeInfoDiv.innerHTML = "<h2>Error: No anime ID found.</h2>";
} else {
    fetchAnimeDetails(animeId); // ✅ Fetch details correctly
}

async function fetchAnimeDetails(animeId) {
    try {
        const url = `https://api.jikan.moe/v4/anime/${animeId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Anime not found");
        }

        let data = await response.json();
        console.log(data);
        let anime = data.data; // Get anime data
        

        animeInfoDiv.innerHTML = `
            <center>
            <img src="${anime.images.jpg.image_url}" class="searchAnimeImage"><br><br>
            <h2>${anime.title_english}</h2><br><br>
            <p><strong>Status:</strong> ${anime.status}</p>
            <p><strong>Duration:</strong> ${anime.duration}</p>
             <p><strong>Rating:</strong> ${anime.rating}</p>
            <p><strong>Score:</strong> ${anime.score}</p><br><br>
            </center>
            <p><strong>Synopsis:</strong> ${anime.synopsis}</p><br>
            <p><strong>Producers:</strong> ${anime.producers.map(p => p.name).join(', ')}</p><br><br>
            <center>
            <h1>Characters</h1>
            </center>
            <div id="animeCharacters">
                Loading characters...
            </div>
        
        `;

        // Fetch characters separately
        fetchAnimeCharacters(animeId);

    } catch (error) {
        console.log("Error:", error);
        animeInfoDiv.innerHTML = "<h2>Error fetching anime details.</h2>";
    }
}

async function fetchAnimeCharacters(animeId) {
    try {
        const charUrl = `https://api.jikan.moe/v4/anime/${animeId}/characters`;
        const response = await fetch(charUrl);

        if (!response.ok) {
            throw new Error("Characters not found");
        }

        let data = await response.json();
        console.log(data);
        let charactersDiv = document.querySelector("#animeCharacters");

        charactersDiv.innerHTML = data.data.slice(0, 10).map(character => `
            <div class="character">
                <img src="${character.character.images.jpg.image_url}" alt="${character.character.name}">
                <p>${character.character.name}</p>
                <p>${character.role}</p>
            </div>
        `).join("");

    } catch (error) {
        console.log("Error:", error);
        document.querySelector("#animeCharacters").innerHTML = "<p>No characters found.</p>";
    }
}
