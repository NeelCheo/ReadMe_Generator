//packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

//WILL itererate over the key word using the same question format insteadof writing it over and over
//ORDER DOES MATTER
const questions = ["title", "description", "installation", "usage", "contributing", "tests", "username", "email"];
var location = __dirname.split("\\");
var repoName = location.slice(-1); // used to get the badge to print

//writes the inforation to the readme and creates it if there is none
function writeToFile(data, category) {
  if (questions[category] == "title") {
    // title is handled diffrently since it just the section header no content
    fs.appendFileSync("README.md", "# " + data[questions[category]], (err) => {
      if (err) {
        console.error(err);
      }
    });
    // IT GETS THE BADGE DIRECTLY FROM SHIELD IO LOCATION BASED ON USERNAME AND DIRECTORY NO NEED TO ASK CLIENT WHAT LICENSE IT IS USING!!!!!!!!!!!!!!!!!!!!!!
    //Shields.io has autogenerated license badges: https://img.shields.io/github/license/<Github-Username>/<Repository>
    fs.appendFileSync("README.md", "\t" + "![alt text](https://img.shields.io/github/license/" + data[username] + "/" + repoName + ")" + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
    // tabel of contents goes below the title so it was added when title is printed
    fs.appendFileSync("README.md", "## Tabel of Contents" + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
    for (const header in questions) {
      if (questions[header] !== "title" && questions[header] !== "username" && questions[header] !== "email") {
        fs.appendFileSync("README.md", "\n" + "[" + questions[header] + "]" + "(#" + questions[header] + ")" + "\n", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    } // questions section wasnt in list so it was manually added
    fs.appendFileSync("README.md", "\n" + "[questions](#questions?)" + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (questions[category] == "username") {
    // user name requires more than just the user input so it has it own section
    fs.appendFileSync("README.md", "## questions?" + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.appendFileSync("README.md", "\n" + "github: https://github.com/" + data[questions[category]] + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else if (questions[category] == "email") {
    // email requires more than just the user input so it has it own section
    fs.appendFileSync("README.md", "\n" + "email: " + data[questions[category]] + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    // this handles most of the sections
    fs.appendFileSync("README.md", "## " + questions[category] + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.appendFileSync("README.md", data[questions[category]] + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

//handles the application
async function init() {
  fs.writeFile("README.md", "", (err) => {
    if (err) {
      console.error(err);
    }
  });
  let userData = {};
  await inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?",
      },
    ])
    .then((data) => {
      userData["username"] = data["username"];
    });
  for (const category in questions) {
    await inquirer
      .prompt([
        {
          type: "input",
          name: questions[category],
          message: "What do you want to write for: " + questions[category],
        },
      ])
      .then((data) => {
        writeToFile(data, category);
      });
  }
}

//call to initialize app
init();
