//Import modules
const CLI = require('./lib/cli.js');
const figlet = require("figlet");

//Print heading banner for app
console.log(
  figlet.textSync("Employee Manager", {
    font: "Standard",
    horizontalLayout: "fitted",
    verticalLayout: "full",
    width: 80,
    whitespaceBreak: true,
  })
);

//Run commandline prompts
const cli = new CLI();

cli.run();