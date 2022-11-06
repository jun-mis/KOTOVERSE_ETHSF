import { DAY_IN_MS, HOUR_IN_SEC, MIN_IN_SEC, SEC_IN_MS } from './constants/numbers';

export const toDate = (unixTimeInSec: number) => {
  const date = new Date(unixTimeInSec * SEC_IN_MS);

  return date;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`;
};

export const withinOneDay = (unixTimeInSec: number) => {
  const targetDate = new Date(unixTimeInSec * SEC_IN_MS).getTime();
  const now = Date.now();
  const diff = now - targetDate;

  return diff <= DAY_IN_MS;
};

export const withinOneHour = (unixTimeInSec: number) => {
  const now = Math.floor(Date.now() / SEC_IN_MS);
  const diff = now - unixTimeInSec;
  return diff <= HOUR_IN_SEC;
};

export const getMinAgo = (unixTimeInSec: number) => {
  const diff = howFarFromNow(unixTimeInSec);

  return Math.floor(diff / MIN_IN_SEC);
};

export const getHourAgo = (unixTimeInSec: number) => {
  const diff = howFarFromNow(unixTimeInSec);

  return Math.floor(diff / HOUR_IN_SEC);
};

/**
 *
 * @param unixTimeInSec
 * @returns differance between param and now in seconds
 */
export const howFarFromNow = (unixTimeInSec: number) => {
  const date = unixTimeInSec * SEC_IN_MS;
  const now = Date.now();
  const diff = (now - date) / SEC_IN_MS;

  return Math.floor(diff);
};
