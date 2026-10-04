// 1. メンバーデータ管理
// ※宣材写真がある人のみ "isPhoto: true" と画像パスを指定します
// ※写真がない人は image を "images/logo-members.png" にしてください
const membersData = [
  { id: 1, name: "NEKOCHORA", division: "VALORANT AC", image: "images/senzai-nekochora.jpg" , isPhoto: true },
  { id: 2, name: "NERUFA", division: "VALORANT AC", image: "images/logo-members.png" },
  // 写真がある例：
  // { id: 3, name: "NAME 03", division: "VALORANT AC", image: "images/members/player03.jpg", isPhoto: true },
  { id: 3, name: "SENA", division: "VALORANT AC", image:"images/senzai-sena.png",isPhoto: true },
  { id: 4, name: "NUMEO53", division: "VALORANT AC", image: "images/senzai-nomeo53.png",isPhoto: true },
  { id: 5, name: "GAKUSAI", division: "VALORANT AC", image: "images/logo-members.png" },
  { id: 6, name: "FUUTO", division: "VALORANT AC", image: "images/logo-members.png" },
  { id: 7, name: "MUTIKIN", division: "VALORANT AC", image: "images/logo-members.png" },
  { id: 8, name: "MULBERRY", division: "VALORANT AC", image: "images/logo-members.png" },
  { id: 9, name: "SAKURA", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 10, name: "YULI", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 11, name: "TAIYAKI", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 12, name: "MIRABO", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 13, name: "MA1TAK", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 14, name: "SORASYARO", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 15, name: "YOME", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 16, name: "GON", division: "VALORANT GC", image: "images/logo-members.png" },
  { id: 17, name: "UILLOW", division: "STREET FIGHTER", image: "images/senzai-uillow.png", isPhoto: true },
  { id: 18, name: "TAK", division: "STREET FIGHTER", image: "images/senzai-tak.png", isPhoto: true },
  { id: 19, name: "G1VU55", division: "STREET FIGHTER", image: "images/logo-members.png" },
  { id: 20, name: "TEKAPURIO", division: "CONTENT CREATER", image: "images/senzai-tekapurio.png", isPhoto: true},
  { id: 21, name: "JAHAKA MAGANO", division: "CONTENT CREATER", image: "images/senzai-magano.png", isPhoto: true },
  { id: 22, name: "NEOTEX", division: "CONTENT CREATER", image: "images/senzai-neotex.png", isPhoto: true },
  { id: 23, name: "NAKOTA", division: "OPERATION", image: "images/logo-members.png" },
  { id: 24, name: "NOKOTTI", division: "OPERATION", image: "images/logo-members.png" },
  { id: 25, name: "HARUKI TAKEDA", division: "OPERATION", image: "images/logo-members.png" },
];

const ITEMS_PER_PAGE = 20;
let currentDivision = 'ALL';
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  setupFilterEvents();
  render();
});

function setupFilterEvents() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentDivision = e.target.getAttribute('data-division');
      currentPage = 1;
      render();
    });
  });
}

function render() {
  const filtered = currentDivision === 'ALL'
    ? membersData
    : membersData.filter(item => item.division === currentDivision);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  renderCards(pageItems);
  renderPagination(totalPages);
}

// 2. カード描画関数（isPhoto の有無でクラスを判定）
function renderCards(items) {
  const grid = document.getElementById('members-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 60px 0;">メンバーがいません。</p>';
    return;
  }

  items.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';

    // 宣材写真(isPhoto: true)か、ロゴ(デフォルト)かを判定
    const imgClass = member.isPhoto ? 'card-photo' : 'card-logo';

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-left">
          <img src="${member.image}" alt="${member.name}" class="${imgClass}">
        </div>
        <div class="card-right">
          <span class="card-pin"></span>
          <div class="card-info">
            <h2 class="member-name">${member.name}</h2>
            <p class="member-division">${member.division}</p>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderPagination(totalPages) {
  const container = document.getElementById('pagination');
  if (!container) return;
  container.innerHTML = '';

  if (totalPages <= 1) return;

  const prevBtn = document.createElement('a');
  prevBtn.className = `page-nav prev ${currentPage === 1 ? 'disabled' : ''}`;
  prevBtn.innerHTML = '&lt;&lt;';
  prevBtn.href = '#';
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
    const pageBtn = document.createElement('a');
    pageBtn.className = `page-num ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.href = '#';
    pageBtn.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('a');
  nextBtn.className = `page-nav next ${currentPage === totalPages ? 'disabled' : ''}`;
  nextBtn.innerHTML = '&gt;&gt;';
  nextBtn.href = '#';
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