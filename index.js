var chalk    = require("chalk");
var clear    = require("clear");
var CLI      = require("clui");
var figlet   = require("figlet");
var inquirer = require("inquirer");

clear();
console.log(
  chalk.yellow(
    figlet.textSync("Q8", { horizontalLayout: "full" })
  )
);
