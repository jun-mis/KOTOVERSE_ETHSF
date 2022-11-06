import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { NovelContract, MarketPlace } from "../typechain";
import {
  CATEGORY,
  CONTENT,
  ETH_10,
  getNovelId,
  LANGUAGE,
  NEW_LONG_NOVEL,
  NEW_NOVEL,
  SUMMARY,
  TITLE,
  // eslint-disable-next-line node/no-missing-import
} from "./helpers";

const getCurrentBlockTimestamp = async () => {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
};

describe("NovelContract", () => {
  let novelContract: NovelContract;
  let marketPlace: MarketPlace;
  let novelCreator: SignerWithAddress;
  let contentCreator: SignerWithAddress;
  let otherSigners: SignerWithAddress[];
  let blockTimestamp: number;

  beforeEach(async () => {
    [, novelCreator, contentCreator, ...otherSigners] =
      await ethers.getSigners();

    const NovelContractFactory = await ethers.getContractFactory(
      "NovelContract"
    );
    novelContract = await NovelContractFactory.deploy("Novel", "NVL");
    await novelContract.deployed();

    const MarketPlaceFactory = await ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlaceFactory.deploy(
      novelContract.address,
      ethers.utils.parseEther("25")
    );
    await marketPlace.deployed();
  });

  // createNovel
  describe("createNovel", () => {
    it("should create new novel", async () => {
      await expect(novelContract.connect(novelCreator).createNovel(NEW_NOVEL))
        .not.reverted;

      blockTimestamp = await getCurrentBlockTimestamp();

      const novelId = getNovelId(
        novelCreator.address,
        TITLE,
        BigNumber.from(1)
      );

      const novels = await novelContract.getAllNovels();
      expect(novels[0].id).to.equal(novelId);
      expect(novels[0].title).to.equal(TITLE);
      expect(novels[0].creator).to.equal(novelCreator.address);
      expect(novels[0].createdAt).to.equal(blockTimestamp);
      expect(novels[0].updatedAt).to.equal(blockTimestamp);

      const contents = await novelContract.getAllNovelContents(novelId);

      expect(contents[0].tokenId).to.deep.equal(BigNumber.from(1));
      expect(contents[0].parentId).to.deep.equal(BigNumber.from(0));
      expect(contents[0].content).to.equal(CONTENT);
      expect(contents[0].creator).to.equal(novelCreator.address);

      const contentCount = await novelContract.getContentCount(novelId);
      expect(contentCount).to.deep.equal(BigNumber.from(1));
    });

    it("should create new novel with MAX char lengths for each field", async () => {
      await expect(
        novelContract.connect(novelCreator).createNovel(NEW_LONG_NOVEL)
      ).not.reverted;

      const novelId = getNovelId(
        novelCreator.address,
        NEW_LONG_NOVEL.title,
        BigNumber.from(1)
      );

      const contentCount = await novelContract.getContentCount(novelId);
      expect(contentCount).to.deep.equal(BigNumber.from(1));
    });

    it("should emit NovelCreated event with args", async () => {
      const result = await novelContract
        .connect(novelCreator)
        .createNovel(NEW_NOVEL);

      expect(result)
        .to.emit(novelContract, "NovelCreated")
        .withArgs(
          getNovelId(novelCreator.address, TITLE, BigNumber.from(1)),
          TITLE
        );
    });

    it("should increment owner balance", async () => {
      let balance = await novelContract.balanceOf(novelCreator.address);
      expect(balance).to.deep.equal(BigNumber.from(0));

      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      balance = await novelContract.balanceOf(novelCreator.address);
      expect(balance).to.deep.equal(BigNumber.from(1));
    });

    it("should revert `Invalid input` if title is empty", async () => {
      const titleEmpty = { ...NEW_NOVEL, title: "" };
      await expect(
        novelContract.connect(novelCreator).createNovel(titleEmpty)
      ).to.be.revertedWith("Invalid input");
    });

    it("should NOT revert `Invalid input` if title with space", async () => {
      const titleSpace = { ...NEW_NOVEL, title: " " };

      await expect(
        novelContract.connect(novelCreator).createNovel(titleSpace)
      ).not.to.be.revertedWith("Invalid input");
    });

    it("should revert `Invalid input` if content is empty", async () => {
      const contentEmpty = { ...NEW_NOVEL, content: "" };
      await expect(
        novelContract.connect(novelCreator).createNovel(contentEmpty)
      ).to.be.revertedWith("Invalid input");
    });

    it("should NOT revert `Invalid input` if content with space", async () => {
      const contentSpace = { ...NEW_NOVEL, content: " " };

      await expect(
        novelContract.connect(novelCreator).createNovel(contentSpace)
      ).not.to.be.revertedWith("Invalid input");
    });

    it("should revert `Invalid input` if content is empty", async () => {
      const summaryEmpty = { ...NEW_NOVEL, summary: "" };
      await expect(
        novelContract.connect(novelCreator).createNovel(summaryEmpty)
      ).to.be.revertedWith("Invalid input");
    });

    it("should NOT revert `Invalid input` if summary with space", async () => {
      const summarySpace = { ...NEW_NOVEL, summary: " " };

      await expect(
        novelContract.connect(novelCreator).createNovel(summarySpace)
      ).not.to.be.revertedWith("Invalid input");
    });

    it("should revert `Invalid input` if category is empty", async () => {
      const categoryEmpty = { ...NEW_NOVEL, category: "" };
      await expect(
        novelContract.connect(novelCreator).createNovel(categoryEmpty)
      ).to.be.revertedWith("Invalid input");
    });

    it("should NOT revert `Invalid input` if category with space", async () => {
      const categorySpace = { ...NEW_NOVEL, category: " " };

      await expect(
        novelContract.connect(novelCreator).createNovel(categorySpace)
      ).not.to.be.revertedWith("Invalid input");
    });

    it("should revert `Invalid input` if language is empty", async () => {
      const languageEmpty = { ...NEW_NOVEL, language: "" };
      await expect(
        novelContract.connect(novelCreator).createNovel(languageEmpty)
      ).to.be.revertedWith("Invalid input");
    });

    it("should NOT revert `Invalid input` if language with space", async () => {
      const languageSpace = { ...NEW_NOVEL, language: " " };

      await expect(
        novelContract.connect(novelCreator).createNovel(languageSpace)
      ).not.to.be.revertedWith("Invalid input");
    });
  });

  // addContent
  describe("addContent", () => {
    const tokenId = BigNumber.from(1);
    const newTokenId = BigNumber.from(2);

    let novelId: string;

    beforeEach(async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract
        .connect(novelCreator)
        .approve(marketPlace.address, tokenId);
      await marketPlace.connect(novelCreator).listItem(tokenId, ETH_10);
      await marketPlace
        .connect(contentCreator)
        .buyItem(tokenId, { value: ETH_10 });

      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
    });

    it("should add content", async () => {
      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(novelId, tokenId, CONTENT)
      ).not.reverted;

      blockTimestamp = await getCurrentBlockTimestamp();

      const novels = await novelContract.getAllNovels();
      expect(novels[0].id).to.equal(novelId);
      expect(novels[0].title).to.equal(TITLE);
      expect(novels[0].creator).to.equal(novelCreator.address);
      expect(novels[0].createdAt.toNumber()).to.be.lessThan(blockTimestamp);
      expect(novels[0].updatedAt).to.equal(blockTimestamp);

      const contents = await novelContract.getAllNovelContents(novelId);
      expect(contents[1].tokenId).to.deep.equal(newTokenId);
      expect(contents[1].parentId).to.deep.equal(tokenId);
      expect(contents[1].content).to.equal(CONTENT);
      expect(contents[1].creator).to.equal(contentCreator.address);

      const contentCount = await novelContract.getContentCount(novelId);
      expect(contentCount).to.deep.equal(BigNumber.from(2));
      const balance = await novelContract.balanceOf(contentCreator.address);
      expect(balance).to.equal(BigNumber.from(1));
    });

    it("should add content with MAX char lengths for each field", async () => {
      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(novelId, tokenId, NEW_LONG_NOVEL.content)
      ).not.reverted;

      const contentCount = await novelContract.getContentCount(novelId);
      expect(contentCount).to.deep.equal(BigNumber.from(2));
      const balance = await novelContract.balanceOf(contentCreator.address);
      expect(balance).to.equal(BigNumber.from(1));
    });

    it("should update novel updatedAt", async () => {
      const novelUpdatedAtBefore = await (
        await novelContract.getAllNovels()
      )[0].updatedAt;

      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(novelId, tokenId, CONTENT)
      ).not.reverted;

      const novels = await novelContract.getAllNovels();
      expect(novels[0].updatedAt.toNumber()).to.be.greaterThan(
        novelUpdatedAtBefore.toNumber()
      );
    });

    it("should emit ContentAdded event with args", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .addContent(novelId, tokenId, CONTENT);

      expect(result)
        .to.emit(novelContract, "ContentAdded")
        .withArgs(contentCreator.address, tokenId);
    });

    it("should burn parent content (revert with `ERC721: invalid token ID`) after addContent is run", async () => {
      await novelContract
        .connect(contentCreator)
        .addContent(novelId, tokenId, CONTENT);

      await expect(novelContract.ownerOf(tokenId)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("should revert NovelNotExists if novel not exists", async () => {
      const nonExistingNovelId = getNovelId(
        otherSigners[0].address,
        TITLE,
        BigNumber.from(100)
      );
      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(nonExistingNovelId, tokenId, CONTENT)
      ).to.be.revertedWith(`NovelNotExists("${nonExistingNovelId}")`);
    });

    it("should revert `ERC721: invalid token ID` if token not exists", async () => {
      const unexistingTokenId = BigNumber.from(100);

      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(novelId, unexistingTokenId, CONTENT)
      ).to.be.revertedWith("ERC721: invalid token ID");
    });

    it("should revert NovelAlreadyCompleted if novel not exists", async () => {
      await novelContract.connect(contentCreator).completeNovel(novelId);
      await expect(
        novelContract
          .connect(contentCreator)
          .addContent(novelId, tokenId, CONTENT)
      ).to.be.revertedWith(`NovelAlreadyCompleted("${novelId}")`);
    });

    it("should revert `Invalid input` if content is empty", async () => {
      await expect(
        novelContract.connect(contentCreator).addContent(novelId, tokenId, "")
      ).to.be.revertedWith("Invalid input");
    });

    it("should revert NotAllowedToAddContent if not allowed to add content", async () => {
      await expect(
        novelContract
          .connect(otherSigners[0])
          .addContent(novelId, tokenId, CONTENT)
      ).to.be.revertedWith(`NotAllowedToAddContent(${tokenId})`);
    });
  });

  // completeNovel
  describe("completeNovel", () => {
    const tokenId = BigNumber.from(1);

    let novelId: string;

    beforeEach(async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract
        .connect(novelCreator)
        .approve(marketPlace.address, tokenId);
      await marketPlace.connect(novelCreator).listItem(tokenId, ETH_10);
      await marketPlace
        .connect(contentCreator)
        .buyItem(tokenId, { value: ETH_10 });
      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));

      await novelContract
        .connect(contentCreator)
        .addContent(novelId, tokenId, CONTENT);
    });

    it("should complete novel", async () => {
      let novels = await novelContract.getAllNovels();
      expect(novels[0].isCompleted).to.equal(false);

      await expect(novelContract.connect(contentCreator).completeNovel(novelId))
        .not.reverted;

      blockTimestamp = await getCurrentBlockTimestamp();

      novels = await novelContract.getAllNovels();
      expect(novels[0].id).to.equal(novelId);
      expect(novels[0].title).to.equal(TITLE);
      expect(novels[0].creator).to.equal(novelCreator.address);
      expect(novels[0].isCompleted).to.equal(true);
      expect(novels[0].createdAt.toNumber()).to.be.lessThan(blockTimestamp);
      expect(novels[0].updatedAt).to.equal(blockTimestamp);
    });

    it("should complete novel with MAX char lengths for each field", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_LONG_NOVEL);
      const novels = await novelContract.getAllNovels();

      await expect(
        novelContract.connect(novelCreator).completeNovel(novels[1].id)
      ).not.reverted;
    });

    it("should update novel updatedAt", async () => {
      const novelUpdatedAtBefore = await (
        await novelContract.getAllNovels()
      )[0].updatedAt;

      await expect(novelContract.connect(contentCreator).completeNovel(novelId))
        .not.reverted;

      const novels = await novelContract.getAllNovels();
      expect(novels[0].updatedAt.toNumber()).to.be.greaterThan(
        novelUpdatedAtBefore.toNumber()
      );
    });

    it("should emit NovelCompleted event with args", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .completeNovel(novelId);

      expect(result).to.emit(novelContract, "NovelCompleted").withArgs(novelId);
    });

    it("should revert NovelNotExists if novel not exists", async () => {
      const nonExistingNovelId = getNovelId(
        otherSigners[0].address,
        TITLE,
        BigNumber.from(100)
      );
      await expect(
        novelContract.connect(contentCreator).completeNovel(nonExistingNovelId)
      ).to.be.revertedWith(`NovelNotExists("${nonExistingNovelId}")`);
    });

    it("should revert NovelAlreadyCompleted if novel not exists", async () => {
      await novelContract.connect(contentCreator).completeNovel(novelId);
      await expect(
        novelContract.connect(contentCreator).completeNovel(novelId)
      ).to.be.revertedWith(`NovelAlreadyCompleted("${novelId}")`);
    });

    it("should revert NotAllowedToComplete if novel not exists", async () => {
      await expect(
        novelContract.connect(novelCreator).completeNovel(novelId)
      ).to.be.revertedWith(`NotAllowedToComplete("${novelId}")`);
    });
  });

  // getAllNovels
  describe("getAllNovels", () => {
    let novelId: string;
    beforeEach(() => {
      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
    });

    it("should return novels", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      blockTimestamp = await getCurrentBlockTimestamp();

      const novels = await novelContract.getAllNovels();
      expect(novels[0].id).to.equal(novelId);
      expect(novels[0].title).to.equal(TITLE);
      expect(novels[0].summary).to.equal(SUMMARY);
      expect(novels[0].category).to.equal(CATEGORY);
      expect(novels[0].language).to.equal(LANGUAGE);
      expect(novels[0].creator).to.equal(novelCreator.address);
      expect(novels[0].createdAt).to.equal(blockTimestamp);
      expect(novels[0].updatedAt).to.equal(blockTimestamp);
    });

    it("should return length 2", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      const novels = await novelContract.getAllNovels();
      expect(novels.length).to.equal(2);
    });

    it("should return empty array", async () => {
      const novels = await novelContract.getAllNovels();
      expect(novels.length).to.equal(0);
    });
  });

  // getAllNovelContents
  describe("getAllNovelContents", () => {
    let novelId: string;
    beforeEach(() => {
      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
    });

    it("should return novelContent", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      const contents = await novelContract.getAllNovelContents(novelId);
      expect(contents[0].tokenId).to.deep.equal(BigNumber.from(1));
      expect(contents[0].parentId).to.deep.equal(BigNumber.from(0));
      expect(contents[0].content).to.equal(CONTENT);
      expect(contents[0].creator).to.equal(novelCreator.address);
    });

    it("should return length 2", async () => {
      const tokenId = BigNumber.from(1);
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract
        .connect(novelCreator)
        .approve(marketPlace.address, tokenId);
      await marketPlace.connect(novelCreator).listItem(tokenId, ETH_10);
      await marketPlace
        .connect(contentCreator)
        .buyItem(tokenId, { value: ETH_10 });

      await novelContract
        .connect(contentCreator)
        .addContent(novelId, tokenId, CONTENT);

      const contents = await novelContract.getAllNovelContents(novelId);
      expect(contents.length).to.equal(2);
    });

    it("should revert NovelNotExists if not exists", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      const nonExistingNovelId = getNovelId(
        otherSigners[0].address,
        TITLE,
        BigNumber.from(100)
      );
      try {
        await novelContract
          .connect(contentCreator)
          .getAllNovelContents(nonExistingNovelId);
      } catch (e: any) {
        if (e instanceof Error) {
          await expect(e.message.includes("NovelNotExists")).to.be.true;
        }
      }
    });
  });

  // getNovelContent
  describe("getNovelContent", () => {
    const tokenId = BigNumber.from(1);

    it("should return novelContent", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      const timestamp = await getCurrentBlockTimestamp();

      const content = await novelContract.getNovelContent(tokenId);
      expect(content.tokenId).to.deep.equal(tokenId);
      expect(content.parentId).to.deep.equal(BigNumber.from(0));
      expect(content.content).to.equal(CONTENT);
      expect(content.creator).to.equal(novelCreator.address);
      expect(content.createdAt).to.deep.equal(timestamp);
    });

    it("should revert `ERC721: invalid token ID` if not exists", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      const nonExistingTokenId = BigNumber.from(100);
      await expect(
        novelContract.getNovelContent(nonExistingTokenId)
      ).to.be.revertedWith("ERC721: invalid token ID");
    });
  });

  // getContentCount
  describe("getContentCount", () => {
    let novelId: string;
    beforeEach(() => {
      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
    });

    it("should return 1", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);

      expect(await novelContract.getContentCount(novelId)).to.deep.equal(
        BigNumber.from(1)
      );
    });

    it("should revert NovelNotExists if not exists", async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      const nonExistingNovelId = getNovelId(
        otherSigners[0].address,
        TITLE,
        BigNumber.from(100)
      );
      try {
        await novelContract
          .connect(contentCreator)
          .getAllNovelContents(nonExistingNovelId);
      } catch (e: any) {
        if (e instanceof Error) {
          await expect(e.message.includes("NovelNotExists")).to.be.true;
        }
      }
    });
  });

  describe("canAddContent", () => {
    const tokenId = BigNumber.from(1);

    beforeEach(async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract
        .connect(novelCreator)
        .approve(marketPlace.address, tokenId);
      await marketPlace.connect(novelCreator).listItem(tokenId, ETH_10);
      await marketPlace
        .connect(contentCreator)
        .buyItem(tokenId, { value: ETH_10 });
    });

    it("should return true if the holder", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .canAddContent(tokenId);
      await expect(result).to.be.true;
    });

    it("should return false if not the holder", async () => {
      const result = await novelContract
        .connect(otherSigners[0])
        .canAddContent(tokenId);
      await expect(result).to.be.false;
    });
  });

  describe("isAllowedToComplete", () => {
    const tokenId = BigNumber.from(1);

    let novelId: string;

    beforeEach(async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract
        .connect(novelCreator)
        .approve(marketPlace.address, tokenId);
      await marketPlace.connect(novelCreator).listItem(tokenId, ETH_10);
      await marketPlace
        .connect(contentCreator)
        .buyItem(tokenId, { value: ETH_10 });

      novelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
    });

    it("should return true when called by token owner", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .isAllowedToComplete(novelId);
      await expect(result).to.be.true;
    });

    it("should return false when not called by token owner", async () => {
      const result = await novelContract
        .connect(otherSigners[0])
        .isAllowedToComplete(novelId);
      await expect(result).to.be.false;
    });

    it("should revert `NovelAlreadyCompleted` when novel already completed", async () => {
      await novelContract.connect(contentCreator).completeNovel(novelId);

      try {
        await novelContract
          .connect(contentCreator)
          .isAllowedToComplete(novelId);
      } catch (e: any) {
        if (e instanceof Error) {
          await expect(e.message.includes("NovelAlreadyCompleted")).to.be.true;
        }
      }
    });
  });

  describe("getNovelIndex", () => {
    let firstNovelId: string;
    let secondNovelId: string;

    beforeEach(async () => {
      await novelContract.connect(novelCreator).createNovel(NEW_NOVEL);
      await novelContract.connect(contentCreator).createNovel(NEW_NOVEL);

      firstNovelId = getNovelId(novelCreator.address, TITLE, BigNumber.from(1));
      secondNovelId = getNovelId(
        contentCreator.address,
        TITLE,
        BigNumber.from(2)
      );
    });

    it("should return 0 when specifies the first novel", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .getNovelIndex(firstNovelId);

      await expect(result).to.equal(BigNumber.from(0));
    });

    it("should return 1 when specifies the second novel", async () => {
      const result = await novelContract
        .connect(contentCreator)
        .getNovelIndex(secondNovelId);

      await expect(result).to.equal(BigNumber.from(1));
    });

    it("should revert `NovelNotExists` when novel does not exist", async () => {
      const nonExistingNovelId = getNovelId(
        otherSigners[0].address,
        TITLE,
        BigNumber.from(100)
      );

      try {
        await novelContract
          .connect(contentCreator)
          .getAllNovelContents(nonExistingNovelId);
      } catch (e: any) {
        if (e instanceof Error) {
          await expect(e.message.includes("NovelNotExists")).to.be.true;
        }
      }
    });
  });
});
