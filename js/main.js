/**
 * 探索与成长 - 主交互脚本
 * 功能：文章渲染、分类筛选、深色模式、移动菜单、回到顶部、进度条
 */

document.addEventListener('DOMContentLoaded', () => {
  initArticles();
  initCategoryFilter();
  initThemeToggle();
  initMobileMenu();
  initBackToTop();
  initScrollEffects();
  initImageLazyLoad();
});

/* ============================================
   文章渲染
   ============================================ */
function initArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;

  grid.innerHTML = '';

  articles.forEach((article, index) => {
    const card = document.createElement('article');
    card.className = 'article-card bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg overflow-hidden group animate-scale-in cursor-pointer';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-category', article.category);
    card.setAttribute('data-id', article.id);
    card.onclick = () => openArticle(article.id);

    card.innerHTML = `
      <div class="relative h-48 bg-gradient-to-br ${article.imageColor} overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-6xl card-image">${article.imageIcon}</span>
        </div>
        <div class="absolute top-3 left-3">
          <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            ${article.category}
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>📅 ${article.date}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
          ${article.title}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          ${article.excerpt}
        </p>
        <div class="mt-4 flex items-center text-primary-500 dark:text-primary-400 text-sm font-medium">
          阅读全文
          <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ============================================
   文章详情页（模态窗口）
   ============================================ */
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  // 更新 URL hash（不刷新页面）
  window.location.hash = `article-${id}`;

  // 移除已有的模态窗口
  const existing = document.getElementById('article-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'article-modal';
  modal.className = 'fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto pt-20 pb-20';
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onclick="closeArticle()"></div>
    <div class="relative w-full max-w-3xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
      <!-- 顶部装饰条 -->
      <div class="h-2 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400"></div>

      <!-- 关闭按钮 -->
      <button onclick="closeArticle()" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-700/90 shadow flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200" aria-label="关闭">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-8 md:p-12">
        <!-- 文章头 -->
        <div class="mb-8">
          <span class="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full mb-4">
            ${article.category}
          </span>
          <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">${article.title}</h1>
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 ${article.date}</span>
            <span>⏱️ 约 ${Math.ceil(article.content.length / 400)} 分钟阅读</span>
          </div>
        </div>

        <!-- 文章内容 -->
        <div class="prose-custom text-gray-700 dark:text-gray-200 leading-relaxed">
          ${article.content}
        </div>

        <!-- 底部分隔与分享 -->
        <div class="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <button onclick="closeArticle()" class="inline-flex items-center text-primary-500 dark:text-primary-400 hover:underline font-medium">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              返回文章列表
            </button>
            <div class="flex gap-2">
              <button onclick="shareArticle('${article.title}')" class="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-500 transition-colors duration-150" title="分享">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // ESC 关闭
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeArticle();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeArticle() {
  const modal = document.getElementById('article-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
      window.location.hash = '';
    }, 200);
  }
}

function shareArticle(title) {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      // 简单的 toast 提示
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-lg z-[200] animate-slide-up text-sm';
      toast.textContent = '链接已复制到剪贴板 ✅';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }).catch(() => {});
  }
}

/* ============================================
   分类筛选
   ============================================ */
function initCategoryFilter() {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新按钮状态
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const cards = document.querySelectorAll('#articles-grid .article-card');
      const noResults = document.getElementById('no-results');
      let visibleCount = 0;

      cards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
          card.style.display = '';
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = `scaleIn 0.4s ease-out ${index * 0.05}s both`;
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.classList.toggle('hidden', visibleCount > 0);
      }
    });
  });
}

/* ============================================
   深色模式切换
   ============================================ */
function initThemeToggle() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  // 从 localStorage 恢复
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    updateIcons(true);
  }

  function setTheme(isDark) {
    html.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
  }

  function updateIcons(isDark) {
    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle('hidden', isDark);
      moonIcon.classList.toggle('hidden', !isDark);
    }
    if (mobileToggle) {
      mobileToggle.textContent = isDark ? '☀️ 浅色模式' : '🌙 深色模式';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => setTheme(!html.classList.contains('dark')));
  }
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => setTheme(!html.classList.contains('dark')));
  }
}

/* ============================================
   移动菜单
   ============================================ */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!btn || !menu) return;

  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('hidden', !isOpen);
    if (menuIcon) menuIcon.classList.toggle('hidden', isOpen);
    if (closeIcon) closeIcon.classList.toggle('hidden', !isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // 点击菜单链接后关闭
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      btn.setAttribute('aria-expanded', false);
    });
  });
}

/* ============================================
   回到顶部按钮
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const shouldShow = window.scrollY > 500;
      btn.classList.toggle('opacity-0', !shouldShow);
      btn.classList.toggle('invisible', !shouldShow);
    }, 100);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   滚动效果：进度条 + 头部阴影
   ============================================ */
function initScrollEffects() {
  const progressBar = document.getElementById('progress-bar');
  const header = document.getElementById('header');

  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      // 进度条
      if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }

      // 头部阴影（滚动时加深）
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      }
    }, 50);
  }, { passive: true });
}

/* ============================================
   图片懒加载
   ============================================ */
function initImageLazyLoad() {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => img.classList.add('loaded'));
    }
  });
}

/* ============================================
   URL hash 处理 - 直接打开文章
   ============================================ */
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  const match = hash.match(/^#article-(\d+)$/);
  if (match) {
    openArticle(parseInt(match[1]));
  } else {
    closeArticle();
  }
});

// 页面加载时检查 hash
if (window.location.hash) {
  const match = window.location.hash.match(/^#article-(\d+)$/);
  if (match) {
    setTimeout(() => openArticle(parseInt(match[1])), 300);
  }
}
