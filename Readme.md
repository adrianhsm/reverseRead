# ReverseRead

`It is a module to allow you to read a file line by line from end to beginning,
    without having to load all the content at once at the risk of memory leak`

## Example:
```html
new reverseReader('Test.txt', (err, line)=>{
    if(err){
        console.error(err)
        return
    }
    console.log( line )
})
```

## Install :
`npm install reverseRead`


## Warning:
`Please note that empty line will not be invoked with`

