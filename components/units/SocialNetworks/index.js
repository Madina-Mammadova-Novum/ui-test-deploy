import delve from 'dlv';

import { SocialNetworksPropTypes } from '@/lib/types';

import { HoverableIcon, NextImage, NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';

const SocialNetworks = ({ data = [] }) => {
  if (!data.length) return null;

  const printSocialLinks = (socialLink) => {
    return (
      <NextLink
        target="_blank"
        key={delve(socialLink, 'label')}
        href={delve(socialLink, 'path')}
        title={delve(socialLink, 'title')}
      >
        <HoverableIcon
          className="border border-gray-darker rounded-md"
          icon={
            <NextImage
              alt={delve(socialLink, 'title')}
              src={getStrapiMedia(delve(socialLink, 'coverImage.format.original.url'), '')}
              height={20}
              width={20}
            />
          }
        />
      </NextLink>
    );
  };

  return <div className="flex gap-x-2.5">{data.map(printSocialLinks)}</div>;
};

SocialNetworks.propTypes = SocialNetworksPropTypes;

export default SocialNetworks;
