import { PostFixtureExpandedFooterPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ExpandableRowFooter } from '@/units';
import { downloadFile } from '@/utils/helpers';

const PostFixtureExpandedFooter = ({ charterPartyUrl }) => {
  const fileName = charterPartyUrl?.cargoCode ? `charter-party-${charterPartyUrl?.cargoCode}.pdf` : 'charter-party.pdf';

  return (
    <ExpandableRowFooter>
      <Button
        buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'large' }}
        customStyles="self-start mt-2.5"
        onClick={() => downloadFile({ url: charterPartyUrl, fileName })}
        disabled={!charterPartyUrl}
      />
    </ExpandableRowFooter>
  );
};

PostFixtureExpandedFooter.propTypes = PostFixtureExpandedFooterPropTypes;

export default PostFixtureExpandedFooter;
