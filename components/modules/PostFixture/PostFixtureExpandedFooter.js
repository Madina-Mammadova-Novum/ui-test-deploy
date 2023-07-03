import { Button } from '@/elements';
import { ExpandableRowFooter } from '@/units';

const PostFixtureExpandedFooter = () => {
  return (
    <ExpandableRowFooter>
      <Button
        buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'large' }}
        customStyles="self-start mt-2.5"
      />
    </ExpandableRowFooter>
  );
};

export default PostFixtureExpandedFooter;
