/**
 * Created by liuxiaoxiao1 on 16/12/7.
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
console.log('5555');
console.log(filePath);


//读取文件存储数组
var fileArr = [];
var fileObj = {
    'directory':[],
    'file':[]
}



//读取文件目录
fs.readdir(filePath, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    var count = files.length;
    var results = {};
    files.forEach(function (filename) {

        //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
        fs.stat(path.join(filePath, filename), function (err, stats) {
            if (err) throw err;

            console.log(path.join(filePath, filename));
            //
            console.log('----');
            console.log(stats);


            //文件
            if (stats.isFile()) {

                //读取文件详细内容
                //fs.readFile(path.join(filePath, filename), function(err, fileData) {
                //    console.log(fileData.toString());
                //});

                //这里暂且只处理大赛直接目录下的文件, 文件夹暂且不处理
                var extNameArr = ['.html', '.css', '.js']

                if (~extNameArr.indexOf(path.extname(filename))) { //作用等同于getdir
                    var newUrl = filename;
                    fileObj.file.push(newUrl);
                    console.log(fileObj.file);
                    console.log(fileObj.directory);
                    writeFile(fileObj.file);
                }
                // (getdir(filename) == 'html')&&(fileArr.push(filename);writeFile(newUrl));
                //    console.log("%s is file", filename);
            } else if (stats.isDirectory()) {
                // console.log("%s is a directory文件目录", filename);

                //读取目录下的文件
                //if (filename == 'css' || filename == 'imgs') {
                //    //var readurl = filePath+'/'+filename;
                //    //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
                //    //    console.log(path.join(filePath,filename));
                //    var name = filename;
                //    readFile(path.join(filePath, filename), name);
                //}

                //对于目录只返回目录的名称
                fileObj.directory.push(filename);

            }
        });
    });
});
console.log(fileObj.file);
console.log(fileObj.directory);

return false;


//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

//获取文件数组
function readFile(readurl, name) {
    console.log(name);
    var name = name;
    fs.readdir(readurl, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function (filename) {
            // console.log(path.join(readurl,filename));

            fs.stat(path.join(readurl, filename), function (err, stats) {
                if (err) throw err;
                //是文件
                if (stats.isFile()) {
                    //读取文件详细内容
                    //fs.readFile(path.join(filePath, filename), function(err, fileData) {
                    //    console.log(fileData.toString());
                    //});

                    //这里暂且只处理大赛直接目录下的文件, 文件夹暂且不处理
                    var extNameArr = ['.html', '.css', '.js', '.png'];

                    if (~extNameArr.indexOf(path.extname(filename))) { //作用等同于getdir
                        var newUrl = filename;
                        fileObj.file.push(newUrl);
                        writeFile(fileObj.file);
                    }
                } else if (stats.isDirectory()) {
                    var dirName = filename;
                    readFile(path.join(readurl, filename), name + '/' + dirName);
                    //利用arguments.callee(path.join())这种形式利用自身函数，会报错
                    //arguments.callee(path.join(readurl,filename),name+'/'+dirName);
                }
            });
        });
    });
}


// 写入到filelisttxt文件
function writeFile(data) {
    var data = data.join("\n");
    fs.writeFile(workPath + "/" + "filelist.txt", data + '\n', function (err) {
        if (err) throw err;
        console.log("写入成功");
    });
}