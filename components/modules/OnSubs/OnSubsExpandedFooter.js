import FailTheSubsModalContent from './FailTheSubsModalContent';

import { OnSubsExpandedFooterPropTypes } from '@/lib/types';

import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider, NextLink } from '@/elements';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const OnSubsExpandedFooter = ({ underRecap = true, offerId, scriveURL = '' }) => {
  return (
    <ExpandableRowFooter>
      <Divider className="absolute left-0 w-full" />
      <div className="flex gap-x-5 justify-between pt-2.5">
        <div className="w-full grow">
          {!!underRecap && (
            <Button
              buttonProps={{
                text: 'The recap is being finalized',
                icon: { before: <CircleArrowsSVG /> },
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full whitespace-nowrap 3md:grow"
              disabled
            />
          )}
        </div>

        <div className="flex gap-x-2.5 gap-y-2.5">
          <div className="w-full">
            <ModalWindow
              buttonProps={{
                variant: 'delete',
                size: 'large',
                text: 'Fail the Subs',
                className: 'w-max',
                disabled: underRecap,
              }}
              containerClass="w-[356px]"
            >
              <FailTheSubsModalContent offerId={offerId} />
            </ModalWindow>
          </div>
          <div className="w-full">
            <NextLink
              href={scriveURL}
              target="blank"
              className="block text-xsm whitespace-nowrap bg-blue text-white h-10 px-5 py-2.5 rounded-md hover:bg-blue-darker"
            >
              Lift the Subs
            </NextLink>
          </div>
        </div>
      </div>
    </ExpandableRowFooter>
  );
};

OnSubsExpandedFooter.propTypes = OnSubsExpandedFooterPropTypes;

export default OnSubsExpandedFooter;
