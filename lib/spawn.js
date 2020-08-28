const ora = require("ora");
module.exports = async function spawn(...args) {
  const { spawn } = require("child_process");
  return new Promise((resolve, reject) => {
    let params = args[1] || [];
    let spinner;
    if (params.includes("init")) {
      spinner = ora("初始化git版本库...").start();
    } else if (params.includes("install")) {
      spinner = ora("正在安装依赖，请稍后....").start();
    }
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.stdout.on("data", (data) => {
      resolve(data);
    });
    proc.stderr.on("data", (data) => {
      reject(data);
    });
    proc.on("close", () => {
      spinner.succeed();
      resolve();
    });
  });
};
