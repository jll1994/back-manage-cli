module.exports = {
  initInfo: [
    {
      type: "input",
      name: "description",
      message: "请输入项目描述",
    },
    {
      type: "input",
      name: "version",
      message: "请输入项目版本号",
    },
    {
      type: "input",
      name: "author",
      message: "请输入作者姓名",
    },
  ],
  folderExist: [
    {
      type: "list",
      name: "recover",
      message: "当前文件夹已经存在，请选择操作：",
      choices: [
        { name: "覆盖当前文件夹", value: "cover" },
        { name: "创建新的文件夹", value: "new" },
        { name: "退出", value: "exit" },
      ],
    },
  ],
  rename: [
    {
      type: "input",
      name: "newName",
      message: "请输入新的项目名称",
    },
  ],
};
