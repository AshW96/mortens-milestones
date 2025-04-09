const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { GetGames } = require("./services/steamApi"); // Import GetGames

//creating a new browser window
const createWindow = (fileName) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      //   nodeIntegration: true,
      //   contextIsolation: false,
      //     enableRemoteModule: true
    },
  });
  //Loading the index.html file into the window
  win.loadFile(fileName);

  ipcMain.handle("get-games", async () => {
    const games = await GetGames();
    return games; // Send the games data to the renderer
  });
};

//When electron is ready, execute whats in here
app.whenReady().then(() => {
  //createWindow("index.html");
  //createWindow("home.html");
  createWindow("src/sandbox.html");
});

//closing - this is for ios
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//-------------------------------------------------------------------
