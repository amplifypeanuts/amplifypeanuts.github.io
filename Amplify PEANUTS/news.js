// 1. NEWSデータ管理（content に記事本文を記述）
const newsData = [
  {
    id: 10,
    date: "2026.10.04",
    category: "EVENT",
    title:"やちまたふくしフェスタに出展いたします",
    image: "images/logo-news.png",
    content: `
<p>2026年10月17日（土）に八街市中央公民館で開催される「やちまたふくしフェスタ」に、Amplify PEANUTSが出展いたします。</p> <p>当日は、ゲームを通じて幅広い世代の皆さまにeスポーツを楽しんでいただける体験ブースを展開します。</p> <p>ブースでは「ぷよぷよテトリス２」を使用したゲーム体験を予定しています。初めてゲームをプレイする方から、普段からゲームを楽しんでいる方まで、どなたでもご参加いただけます。</p> <p>eスポーツをきっかけに、世代を越えた交流や新しいつながりが生まれる場を目指しています。</p> <p>皆さまのご来場を心よりお待ちしております。</p>
<p><strong>【イベント概要】</strong><br> 日時：2026年10月17日（土）<br> 会場：八街市中央公民館<br> 内容：「ぷよぷよテトリス２」ゲーム体験</p>
    `
  },
{
  id: 3,
  date: "2026.10.04",
  category: "EVENT",
  title: "PEANUTS CUP #3 開催のお知らせ",
  image: "images/news-2.png",
  content: `
    <p>2026年10月8日（木）21:00より、オンライン大会「PEANUTS CUP #3」を開催いたします。</p>

    <p>今回も「ストリートファイター6」を使用し、ダブルエリミネーショントーナメント形式で開催します。</p>

    <p>ぜひお気軽にご参加ください。皆さまのエントリーをお待ちしております。</p>

    <p><strong>【大会概要】</strong><br>
    大会名：PEANUTS CUP #3<br>
    日時：2026年10月8日（木）21:00 START<br>
    形式：ダブルエリミネーショントーナメント（オンライン）<br>
    使用タイトル：ストリートファイター6</p>

    <p><strong>【エントリー】</strong><br>
    下記のTonamelページよりエントリーをお願いいたします。</p>

    <p>
      <a href="https://tonamel.com/organize/w7YYX/competition/yUbIs" target="_blank" rel="noopener noreferrer">
        エントリーはこちら
      </a>
    </p>

    <p>大会に関する最新情報は、Amplify PEANUTS公式Xにてお知らせいたします。</p>
  `
},
  // ...必要に応じて追加
];

const ITEMS_PER_PAGE = 8;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  render();
  setupModalEvents();
});

function render() {
  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  renderCards(pageItems);
  renderPagination(totalPages);
}

// 2. NEWSカード描画関数
function renderCards(items) {
  const grid = document.querySelector('.news-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 60px 0;">ニュースがありません。</p>';
    return;
  }

  items.forEach(news => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.setAttribute('data-id', news.id);

    // カードクリックでモーダルを開く
    card.addEventListener('click', () => {
      openModal(news);
    });

    card.innerHTML = `
      <div class="card-image">
        <img src="${news.image}" alt="${news.title}">
      </div>
      <div class="card-content">
        <div class="news-meta">
          <span class="news-date">${news.date}</span>
          ${news.category ? `<span class="news-category">${news.category}</span>` : ''}
        </div>
        <h3 class="news-title">${news.title}</h3>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 3. モーダル表示機能
function openModal(news) {
  const modal = document.getElementById('newsModal');
  document.getElementById('modalImage').src = news.image;
  document.getElementById('modalDate').textContent = news.date;
  document.getElementById('modalCategory').textContent = news.category || '';
  document.getElementById('modalTitle').textContent = news.title;
  document.getElementById('modalText').innerHTML = news.content || '<p>記事の詳細はありません。</p>';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // 背後のスクロールを固定
}

function closeModal() {
  const modal = document.getElementById('newsModal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // スクロール解除
}

function setupModalEvents() {
  const modal = document.getElementById('newsModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // 背景クリックで閉じる
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// 4. ページネーション描画関数
function renderPagination(totalPages) {
  const container = document.querySelector('.pagination');
  if (!container) return;
  container.innerHTML = '';

  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn prev-btn';
  prevBtn.innerHTML = '&laquo;';
  prevBtn.disabled = (currentPage === 1);
  prevBtn.onclick = (e) => {
    e.preventDefault();
    if (currentPage > 1) { 
      currentPage--; 
      render(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn page-num ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn next-btn';
  nextBtn.innerHTML = '&raquo;';
  nextBtn.disabled = (currentPage === totalPages);
  nextBtn.onclick = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) { 
      currentPage++; 
      render(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  container.appendChild(nextBtn);
}

// ========================================
// TOPページ NEWS表示
// ========================================

function renderTopNews() {
  const grid = document.getElementById('top-news-grid');

  // TOPページでなければ何もしない
  if (!grid) return;

  // 最新4件を取得
  const latestNews = newsData.slice(0, 4);

  grid.innerHTML = '';

  latestNews.forEach(news => {
    const card = document.createElement('article');
    card.className = 'news-card';

    card.innerHTML = `
      <div class="card-image">
        <img src="${news.image}" alt="${news.title}">
      </div>

      <div class="card-content">
        <div class="news-meta">
          <span class="news-date">${news.date}</span>
          ${news.category ? `<span class="news-category">${news.category}</span>` : ''}
        </div>

        <h3 class="news-title">${news.title}</h3>
      </div>
    `;

    // クリックしたらNEWSページへ
    card.addEventListener('click', () => {
      window.location.href = 'news.html';
    });

    grid.appendChild(card);
  });
}


// TOPページのNEWSを表示
document.addEventListener('DOMContentLoaded', () => {
  renderTopNews();
});