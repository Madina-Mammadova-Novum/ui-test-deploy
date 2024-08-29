import { FixtureExpandedFooterPropTypes } from '@/lib/types';

import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider } from '@/elements';
import { ExpandableRowFooter } from '@/units';

const FixtureExpandedFooter = ({ drafted }) => {
  return (
    <ExpandableRowFooter>
      <Divider />
      <div className="flex justify-between gap-x-5 px-5 py-2.5">
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
