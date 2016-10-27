var reverseReader = require("../index.js").reverseReader
const expect = require('chai').expect

describe('reverseRead:test', ()=>{
   it('read:suc normal file', (done)=>{
       var results = [
           'Not fully tested, will add more',
           'ReverseRead'
       ]
       var resultGen = (function* gen(){
           yield* results
       })()
       var lines = []
       new reverseReader('tests/test1.txt', (err, line)=>{
            if(err){
                return
            }
            var li = resultGen.next()
            if( li.done ){
                expect(true).to.be.equal(true)
                done()
            }
            if( line !== li.value ){
                expect(line).to.be.equal(li.value)
                done()
            }
        })
   }), 
   it('read:suc empty file', (done)=>{
       new reverseReader('tests/test2.txt', (err, line)=>{
            if(err){
                expect(false).to.be.equal(true)
                done()
                return
            }
            expect(false).to.be.equal(true) // no line should be invoked with
            done()
        })
        setTimeout(()=>{
            expect(true).to.be.equal(true) // no line should be invoked with
            done()
        },1500)
   }),
   it('read:suc normal file with little buffer', (done)=>{
       var results = [
           'Had I not seen the Sun',
        'I could have borne the shade',
        'But Light a newer Wilderness',
        'My Wilderness has made —'
       ].reverse()
       var resultGen = (function* gen(){
           yield* results
       })()
       var lines = []
       new reverseReader('tests/test3.txt', (err, line)=>{
            if(err){
                return
            }
            var li = resultGen.next()
            if( li.done ){
                expect(true).to.be.equal(true)
                done()
            }
            if( line !== li.value ){
                expect(line).to.be.equal(li.value)
                done()
            }
        })
   },1),
   it('read:fail', (done)=>{
        new reverseReader('nonexist.json', (err, line)=>{
            if(err){
                expect(true).to.be.equal(true)
                done()
                return
            }
            expect(false).to.be.equal(true)
            done()
        })
   })
})