const fs = require('fs');

// Below commands are implemented:-
// 1) node wcat.js filepath => displays the contents of a file in terminal
// 2) node wcat.js filepat1 filepath2 filepath3 => displays the contents of all files in terminal in concatenated form in given order
// 3) node wcat.js -n file1 file2 file3 OR node wcat.js -n file => this command will give the numbers to each line of code
let inputArr = process.argv.slice(2);// we are taking content from 2nd index so that first 2 (address of node & address of wcat) can be skipped and we can get our only input 

let filesArr = [];
let optionsArr = []; // it will store flags like -n
// placed files path in filesArr

for(let i = 0;i < inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == '-'){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
   
}

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
    content += fileContent + "\r\n";
}
// console.log(content);

let contentArr = content.split("\r\n");
console.table(contentArr);
console.log(contentArr);

// check if -s is present or not
let tempArr = [];
let isSPresent = optionsArr.includes("-s");
if (isSPresent) {
    for (let i = 1; i < contentArr.length; i++){
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    // console.table(contentArr);
    
    //push everything in tempArr except null
    for (let i = 0; i < contentArr.length; i++){
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    // console.log("data after removing extra lines\n",tempArr);
}

contentArr = tempArr;
console.log("Content Arr is :-");
console.log(contentArr);

let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");
// if -n or -b is not found, -1 is returned

let finalOption = "";

// if both -n & -b present
if(indexOfB != -1 && indexOfN != -1){
    if(indexOfN > indexOfB){
        finalOption = "-b";
    }
    else{
        finalOption = "-n";
    }
}
// either -n is present or -b is present
else{
    if(indexOfN != -1){
        finalOption = "-n";
    }
    else if(indexOfB != -1){
        finalOption = "-b";
    }
}

// calling of funtions by evaluating finalOption
// either -n will be implemneted or -b, both at the same time will not make sense
if(finalOption == "-n"){
    modifyContentByN();
}
else if(finalOption == "-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i = 0;i < contentArr.length;i++){
        contentArr[i] = (i+1) + ")" + contentArr[i];
    }
}

function modifyContentByB(){
    let count = 1;
    for(let i = 1;i < contentArr.length;i++){
        if(contentArr[i] != ""){
            contentArr[i] = count + ") " + contentArr[i];
            count++;
        }
        
    }
}

console.log(contentArr);
