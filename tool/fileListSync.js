/**
 * Created by liuxiaoxiao1 on 16/12/7.
 * 同步读取 目录下文件大小
 */

var fs = require("fs");

//path模块，可以生产相对和绝对路径
var path = require("path");

//配置远程路径
var remotePath = "/resource/fd/promote/201507/qixi/";

//获取当前目录绝对路径，这里resolve()不传入参数
//var filePath = path.resolve();
var workPath = __dirname;
var filePath = path.join(workPath, 'adobe');


//读取文件存储数组

var fileObj = {
    'directory': [],
    'file': []
}

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件
function readFile(path, filesList) {
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path + '/' + file; //文件绝对路径
            obj.isFile = true;
            filesList.push(obj);
        }
    }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, 'utf-8', complete);
    function complete() {
        console.log("文件生成成功");
    }
}


var filesList = geFileList(filePath);

console.log(filesList);
filesList.sort(sortHandler);
function sortHandler(a, b) {
    if (a.size > b.size)
        return -1;
    else if (a.size < b.size) return 1
    return 0;
}
var str = '';
for (var i = 0; i < filesList.length; i++) {
    var item = filesList[i];
    var desc = "文件名:" + item.name + " "
        + "大小:" + (item.size / 1024).toFixed(2) + "/kb" + " "
        + "路径:" + item.path;
    str += desc + "\n"
}


writeFile("test.txt", str);

