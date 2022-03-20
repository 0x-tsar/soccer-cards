//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Soccer is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event cardSold(
        address indexed from,
        address indexed to,
        uint256 indexed id,
        uint256 price
    );

    mapping(uint256 => address) public cardCreator;
    mapping(uint256 => CardStruct) public cards;
    struct CardStruct {
        uint256 id;
        uint256 createdAt;
        address payable owner;
        address payable creator;
        uint256 totalAmount;
        uint256 price;
    }

    address payable immutable owner;
    mapping(address => bool) public admins;
    uint256 CONTRACT_FEE = 500; //5.0%

    constructor() ERC721("Soccer Cards", "SOKR") {
        owner = payable(msg.sender);
    }

    function mint(
        string memory tokenURI,
        uint256 amount,
        uint256 price
    ) public {
        require(
            owner == msg.sender || admins[msg.sender],
            "You are not allowed to mint a card, because you are not an admin or the owner"
        );

        for (uint256 i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();

            _mint(address(this), newItemId);
            _setTokenURI(newItemId, tokenURI);

            //card creator
            cardCreator[newItemId] = msg.sender;

            CardStruct memory card = CardStruct({
                id: newItemId,
                createdAt: block.timestamp,
                owner: payable(address(this)),
                creator: payable(msg.sender),
                totalAmount: amount,
                price: price
            });

            cards[newItemId] = card;
        }
    }

    // adding card creators, just admin allowed to add
    function addCreator(address addr) external {
        require(owner == msg.sender, "YOU ARE NOT ADMIN");
        require(!admins[addr], "This address is an admin already!");
        admins[addr] = true;
    }

    function buyCardFromMarket(uint256 id) public payable {
        // if the market is the owner, than it's for sale
        // check if im not the owner
        // check if the contract is the owner
        // check if my paying is the same as the asked for the card
        //emit event
        require(
            cards[id].owner == address(this),
            "The market does not own this card"
        );

        require(cards[id].owner != msg.sender, "You own this card!");
        require(cards[id].price == msg.value, "Wrong price!");

        emit cardSold(address(this), msg.sender, cards[id].id, cards[id].price);

        //  PAY CREATOR HIS PART
        uint256 creatorFee = calculateFeeAdmin(msg.value);
        payable(cards[id].creator).transfer(creatorFee);

        _transfer(address(this), msg.sender, id);
        cards[id].owner = payable(msg.sender);
    }

    //100 basis points = 1.00 pct
    function calculateFeeAdmin(uint256 amount) private view returns (uint256) {
        require((amount / 10000) * 10000 == amount, "too small");
        return (amount * CONTRACT_FEE) / 10000;
    }

    function checkFunds() public view onlyOwner returns (uint256) {
        //setting a redundancy here for security
        require(msg.sender == owner, "You are not the owner");
        return address(this).balance;
    }

    function retrieveFunds() public onlyOwner {
        //setting a redundancy here for security
        require(msg.sender == owner, "You are not the owner");
        payable(owner).transfer(address(this).balance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
}

//  function mintCards(
//         string memory _title,
//         uint256 _price,
//         string memory _description,
//         string memory _club,
//         string memory _urlPicture,
//         uint256 _totalAmount
//     ) external {
//         require(creators[msg.sender], "YOU ARE NOT A CREATOR");
//         require(
//             clubToCreator[_club] == msg.sender || admin == msg.sender,
//             "YOU ARE NOT CREATOR OF THIS CLUB"
//         );

//         for (uint256 i = 0; i < _totalAmount; i++) {
//             //
//             Card memory card = Card({
//                 title: _title,
//                 id: nextItemId,
//                 owner: address(this),
//                 price: _price,
//                 description: _description,
//                 urlPicture: _urlPicture,
//                 club: _club,
//                 timestamp: block.timestamp,
//                 createdBy: msg.sender,
//                 totalAmount: _totalAmount
//             });

//             _mint(address(this), nextItemId.current());
//             marketCards[address(this)][nextItemId.current()] = card;
//             _setTokenURI(nextItemId.current(), _urlPicture);
//             nextItemId.increment();

//             //      _tokenIds.increment();

//             // uint256 newItemId = _tokenIds.current();
//             // _mint(owner(), newItemId);
//             // _setTokenURI(newItemId, tokenURI);

//             // _setTokenURI(nextItemId, _tokenURI);
//             // _setTokenURI(nextItemId.current(), _urlPicture); //ipfs or pinata address

//             emit cardMinted(
//                 card.id,
//                 card.owner,
//                 card.timestamp,
//                 card.title,
//                 card.price,
//                 card.description,
//                 card.urlPicture,
//                 card.totalAmount,
//                 card.createdBy
//             );
//         }

//         // tokenOfOwnerByIndex(owner, index);
//         // tokenByIndex(index);
//     }
