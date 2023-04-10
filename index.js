const { Command } = require('commander');
const program = new Command();

program 
  .version('1.0.0')
  .command('go')
  .description('Sets up FERNS tech stack')
  .action(() => {
	setupFERNS();
})

program.parse(process.argv);

async function setupFERNS () {
  console.log('Setting up FERNS tech stack')
  
  // Create client folder 
  console.log('Setting up client...')
  await execa.command('npx create-react-app client')
  process.chdir('client')

  // Install dependencies
  console.log('Setting up Firebase and Stripe')
  await execa.command('npm i firebase react-stripe-js stripe')
  
  // Create server folder
  process.chdir('..')
  console.log('Setting up server')
  await execa.command('mkdir server')
  
  // Create server.js
  process.chdir('server')
  await execa.command('touch server.js')
  
  //Set up dependencies
  console.log('Installing dependencies')
  await execa.command('npm init -y')
  await execa.command('npm install express body-parser cors dotenv firebase-admin stripe')
  
  console.log('FERNS tech stack has been set up!')
}
