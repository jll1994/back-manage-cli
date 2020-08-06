const download = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
module.exports = async function clone(repo, projectName) {
  return new Promise((resolve, reject) => {
    const spinner = ora("正在下载模板...").start();
    download(repo, projectName, { clone: true }, (err) => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
        reject(err);
      } else {
        spinner.succeed();
        console.log(symbols.success, chalk.green("模板下载完成"));
        resolve();
      }
    });
  });
};
