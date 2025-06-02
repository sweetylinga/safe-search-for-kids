document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');
  const resultsDiv = document.getElementById('results');
  const noResultsDiv = document.getElementById('no-results');

  const performSearch = async () => {
    const query = searchInput.value.trim();
    resultsDiv.innerHTML = '';
    noResultsDiv.style.display = 'none';

    if (!query) return;

    try {
      const response = await fetch('http://localhost:4000/api/check-safety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const { safe, result, reason } = await response.json();

      if (!safe) {
        showBlockedMessage(reason);
      } else if (result) {
        showResult(result);
      } else {
        showNoResults();
      }

    } catch (error) {
      showError();
    }
  };

  const showResult = (item) => {
    resultsDiv.innerHTML = `
      <div class="safe-result">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">
          Visit Site
        </a>
      </div>
    `;
  };

  const showBlockedMessage = (reason) => {
    noResultsDiv.innerHTML = `
      <img src="images/blocked.png" width="150">
      <h2>Content Blocked</h2>
      <p>This search contains ${reason} content</p>
    `;
    noResultsDiv.style.display = 'block';
  };

  const showNoResults = () => {
    noResultsDiv.innerHTML = `
      <img src="images/no-results.png" width="150">
      <h2>No Results Found</h2>
      <p>Try different keywords like "science" or "cartoons"</p>
    `;
    noResultsDiv.style.display = 'block';
  };

  const showError = () => {
    noResultsDiv.innerHTML = `
      <img src="images/error.png" width="100">
      <h2>System Error</h2>
      <p>Please try again later</p>
    `;
    noResultsDiv.style.display = 'block';
  };

  // Event listeners
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
});