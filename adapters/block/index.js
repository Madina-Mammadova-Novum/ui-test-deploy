import { linkAdapter } from '@/adapters/global';
import { imageAdapter } from '@/adapters/image';
import { teamMembersAdapter } from '@/adapters/team';
import { testimonialsAdapter } from '@/adapters/testimonial';
import { valueAdapter } from '@/adapters/value';

export const blocksDataAdapter = async (blocks) => {
  if (!blocks || blocks.length === 0) return [];
  const updatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      switch (block.__component) {
        case 'blocks.cta': {
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
        }
        case 'blocks.improvement-process': {
          const { values } = block;
          block.values =
            values !== undefined
              ? values.map(({ id, value }) => {
                  return {
                    id,
                    value: valueAdapter(value),
                  };
                })
              : [];
          return block;
        }
        case 'blocks.cta-images': {
          const { items } = block;
          block.items = items.map((item) => {
            return {
              ...item,
              coverImage: imageAdapter(item.coverImage),
            };
          });
          return block;
        }
        case 'blocks.hero-animated-title': {
          const { coverImage } = block;
          block.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;
          return block;
        }
        case 'blocks.cta-single-image': {
          const { coverImage } = block;
          block.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;
          return block;
        }
        case 'blocks.testimonials': {
          const { testimonials } = block;
          block.testimonials = testimonials !== undefined ? testimonialsAdapter(testimonials) : [];
          return block;
        }
        case 'blocks.team': {
          const { members } = block;
          block.members = members !== undefined ? teamMembersAdapter(members) : [];
          return block;
        }
        case 'blocks.hero-image': {
          const { coverImage } = block;
          block.coverImage = imageAdapter(coverImage);
          return block;
        }
        default:
          return block;
      }
    })
  ).then((blocksData) => {
    return blocksData
      .filter((block) => block !== null)
      .map((block) => {
        const { id, title, shortDescription, subTitle, __component } = block;
        return {
          ...block,
          id,
          title: title !== undefined ? title : null,
          shortDescription: shortDescription !== undefined ? shortDescription : null,
          subTitle: subTitle !== undefined ? subTitle : null,
          __component,
        };
      });
  });
  return updatedBlocks;
};
