import { Contract, ethers } from "ethers";

const ERC_721_ABI = [
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
];
const getTokenURI = async (
  address: string,
  tokenId: string
): Promise<string> => {
  const contract = new Contract(
    address,
    ERC_721_ABI,
    ethers.getDefaultProvider()
  );
  const result = await contract.tokenURI(tokenId);
  return result;
};

export default getTokenURI;
