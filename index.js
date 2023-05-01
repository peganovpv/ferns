#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function updateFiles(projectPath) {
    const appJsPath = path.join(projectPath, 'client', 'src', 'App.js');
    const appJs = await fs.readFile(appJsPath, 'utf8');
    const updatedAppJs = appJs.replace(
        'import React from \'react\';',
        'import logo from \'./logo.svg\';',
        'function App() {',
        '  return (',
        '    <div className="App">',
        '      <header className="App-header">',
        '        <img src={logo} className="App-logo" alt="logo" />',
        '        <p>',
        '          Edit <code>src/App.js</code> and save to reload.',
        '        </p>',
        '        <a',
        '          className="App-link"',
        '          href="https://reactjs.org"',
        '          target="_blank"',
        '          rel="noopener noreferrer"',
        '        >',
        '          You can find React documentation here.',
        '        </a>',
        '      </header>',
        '    </div>',
        '  );',
        '}',
    );
    await fs.writeFile(appJsPath, updatedAppJs);
    console.log('App.js updated.');
    const serverjsPath = path.join(projectPath, 'server', 'server.js');
    const serverjs = await fs.readFile(serverjsPath, 'utf8');
    const updatedServerjs = serverjs.replace(
        'const express = require(\'express\');',
        'const app = express();',
        'const cors = require(\'cors\');',
        'app.use(cors());',
        'app.use(express.json());',
        'app.get(\'/\', (req, res) => {',
        '  res.send(\'Hello World!\');',
        '});',
        'app.listen(5000, () => console.log(\'Server running on port 5000!\'));',
    );
    await fs.writeFile(serverjsPath, updatedServerjs);
    console.log('server.js updated.');
}

async function createStripeFiles(projectPath){
    const stripePath = path.join(projectPath, 'client', 'src', 'payments');
    await fs.ensureDir(stripePath);
    await fs.writeFile(path.join(stripePath, 'CheckoutForm.jsx'), '');
    await fs.writeFile(path.join(stripePath, 'CheckoutForm.css'), '');
    await fs.writeFile(path.join(stripePath, 'Payment.jsx'), '');
    await fs.writeFile(path.join(stripePath, 'Payment.css'), '');
    await fs.writeFile(path.join(stripePath, 'Success.jsx'), '');
    await fs.writeFile(path.join(stripePath, 'Success.css'), '');
}

async function createFirebaseFiles(projectPath){
    const firebasePath = path.join(projectPath, 'client', 'src', 'firebase');
    await fs.ensureDir(firebasePath);
    await fs.writeFile(path.join(firebasePath, 'firebase.js'), '');
    await fs.writeFile(path.join(firebasePath, '.env'), '');
}

async function createServerFolder(projectPath) {
    const serverPath = path.join(projectPath, 'server');
    await fs.ensureDir(serverPath);
    await fs.writeFile(path.join(serverPath, 'server.js'), '');
    console.log('Server folder created.');
}


async function main() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error('Error: Please provide a project name.');
    process.exit(1);
  }

  try {
    console.log('Creating React project...');
    await runCommand(`npm create vite@latest ${projectName} --template react`);

    console.log('Installing client dependencies...');
    const clientPath = path.join(process.cwd(), projectName);
    await runCommand(`cd ${clientPath} && npm install firebase stripe @mui/material react-modal react-awesome-reveal`);

    console.log('Creating server folder and installing dependencies...');
    await createServerFolder(clientPath);
    const serverPath = path.join(clientPath, 'server');
    await runCommand(`cd ${serverPath} && npm init -y && npm install express cors && npm install nodemon --save-dev`);

    console.log('FERNS stack project created!');
  } catch (error) {
    console.error('Error:', error);
  }
}

if (require.main === module) {
  main();
} else {
  module.exports = {
    main,
  };
}
