import { authorAdapter } from '@/adapters/author';

export const updateTeamBlock = async (block) => {
  const { members } = block;

  block.members = members
    ?.filter(({ author }) => authorAdapter(author)?.publishedAt !== null)
    ?.map(({ author }) => {
      return authorAdapter(author);
    });
  return block;
};
