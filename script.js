document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const postForm = document.getElementById('postForm');
  const postAuthor = document.getElementById('postAuthor');
  const postContent = document.getElementById('postContent');
  const charRemaining = document.getElementById('charRemaining');
  const feedContainer = document.getElementById('feedContainer');
  const archiveContainer = document.getElementById('archiveContainer');
  const tabs = document.querySelectorAll('.tab');

  // App State
  let posts = JSON.parse(localStorage.getItem('moodblog-posts')) || [];

  // Initialize
  renderPosts();
  setupEventListeners();

  // Functions
  function setupEventListeners() {
    // Character counter
    postContent.addEventListener('input', updateCharCount);

    // Form submission
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createPost();
    });

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Post interactions (event delegation)
    document.addEventListener('click', handlePostAction);
  }

  function updateCharCount() {
    const remaining = 280 - postContent.value.length;
    charRemaining.textContent = remaining;
    
    charRemaining.className = '';
    if (remaining < 20) charRemaining.classList.add('warning');
    if (remaining < 0) charRemaining.classList.add('error');
  }

  function createPost() {
    const content = postContent.value.trim();
    const author = postAuthor.value.trim() || 'Anonymous';
    
    if (!content || content.length > 280) return;
    
    const newPost = {
      id: Date.now(),
      author,
      content,
      hashtags: extractHashtags(content),
      moods: { happy: 0, sad: 0, fire: 0 },
      archived: false,
      timestamp: new Date().toISOString()
    };
    
    posts.unshift(newPost);
    savePosts();
    renderPosts();
    resetForm();
    animatePostButton();
  }

  function extractHashtags(content) {
    const hashtags = content.match(/#\w+/g) || [];
    return [...new Set(hashtags)];
  }

  function resetForm() {
    postAuthor.value = '';
    postContent.value = '';
    charRemaining.textContent = 280;
    charRemaining.className = '';
  }

  function animatePostButton() {
    const button = postForm.querySelector('button');
    button.innerHTML = '<i class="fas fa-check"></i> Posted!';
    button.style.background = 'var(--success)';
    
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-paper-plane"></i> Post';
      button.style.background = 'var(--primary)';
    }, 2000);
  }

  function switchTab(tab) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('.posts-container').forEach(c => {
      c.classList.toggle('active', c.id === `${tab}Container`);
    });
  }

  function handlePostAction(e) {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;
    
    const postEl = e.target.closest('.post');
    if (!postEl) return;
    
    const postId = Number(postEl.dataset.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;
    
    const action = actionBtn.dataset.action;
    
    switch (action) {
      case 'mood':
        const mood = actionBtn.dataset.mood;
        posts[postIndex].moods[mood]++;
        animateMood(actionBtn, mood);
        break;
      case 'archive':
        posts[postIndex].archived = !posts[postIndex].archived;
        break;
      case 'delete':
        if (confirm('Delete this post?')) {
          posts.splice(postIndex, 1);
        }
        break;
    }
    
    savePosts();
    renderPosts();
  }

  function animateMood(button, mood) {
    const emoji = button.querySelector('span:first-child');
    const floatingEmoji = document.createElement('span');
    floatingEmoji.textContent = emoji.textContent;
    floatingEmoji.style.position = 'absolute';
    floatingEmoji.style.fontSize = '1.5rem';
    floatingEmoji.style.animation = 'floatUp 1s forwards';
    floatingEmoji.style.color = `var(--mood-${mood})`;
    
    button.style.position = 'relative';
    button.appendChild(floatingEmoji);
    
    setTimeout(() => floatingEmoji.remove(), 1000);
  }

  function renderPosts() {
    renderContainer(feedContainer, posts.filter(p => !p.archived));
    renderContainer(archiveContainer, posts.filter(p => p.archived));
  }

  function renderContainer(container, postsToShow) {
    container.innerHTML = '';
    
    if (postsToShow.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="${container.id === 'feedContainer' ? 'fas fa-comment-slash' : 'fas fa-archive'}"></i>
          <p>${container.id === 'feedContainer' ? 'No posts yet. Be the first to share!' : 'No archived posts yet'}</p>
        </div>
      `;
      return;
    }
    
    postsToShow.forEach(post => {
      const postEl = createPostElement(post);
      container.appendChild(postEl);
    });
  }

  function createPostElement(post) {
    const postEl = document.createElement('article');
    postEl.className = 'post';
    postEl.dataset.id = post.id;
    
    let content = post.content;
    post.hashtags.forEach(tag => {
      content = content.replace(new RegExp(tag, 'g'), `<span class="hashtag">${tag}</span>`);
    });
    
    postEl.innerHTML = `
      <div class="post-content">${content}</div>
      <div class="post-meta">
        <span class="post-author">${post.author}</span>
        <span class="post-date">${new Date(post.timestamp).toLocaleString()}</span>
      </div>
      <div class="post-actions">
        <div class="mood-actions">
          <button class="mood-btn happy" data-action="mood" data-mood="happy">
            😊 <span class="mood-count">${post.moods.happy}</span>
          </button>
          <button class="mood-btn sad" data-action="mood" data-mood="sad">
            😢 <span class="mood-count">${post.moods.sad}</span>
          </button>
          <button class="mood-btn fire" data-action="mood" data-mood="fire">
            🔥 <span class="mood-count">${post.moods.fire}</span>
          </button>
        </div>
        <div class="post-controls">
          <button class="control-btn" data-action="archive">
            <i class="fas fa-${post.archived ? 'box-open' : 'archive'}"></i>
          </button>
          <button class="control-btn delete" data-action="delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
    
    return postEl;
  }

  function savePosts() {
    localStorage.setItem('moodblog-posts', JSON.stringify(posts));
  }
});