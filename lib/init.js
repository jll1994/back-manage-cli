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
    "github:jll1994/backstage-manage-template",
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
          version: answers.version,
          description: answers.description,
          author: `${answers.author}`,
        };
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        // 自动安装依赖
        const spin = ora("正在安装依赖，请稍后....").start();
        const { spawn } = require("child_process");
        const proc = spawn(
          process.platform === "win32" ? "npm.cmd" : "npm",
          ["install"],
          {
            cwd: `./${projectName}`,
          }
        );
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on("close", () => {
          spin.succeed();
          console.log(symbols.success, chalk.green("项目初始化完成"));
          console.log(
            `Successfully created project ${chalk.green(projectName)}`
          );
          log.default("Get started with the following commands:");
          log.success(`cd ${projectName}`);
          log.success("npm run serve");
        });
      }
    }
  );
}
module.exports = clone;
