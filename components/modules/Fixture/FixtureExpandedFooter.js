
import { Button } from '@/elements';
import { ExpandableRowFooter } from '@/units';

const FixtureExpandedFooter = () => {

  return (
    <ExpandableRowFooter>
        <Button
          buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'large' }}
          customStyles="hover:border-black"
        />
    </ExpandableRowFooter>
  );
};

export default FixtureExpandedFooter;
