(() => {
  const USERS_KEY = 'kodal_users_v1';
  const CURRENT_KEY = 'kodal_current_user_v1';

  const safeJsonParse = (value, fallback) => {
    try { return JSON.parse(value) ?? fallback; } catch { return fallback; }
  };

  const getUsers = () => safeJsonParse(localStorage.getItem(USERS_KEY), []);
  const setUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const getCurrentUser = () => safeJsonParse(localStorage.getItem(CURRENT_KEY), null);
  const setCurrentUser = (user) => localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  const clearCurrentUser = () => localStorage.removeItem(CURRENT_KEY);

  const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
  const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || 'Përdorues';
  const initial = (name) => (firstName(name).charAt(0) || 'U').toUpperCase();

  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  function renderAuthButtons() {
    const user = getCurrentUser();
    document.querySelectorAll('.login-btn').forEach((btn) => {
      if (!btn || btn.dataset.authReady === '1') return;
      btn.dataset.authReady = '1';
      if (user) {
        btn.href = '#';
        btn.classList.add('logged-in');
        btn.innerHTML = `
          <span class="auth-avatar" aria-hidden="true">${escapeHtml(initial(user.name))}</span>
          <span class="login-btn-text">${escapeHtml(firstName(user.name))}</span>
          <span class="auth-logout">Dil</span>
        `;
        btn.setAttribute('aria-label', `I kyçur si ${user.name}. Kliko për t'u çkyçur.`);
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (confirm('Dëshiron të dalësh nga llogaria?')) {
            clearCurrentUser();
            window.location.reload();
          }
        });
      } else {
        btn.href = 'login.html';
        btn.classList.remove('logged-in');
        btn.innerHTML = `
          <span class="login-btn-text">Hyr</span>
          <i class="fa-solid fa-arrow-right-to-bracket login-icon"></i>
        `;
      }
    });
  }

  function registerUser({ name, email, password }) {
    const cleanName = String(name || '').trim();
    const cleanEmail = normalizeEmail(email);
    const cleanPassword = String(password || '');

    if (cleanName.length < 2) throw new Error('Shkruaj emrin tënd.');
    if (!cleanEmail || !cleanEmail.includes('@')) throw new Error('Shkruaj një email të vlefshëm.');
    if (cleanPassword.length < 4) throw new Error('Fjalëkalimi duhet të ketë të paktën 4 karaktere.');

    const users = getUsers();
    if (users.some((user) => normalizeEmail(user.email) === cleanEmail)) {
      throw new Error('Ky email është regjistruar më parë.');
    }

    const user = {
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    setUsers(users);
    setCurrentUser({ name: cleanName, email: cleanEmail });
    return user;
  }

  function loginUser(email, password) {
    const cleanEmail = normalizeEmail(email);
    const cleanPassword = String(password || '');
    const users = getUsers();
    const user = users.find((u) => normalizeEmail(u.email) === cleanEmail && u.password === cleanPassword);
    if (!user) throw new Error('Emaili ose fjalëkalimi është i gabuar.');
    setCurrentUser({ name: user.name, email: user.email });
    return user;
  }

  function logoutUser() {
    clearCurrentUser();
  }

  document.addEventListener('DOMContentLoaded', renderAuthButtons);

  window.KodAlAuth = {
    getUsers,
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    renderAuthButtons,
    firstName,
  };
})();