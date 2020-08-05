const fs = require("fs");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const ora = require("ora");
module.exports.clone = async (repo, desc, answers) => {
  const spinner = ora("正在下载模板...").start();
  await download(repo, desc);
  spinner.succeed();
  // 更改package.json
  const fileName = `${desc}/package.json`;
  const meta = {
    name: desc,
    description: answers.description,
    author: `${answers.author} ${answers.email}`,
  };
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(fileName, result);
  }
};
