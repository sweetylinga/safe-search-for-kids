document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    const noResultsDiv = document.getElementById('no-results');

    async function performSearch() {
        const query = searchInput.value.trim();

        resultsDiv.innerHTML = "";
        noResultsDiv.style.display = "none";

        if (!query) return;

        try {
            const response = await fetch(
                "https://safe-search-api.onrender.com/api/check-safety",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ query })
                }
            );

            if (!response.ok) {
                throw new Error("Server Error");
            }

            const data = await response.json();

            if (!data.safe && data.reason === "under_construction") {
                showUnderConstruction();
            } else if (!data.safe) {
                showBlockedMessage(data.reason);
            } else {
                showResult(data.result);
            }

        } catch (err) {
            console.error(err);
            showUnderConstruction();
        }
    }

    function showResult(item) {

        const imageUrl = item.image
            ? `https://safe-search-api.onrender.com${item.image}`
            : "";

        resultsDiv.innerHTML = `
            <div class="result-item">

                ${
                    imageUrl
                        ? `<img src="${imageUrl}" style="max-width:300px;margin-bottom:20px;">`
                        : ""
                }

                <h2>${item.title}</h2>

                <a href="${item.url}" target="_blank">
                    Visit Website
                </a>

            </div>
        `;
    }

    function showBlockedMessage(reason) {

        noResultsDiv.innerHTML = `
            <div class="blocked-container">

                <img
                    src="https://safe-search-api.onrender.com/images/blocked.png"
                    class="blocked-image"
                >

                <h2>CONTENT BLOCKED</h2>

                <p>
                    This search contains inappropriate content.
                </p>

            </div>
        `;

        noResultsDiv.style.display = "block";
    }

    function showUnderConstruction() {

        resultsDiv.innerHTML = `
            <div class="construction-container">

                <div class="construction-title">
                    PAGE
                </div>

                <div class="construction-title">
                    UNDER CONSTRUCTION
                </div>

                <div class="divider"></div>

                <div>
                    Under Construction
                </div>

                <div class="refresh-message">
                    Page will refresh in 3 seconds...
                </div>

            </div>
        `;

        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
});