import { getAuthor } from '@/services/author';

export const updateTeamBlock = async (block) => {
  const { member } = block;
  block.members = await Promise.all(member.map((value) => getAuthor(value.id))).then((valueItems) => valueItems);
  return block;
};
