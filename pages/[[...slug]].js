import React from 'react';

import delve from 'dlv';
import ErrorPage from 'next/error';
import PropTypes from 'prop-types';

import { globalPropTypes, metaPropTypes } from '@/utils/types';

import { BlockManager } from '@/common';
import { BaseLayout } from '@/layouts';
import { getEntityData, getGlobalData, getPaths } from '@/utils';
import { getLocalizedParams } from '@/utils/localize';

const Universals = ({ global, data, collectionType, meta, preview }) => {
  if (data === null) {
    return <ErrorPage statusCode={404} />;
  }
  const blocks = delve(data, 'blocks');

  return (
    <BaseLayout global={global} pageData={data} type={collectionType} meta={meta} preview={preview}>
      {blocks && <BlockManager blocks={blocks} />}
    </BaseLayout>
  );
};

Universals.defaultProps = {
  preview: null,
  data: null,
  collectionType: 'page',
  global: null,
  meta: null,
};

Universals.propTypes = {
  global: globalPropTypes,
  data: PropTypes.shape({}),
  collectionType: PropTypes.string,
  meta: metaPropTypes,
  preview: PropTypes.string,
};

export async function getStaticPaths() {
  const paths = await getPaths();
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
    preview,
    query,
  } = context;

  const { locale } = getLocalizedParams(query);

  const staticProps = await Promise.all([
    getEntityData(slug, locale, preview).then((data) => ['entityData', data]),
    getGlobalData(locale).then((data) => ['globalData', data]),
  ])
    .then((values) => {
      return Object.fromEntries(values);
    })
    .then(({ entityData, globalData }) => {
      const { collectionType, data, meta } = entityData;
      const { global } = globalData;
      return {
        props: {
          global,
          data,
          meta,
          collectionType,
          preview: preview || null,
        },
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        props: {
          data: null,
        },
      };
    });

  return staticProps;
}

export default Universals;
