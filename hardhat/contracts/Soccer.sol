//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Soccer is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => address) public cardCreator;
    mapping(uint256 => CardStruct) cards;
    struct CardStruct {
        uint256 id;
        uint256 createdAt;
        address owner;
    }

    constructor() ERC721("Soccer Cards", "SOKR") {}

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(address(this), newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function buyCardFromMarket(uint256 id) public payable {}

    //100 basis points = 1.00 pct
    function calculateFeeAdmin(uint256 amount) private view returns (uint256) {
        require((amount / 10000) * 10000 == amount, "too small");
        return (amount * CONTRACT_FEE) / 10000;
    }
}