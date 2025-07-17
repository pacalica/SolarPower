// /docs/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Autologin
  const user = localStorage.getItem('solarUser');
  if (user) {
    window.location.href = 'dashboard.html';
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const saved = JSON.parse(localStorage.getItem('solarUser'));

    if (saved && saved.email === email && saved.password === password) {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid login');
    }
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const regEmail = document.getElementById('regEmail').value.trim();
    const regPassword = document.getElementById('regPassword').value.trim();
    const phone = document.getElementById('phone').value.trim();

    const newUser = { email: regEmail, password: regPassword, phone, deposits: [], referrals: [], balance: 0 };
    localStorage.setItem('solarUser', JSON.stringify(newUser));
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'dashboard.html';
  });
});
