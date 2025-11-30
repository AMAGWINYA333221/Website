document.addEventListener("DOMContentLoaded", () => {
  const BG = document.getElementById("background");

  // ----- Dark mode detection -----
  function isDarkMode() {
    return window.matchMedia &&
           window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function updateTheme() {
    document.body.style.background = isDarkMode() ? "#111" : "#fff";
    document.querySelectorAll("#background > div").forEach(plus => {
      plus.style.color = isDarkMode() ? "#fff" : "#000";
    });
  }

  // ----- Floating plus signs -----
  function createPlusSign() {
    const plus = document.createElement("div");
    plus.textContent = "+";
    plus.style.position = "absolute";
    plus.style.fontSize = `${18 + Math.random() * 22}px`;
    plus.style.color = isDarkMode() ? "#fff" : "#000";
    plus.style.opacity = "0";
    plus.style.pointerEvents = "none";
    plus.style.fontWeight = "bold";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    plus.style.left = `${startX}px`;
    plus.style.top = `${startY}px`;

    BG.appendChild(plus);

    const driftX = 80 + Math.random() * 120;
    const driftY = 80 + Math.random() * 120;
    const life = 2000 + Math.random() * 1500;
    const fadeTime = 400;
    let start = null;

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;

      if (elapsed < fadeTime) plus.style.opacity = (elapsed / fadeTime).toFixed(2);
      else if (elapsed < life - fadeTime) plus.style.opacity = "1";
      else if (elapsed < life) plus.style.opacity = (1 - (elapsed - (life - fadeTime)) / fadeTime).toFixed(2);
      else { plus.remove(); return; }

      const progress = Math.min(elapsed / life, 1);
      plus.style.left = `${startX + driftX * progress}px`;
      plus.style.top = `${startY + driftY * progress}px`;

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // Update theme on system changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
  }

  setInterval(() => {
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) createPlusSign();
  }, 500);

  // Resize background
  function resizeBG() {
    BG.style.width = `${window.innerWidth}px`;
    BG.style.height = `${window.innerHeight}px`;
  }
  window.addEventListener("resize", resizeBG);
  resizeBG();
  updateTheme();

  // ----- Section navigation -----
  const mainOptions = document.getElementById("main-options");
  const botsSection = document.getElementById("bots-section");
  const gamesSection = document.getElementById("games-section");
  const botsBtn = document.getElementById("bots");
  const gamesBtn = document.getElementById("games");
  const backBotsBtn = document.getElementById("back-bots");
  const backGamesBtn = document.getElementById("back-games");

  function showMain() { mainOptions.style.display = "flex"; botsSection.style.display = "none"; gamesSection.style.display = "none"; }
  function showBots() { mainOptions.style.display = "none"; botsSection.style.display = "flex"; gamesSection.style.display = "none"; }
  function showGames() { mainOptions.style.display = "none"; botsSection.style.display = "none"; gamesSection.style.display = "flex"; }

  botsBtn.addEventListener("click", showBots);
  gamesBtn.addEventListener("click", showGames);
  backBotsBtn.addEventListener("click", showMain);
  backGamesBtn.addEventListener("click", showMain);

  showMain();
});
