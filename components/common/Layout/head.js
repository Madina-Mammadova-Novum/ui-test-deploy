import delve from 'dlv';
import PropTypes from 'prop-types';

export default function Header({ params, title }) {
  const metaTitle = delve(params, 'metaTitle');
  const metaImage = delve(params, 'metaImage');
  const metaRobots = delve(params, 'metaRobots');
  // const metaSocial = delve(params, 'metaSocial');
  const preventIndexing = delve(params, 'preventIndexing');
  const metaDescription = delve(params, 'metaDescription');

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta name="twitter:card" content="summary" />
      <meta
        // prefix="og: http://ogp.me/ns#"
        data-hid="og:title"
        name="og:title"
        property="og:title"
        content={metaTitle}
      />
      <meta
        // prefix="og: http://ogp.me/ns#"
        data-hid="og:description"
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta
        // prefix="og: http://ogp.me/ns#"
        data-hid="og:image"
        name="og:image"
        property="og:image"
        content={delve(metaImage, 'data.attributes.url')}
      />
      <meta
        // prefix="og: http://ogp.me/ns#"
        data-hid="og:image:alt"
        name="og:image:alt"
        property="og:image:alt"
        content={delve(metaImage, 'data.attributes.alternativeText')}
      />

      <meta name="robots" content={metaRobots} />

      {preventIndexing && !metaRobots.includes('noindex') && (
        <>
          <meta name="robots" content="noindex" />
          <meta name="googlebot" content="noindex" />
        </>
      )}
    </>
  );
}

Header.defaultProps = {
  params: {},
  title: '',
};

Header.propTypes = {
  params: PropTypes.shape({}),
  title: PropTypes.string,
};
