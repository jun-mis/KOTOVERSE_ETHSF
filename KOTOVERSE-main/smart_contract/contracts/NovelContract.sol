// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// **************************
//  custom errors
// **************************
error NotAllowedToAddContent(uint256 tokenId);
error NotAllowedToComplete(bytes32 novelId);
error NovelNotExists(bytes32 novelId);
error NovelAlreadyCompleted(bytes32 novelId);

contract NovelContract is ERC721 {
    event NovelCreated(bytes32 indexed novelId, string title);
    event NovelCompleted(bytes32 indexed novelId);
    event ContentAdded(bytes32 indexed novelId, uint256 indexed tokenId);

    struct Novel {
        bytes32 id;
        string title;
        address creator;
        string summary;
        string category;
        string language;
        bool isCompleted;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct NewNovel {
        string title;
        string content;
        string summary;
        string category;
        string language;
    }

    struct NovelContent {
        uint256 tokenId;
        uint256 parentId;
        string content;
        address creator;
        uint256 createdAt;
    }

    uint256 private tokenId;
    bytes32 private novelId;

    uint256 constant FIRST_CONTENT_PARENT_ID = 0;

    // store novelId associated with tokenIds of novel contents
    mapping(bytes32 => uint256[]) private novelIdToTokenIds;

    // associate tokenId with novel content
    mapping(uint256 => NovelContent) private tokenIdToContent;

    // novelId => index in novels storage
    mapping(bytes32 => uint256) private novelIdToIndex;

    // store each novel that represents the whole novel
    Novel[] private novels;

    // ***************
    //  modifiers
    // ***************
    modifier novelExists(bytes32 _novelId) {
        uint256[] memory tokenIds = novelIdToTokenIds[_novelId];
        if (tokenIds.length == 0) {
            revert NovelNotExists(_novelId);
        }
        _;
    }

    modifier isNotEmpty(string calldata input) {
        require(bytes(input).length > 0, "Invalid input");
        _;
    }

    modifier novelNotCompleted(bytes32 _novelId) {
        uint256 index = novelIdToIndex[_novelId];
        Novel memory _novel = novels[index];
        if (_novel.isCompleted) {
            revert NovelAlreadyCompleted(_novelId);
        }
        _;
    }

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    /// @dev
    /// @param _newNovel string, novel title
    function createNovel(NewNovel calldata _newNovel)
        external
        isNotEmpty(_newNovel.title)
        isNotEmpty(_newNovel.content)
        isNotEmpty(_newNovel.summary)
        isNotEmpty(_newNovel.category)
        isNotEmpty(_newNovel.language)
    {
        tokenId++;

        bytes32 newNovelId = keccak256(
            abi.encodePacked(msg.sender, _newNovel.title, tokenId)
        );

        require(
            novelIdToTokenIds[newNovelId].length == 0,
            "Novel already exists"
        );

        novels.push(
            Novel({
                id: newNovelId,
                title: _newNovel.title,
                creator: msg.sender,
                summary: _newNovel.summary,
                category: _newNovel.category, // Can be bytes array
                language: _newNovel.language, // Can be bytes array
                isCompleted: false,
                createdAt: block.timestamp,
                updatedAt: block.timestamp
            })
        );

        NovelContent memory newContent = NovelContent({
            tokenId: tokenId,
            parentId: FIRST_CONTENT_PARENT_ID,
            content: _newNovel.content,
            creator: msg.sender,
            createdAt: block.timestamp
        });

        tokenIdToContent[tokenId] = newContent;
        novelIdToTokenIds[newNovelId].push(tokenId);

        novelIdToIndex[newNovelId] = novels.length - 1;

        _safeMint(msg.sender, tokenId);

        emit NovelCreated(newNovelId, _newNovel.title);
    }

    function addContent(
        bytes32 _novelId,
        uint256 _parentId,
        string calldata _content
    )
        external
        novelExists(_novelId)
        novelNotCompleted(_novelId)
        isNotEmpty(_content)
    {
        if (!canAddContent(_parentId)) {
            revert NotAllowedToAddContent(_parentId);
        }
        tokenId++;

        NovelContent memory newContent = NovelContent({
            tokenId: tokenId,
            parentId: _parentId,
            content: _content,
            creator: msg.sender,
            createdAt: block.timestamp
        });

        tokenIdToContent[tokenId] = newContent;
        novelIdToTokenIds[_novelId].push(tokenId);

        _safeMint(msg.sender, tokenId);
        // burn so that token cannot be sold again
        _burn(_parentId);

        uint256 novelIndex = novelIdToIndex[_novelId];

        Novel storage novelToUpdate = novels[novelIndex];
        novelToUpdate.updatedAt = block.timestamp;

        emit ContentAdded(_novelId, tokenId);
    }

    function completeNovel(bytes32 _novelId)
        external
        novelExists(_novelId)
        novelNotCompleted(_novelId)
    {
        if (!isAllowedToComplete(_novelId)) {
            revert NotAllowedToComplete(_novelId);
        }

        uint256 novelIndex = novelIdToIndex[_novelId];

        Novel storage novelToComplete = novels[novelIndex];

        novelToComplete.updatedAt = block.timestamp;
        novelToComplete.isCompleted = true;

        emit NovelCompleted(_novelId);
    }

    function canAddContent(uint256 _tokenId) public view returns (bool) {
        bool _isContentCreator = isContentCreator(_tokenId);
        bool _isTokenOwner = isTokenOwner(_tokenId);

        return _isTokenOwner && !_isContentCreator;
    }

    function isAllowedToComplete(bytes32 _novelId)
        public
        view
        novelNotCompleted(_novelId)
        returns (bool)
    {
        uint256[] memory _tokenIds = novelIdToTokenIds[_novelId];
        uint256 lastIndex = _tokenIds.length - 1;

        return isTokenOwner(_tokenIds[lastIndex]);
    }

    function isTokenOwner(uint256 _tokenId) private view returns (bool) {
        address tokenOwner = ownerOf(_tokenId);
        return tokenOwner == msg.sender;
    }

    function isContentCreator(uint256 _tokenId) private view returns (bool) {
        NovelContent memory novelContent = tokenIdToContent[_tokenId];
        return novelContent.creator == msg.sender;
    }

    function getNovelIndex(bytes32 _novelId)
        external
        view
        novelExists(_novelId)
        returns (uint256)
    {
        return novelIdToIndex[_novelId];
    }

    function getAllNovels() external view returns (Novel[] memory) {
        Novel[] memory _novels = novels;
        return _novels;
    }

    function getAllNovelContents(bytes32 _novelId)
        external
        view
        novelExists(_novelId)
        returns (NovelContent[] memory)
    {
        uint256[] memory tokenIds = novelIdToTokenIds[_novelId];
        NovelContent[] memory contents = new NovelContent[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            NovelContent memory content = tokenIdToContent[tokenIds[i]];
            contents[i] = content;
        }
        return contents;
    }

    function getNovelContent(uint256 _tokenId)
        external
        view
        returns (NovelContent memory)
    {
        _requireMinted(_tokenId);
        return tokenIdToContent[_tokenId];
    }

    function getContentCount(bytes32 _novelId)
        external
        view
        novelExists(_novelId)
        returns (uint256)
    {
        return novelIdToTokenIds[_novelId].length;
    }
}
