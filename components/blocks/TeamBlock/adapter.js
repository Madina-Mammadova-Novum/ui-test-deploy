import { authorAdapter } from '@/adapters/author';

export const updateTeamBlock = async (block) => {
  const { members } = block;
  block.members = members.map(({ author }) => {
    return authorAdapter(author);
  });
  return block;
};
