const path = require('path');
const fs = require('fs-extra');
const ComponentPaths = path.resolve(__dirname, '../Components/');
class File {
    constructor() {
        this.ComponentPath = 'd:\\code\\jusda-vscode-api\\src\\Components';
    }

    // 创建并写入文件
    async createAndWriteFile(fileUrl, title, fileName, fileInfo) {
        try {
            await fs.writeFile(fileUrl + `/${title}` + fileName, fileInfo);
            console.log("创建并写入文件");
        } catch (error) {
            Promise.reject(error);
            console.log(error)
        }
    }

    // 新增文件夹
    addDir(fileUrl,title) {
        console.log("新增文件夹");
        fs.ensureDirSync(fileUrl + `/${title}`)
    }

    // 删除文件夹
    deleteDir(title) {
        console.log("删除文件夹");
        fs.removeSync(this.ComponentPath + `/${title}`);
    }
}

module.exports = File;
// export default File;
