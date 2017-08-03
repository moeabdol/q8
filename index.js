var chalk    = require("chalk");
var clear    = require("clear");
var Table    = require("cli-table");
var figlet   = require("figlet");
var inquirer = require("inquirer");

var orders = [
  {
    id: "001",
    company: "SuperTrader",
    address: "Steindamm 80",
    item: "Macbook"
  },
  {
    id: "002",
    company: "Cheapskates",
    address: "Reeperbahn 153",
    item: "Macbook"
  },
  {
    id: "003",
    company: "MegaCorp",
    address: "Steindamm 80",
    item: "Book 'Guide to Hamburg'"
  },
  {
    id: "004",
    company: "SuperTrader",
    address: "Strenstrasse 125",
    item: "Book 'Cooking 101'"
  },
  {
    id: "005",
    company: "SuperTrader",
    address: "Ottenser Hauptstrasse 24",
    item: "Inline Skates"
  },
  {
    id: "006",
    company: "MegaCorp",
    address: "Reeperbahn 153",
    item: "Playstation"
  },
  {
    id: "007",
    company: "Cheapskates",
    address: "Lagerstrasse 11",
    item: "Flux compensator"
  },
  {
    id: "008",
    company: "SuperTrader",
    address: "Reeperbahn 153",
    item: "Inline Skates"
  }
];

// Show Q8 banner
function showBanner() {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync("Q8", { horizontalLayout: "full" })
    )
  );
  console.log(chalk.white("1.Show orders\n2.Add orders\n3.Delete orders\n" +
    "4.Filter by company\n5.Filter by address\n6.Trending items (DESC)"));
}
showBanner();

// Get user input
function getUserInput(callback) {
  var question = [
    {
      name: "command",
      type: "input",
      message: "Please choose a command number: ",
      validate: function(value) {
        if(value.length) {
          switch(value) {
            case "1":
              showOrders();
              break;
            case "2":
              addOrder();
              break;
            case "3":
              deleteOrder();
              break;
            case "4":
              filterByCompany();
              break;
            case "5":
              filterByAddress();
              break;
            case "6":
              showTrendingItemsDesc();
              break;
            default:
              return;
          }
        } else {
          return "Please choose a command number: ";
        }
      }
    }
  ];
  inquirer.prompt(question).then(callback);
}

getUserInput(function() {
  console.log(arguments);
});

function showOrders() {
  showBanner();

  // Construct orders table
  var table = new Table({
    head: ["ID", "Company", "Address", "Item"],
    colWidths: [10, 30, 30, 30]
  });
  for(i = 0; i < orders.length; i++) {
    table.push([orders[i].id, orders[i].company, orders[i].address, orders[i].item]);
  }
  console.log(table.toString());
}

function addOrder() {
  showBanner();
  console.log("2");
}

function deleteOrder() {
  showBanner();
  console.log("3");
}

function filterByCompany() {
  showBanner();
  console.log("4");
}

function filterByAddress() {
  showBanner();
  console.log("5");
}

function showTrendingItemsDesc() {
  showBanner();
  console.log("6");
}
