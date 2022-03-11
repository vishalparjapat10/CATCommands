const fs = require('fs');

// 1) node wcat.js filepath => displays the contents of a file in terminal
// 2) node wcat.js filepat1 filepath2 filepath3 => displays the contents of all files in terminal in concatenated form in given order

let inputArr = process.argv.slice(2);// we are taking content from 2nd index so that first 2 (address of node & address of wcat) can be skipped and we can get our only input 

let filesArr = [];

// placed files path in filesArr
for(let i = 0;i < inputArr.length;i++){
    filesArr.push(inputArr[i]);
}
// console.log("files to be read are "+filesArr);
// console.log("files to be read are "+inputArr);

// check if all the files are present
for(let i = 0;i < filesArr.length;i++){
    let doesExist = fs.existsSync(filesArr[i])// it takes path of file and tells whether the files exists or not
    if(!doesExist){
        console.log(`${filesArr[i]} file does not exist`);
        // return;
        process.exit();
    }
}

let content = "";
for(let i = 0;i < filesArr.length;i++){
    let fileContent = fs.readFileSync(filesArr[i]);
    content += fileContent + "\n";
}
console.log(content);