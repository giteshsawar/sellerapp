/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
const path = require('path');
const net = require('net');
const { join } = path;
const spawn = require('child_process').spawn;
const shell = require('shelljs');
const http = require('http');
const NativeImage = require('electron').nativeImage;

const util = require('util');

const exec = require('child_process').exec;

const logTag = '[NOSQLCLIENT]';
let mongoProcess, nodeProcess;

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://www.nosqlclient.com');
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  });
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  );
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ];
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;
const mongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
      if (!err) {
        resolve('We are connected', db);
      } else {
        reject(err);
      }
    });
  });
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const loadWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true
    }
  });

  loadWindow.loadURL(`file://${__dirname}/loading.html`);

  // const menuBuilder = new MenuBuilder(loadWindow);
  // menuBuilder.buildMenu();

  const appRoot = path.resolve(__dirname);
  //  fix tunnel-ssh
  shell.cp(
    '-R',
    join(appRoot, 'app', '/programs/server/npm/node_modules/tunnel-ssh'),
    join(
      appRoot,
      'app',
      'programs/server/npm/node_modules/meteor/modules-runtime/node_modules/'
    )
  );

  beginStartingMongo(appRoot, loadWindow);
};

const beginStartingMongo = function(appRoot, loadingWin) {
  console.log(logTag, 'trying to start mongod process');
  let path = join(appRoot, 'bin', 'mongod');
  if (process.platform === 'win32') {
    path += '.exe';
  } else if (process.platform === 'linux') {
    path += '.deb';
  }
  console.log('process platform \n\n', process.platform);
  console.log(logTag, 'detected mongod executable path: ' + path);

  let dataDir;
  let lockfile;

  if (process.platform === 'win32') {
    dataDir = process.env.APPDATA;
  } else if (process.platform === 'darwin') {
    dataDir = join(process.env.HOME, 'Library', 'Preferences');
  } else if (process.platform === 'linux') {
    dataDir = join(process.env.HOME, 'var', 'local');
  }
  dataDir = join(dataDir, 'Mongoclient', 'db');
  lockfile = join(dataDir, 'mongod.lock');
  console.log(logTag, 'detected mongod data directory: ' + dataDir);

  console.log(
    logTag,
    'trying to create data dir and removing mongod.lock just in case'
  );
  shell.mkdir('-p', dataDir);
  shell.rm('-f', lockfile);

  freeport(null, function(port) {
    console.log(logTag, 'trying to spawn mongod process with port: ' + port);
    mongoProcess = spawn(path, [
      '--dbpath',
      dataDir,
      '--port',
      port,
      '--bind_ip',
      '127.0.0.1',
      '--smallfiles'
    ]);

    mongoProcess.stdout.on('data', function(data) {
      console.log(logTag, '[MONGOD-STDOUT]', data.toString());

      if (/waiting for connections/.test(data.toString())) {
        startNode(appRoot, port, loadingWin);
      }
    });

    mongoProcess.stderr.on('data', function(data) {
      console.error(logTag, '[MONGOD-STDERR]', data.toString());
    });

    mongoProcess.on('exit', function(code) {
      console.log(logTag, '[MONGOD-EXIT]', code.toString());
    });
  });
};

const startNode = function(appRoot, mongoPort, loadingWin) {
  console.log(logTag, 'trying to start node process');
  let path = join(appRoot, 'bin', 'node');
  if (process.platform === 'win32') {
    path += '.exe';
  }
  console.log(logTag, 'detected node executable path: ' + path);

  const mainPath = join(appRoot, 'app', 'main.js');
  console.log(logTag, 'detected main app root: ' + mainPath);

  freeport(null, function(port) {
    process.env.PORT = port;
    process.env.ROOT_URL = 'http://localhost:' + port;
    process.env.MONGO_URL = 'mongodb://localhost:' + mongoPort + '/mongoclient';

    console.log(
      logTag,
      'detected environment variables: ' + JSON.stringify(process.env)
    );

    console.log(logTag, 'trying to spawn node process with port: ' + port);
    nodeProcess = spawn(path, [mainPath]);
    nodeProcess.stdout.on('data', function(data) {
      console.log(logTag, '[NODE-STDOUT]', data.toString());
    });

    nodeProcess.stderr.on('data', function(data) {
      console.error(logTag, '[NODE-STDERR]', data.toString());
    });

    nodeProcess.on('exit', function(code) {
      console.log(logTag, '[NODE-EXIT]', code.toString());
    });

    waitUntilMeteorGetsReady(port, loadingWin);
  });
};

const waitUntilMeteorGetsReady = function(port, loadingWin) {
  let fired = false;

  http
    .get(process.env.ROOT_URL, function() {
      if (!fired) {
        fired = true;
        loadWindow(port, loadingWin);
      }
    })
    .on('error', function(/* err */) {
      if (fired) return;
      setTimeout(function() {
        waitUntilMeteorGetsReady(port, loadingWin);
      }, 30);
    });
};

const freeport = function(start, done) {
  console.log(logTag, 'trying to find free port for spawn');
  start = start || 11235;
  const socket = new net.Socket()
    .once('connect', function() {
      socket.destroy();
      freeport(++start, done);
    })
    .once('error', function(/* err */) {
      socket.destroy();
      done(start);
    })
    .connect(start, '127.0.0.1');
};

const loadWindow = function(appPort, loadingWin) {
  mainWindow = new BrowserWindow({
    devTools: true,
    webPreferences: {
      nodeIntegration: false
    },
    width: 1200,
    height: 900,
    icon: NativeImage.createFromPath('img//mc_icon_50.png')
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  window.loadURL(`file://${__dirname}/app.html`);
  loadingWin.close();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
