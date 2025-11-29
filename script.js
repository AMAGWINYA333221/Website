// ----- Dark mode detection -----
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// ----- floating plus signs -----
const BG = document.getElementById('background');

function createPlusSign() {
  const plus = document.createElement('div');
  plus.textContent = '+';
  plus.style.position = 'absolute';
  plus.style.fontSize = `${18 + Math.random() * 22}px`;
  plus.style.color = isDarkMode() ? "#fff" : "#000";
  plus.style.opacity = '0';
  plus.style.pointerEvents = 'none';
  plus.style.fontWeight = 'bold';

  // random start position
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  plus.style.left = `${startX}px`;
  plus.style.top = `${startY}px`;

  BG.appendChild(plus);

  // animation: fade in, move bottom right, fade out
  const driftX = 80 + Math.random() * 120;
  const driftY = 80 + Math.random() * 120;
  const life = 2000 + Math.random() * 1500;
  const fadeTime = 400;

  let start = null;
  function animate(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;

    // Fade in
    if (elapsed < fadeTime) {
      plus.style.opacity = (elapsed / fadeTime).toFixed(2);
    }
    // Stay visible
    else if (elapsed < life - fadeTime) {
      plus.style.opacity = '1';
    }
    // Fade out
    else if (elapsed < life) {
      plus.style.opacity = ((1 - (elapsed - (life - fadeTime)) / fadeTime)).toFixed(2);
    }
    // Remove
    else {
      plus.remove();
      return;
    }

    // Move position toward bottom right
    const progress = Math.min(elapsed / life, 1);
    plus.style.left = `${startX + driftX * progress}px`;
    plus.style.top  = `${startY + driftY * progress}px`;

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// Listen for dark mode changes to update plus signs live
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    document.querySelectorAll('#background > div').forEach(plus => {
      plus.style.color = isDarkMode() ? "#fff" : "#000";
    });
  });
}

setInterval(() => {
  const count = 2 + Math.floor(Math.random()*3);
  for (let i=0; i<count; ++i) createPlusSign();
}, 500);

window.addEventListener('resize', () => {
  BG.style.width = `${window.innerWidth}px`;
  BG.style.height = `${window.innerHeight}px`;
});
BG.style.width = `${window.innerWidth}px`;
BG.style.height = `${window.innerHeight}px`;

// ----- Section navigation logic -----
const mainOptions = document.getElementById('main-options');
const botsSection = document.getElementById('bots-section');
const gamesSection = document.getElementById('games-section');
const botsBtn = document.getElementById('bots');
const gamesBtn = document.getElementById('games');
const backBotsBtn = document.getElementById('back-bots');
const backGamesBtn = document.getElementById('back-games');

function showMain() {
  mainOptions.style.display = 'flex';
  botsSection.style.display = 'none';
  gamesSection.style.display = 'none';
}
function showBots() {
  mainOptions.style.display = 'none';
  botsSection.style.display = 'flex';
  gamesSection.style.display = 'none';
}
function showGames() {
  mainOptions.style.display = 'none';
  botsSection.style.display = 'none';
  gamesSection.style.display = 'flex';
}

showMain();

botsBtn.onclick = showBots;
gamesBtn.onclick = showGames;
backBotsBtn.onclick = showMain;
backGamesBtn.onclick = showMain;