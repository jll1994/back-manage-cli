const chalk = require("chalk");
exports.log = {
  default(msg = "") {
    console.log(msg);
  },
  warning(msg = "") {
    console.log(chalk.yellow(msg));
  },
  error(msg = "") {
    console.log(chalk.red(msg));
  },
  success(msg = "") {
    console.log(chalk.green(msg));
    return msg;
  },
};
