// Verifică dacă utilizatorul este logat
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "index.html";
}

// Afișează emailul utilizatorului
document.getElementById("userEmail").innerText = user.email;

// Inițializează datele dacă nu există
if (!localStorage.getItem("deposits")) {
  localStorage.setItem("deposits", JSON.stringify([]));
}

// Preia lista de depozite ale utilizatorului
function getUserDeposits() {
  const all = JSON.parse(localStorage.getItem("deposits")) || [];
  return all.filter(dep => dep.email === user.email);
}

// Afișează depozitele în dashboard
function renderDeposits() {
  const list = document.getElementById("depositList");
  const deposits = getUserDeposits();
  list.innerHTML = "";

  if (deposits.length === 0) {
    list.innerHTML = "<li>No deposits yet.</li>";
    return;
  }

  deposits.forEach((d, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      ${index + 1}. ${d.amount} USDT – ${d.interest}% (${d.date})
    `;
    list.appendChild(item);
  });
}

// Calculează suma totală
function calculateBalance() {
  const deposits = getUserDeposits();
  let total = 0;
  deposits.forEach(d => {
    total += parseFloat(d.amount);
  });
  document.getElementById("balance").innerText = total.toFixed(2);
}

// Gestionează depunerea
document.getElementById("depositForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const interest = parseFloat(document.getElementById("plan").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const deposit = {
    email: user.email,
    amount: amount.toFixed(2),
    interest,
    date: new Date().toLocaleDateString(),
  };

  const allDeposits = JSON.parse(localStorage.getItem("deposits")) || [];
  allDeposits.push(deposit);
  localStorage.setItem("deposits", JSON.stringify(allDeposits));

  document.getElementById("depositForm").reset();
  renderDeposits();
  calculateBalance();
  alert("Deposit recorded successfully.");
});

// Referral link
const referral = `${window.location.origin}/docs/index.html?ref=${user.email}`;
document.getElementById("refLink").value = referral;

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// La încărcare
renderDeposits();
calculateBalance();
