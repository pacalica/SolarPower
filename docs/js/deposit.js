// /docs/js/deposits.js

const depositAddress = "0x124377FCe14439248a4959ce528314aA3A897321"; // Adresa fixă BEP20 USDT

function showDepositInfo() {
  const qr = document.getElementById("depositQR");
  const addressEl = document.getElementById("depositAddress");
  if (qr && addressEl) {
    addressEl.textContent = depositAddress;
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?data=${depositAddress}&size=160x160`;
  }
}

function handleDepositConfirmation() {
  const user = JSON.parse(localStorage.getItem("solarUser"));
  if (!user) return;

  const amountInput = document.getElementById("depositAmount");
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const now = new Date().toISOString();
  const newDeposit = {
    amount,
    date: now,
    status: "pending"
  };

  user.deposits.push(newDeposit);
  localStorage.setItem("solarUser", JSON.stringify(user));

  // Actualizăm și lista globală de useri
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const index = users.findIndex(u => u.email === user.email);
  if (index > -1) {
    users[index] = user;
    localStorage.setItem("solarUsers", JSON.stringify(users));
  }

  alert("Deposit marked as pending. Admin will confirm manually.");
  amountInput.value = "";
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
  showDepositInfo();

  const confirmBtn = document.getElementById("confirmDepositBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", handleDepositConfirmation);
  }
});
