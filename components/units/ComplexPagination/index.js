import PropTypes from 'prop-types'
import { SimpleSelect } from '@/elements';
import { PaginationComponent } from '@/units';

const ComplexPagination = ({ pagination, setPagination }) => {
  return (
    <div className="flex justify-between mt-5">
      <SimpleSelect
        onChange={(item) => setPagination((prevState) => ({ ...prevState, offersPerPage: item }))}
        currentItem={pagination.offersPerPage}
        selectableItems={[5, 10, 15]}
        label="offers per page:"
      />
      <PaginationComponent pageCount={9} currentPage={1} />
      <SimpleSelect
        onChange={(item) => setPagination((prevState) => ({ ...prevState, currentPage: item }))}
        currentItem={pagination.currentPage}
        selectableItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        label="Go to page:"
      />
    </div>
  );
};

ComplexPagination.propTypes = {
    pagination: PropTypes.shape({
        offersPerPage: PropTypes.number,
        currentPage: PropTypes.number,
    }).isRequired,
    setPagination: PropTypes.func.isRequired,
}

export default ComplexPagination;
