#!/usr/bin/env node
const { exec } = require('child_process');
const inquirer = require('inquirer');
const { join, basename } = require('path');
const { remove, copySync } = require('fs-extra');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
};

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

const templateOptions = [
  {
    name: 'JavaScript',
    value: 'js',
  },
  {
    name: 'TypeScript',
    value: 'ts',
  },
];

const questions = [
  {
    type: 'list',
    name: 'template',
    message: 'Which template would you like to use?',
    choices: templateOptions,
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?',
    default: 'my-ferns-project',
  },
];

async function createProject() {

  const answers = await inquirer.prompt(questions);
  const { projectName, template } = answers;

  let projectDirName = projectName;
  if (projectDirName === '.') {
    projectDirName = basename(process.cwd());
  }

  const projectPath = join(process.cwd(), projectDirName);
  const typescript = template === 'ts';

  await createViteProject(projectDirName, typescript);
  await copyTemplateFiles(projectPath, typescript);
  await installDependencies(projectDirName);
  
  console.log();
  console.log(`🎉  Successfully created project ${colors.green}${projectDirName}${colors.reset}.`);
  console.log(`👉  Get started by typing:`);
  console.log();
  console.log(`    ${colors.blue}cd ${projectDirName}${colors.reset}`);
  console.log(`    ${colors.blue}npm run dev${colors.reset}`);
  console.log();
}

async function createViteProject(projectName, typescript) {
  return new Promise((resolve, reject) => {
    const command = typescript ? `npm create vite@latest ${projectName} -- --template react-ts` : `npm create vite@latest ${projectName} -- --template react`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function installDependencies(projectName) {
  try {
    console.log("Installing dependencies. This may take a few minutes...");
    await runCommand(`cd ${projectName} && npm install stripe @stripe/react-stripe-js @stripe/stripe-js firebase react-router-dom react-modal @emotion/react @emotion/styled @mui/material @mui/icons-material`)
  } catch (error) {
    console.error("Error installing dependencies:", error);
  }
}

async function copyTemplateFiles(projectPath, typescript) {
  const TStemplatePath = join(__dirname, 'templates', 'ts');
  const JStemplatePath = join(__dirname, 'templates', 'js');

  const srcPath = join(projectPath, 'src');
  const indexPath = join(projectPath, 'index.html');
  const publicPath = join(projectPath, 'public');

  const templatePath = typescript ? TStemplatePath : JStemplatePath;

  const templateSrcPath = join(templatePath, 'src');
  const templateIndexPath = join(templatePath, 'index.html');
  const templatePublicPath = join(templatePath, 'public');

  await remove(srcPath);
  await remove(publicPath);

  copySync(templateSrcPath, srcPath);
  copySync(templateIndexPath, indexPath);
  copySync(templatePublicPath, publicPath);
}

async function main() {
  try {
    await createProject();
  } catch (error) {
    console.error(error);
  }
}

if (require.main === module) {
  main();
} else {
  module.exports = {
    main,
  };
}

