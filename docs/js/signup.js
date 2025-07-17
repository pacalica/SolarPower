// js/signup.js

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const ref = new URLSearchParams(window.location.search).get("ref") || null;

  if (!email || !password || !username) {
    alert("Please fill in all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];

  // Verificăm dacă emailul este deja folosit
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    alert("This email is already registered. Please log in.");
    window.location.href = "index.html";
    return;
  }

  // Creăm un wallet dummy
  const wallet = "wallet_" + Math.random().toString(36).substring(2, 10);

  const newUser = {
    email,
    password,
    username,
    wallet,
    ref,
    deposits: [],
    withdrawals: [],
  };

  users.push(newUser);
  localStorage.setItem("solarUsers", JSON.stringify(users));
  localStorage.setItem("solarUser", JSON.stringify(newUser));

  alert("Account created successfully!");
  window.location.href = "dashboard.html";
});
