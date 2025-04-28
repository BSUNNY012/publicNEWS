// Your NewsAPI Key
const apiKey = 'd90779283fe94219baddeffba44a90c7';

// Function to fetch and display news articles based on category
async function fetchNews(category = 'general') {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';  // Show the loading spinner

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`);
    const data = await response.json();

    // Log the response to check if it's working
    console.log(data);

    if (data && data.articles) {
      displayArticles(data.articles);
    } else {
      console.error('No articles found or API request failed');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  } finally {
    loading.style.display = 'none';  // Hide the loading spinner after data is loaded
  }
}

// Function to display articles on the page
function displayArticles(articles) {
  const articlesSection = document.querySelector('.articles');
  articlesSection.innerHTML = '';  // Clear current articles

  articles.forEach(article => {
    const articleElement = document.createElement('article');
    articleElement.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/350x200'}" alt="news-image">
      <h2>${article.title}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    articlesSection.appendChild(articleElement);
  });
}

// Function to search news based on query
async function searchNews(query) {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';  // Show the loading spinner

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
    const data = await response.json();

    // Log the response to check if it's working
    console.log(data);

    if (data && data.articles) {
      displayArticles(data.articles);
    } else {
      console.error('No articles found or API request failed');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
  } finally {
    loading.style.display = 'none';  // Hide the loading spinner after data is loaded
  }
}

// Event listener for search button
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    searchNews(query);
  }
});

// Event listeners for category buttons
document.getElementById('home').addEventListener('click', () => fetchNews('general'));
document.getElementById('politics').addEventListener('click', () => fetchNews('politics'));
document.getElementById('sports').addEventListener('click', () => fetchNews('sports'));
document.getElementById('entertainment').addEventListener('click', () => fetchNews('entertainment'));
document.getElementById('technology').addEventListener('click', () => fetchNews('technology'));

// Dark mode toggle
const darkModeButton = document.getElementById('darkModeButton');
darkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('header').classList.toggle('dark-mode');
  document.querySelector('nav').classList.toggle('dark-mode');
  document.querySelectorAll('article').forEach(article => {
    article.classList.toggle('dark-mode');
  });
});
