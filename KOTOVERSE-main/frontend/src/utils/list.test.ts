import { NovelSnippetType } from '@/types/novels';
import { BigNumber } from 'ethers';
import { describe, expect, it } from 'vitest';
import { sortByUpdatedAt } from './list';

describe('list', () => {
  describe('sortByUpdatedAt', () => {
    it('should return [FIRST, FORTH, SECOND, THIRD] when asc sort', () => {
      const sorted = sortByUpdatedAt([...NOVEL_LIST], 'asc');

      const expected = ['FIRST', 'FORTH', 'SECOND', 'THIRD'];

      expect(sorted.map((e) => e.title)).to.deep.equal(expected);
    });

    it('should return [THIRD, SECOND, FORTH. FIRST] when desc sort', () => {
      const sorted = sortByUpdatedAt([...NOVEL_LIST], 'desc');

      const expected = ['THIRD', 'SECOND', 'FORTH', 'FIRST'];

      expect(sorted.map((e) => e.title)).to.deep.equal(expected);
    });
  });
});

const NOVEL_LIST = [
  {
    creator: '0xb16d5E8B6321c0dF651C64Cc2Bb12748bf259Ba9',
    id: '0xd78da18fba4bc412074ac0b706ed8f5b3dbcbc72ea02c646f06e841bf1227519',
    title: 'FIRST',
    summary: 'summary',
    category: 'Adventure',
    language: 'English',
    isCompleted: false,
    createdAt: BigNumber.from(1640966461), // 2022/1/1 1:1:1
    updatedAt: BigNumber.from(1640966461), // 2022/1/1 1:1:1
  },
  {
    creator: '0xb16d5E8B6321c0dF651C64Cc2Bb12748bf259Ba9',
    id: '0xd78da18fba4bc412074ac0b706ed8f5b3dbcbc72ea02c646f06e841bf1227519',
    title: 'SECOND',
    summary: 'summary',
    category: 'Adventure',
    language: 'English',
    isCompleted: false,
    createdAt: BigNumber.from(1640966461), // 2022/1/1 1:1:1
    updatedAt: BigNumber.from(1641052861), // 2022/1/2 1:1:1
  },
  {
    creator: '0xb16d5E8B6321c0dF651C64Cc2Bb12748bf259Ba9',
    id: '0xd78da18fba4bc412074ac0b706ed8f5b3dbcbc72ea02c646f06e841bf1227519',
    title: 'THIRD',
    summary: 'summary',
    category: 'Adventure',
    language: 'English',
    isCompleted: false,
    createdAt: BigNumber.from(1640966461), // 2022/1/1 1:1:1
    updatedAt: BigNumber.from(1641139261), // 2022/1/3 1:1:1
  },
  {
    creator: '0xb16d5E8B6321c0dF651C64Cc2Bb12748bf259Ba9',
    id: '0xd78da18fba4bc412074ac0b706ed8f5b3dbcbc72ea02c646f06e841bf1227519',
    title: 'FORTH',
    summary: 'summary',
    category: 'Adventure',
    language: 'English',
    isCompleted: false,
    createdAt: BigNumber.from(1640966461), // 2022/1/1 1:1:1
    updatedAt: BigNumber.from(1640970061), // 2022/1/1 2:1:1
  },
] as const;
