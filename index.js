const CLI = require('./lib/cli.js');
const figlet = require("figlet");

console.log(
    figlet.textSync("Employee Manager", {
      font: "Standard" ,
      horizontalLayout: "fitted",
      verticalLayout: "full",
      width: 80,
      whitespaceBreak: true,
    })
  );

const cli = new CLI();

cli.run();