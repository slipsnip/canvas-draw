const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, avoid garbage collection
let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600, title: "Canvas API Draw : [800 - 600]"});

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on("resize", changeTitle);

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

function changeTitle ()
{
    const size = mainWindow.getSize();
    const title = `${mainWindow.title} : [${size.join(" - ")}]`;
    mainWindow.setTitle(title);
}

app.on("ready", createWindow);


// Mac stuff.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Mac stuff...
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});