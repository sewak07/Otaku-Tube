let trailers = document.querySelector(".trailerContainer");

const getTrailers = async () => {
    try {
        const response = await fetch("https://api.jikan.moe/v4/watch/promos");
        if (!response.ok) throw new Error("Failed to fetch promos");

        const data = await response.json();
        console.log(data);

        data.data.forEach(promo => {
            trailers.innerHTML += `
            
     <div class="promoItem">
    <div style="text-align: center;">
        <img src="${promo.entry.images.jpg.image_url}" alt="${promo.entry.title}" class="promoImage"><br><br>
        <h3 class="promoTitle">${promo.entry.title}</h3><br>
        ${promo.trailer.embed_url
        ? `<iframe width="560" height="315" src="${promo.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>`
        : '<p>No Trailer Available</p>'
        }
    </div>
</div>`

        });
    } catch (error) {
        console.error("Error fetching promos:", error);
    }
};

getTrailers();
