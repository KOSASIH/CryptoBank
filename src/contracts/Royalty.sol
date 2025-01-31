// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Royalty is Ownable {
    // Struct to hold royalty information for each creator
    struct RoyaltyInfo {
        address creator; // Address of the creator
        uint256 percentage; // Royalty percentage (in basis points)
    }

    // Mapping from token ID to royalty information
    mapping(uint256 => RoyaltyInfo) public royalties;

    // Event emitted when royalties are set
    event RoyaltySet(uint256 indexed tokenId, address indexed creator, uint256 percentage);

    // Function to set royalties for a specific token
    function setRoyalty(uint256 tokenId, address creator, uint256 percentage) external onlyOwner {
        require(percentage <= 10000, "Percentage cannot exceed 100%"); // 100% = 10000 basis points
        royalties[tokenId] = RoyaltyInfo(creator, percentage);
        emit RoyaltySet(tokenId, creator, percentage);
    }

    // Function to calculate royalty amount based on sale price
    function calculateRoyalty(uint256 tokenId, uint256 salePrice) external view returns (uint256) {
        RoyaltyInfo memory royaltyInfo = royalties[tokenId];
        return (salePrice * royaltyInfo.percentage) / 10000; // Calculate royalty in wei
    }

    // Function to distribute royalties to the creator
    function distributeRoyalty(uint256 tokenId, uint256 salePrice) external {
        RoyaltyInfo memory royaltyInfo = royalties[tokenId];
        uint256 royaltyAmount = calculateRoyalty(tokenId, salePrice);
        require(royaltyAmount > 0, "No royalty to distribute");
        require(royaltyInfo.creator != address(0), "Creator not set");

        // Transfer the royalty amount to the creator
        payable(royaltyInfo.creator).transfer(royaltyAmount);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
