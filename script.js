// Real-Time News Data API Key
const apiKey = 'bf7d757112mshd9c8263c3a38647p185745jsnde513adac088';

// Function to fetch and display news articles
async function fetchNews(category = 'TECHNOLOGY') {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';

  try {
    const response = await fetch(`https://real-time-news-data.p.rapidapi.com/topic-news?topic=${category}&lang=en`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
      }
    });

    const data = await response.json();
    console.log(data);

    if (data && data.data) {
      displayArticles(data.data);
    } else {
      console.error('No articles found or API request failed');
    }

  } catch (error) {
    console.error('Error fetching news:', error);
  } finally {
    loading.style.display = 'none';
  }
}

// Function to display articles
function displayArticles(articles) {
  const articlesSection = document.querySelector('.articles');
  articlesSection.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('article');
    articleElement.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/350x200'}" alt="news-image">
      <h2>${article.title}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    articlesSection.appendChild(articleElement);
  });
}

// Function to search news
async function searchNews(query) {
  const loading = document.querySelector('.loading');
  loading.style.display = 'block';

  try {
    const response = await fetch(`https://real-time-news-data.p.rapidapi.com/search?query=${query}&lang=en`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
      }
    });

    const data = await response.json();
    console.log(data);

    if (data && data.data) {
      displayArticles(data.data);
    } else {
      console.error('No articles found or API request failed');
    }

  } catch (error) {
    console.error('Error fetching search results:', error);
  } finally {
    loading.style.display = 'none';
  }
}

// Event listener for search
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    searchNews(query);
  }
});

// Category buttons (topics: TECHNOLOGY, POLITICS, SPORTS, ENTERTAINMENT)
document.getElementById('home').addEventListener('click', () => fetchNews('WORLD'));
document.getElementById('politics').addEventListener('click', () => fetchNews('POLITICS'));
document.getElementById('sports').addEventListener('click', () => fetchNews('SPORTS'));
document.getElementById('entertainment').addEventListener('click', () => fetchNews('ENTERTAINMENT'));
document.getElementById('technology').addEventListener('click', () => fetchNews('TECHNOLOGY'));

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

// Load default news on page load
window.onload = () => {
  fetchNews('WORLD');
};
