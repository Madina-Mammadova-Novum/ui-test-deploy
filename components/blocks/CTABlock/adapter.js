import { linkAdapter } from '@/adapters/global';

export const updateCTABlock = (block) => {
  const { id, __component, theme, title, text, buttons } = block;
  return {
    id,
    __component,
    theme,
    title,
    shortDescription: text,
    subTitle: null,
    buttons: buttons.length > 0 ? buttons.map((button) => linkAdapter(button)) : [],
  };
};
