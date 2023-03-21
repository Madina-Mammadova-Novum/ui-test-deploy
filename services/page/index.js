// import { entityDataAdapter } from '@/adapters/entityData';
import pluralize from 'pluralize';

import { entityDataAdapter } from '@/adapters/entityData';
import { COLLECTIONS_TYPES } from '@/lib';
import { getData } from '@/utils/dataFetching';

// export async function getPage({ data }) {
// console.log({ temp: data });
// const response = await getData(`page`);
// return entityDataAdapter(response);
// }

export function getCollectionType(slug) {
  if (slug !== undefined) {
    const locale = slug.shift(); // defaultLocale form next-i18next.config.js
    console.log({ locale });
    if (slug.length > 0) {
      const prefix = slug.shift();
      const collectionType = Object.keys(COLLECTIONS_TYPES)
        .filter((type) => {
          return COLLECTIONS_TYPES[type].prefix === prefix;
        })
        .shift();
      if (slug.length > 0 && collectionType !== undefined) {
        return {
          collectionType,
          slug: slug.join('/'),
          locale,
        };
      }
      return {
        collectionType: 'page',
        slug: [prefix, ...slug].join('/'),
        locale,
      };
    }
  }
  return {
    collectionType: 'page',
    slug: ['home'].join('/'),
    locale: 'en', // defaultLocale form next-i18next.config.js
  };
}

export function getEndpoint(slug, locale, apiID, preview = false) {
  const previewParams = preview ? '&publicationState=preview&published_at_null=true' : '';
  return `/${pluralize(apiID)}?${previewParams}
    &locale=${locale}
    &filters[slug][$eq]=${slug}
    &populate[blocks][populate]=*,
      buttons.linkOptions,
      coverImage,
      button,
      button.linkOptions,changableTitles,descriptionItems.title
      ingredients,ingredients.coverImage,ingredients.concerns,ingredients.concerns.category,ingredients.concerns.images,
      concerns,concerns.category,concerns.images,
      items,items.coverImage,items.button,items.button.linkOptions,
      testimonials,testimonials.coverImage,testimonials.concern,testimonials.concern.images,testimonials.concern.category,
      members,members.category,members.coverImage,
      faqQuestions,faqQuestions.category,
      description.title,
      values,values.value,values.value.valueType,values.value.coverImage
    &populate[questions][populate]=*,field,category,category.emoji,field.fields,field.fields.coverImage,field.fields.nextQuestion,nextQuestion,prevQuestion,
    &populate[startQuestion][populate]=*,field,category,category.emoji,field.fields,field.fields.coverImage,field.fields.nextQuestion,nextQuestion,prevQuestion,
    &populate[labels][populate]=*,coverImage
    &populate[images]=*
    &populate[buttons][populate]=*,linkOptions
    &populate[coverImage]=*
    &populate[imagesGallery]=*
    &populate[seo]=metaSocial`.replace(/\s+|\n/g, '');
}

export async function getEntityData(params, preview = false) {
  const { slug: pathArray } = params;
  const { collectionType, slug, locale } = getCollectionType(pathArray);
  const response = await getData(`entity?s=${slug}&l=${locale}&c=${collectionType}&p=${preview}`);
  const { data, meta } = response;
  if (data === undefined) return null;
  return {
    slug,
    locale,
    collectionType,
    data: data.length > 0 ? await entityDataAdapter({ data: data[0] }) : null,
    meta,
  };
}
