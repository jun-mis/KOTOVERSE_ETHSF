import { BigNumber } from 'ethers';

export type NovelInputType = {
  title: string | undefined;
  content: string | undefined;
  summary: string | undefined;
  category: string | undefined;
  language: string | undefined;
  targetAudience: string | undefined;
  copyRight: string | undefined;
};

export type ValidNovelInput = {
  title: string;
  content: string;
  summary: string;
  category: string;
  language: string;
};

export type NovelSnippetType = {
  id: string;
  title: string;
  creator: string;
  summary: string;
  category: string;
  language: string;
  isCompleted: boolean;
  createdAt: BigNumber;
  updatedAt: BigNumber;
};

export type NovelContentType = {
  tokenId: BigNumber;
  parentId: BigNumber;
  content: string;
  creator: string;
  createdAt: BigNumber;
};
