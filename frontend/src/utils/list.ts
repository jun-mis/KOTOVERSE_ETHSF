import { NovelSnippetType } from '@/types/novels';

export const sortByUpdatedAt = (novels: NovelSnippetType[], type: 'desc' | 'asc' = 'desc') => {
  if (type === 'asc')
    return novels.sort(
      (a, b) => new Date(a.updatedAt.toNumber()).getTime() - new Date(b.updatedAt.toNumber()).getTime()
    );

  return novels.sort((a, b) => new Date(b.updatedAt.toNumber()).getTime() - new Date(a.updatedAt.toNumber()).getTime());
};
