import { Button } from '@/elements';
import { ExpandableRowFooter, UploadForm } from '@/units';

const PostFixtureExpandedFooter = () => {
  return (
    <ExpandableRowFooter>
      <div>
        <div className="pb-2.5">
          <UploadForm />
        </div>
        <div className="pb-2.5">
          <Button
            buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'large' }}
            customStyles="self-start"
          />
        </div>
      </div>
    </ExpandableRowFooter>
  );
};

export default PostFixtureExpandedFooter;
