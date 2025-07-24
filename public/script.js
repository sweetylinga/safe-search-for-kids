document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');

  const performSearch = async () => {
    const query = searchInput.value.trim();
    resultsContainer.innerHTML = '';

    if (!query) return;

    try {
      const response = await fetch('http://localhost:4000/api/check-safety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const { safe, result, reason } = await response.json();

      if (!safe && reason === 'under_construction') {
        showUnderConstruction();
      } else if (!safe) {
        showBlockedMessage(reason);
      } else if (result) {
        showResult(result);
      } else {
        showUnderConstruction();
      }

    } catch (error) {
      console.error('Search error:', error);
      showUnderConstruction();
    }
  };

  const showUnderConstruction = () => {
    resultsContainer.innerHTML = `
      <div class="construction-container">
        <h2>PAGE</h2>
        <h2>UNDER CONSTRUCTION</h2>
        <div class="divider"></div>
        <p>Under Construction</p>
        <p class="refresh-message">Page will refresh in 3 seconds...</p>
      </div>
    `;
    
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const showBlockedMessage = (reason) => {
    resultsContainer.innerHTML = `
      <div class="construction-container">
        <h2>CONTENT BLOCKED</h2>
        <p>This search contains ${reason} content</p>
      </div>
    `;
  };

  const showResult = (item) => {
    resultsContainer.innerHTML = `
      <div class="result-item">
        <h3>${item.title}</h3>
        <a href="${item.url}" target="_blank">Visit Site</a>
      </div>
    `;
  };

  // Event listeners
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
});