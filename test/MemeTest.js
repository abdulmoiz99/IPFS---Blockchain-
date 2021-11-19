// const Meme = artifacts.require('./Meme.sol')

import { assert } from "chai";

// //require('chai').use(require('chai-as-promised')).should()

// contract('Meme', (account) => {
//   let meme

//   describle('deployment', async () => {
//     it('deployed succesfully', async () => {
//       meme = await Meme.deployed()
//       const address = meme.address
//       console.log(address)
//     })
//   })
// })


var Meme = artifacts.require("./Meme.sol");

contract("Meme", function(accounts) {

    var memeInstance;

    describe('deployment', function(){
        it("Test Connection", function() {
            return Meme.deployed().then(function(instance) {
                memeInstance = instance
                return instance.address;
            }).then(function(address) {
                assert.notEqual(address,'',"address is not empty");
                assert.notEqual(address,0x0,"address is not 0x0");
                assert.notEqual(address,null,"address is not null");
                assert.notEqual(address,undefined,"address is not undefined");
            });
        });
    });


    describe('storage', function(){
        it('updates the meme hash', async() =>{
            const memeHash = 'testHash';
            await memeInstance.setMemeHash(memeHash);
            const result = await memeInstance.getMemeHash();
            assert.equal(memeHash,result,"meme getter and setter works!");
        });
    });
})