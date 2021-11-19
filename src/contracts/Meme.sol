pragma solidity >=0.4.2 <0.8.0;

contract Meme {
    string memeHash;

    // constructor() {
    //     memeHash = "",
    // }
    function setMemeHash(string memory _memeHash) public {
        memeHash = _memeHash;
    }
    function getMemeHash() public view returns(string memory){
        return memeHash;
    }
}