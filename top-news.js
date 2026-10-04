document.addEventListener('DOMContentLoaded', () => {

  const newsGrid = document.getElementById('top-news-grid');

  if (!newsGrid) return;

  // 最新4件を取得
  const latestNews = [...newsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  newsGrid.innerHTML = '';

  latestNews.forEach(news => {

    const card = document.createElement('article');
    card.className = 'news-card';

    card.innerHTML = `
      <a href="news.html?id=${news.id}" class="news-card-link">

        <div class="card-image">
          <img src="${news.image}" alt="${news.title}">
        </div>

        <div class="card-content">
          <div class="news-meta">
            <span class="news-date">${news.date}</span>
            <span class="news-category">${news.category}</span>
          </div>

          <h3 class="news-title">${news.title}</h3>
        </div>

      </a>
    `;

    newsGrid.appendChild(card);
  });

});