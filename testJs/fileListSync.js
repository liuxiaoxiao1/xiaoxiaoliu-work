/**
 * Created by liuxiaoxiao1 on 16/12/7.
 * 同步读取
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
    var filesList = []; //deleted by liuxiaoxiao
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件
function readFile(path1, filesList) {
    files = fs.readdirSync(path1);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path.join(path1, file));
        if (states.isDirectory()) {
            //readFile(path + '/' + file, filesList); //deleted by liuxiaoxiao
            //创建一个对象保存信息
            var obj = new Object();
            obj.name = file;//文件名
            obj.path = path + '/' + file; //文件绝对路径
            obj.isFile = false;
            filesList.push(obj);
        }
        else {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path + '/' + file; //文件绝对路径
            obj.isFile = true;
            //filesList.push(obj); //deleted by liuxiaoxiao
            filesList.push(obj);
        }
    }
}



//var filesList = geFileList(filePath);
//文件大小排序
//filesList.sort(sortHandler);
//function sortHandler(a, b) {
//    if (a.size > b.size)
//        return -1;
//    else if (a.size < b.size) return 1
//    return 0;
//}
//var str = '';
//for (var i = 0; i < filesList.length; i++) {
//    var item = filesList[i];
//    var desc = "文件名:" + item.name + " "
//        + "大小:" + (item.size / 1024).toFixed(2) + "/kb" + " "
//        + "路径:" + item.path;
//    str += desc + "\n"
//}

var filesList = geFileList(filePath);
console.log(filesList);

//检测文件或者文件夹存在 nodeJS
//function fsExistsSync(path) {
//    try{
//        fs.accessSync(path);//或者 fs.statSync(path)
//    }catch(e){
//        return false;
//    }
//    return true;
//}
//console.log(fsExistsSync('./adobep'));

//var statess = fs.statSync(filePath + '/' + 'ss.txt');
//console.log(statess.isFile());

