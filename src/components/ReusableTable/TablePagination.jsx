import PropTypes from 'prop-types';

const PaginationButton = ({ children, disabled, active, onClick, tooltip }) => (
  <div
    className={[
      'pagination-button',
      active ? 'selected' : '',
      disabled ? 'disabled' : '',
    ].join(' ')}
    onClick={onClick}
    onKeyDown={() => {}}
    role="button"
    tabIndex={-1}
    title={tooltip}
  >
    <span>
      {children}
    </span>
  </div>
);

PaginationButton.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.any,
};

PaginationButton.defaultProps = {
  disabled: false,
  active: false,
  onClick: () => {},
  tooltip: '',
};

const TablePagination = ({ pageIndex, totalResults, resultsPerPage, onPageChange, hidePageIndex }) => {
  const generatePageIndexes = () => {
    const pageCount = Math.ceil(totalResults / resultsPerPage);
    const pages = [];

    let outOfRange = false;

    for (let i = 1; i <= pageCount; i += 1) {
      if (i <= 1 || i >= pageCount - 1 || Math.abs(i - pageIndex) <= 1) {
        outOfRange = false;

        pages.push(
          <PaginationButton
            key={`table-pagination-page-${i}`}
            active={i === pageIndex}
            onClick={() => { onPageChange(i); }}
            tooltip={i}
          >
            {i}
          </PaginationButton>
        );
      } else {
        if (!outOfRange) {
          pages.push(
            <PaginationButton
              key={`table-pagination-page-${i}`}
              disabled
            >
              ...
            </PaginationButton>
          );
        }

        outOfRange = true;
      }
    }

    return [
      <PaginationButton
        key="table-pagination-page-0"
        disabled={pageIndex === 1}
        onClick={() => { onPageChange(pageIndex - 1); }}
      >
        {'<'}
      </PaginationButton>,
      ...pages,
      <PaginationButton
        key={`table-pagination-page-${pageCount + 1}`}
        disabled={pageIndex === pageCount}
        onClick={() => { onPageChange(pageIndex + 1); }}
      >
        {'>'}
      </PaginationButton>,
    ];
  };

  return (
    <div className="pagination">
      <div className="pagination-items-info">
        {(pageIndex - 1) * resultsPerPage + 1}
        &nbsp;to&nbsp;
        {totalResults > pageIndex * resultsPerPage ? pageIndex * resultsPerPage : totalResults}
        &nbsp;of&nbsp;
        {totalResults}
        &nbsp;record
        {totalResults > 1 ? 's' : ''}
      </div>
      {
        !hidePageIndex && (
          <div className="pagination-index">
            {generatePageIndexes()}
          </div>
        )
      }
    </div>
  );
};

TablePagination.propTypes = {
  pageIndex: PropTypes.number,
  totalResults: PropTypes.number,
  resultsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  hidePageIndex: PropTypes.bool,
};

TablePagination.defaultProps = {
  pageIndex: 1,
  totalResults: 0,
  resultsPerPage: 10,
  onPageChange: () => {},
  hidePageIndex: false,
};

export default TablePagination;
