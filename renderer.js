const ipcRenderer = window.electron.ipcRenderer;

async function displayGames() {
  const games = await ipcRenderer.invoke("get-games");
  const sortedGames = games.sort(
    (a, b) => b.playtime_forever - a.playtime_forever
  );

  const container = document.getElementById("games-container");
  container.innerHTML = ""; // Clear previous content

  sortedGames.forEach((game) => {
    const gameElement = document.createElement("div");
    gameElement.innerHTML = `<strong>${game.name}</strong> - Playtime: ${game.playtime_forever} minutes`;
    container.appendChild(gameElement);
  });
}

document
  .getElementById("fetch-games-btn")
  .addEventListener("click", displayGames);
