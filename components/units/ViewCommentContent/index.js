import ModalHeader from '../ModalHeader';

import { ViewCommentContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const ViewCommentContent = ({ data, closeModal }) => {
  const { comments } = data;
  return (
    <div className="w-80">
      <ModalHeader>Comment</ModalHeader>

      <p className="pt-2.5 pb-5">{comments}</p>

      <Button
        buttonProps={{
          variant: 'primary',
          size: 'large',
          text: 'OK',
        }}
        onClick={closeModal}
        customStyles="w-full"
      />
    </div>
  );
};

ViewCommentContent.propTypes = ViewCommentContentPropTypes;

export default ViewCommentContent;
