const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");
const symbols = require("log-symbols");
const { log } = require("./log");
const clone = require("./clone");
const spawn = require("./spawn");
module.exports = async function (projectName, answers) {
  // clone
  await clone("github:jll1994/backstage-manage-template", projectName);
  // 更改package.json
  const fileName = `${projectName}/package.json`;
  const meta = {
    name: projectName,
    version: answers.version,
    description: answers.description,
    author: `${answers.author}`,
  };
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
  // 初始化版本库
  log.default("初始化git版本库...");
  await spawn("git", ["init"], {
    cwd: `./${projectName}`,
  });
  console.log(symbols.success, chalk.green("git版本初始化完成"));
  // 自动安装依赖
  await spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["install"], {
    cwd: `./${projectName}`,
  });
  console.log(symbols.success, chalk.green("项目创建完成"));
  console.log(`Successfully created project ${chalk.green(projectName)}`);
  log.default("Get started with the following commands:");
  log.success(`cd ${projectName}`);
  log.success("npm run serve");
};
