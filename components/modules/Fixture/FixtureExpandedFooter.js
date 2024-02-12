import { FixtureExpandedFooterPropTypes } from '@/lib/types';

import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider } from '@/elements';
import { ExpandableRowFooter } from '@/units';

const FixtureExpandedFooter = ({ drafted = true }) => {
  return (
    <ExpandableRowFooter>
      <Divider className="absolute left-0 w-full" />
      <div className="flex gap-x-5 justify-between py-2.5 px-5">
        <div className="w-full grow">
          {drafted && (
            <Button
              buttonProps={{
                text: 'Charter Party is being drafted',
                icon: { before: <CircleArrowsSVG /> },
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full whitespace-nowrap 3md:grow relative top-1.5"
              disabled
            />
          )}
        </div>
      </div>
    </ExpandableRowFooter>
  );
};

FixtureExpandedFooter.propTypes = FixtureExpandedFooterPropTypes;

export default FixtureExpandedFooter;
