var reverseReader = require("../index.js").reverseReader

var rr = new reverseReader('Test.txt', (err, line)=>{
    if(err){
        console.error(err)
        return
    }
    console.log( line )
},1)