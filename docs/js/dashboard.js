// /docs/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('solarUser'));
  const emailDisplay = document.getElementById('userEmail');
  const balanceDisplay = document.getElementById('userBalance');
  const depositList = document.getElementById('depositList');
  const plansContainer = document.getElementById('plansContainer');

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  emailDisplay.textContent = user.email;
  balanceDisplay.textContent = user.balance.toFixed(2);

  // Planuri de investiție
  const plans = [
    { name: "Starter Plan", min: 10, max: 199, percent: 3.5 },
    { name: "Silver Plan", min: 200, max: 999, percent: 5.5 },
    { name: "Gold Plan", min: 1000, max: 10000, percent: 7.5 },
  ];

  plans.forEach(plan => {
    const div = document.createElement('div');
    div.className = 'plan-box';
    div.innerHTML = `
      <h3>${plan.name}</h3>
      <p>Range: ${plan.min} - ${plan.max} USDT</p>
      <p>Interest: ${plan.percent}%</p>
      <button onclick
