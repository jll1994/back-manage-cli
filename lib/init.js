const fs = require("fs");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const { log } = require("./log");
function clone(projectName, answers) {
  console.log(
    `Creating project in ${chalk.green(process.cwd() + `\\` + projectName)}`
  );
  const spinner = ora("正在下载模板...").start();
  download(
    "https://github.com:jll1994/backstage-manage-template#master",
    projectName,
    { clone: true },
    (err) => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
      } else {
        spinner.succeed();
        const fileName = `${projectName}/package.json`;
        const meta = {
          name: projectName,
          description: answers.description,
          author: `${answers.author} ${answers.email}`,
        };
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        console.log(symbols.success, chalk.green("项目初始化完成"));
        console.log(`Successfully created project ${chalk.green(projectName)}`);
        log.default("Get started with the following commands:");
        log.success(`cd ${projectName}`);
        log.success("npm run serve");
      }
    }
  );
}
module.exports = clone;
// const { clone } = require("../lib/clone");
// const spawn = async (...args) => {
//   const { spawn } = require("child_process");
//   return new Promise((resolve) => {
//     const proc = spawn(...args);
//     proc.stdout.pipe(process.stdout);
//     proc.stderr.pipe(process.stderr);
//     proc.on("close", () => {
//       resolve();
//     });
//   });
// };
// module.exports.init = async (name, answers) => {
//   console.log(
//     `Creating project in ${chalk.green(process.cwd() + `\\` + name)}`
//   );
//   // clone
//   await clone("github:jll1994/backstage-manage-template", name, answers);
//   // 自动安装依赖
//   await spawn("npm", ["install"], {
//     cwd: `./${name}`,
//   });
//   console.log(symbols.success, chalk.green("项目初始化完成"));
//   console.log(`Successfully created project ${chalk.green(name)}`);
//   log.default("Get started with the following commands:");
//   log.success(`cd ${name}`);
//   log.success("npm run serve");
// };
