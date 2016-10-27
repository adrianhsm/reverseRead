'use strict'
const fs = require('fs')
const util = require('util')
const eventEmitter = require("events").EventEmitter
const BUF_SIZE = 500

class reverseReader{
    constructor(path, cb, bufSize){
       this.ee = new eventEmitter()
       this.bufSize = bufSize || BUF_SIZE
       this.readSize = this.bufSize
       this.buffer = new Buffer(this.bufSize)
       this.lines = [] 
       this.fileOffset = 0
       this.len = 0
       this.fd = null
       this.left = ''
       this.reverseRead(path,cb)
       this.ee.on('line', (line)=>{
            if( line && line !== '' && line !== '\r'){
                cb(null, line)
            }
            this.ee.emit('lineread', {})
        })
       this.ee.on('lineread', ()=>{
            const lines = this.lines
            lines.shift()
            if( lines.length == 0 ){
                this.ee.emit('buffer',{})
            }else{
                this.ee.emit('line', lines[0])
            }
        })
        this.ee.on('buffer', ()=>{
            const that = this
            if( that.fileOffset < 0 ){
                that.ee.emit('done', {})
                return
            }
            fs.read(that.fd, that.buffer, 0, that.readSize, that.fileOffset, (err, bytesRead, buffer)=>{
                if( err ){
                    cb(err, null)
                    return
                }
                let buf = buffer.slice(0, bytesRead )
                that.lines = (buf.toString() + that.left).split(/\r{0,1}\n/).reverse()
                that.left = ''
                if( bytesRead < that.readSize ){
                    that.fileOffset = -1
                }else{
                    if( that.fileOffset == 0 ){ //is read from beginning
                        that.fileOffset = -1 
                    }else{
                        that.left = that.lines[that.lines.length-1]
                        that.lines.pop()
                        that.fileOffset = that.fileOffset - that.readSize
                        if( that.fileOffset < 0 ){
                            that.readSize += that.fileOffset
                            that.fileOffset = 0;
                        }
                    }
                }
                that.ee.emit('line', that.lines[0] )
            })
        })
        this.ee.on('done', ()=>{
           fs.close(this.fd,(err)=>{
               if( err ){
                   cb(err, null)
               }
           }) 
        })
    }
    reverseRead(path, cb)  {
        const that = this
        fs.open(path, 'r', (err, fd)=>{
            if( err ){
                cb(err, null)
                return
            }
            const stat = fs.fstatSync(fd)
            that.len = stat.size
            that.fd = fd 
            that.fileOffset = that.len > that.bufSize ? that.len-that.bufSize : 0
            that.ee.emit('buffer', {})
        })
    }
}

module.exports = {
    reverseReader
}