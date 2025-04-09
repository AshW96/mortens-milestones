const dotenv = require("dotenv");
dotenv.config();

const steamId = "76561199305301663";
const apiKey = process.env.STEAM_API_KEY;

async function GetGames() {
  try {
    const gamesRes = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`
    );
    const gamesJson = await gamesRes.json();
    return gamesJson.response.games;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

module.exports = { GetGames };
