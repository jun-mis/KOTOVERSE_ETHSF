import { describe, expect, it } from 'vitest';
import { DAY_IN_MS, HOUR_IN_MS, MIN_IN_MS, SEC_IN_MS } from './constants/numbers';
import { formatDate, getHourAgo, getMinAgo, howFarFromNow, toDate, withinOneDay, withinOneHour } from './dates';

describe('dates', () => {
  describe('toDate', () => {
    it('should return Date type', () => {
      const now = Date.now();
      expect(toDate(now) instanceof Date).to.be.true;
    });

    it('should return the same time', () => {
      const now = Math.floor(Date.now() / SEC_IN_MS);
      const date = toDate(now);
      expect(date.getTime() / SEC_IN_MS).to.equal(now);
    });
  });

  describe('formatDate', () => {
    it('should return string type', () => {
      const date = toDate(Date.now());
      expect(typeof formatDate(date) === 'string').to.be.true;
    });

    it('should return `2022/01/01`', () => {
      const unixTime = 1640966461000; // 2022/1/1 01:01:01
      const date = new Date(unixTime);
      const expected = '2022/01/01';
      expect(formatDate(date)).to.equal(expected);
    });
  });

  describe('withinOneDay', () => {
    it('should return true when now', () => {
      const now = Date.now() / SEC_IN_MS;
      expect(withinOneDay(now)).to.be.true;
    });

    it('should return true when 23hrs 59min ago', () => {
      const _23hrsMS = HOUR_IN_MS * 23;
      const _59minsInMS = MIN_IN_MS * 59;
      const _23hrs59minsAgoInSec = Math.floor((Date.now() - (_23hrsMS + _59minsInMS)) / 1000);
      expect(withinOneDay(_23hrs59minsAgoInSec)).to.be.true;
    });

    it('should return false when 1day 1min ago', () => {
      const _1day1minsAgoInSec = Math.floor((Date.now() - (DAY_IN_MS + MIN_IN_MS)) / 1000);
      expect(withinOneDay(_1day1minsAgoInSec)).to.be.false;
    });
  });

  describe('withinOneHour', () => {
    it('should return true when now', () => {
      const now = Date.now() / SEC_IN_MS;
      expect(withinOneHour(now)).to.be.true;
    });

    it('should return true when 59mins ago', () => {
      const _59minsInMS = MIN_IN_MS * 59;
      const _59minsAgoInSec = Math.floor((Date.now() - _59minsInMS) / 1000);
      expect(withinOneHour(_59minsAgoInSec)).to.be.true;
    });

    it('should return false when 61mins ago', () => {
      const _61minsInMS = MIN_IN_MS * 61;
      const _61minsAgoInSec = Math.floor((Date.now() - _61minsInMS) / 1000);
      expect(withinOneHour(_61minsAgoInSec)).to.be.false;
    });
  });

  describe('howFarFromNow', () => {
    it('should return 60 when 1min ago', () => {
      const expected = 60;
      const _1minAgoInSec = Math.floor((Date.now() - MIN_IN_MS) / 1000);
      expect(howFarFromNow(_1minAgoInSec)).to.equal(expected);
    });
    it('should return 3660 when 61mins ago', () => {
      const expected = 3660;
      const _61minsInMS = MIN_IN_MS * 61;
      const _61minsAgoInSec = Math.floor((Date.now() - _61minsInMS) / 1000);
      expect(howFarFromNow(_61minsAgoInSec)).to.equal(expected);
    });
  });

  describe('getMinAgo', () => {
    it('should return 0 when now', () => {
      const now = Date.now() / SEC_IN_MS;
      expect(getMinAgo(now)).to.equal(0);
    });

    it('should return 10 when 10mins ago', () => {
      const _10minsAgo = (Date.now() - MIN_IN_MS * 10) / SEC_IN_MS;
      expect(getMinAgo(_10minsAgo)).to.equal(10);
    });
  });

  describe('getHourAgo', () => {
    it('should return 0 when now', () => {
      const now = Date.now() / SEC_IN_MS;
      expect(getHourAgo(now)).to.equal(0);
    });

    it('should return 1 when 1hour ago', () => {
      const _1hourAgo = (Date.now() - HOUR_IN_MS * 1) / SEC_IN_MS;
      expect(getHourAgo(_1hourAgo)).to.equal(1);
    });
  });
});
