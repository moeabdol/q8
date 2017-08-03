#!/usr/bin/env node

var chalk    = require("chalk");
var clear    = require("clear");
var Table    = require("cli-table");
var figlet   = require("figlet");
var inquirer = require("inquirer");
var _        = require("underscore");

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
    item: "Book \"Guide to Hamburg\""
  },
  {
    id: "004",
    company: "SuperTrader",
    address: "Strenstrasse 125",
    item: "Book \"Cooking 101\""
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
}
showBanner();

var questions = [
  {
    type: "list",
    name: "command",
    message: "Please choose an option: (Ctrl-C to quit)",
    choices: [
      "Show orders",
      "Add order",
      "Remove order by ID",
      "Filter by company name",
      "Filter by company address",
      "Show trending items (DESC)"
    ],
    filter: function(choice) {
      return choice.toLowerCase();
    }
  }
];

function ask() {
  inquirer.prompt(questions).then(function(answers) {
    switch(answers.command) {
      case "show orders":
        showOrders();
        break;
      case "add order":
        addOrder();
        break;
      case "remove order by id":
        removeOrder();
        break;
      case "filter by company name":
        filterByCompany();
        break;
      case "filter by company address":
        filterByAddress();
        break;
      case "show trending items (desc)":
        showTrendingItemsDesc();
        break;
    }
  });
}
ask();

function showOrders() {
  showBanner();
  // Construct orders table
  var table = new Table({
    head: ["ID", "Company Name", "Company Address", "Item Name"],
    colWidths: [10, 30, 30, 30]
  });
  for(i = 0; i < orders.length; i++) {
    table.push([
      orders[i].id,
      orders[i].company,
      orders[i].address,
      orders[i].item
    ]);
  }
  console.log(table.toString());
  ask();
}

function addOrder() {
  var questions = [
    {
      type: "input",
      name: "id",
      message: "Order ID: ",
    },
    {
      type: "input",
      name: "company",
      message: "Company name: ",
    },
    {
      type: "input",
      name: "address",
      message: "Company address: ",
    },
    {
      type: "input",
      name: "item",
      message: "Item name: ",
    }
  ];
	inquirer.prompt(questions).then(function(answers) {
    order = {
      id: answers.id,
      company: answers.company,
      address: answers.address,
      item: answers.item
    }
    orders.push(order);
    showOrders();
  });
}

function removeOrder() {
  var question = [
    {
      type: "input",
      name: "id",
      message: "Order ID? ",
    }
  ];
	inquirer.prompt(question).then(function(answer) {
    for(var i in orders) {
      if(orders[i]["id"] === answer.id) {
        orders.splice(i, 1);
      }
    }
    showOrders();
  });
}

function filterByCompany() {
  var question = [
    {
      type: "input",
      name: "company",
      message: "Company name? ",
    }
  ];
	inquirer.prompt(question).then(function(answer) {
    // Construct filtered orders table
    var table = new Table({
      head: ["ID", "Company Name", "Company Address", "Item Name"],
      colWidths: [10, 30, 30, 30]
    });
    for(var i in orders) {
      if(orders[i]["company"] === answer.company) {
        table.push([orders[i].id, orders[i].company, orders[i].address,
          orders[i].item]);
      }
    }
    console.log(table.toString());
    ask();
  });
}

function filterByAddress() {
  var question = [
    {
      type: "input",
      name: "address",
      message: "Company address? ",
    }
  ];
	inquirer.prompt(question).then(function(answer) {
    // Construct filtered orders table
    var table = new Table({
      head: ["ID", "Company Name", "Company Address", "Item Name"],
      colWidths: [10, 30, 30, 30]
    });
    for(var i in orders) {
      if(orders[i]["address"] === answer.address) {
        table.push([orders[i].id, orders[i].company, orders[i].address,
          orders[i].item]);
      }
    }
    console.log(table.toString());
    ask();
  });
}

function showTrendingItemsDesc() {
  // Find unique items
  var unique_items = [];
  for(order of orders) {
    if(unique_items.indexOf(order.item) == -1) {
      unique_items.push(order.item);
    }
  }

  // Create initial unique items with counts
  var unique_items_counts = [];
  for(item of unique_items) {
    unique_items_counts.push({
      item: item,
      count: 0
    });
  }

  // Count unique items
  for(item of unique_items_counts) {
    for(order of orders) {
      if(item.item == order.item) {
        item.count++;
      }
    }
  }

  // Sort unique items by count
  var sorted_unique_items_by_count = _.sortBy(unique_items_counts, "count")
    .reverse();

  // Construct trends table
  var table = new Table({
    head: ["Item Name", "Order Count"],
    colWidths: [30, 30]
  });
  for(var i in sorted_unique_items_by_count) {
    table.push([
      sorted_unique_items_by_count[i].item,
      sorted_unique_items_by_count[i].count
    ]);
  }
  console.log(table.toString());
  ask();
}
