import { BigNumber, ethers } from "ethers";

export const TITLE = "FIRST BLOCKCHAIN NOVEL";
export const CONTENT = "WAY BACK TO WHEN THERE WAS NO BLOCKCHAIN...";
export const SUMMARY = "THIS IS THE SUMMARY OF THE NOVEL";
export const CATEGORY = "SCI-FI";
export const LANGUAGE = "ENGLISH";
export const ETH_10 = ethers.utils.parseEther("10");

export const NEW_NOVEL = {
  title: TITLE,
  content: CONTENT,
  summary: SUMMARY,
  category: CATEGORY,
  language: LANGUAGE,
};

export const NEW_LONG_NOVEL = {
  // MAX 100 letters
  title:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV",
  // MAX 140 letters
  content:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJ",
  // MAX 280 letters
  summary:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRST",
  // Longest category option (19 letters)
  category: "Non-Fiction / Essay",
  // Longest language option (16 letters)
  language: "Bahasa Indonesia",
};

export const getNovelId = (
  sender: string,
  title: string,
  tokenId: BigNumber
): string => {
  const hash = ethers.utils.solidityPack(
    ["address", "string", "uint256"],
    [sender, title, tokenId]
  );

  return ethers.utils.keccak256(hash);
};
