const ora = require("ora");
module.exports = async function spawn(...args) {
  const { spawn } = require("child_process");
  return new Promise((resolve, reject) => {
    const spinner = ora("正在安装依赖，请稍后....").start();
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.stderr.on("data", () => {
      reject(data);
    });
    proc.on("close", () => {
      spinner.succeed();
      resolve();
    });
  });
};
