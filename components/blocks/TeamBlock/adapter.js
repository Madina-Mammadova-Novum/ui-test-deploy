import { authorAdapter } from "@/adapters/author";

export const updateTeamBlock = async (block) => {
  const { member } = block;
  block.members = member.map(({ author }) => {
    return authorAdapter(author)
  });
  return block;
};
