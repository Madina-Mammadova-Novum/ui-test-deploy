import delve from 'dlv';
import PropTypes from 'prop-types';

import { LinkAsButton, Title, VideoPlayer } from '@/elements';

const CTABlock = ({ title, shortDescription, buttons }) => {
  return (
    <section className="bg-gray-medium py-16 md:py-20 3md:py-24">
      <div className="flex flex-col gap-8 px-4 md:px-8 3md:mx-auto 3md:max-w-[1152px] 3md:flex-row 3md:items-center 3md:gap-[105px] xl:px-0">
        <div className="h-full w-full rounded-base 3md:w-1/2 lg:max-w-[572px]">
          <VideoPlayer
            src="https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/introvideo/Introduction%20video.mp4"
            preload="metadata"
            className="w-full rounded-base"
            captionSrc="/captions/shiplink.vtt"
            poster="/images/poster-shiplink.png"
          />
        </div>

        <div className="flex flex-col gap-2 3md:w-1/2 lg:max-w-[474px]">
          {title && (
            <Title level="2" className="text-2.5xl text-black">
              {title}
            </Title>
          )}
          {shortDescription && <p className="text-xsm text-black">{shortDescription}</p>}
          {buttons && (
            <div className="mt-4 flex gap-x-4 3md:mt-5">
              {buttons.map((button) => (
                <LinkAsButton
                  key={button.path}
                  href={delve(button, 'path')}
                  buttonProps={{ variant: 'primary', size: 'large' }}
                  customStyles="w-full md:w-fit"
                >
                  {delve(button, 'label')}
                </LinkAsButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

CTABlock.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

export default CTABlock;
