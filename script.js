//shows info of top airing, left aside
let topAiring = document.querySelector(".topAiring");


let url = "https://api.jikan.moe/v4/top/anime?filter=airing";
const getUrl = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    data.data.forEach(anime => {
      topAiring.innerHTML += `
             <div class="insideTopAiring">
             <img src='${anime.images.jpg.image_url}' class='topAnimeImage'><br><br>
             <h4>${anime.title_english}</h4><br>
             <p>Rating: ${anime.rating}</p>
             <p>Score:${anime.score}</p>
             ${anime.trailer?.embed_url ? `<a href="${anime.trailer.embed_url}" target="_blank">Watch Trailer</a>` : '<p>No Trailer Available</p>'
        }
             `
    });

  } catch (error) {
    console.log("error occured here", error);
  }
}
getUrl();

//for middle part, shows recommendations
const recommendationsContainer = document.querySelector(".mainContent");
const paginationContainer = document.querySelector(".pagination");

const url2 = "https://api.jikan.moe/v4/recommendations/anime";
const itemsPerPage = 16; // Number of items to show per page
let recommendationsData = []; // To store the fetched recommendations
let currentPage = 1;

// Function to display recommendations for a given page
const displayRecommendations = (data, page) => {
  recommendationsContainer.innerHTML = ""; // Clear current content

  // Calculate start and end indices
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = data.slice(startIndex, endIndex);

  // Display each anime recommendation
  paginatedItems.forEach(anime => {
    recommendationsContainer.innerHTML += `
      <div class='insideRecommendations'>
        <img src='${anime.entry[0].images.jpg.image_url}' class='recommendationsImage' alt='${anime.entry[0].title}'><br><br>
        <h4>${anime.entry[0].title}</h4><br>
        <h5>${anime.content}</h5><br>
        <a href='${anime.user.url}' target="_blank">Learn More</a><br><br>
      </div>
    `;
  });
}

// Function to set up pagination controls
const setupPagination = (data) => {
  paginationContainer.innerHTML = ""; // Clear existing pagination controls
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Create a button for each page
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;

    // Highlight the active page
    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    // Add click event to change the page
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayRecommendations(recommendationsData, currentPage);

      // Update active button styling
      document.querySelectorAll(".pagination button").forEach(btn => {
        btn.classList.remove("active");
      });
      pageButton.classList.add("active");
    });

    paginationContainer.appendChild(pageButton);
  }
};

// Function to fetch recommendations from the API
const getRecommendations = async () => {
  try {
    let response = await fetch(url2);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    // Save the recommendations data for pagination
    recommendationsData = data.data;

    // Display initial page and set up pagination controls
    displayRecommendations(recommendationsData, currentPage);
    setupPagination(recommendationsData);

  } catch (error) {
    console.error("Error occurred:", error);
    recommendationsContainer.innerHTML = `<p>Error fetching recommendations: ${error.message}</p>`;
  }
};


getRecommendations();




//for right aside info, top movie by popularity
let topMovie = document.querySelector(".topMovie");
const url3 = "https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity";

const getTopMovie = async () => {
  try {
    let response = await fetch(url3);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    console.log(data);

    data.data.forEach((anime) => {
      topMovie.innerHTML += `
        <div class="insideTopAiring">
          <img src="${anime.images.jpg.image_url}" class="topAnimeImage"><br><br>
          <h4>${anime.title_english}</h4><br>
          <p>Rating: ${anime.rating}</p>
          <p>Score:${anime.score}</p>
           ${anime.trailer?.embed_url
          ? `<a href="${anime.trailer.embed_url}" target="_blank">Watch Trailer</a>`
          : '<p>No Trailer Available</p>'
        }
        </div>
      `;
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

getTopMovie();




