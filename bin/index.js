#!/usr/bin/env node
const fs = require("fs");
const program = require("commander"); //命令
const inquirer = require("inquirer"); //用户交互
const init = require("../lib/init");
const { exit } = require("process");
const deleteFolder = require("../lib/deleteFolder");
const { initInfo, folderExist, rename } = require("../lib/inquirerConfig");
program
  .version(require("../package.json").version, "-v --version")
  .command("init <name>")
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer.prompt(initInfo).then((answers) => {
        init(name, answers);
      });
    } else {
      inquirer.prompt(folderExist).then(({ recover }) => {
        if (recover === "cover") {
          deleteFolder(name);
          inquirer.prompt(initInfo).then((answers) => {
            init(name, answers);
          });
        } else if (recover === "new") {
          inquirer.prompt(rename).then(({ newName }) => {
            inquirer.prompt(initInfo).then((answers) => {
              init(newName, answers);
            });
          });
        } else {
          exit(1);
        }
      });
    }
  });
program.parse(process.argv);
