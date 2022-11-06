import { NovelInputType, ValidNovelInput } from '@/types/novels';
import { CATEGORY_OPTIONS } from './constants/category';
import { LANGUAGE_OPTIONS } from './constants/language';
import {
  CONTENT_LENGTH,
  DEFAULT_MAX_LENGTH,
  DEFAULT_MIN_LENGTH,
  SUMMARY_LENGTH,
  TITLE_LENGTH,
} from './constants/numbers';

export const validateInput = (
  input: string | undefined,
  length: { max: number; min: number } = { max: DEFAULT_MAX_LENGTH, min: DEFAULT_MIN_LENGTH }
): input is string => {
  if (!input) return false;

  if (input.trim().length === 0) return false;

  return input.length > length.min && input.length <= length.max;
};

type CategoryType = typeof CATEGORY_OPTIONS[number];
export const isCategoryType = (value: unknown): value is CategoryType => {
  if (!value) return false;

  return typeof value === 'string' && CATEGORY_OPTIONS.includes(value as any);
};

type LanguageType = typeof LANGUAGE_OPTIONS[number];
export const isLanguageType = (value: unknown): value is LanguageType => {
  if (!value) return false;
  return typeof value === 'string' && LANGUAGE_OPTIONS.includes(value as any);
};

export const validateNovelInfo = (novelInfo: NovelInputType): novelInfo is ValidNovelInput => {
  const { title, content, summary, category, language } = novelInfo;

  if (!validateInput(title, TITLE_LENGTH)) {
    console.log('1');
    return false;
  }
  if (!validateInput(content, CONTENT_LENGTH)) {
    console.log('2');
    return false;
  }
  if (!validateInput(summary, SUMMARY_LENGTH)) {
    console.log('3');
    return false;
  }
  if (!isCategoryType(category)) {
    console.log('4');
    return false;
  }
  if (!isLanguageType(language)) {
    console.log('5');
    return false;
  }

  return true;
};
