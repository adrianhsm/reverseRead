ReverseRead

add more test, sincerely sorry for the bug in previous version

Please check example/ReverseReadEx for usage

Usage Example:
new reverseReader('Test.txt', (err, line)=>{
    if(err){
        console.error(err)
        return
    }
    console.log( line )
})


PS:
Please note that empty line will not be invoked with

